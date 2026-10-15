/**
 * API Client for RRBY Outbreak Task Portal
 * Powered by Google Firebase Realtime Database for 100% free, 24/7 cross-device sync.
 * Works seamlessly on GitHub Pages, Mobile HP, and Local PC without any credit card.
 */

const FIREBASE_DB_URL = 'https://outbreak-7b51f-default-rtdb.asia-southeast1.firebasedatabase.app';
const FIREBASE_PROJECT_ID = 'outbreak-7b51f';
const FIREBASE_STORAGE_BUCKET = 'outbreak-7b51f.firebasestorage.app';
const FIREBASE_STORAGE_BUCKET_FALLBACK = 'outbreak-7b51f.appspot.com';

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024, dm = 1;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

let firebaseAppInitialized = false;
function initFirebaseApp() {
  if (firebaseAppInitialized) return true;
  if (typeof firebase === 'undefined') return false;
  try {
    if (!firebase.apps || !firebase.apps.length) {
      firebase.initializeApp({
        databaseURL: FIREBASE_DB_URL,
        projectId: FIREBASE_PROJECT_ID,
        storageBucket: FIREBASE_STORAGE_BUCKET
      });
    }
    firebaseAppInitialized = true;
    return true;
  } catch (e) {
    console.warn('Firebase init error:', e);
    return false;
  }
}

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

    let tasks = await this.getTasks();
    if (!tasks) return { success: false, message: 'Data tugas tidak ditemukan.' };
    const task = tasks.find(t => t.id === taskId);
    if (!task) return { success: false, message: 'Tugas tidak ditemukan.' };

    const isReihanUser = user && user.toLowerCase() === 'reihan';
    const isTaskOwner = user && task.owner && task.owner.toLowerCase() === user.toLowerCase();

    // Hanya Reihan atau pemilik tugas yang berwenang membatalkan klaim (status 'open')
    if (status === 'open' && !isReihanUser && !isTaskOwner) {
      return { 
        success: false, 
        message: `Akses Dibatasi: Tugas #${task.id} adalah milik ${task.owner}. Hanya ${task.owner} atau Reihan yang berwenang membatalkan klaim!` 
      };
    }

    // Hanya Reihan yang berwenang membuka kembali tugas yang sudah selesai
    if (task.status === 'done' && status === 'doing' && !isReihanUser) {
      return { 
        success: false, 
        message: 'Akses Dibatasi: Hanya Reihan (Project Lead) yang berwenang membuka kembali tugas!' 
      };
    }

    task.status = status;
    if (status === 'open') {
      task.claimedBy = '';
    }
    await this.saveAllTasks(tasks);
    return { success: true };
  },

  async uploadFile(file, onProgress = null) {
    // 1. Cek jika berjalan di localhost/local IP server.js
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.port === '3000') {
      try {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        if (res.ok) {
          const data = await res.json();
          if (data && data.fileMeta) {
            return {
              success: true,
              downloadUrl: data.fileMeta.downloadUrl,
              name: file.name,
              size: formatBytes(file.size),
              sizeBytes: file.size,
              uploadedAt: new Date().toLocaleString('id-ID')
            };
          }
        }
      } catch (err) {
        console.warn('Local upload endpoint failed, proceeding to cloud storage...', err);
      }
    }

    // 2. Cloud Upload via GoFile API (100% Gratis, Tanpa Akun, Tanpa Kartu Kredit)
    try {
      let server = 'store3';
      try {
        const sRes = await fetch('https://api.gofile.io/servers');
        if (sRes.ok) {
          const sData = await sRes.json();
          if (sData && sData.data && sData.data.servers && sData.data.servers.length) {
            server = sData.data.servers[0].name;
          }
        }
      } catch (e) {
        console.warn('Gofile server lookup fallback:', e);
      }

      const uploadUrl = `https://${server}.gofile.io/contents/uploadfile`;

      return await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', uploadUrl);

        if (xhr.upload && typeof onProgress === 'function') {
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable && e.total > 0) {
              const percent = Math.round((e.loaded / e.total) * 100);
              onProgress({ percent, bytesTransferred: e.loaded, totalBytes: e.total });
            }
          };
        }

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const res = JSON.parse(xhr.responseText);
              if (res && res.status === 'ok' && res.data && res.data.downloadPage) {
                resolve({
                  success: true,
                  downloadUrl: res.data.downloadPage,
                  name: file.name,
                  storedPath: res.data.code || '',
                  size: formatBytes(file.size),
                  sizeBytes: file.size,
                  uploadedAt: new Date().toLocaleString('id-ID')
                });
                return;
              }
            } catch (err) {
              reject(err);
              return;
            }
          }
          reject(new Error(`Server upload merespons status: ${xhr.status}`));
        };

        xhr.onerror = () => reject(new Error('Koneksi upload jaringan terputus'));
        xhr.ontimeout = () => reject(new Error('Upload timeout (terlalu lama)'));

        const fd = new FormData();
        fd.append('file', file);
        xhr.send(fd);
      });
    } catch (cloudErr) {
      console.error('Cloud storage upload error:', cloudErr);
      return {
        success: false,
        error: cloudErr.message || 'Gagal mengunggah file ke cloud storage.',
        code: 'upload_failed'
      };
    }
  },

  async submitWork(taskId, formDataOrObj, onProgress = null) {
    const currentUser = localStorage.getItem('rrby_outbreak_current_user');
    const validMembers = ['reihan', 'bintang', 'royan', 'eby'];
    if (!currentUser || !validMembers.includes(currentUser.toLowerCase())) {
      return { 
        success: false, 
        message: 'Akses Dibatasi: Silakan login terlebih dahulu sebagai member tim Outbreak untuk mengumpulkan hasil tugas!' 
      };
    }

    let tasks = await this.getTasks();
    if (!tasks) return { success: false, message: 'Data tugas tidak ditemukan.' };
    const task = tasks.find(t => t.id === taskId);
    if (!task) return { success: false, message: 'Tugas tidak ditemukan.' };

    let owner = '', link = '', notes = '', status = 'done', fileMeta = null;
    let fileToUpload = null;

    if (formDataOrObj instanceof FormData) {
      owner = formDataOrObj.get('owner') || task.owner;
      link = formDataOrObj.get('link') || '';
      notes = formDataOrObj.get('notes') || '';
      status = formDataOrObj.get('status') || 'done';
      const file = formDataOrObj.get('file');
      if (file && typeof file === 'object' && file.name) {
        fileToUpload = file;
      }
    } else {
      owner = formDataOrObj.owner || task.owner;
      link = formDataOrObj.link || '';
      notes = formDataOrObj.notes || '';
      status = formDataOrObj.status || 'done';
      if (formDataOrObj.file && typeof formDataOrObj.file === 'object' && formDataOrObj.file.name) {
        fileToUpload = formDataOrObj.file;
      } else {
        fileMeta = formDataOrObj.fileMeta || null;
      }
    }

    // Unggah file jika ada file yang dipilih
    if (fileToUpload) {
      const uploadRes = await this.uploadFile(fileToUpload, onProgress);
      if (uploadRes && uploadRes.success) {
        fileMeta = {
          name: uploadRes.name,
          originalName: uploadRes.name,
          downloadUrl: uploadRes.downloadUrl,
          storedPath: uploadRes.storedPath || '',
          size: uploadRes.size,
          sizeBytes: uploadRes.sizeBytes,
          uploadedAt: uploadRes.uploadedAt
        };
      } else {
        return {
          success: false,
          storageError: true,
          error: uploadRes ? uploadRes.error : 'Gagal upload file ke cloud storage',
          code: uploadRes ? uploadRes.code : 'unknown'
        };
      }
    }

    task.owner = owner;
    if (link !== undefined) task.submissionLink = link;
    if (notes !== undefined) task.notes = notes;
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
          submissionLink: task.submissionLink || '',
          notes: task.notes || '',
          fileMeta: task.fileMeta || null,
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
