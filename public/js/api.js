/**
 * API Client for RRBY Outbreak Task Portal
 * Powered by Google Firebase Realtime Database for 100% free, 24/7 cross-device sync.
 * Works seamlessly on GitHub Pages, Mobile HP, and Local PC without any credit card.
 */

const FIREBASE_DB_URL = 'https://outbreak-7b51f-default-rtdb.asia-southeast1.firebasedatabase.app';

const API = {
  isServerAvailable: true,
  isCloudConnected: false,
  eventSource: null,

  async checkServer() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`${FIREBASE_DB_URL}/tasks.json?shallow=true`, {
        cache: 'no-store',
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      this.isCloudConnected = res.ok;
      this.isServerAvailable = res.ok;
      return this.isCloudConnected;
    } catch (e) {
      this.isCloudConnected = false;
      this.isServerAvailable = false;
      return false;
    }
  },

  async getTasks() {
    try {
      const res = await fetch(`${FIREBASE_DB_URL}/tasks.json?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        if (data) {
          let list = Array.isArray(data) ? data : Object.values(data);
          list = list.filter(item => item && typeof item === 'object' && item.title);
          if (list.length) {
            this.isCloudConnected = true;
            this.isServerAvailable = true;
            return list;
          }
        }
      }
    } catch (e) {
      console.warn('Firebase connection issue, checking local storage', e);
    }

    const local = localStorage.getItem('rrby_outbreak_tasks_v2');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      } catch (e) {}
    }
    return null;
  },

  async saveAllTasks(tasks) {
    try {
      const res = await fetch(`${FIREBASE_DB_URL}/tasks.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tasks)
      });
      return res.ok;
    } catch (e) {
      console.error('Failed to sync to Firebase cloud', e);
      return false;
    }
  },

  async claimTask(taskId, memberName) {
    let tasks = await this.getTasks();
    if (!tasks) return { success: false };
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.status = 'doing';
      task.claimedBy = memberName;
      await this.saveAllTasks(tasks);
    }
    return { success: true };
  },

  async updateStatus(taskId, status, user = null) {
    if (!user) {
      user = localStorage.getItem('rrby_outbreak_current_user') || '';
    }
    // Hanya Reihan yang berwenang membatalkan klaim (status 'open')
    if (status === 'open' && (!user || user.toLowerCase() !== 'reihan')) {
      return { success: false, message: 'Akses Dibatasi: Hanya Reihan yang berwenang membatalkan klaim tugas!' };
    }

    let tasks = await this.getTasks();
    if (!tasks) return { success: false };
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.status = status;
      if (status === 'open') {
        task.claimedBy = '';
      }
      await this.saveAllTasks(tasks);
    }
    return { success: true };
  },

  async submitWork(taskId, formDataOrObj) {
    let tasks = await this.getTasks();
    if (!tasks) return { success: false };
    const task = tasks.find(t => t.id === taskId);
    if (!task) return { success: false };

    let owner = '', link = '', notes = '', status = 'done', fileMeta = null;
    if (formDataOrObj instanceof FormData) {
      owner = formDataOrObj.get('owner') || task.owner;
      link = formDataOrObj.get('link') || '';
      notes = formDataOrObj.get('notes') || '';
      status = formDataOrObj.get('status') || 'done';
      const file = formDataOrObj.get('file');
      if (file && typeof file === 'object' && file.name) {
        fileMeta = {
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
          uploadedAt: new Date().toLocaleString('id-ID')
        };
      }
    } else {
      owner = formDataOrObj.owner || task.owner;
      link = formDataOrObj.link || '';
      notes = formDataOrObj.notes || '';
      status = formDataOrObj.status || 'done';
      fileMeta = formDataOrObj.fileMeta || null;
    }

    task.owner = owner;
    task.submissionLink = link;
    task.notes = notes;
    task.status = status;
    if (fileMeta) task.fileMeta = fileMeta;

    await this.saveAllTasks(tasks);

    // Save record to cloud submissions archive
    try {
      await fetch(`${FIREBASE_DB_URL}/submissions/${taskId}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: taskId,
          title: task.title,
          owner: task.owner,
          submissionLink: task.submissionLink,
          notes: task.notes,
          fileMeta: task.fileMeta,
          submittedAt: new Date().toISOString()
        })
      });
    } catch (e) {}

    return { success: true, task };
  },

  async saveTask(taskData, editId = null, currentUser = '') {
    if (!currentUser || currentUser.toLowerCase() !== 'reihan') {
      return { success: false, message: 'Hanya Reihan (Lead) yang diizinkan mengedit jobdesk!' };
    }
    let tasks = await this.getTasks();
    if (!tasks) return { success: false };

    if (editId) {
      const idx = tasks.findIndex(t => t.id === editId);
      if (idx !== -1) tasks[idx] = { ...tasks[idx], ...taskData };
    } else {
      const newId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
      tasks.push({ id: newId, ...taskData, status: 'open', submissionLink: '', notes: '', fileMeta: null });
    }

    await this.saveAllTasks(tasks);
    return { success: true, tasks };
  },

  async getSubmissions() {
    try {
      const res = await fetch(`${FIREBASE_DB_URL}/submissions.json?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        if (data) {
          const subs = Object.values(data);
          return { success: true, submissions: subs };
        }
      }
    } catch (e) {}

    const tasks = await this.getTasks();
    return {
      success: true,
      submissions: tasks ? tasks.filter(t => t.submissionLink || t.fileMeta) : []
    };
  },

  async resetTasks(currentUser = '', defaultTasks = []) {
    if (!currentUser || currentUser.toLowerCase() !== 'reihan') {
      return { success: false, message: 'Akses Ditolak: Hanya Reihan yang memiliki izin mereset data!' };
    }
    if (defaultTasks && defaultTasks.length) {
      await this.saveAllTasks(defaultTasks);
    }
    try {
      await fetch(`${FIREBASE_DB_URL}/submissions.json`, { method: 'DELETE' });
    } catch (e) {}

    return { success: true, tasks: defaultTasks };
  },

  async login(name, password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hash = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

    // Separate secure hashes:
    // Reihan (Lead): "akuganteng12"
    // Bintang, Royan, Eby: "akujawa12"
    const HASH_REIHAN = "9ef7d1bdd38d8eb06541cc1586e0e73e45044fc4fc0eb8ca835ab1e8041d84f3";
    const HASH_OTHERS = "7beeab3efa220b4ba7845d15801d06e26d048d271d2fa5c1978e0eadb0bcf417";

    const isReihanUser = name && name.toLowerCase() === 'reihan';
    const expectedHash = isReihanUser ? HASH_REIHAN : HASH_OTHERS;

    if (hash === expectedHash) {
      return { success: true, user: name, message: `Selamat datang, ${name}!` };
    } else {
      return { success: false, message: 'Password salah!' };
    }
  },

  // ----------------------------------------------------
  // DAILY PROGRESS UPDATES & SCREENSHOTS (FIREBASE RTDB)
  // ----------------------------------------------------
  async getProgressUpdates() {
    try {
      const res = await fetch(`${FIREBASE_DB_URL}/progress_updates.json?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        if (data) {
          const list = Object.values(data);
          list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
          try {
            localStorage.setItem('rrby_outbreak_progress_updates', JSON.stringify(list));
          } catch (e) {}
          return list;
        }
        return [];
      }
    } catch (e) {
      console.warn('Firebase getProgressUpdates issue, using local cache', e);
    }

    const local = localStorage.getItem('rrby_outbreak_progress_updates');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return [];
  },

  async addProgressUpdate(updateObj) {
    if (!updateObj.id) {
      updateObj.id = 'prog_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    }
    if (!updateObj.timestamp) {
      updateObj.timestamp = Date.now();
    }
    if (!updateObj.dateStr) {
      updateObj.dateStr = new Date().toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    // Immediately cache locally so user sees update instantly
    try {
      const local = localStorage.getItem('rrby_outbreak_progress_updates');
      let cached = local ? JSON.parse(local) : [];
      if (!Array.isArray(cached)) cached = [];
      cached.unshift(updateObj);
      localStorage.setItem('rrby_outbreak_progress_updates', JSON.stringify(cached));
    } catch (e) {}

    try {
      const res = await fetch(`${FIREBASE_DB_URL}/progress_updates/${updateObj.id}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateObj)
      });
      return { success: res.ok, update: updateObj };
    } catch (e) {
      console.warn('Firebase network error, saved to local cache', e);
      return { success: true, update: updateObj, offline: true };
    }
  },

  async deleteProgressUpdate(updateId) {
    try {
      const res = await fetch(`${FIREBASE_DB_URL}/progress_updates/${updateId}.json`, {
        method: 'DELETE'
      });
      return { success: res.ok };
    } catch (e) {
      console.error('Failed to delete progress update from Firebase', e);
      return { success: false, error: e.message };
    }
  },

  setupRealtimeListener(onUpdate, onProgressUpdate) {
    if (this.eventSource) {
      try { this.eventSource.close(); } catch (e) {}
    }
    try {
      this.eventSource = new EventSource(`${FIREBASE_DB_URL}/tasks.json`);
      this.eventSource.addEventListener('put', async (e) => {
        try {
          const parsed = JSON.parse(e.data);
          if (parsed && Array.isArray(parsed.data)) {
            onUpdate(parsed.data);
          } else if (parsed && parsed.path === '/' && Array.isArray(parsed.data)) {
            onUpdate(parsed.data);
          } else {
            const latest = await this.getTasks();
            if (latest && Array.isArray(latest)) onUpdate(latest);
          }
        } catch (err) {
          console.warn('Realtime parse event error', err);
        }
      });
      this.eventSource.onerror = () => {
        // Handled by browser auto-reconnect
      };
    } catch (e) {
      console.warn('EventSource SSE connection failed', e);
    }

    if (onProgressUpdate) {
      try {
        if (this.progressEventSource) {
          try { this.progressEventSource.close(); } catch (e) {}
        }
        this.progressEventSource = new EventSource(`${FIREBASE_DB_URL}/progress_updates.json`);
        this.progressEventSource.addEventListener('put', async () => {
          const updates = await this.getProgressUpdates();
          if (typeof onProgressUpdate === 'function') onProgressUpdate(updates);
        });
      } catch (e) {
        console.warn('Progress EventSource failed', e);
      }
    }
  }
};
