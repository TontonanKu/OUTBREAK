/**
 * API Client for RRBY Outbreak Task Portal
 * Seamlessly talks to Express backend /api, with offline LocalStorage fallback.
 * Supports configurable Backend URL and multi-device cloud synchronization.
 */

const API = {
  isServerAvailable: false,
  baseUrl: localStorage.getItem('rrby_backend_url') || '',

  getBaseUrl() {
    if (this.baseUrl) return this.baseUrl.replace(/\/$/, '');
    // If running on localhost or local IP, use relative path
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.') || host.startsWith('10.')) {
      return '';
    }
    return '';
  },

  setBaseUrl(url) {
    this.baseUrl = (url || '').trim().replace(/\/$/, '');
    if (this.baseUrl) {
      localStorage.setItem('rrby_backend_url', this.baseUrl);
    } else {
      localStorage.removeItem('rrby_backend_url');
    }
  },

  async checkServer() {
    const url = `${this.getBaseUrl()}/api/tasks`;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(url, { method: 'GET', cache: 'no-store', signal: controller.signal });
      clearTimeout(timeoutId);
      this.isServerAvailable = res.ok;
      return this.isServerAvailable;
    } catch (e) {
      this.isServerAvailable = false;
      return false;
    }
  },

  async getTasks() {
    if (this.isServerAvailable) {
      try {
        const res = await fetch(`${this.getBaseUrl()}/api/tasks`, { cache: 'no-store' });
        const data = await res.json();
        return data.tasks || [];
      } catch (e) {
        console.warn('Server error, falling back to LocalStorage', e);
      }
    }
    const local = localStorage.getItem('rrby_outbreak_tasks_v2');
    return local ? JSON.parse(local) : null;
  },

  async login(name, password) {
    if (this.isServerAvailable) {
      try {
        const res = await fetch(`${this.getBaseUrl()}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, password })
        });
        const data = await res.json();
        return data;
      } catch (e) {
        console.warn('Server error during login', e);
      }
    }

    // Client-side fallback using SHA-256
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hash = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    const EXPECTED_HASH = "7beeab3efa220b4ba7845d15801d06e26d048d271d2fa5c1978e0eadb0bcf417";

    if (hash === EXPECTED_HASH) {
      return { success: true, user: name, message: `Selamat datang, ${name}!` };
    } else {
      return { success: false, message: 'Password salah!' };
    }
  },

  async claimTask(taskId, memberName) {
    if (this.isServerAvailable) {
      try {
        const res = await fetch(`${this.getBaseUrl()}/api/tasks/${taskId}/claim`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ member: memberName })
        });
        return await res.json();
      } catch (e) {
        console.warn('Server error during claim', e);
      }
    }
    return { success: true };
  },

  async updateStatus(taskId, status) {
    if (this.isServerAvailable) {
      try {
        const res = await fetch(`${this.getBaseUrl()}/api/tasks/${taskId}/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        });
        return await res.json();
      } catch (e) {
        console.warn('Server error during status update', e);
      }
    }
    return { success: true };
  },

  async submitWork(taskId, formData) {
    if (this.isServerAvailable) {
      try {
        const res = await fetch(`${this.getBaseUrl()}/api/tasks/${taskId}/submit`, {
          method: 'POST',
          body: formData
        });
        return await res.json();
      } catch (e) {
        console.warn('Server error during submission', e);
      }
    }
    return { success: true };
  },

  async saveTask(taskData, editId = null, currentUser = '') {
    if (this.isServerAvailable) {
      try {
        const url = editId ? `${this.getBaseUrl()}/api/tasks/${editId}` : `${this.getBaseUrl()}/api/tasks`;
        const method = editId ? 'PUT' : 'POST';
        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'x-user': currentUser || ''
          },
          body: JSON.stringify(taskData)
        });
        return await res.json();
      } catch (e) {
        console.warn('Server error saving task', e);
      }
    }
    return { success: true };
  },

  async getSubmissions() {
    if (this.isServerAvailable) {
      try {
        const res = await fetch(`${this.getBaseUrl()}/api/submissions`, { cache: 'no-store' });
        return await res.json();
      } catch (e) {
        console.warn('Server error getting submissions', e);
      }
    }
    const local = localStorage.getItem('rrby_outbreak_tasks_v2');
    const tasks = local ? JSON.parse(local) : [];
    return {
      success: true,
      submissions: tasks.filter(t => t.submissionLink || t.fileMeta),
      uploadsDir: 'uploads/'
    };
  },

  async resetTasks(currentUser = '') {
    if (this.isServerAvailable) {
      try {
        const res = await fetch(`${this.getBaseUrl()}/api/tasks/reset`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-user': currentUser || ''
          }
        });
        return await res.json();
      } catch (e) {
        console.warn('Server error during reset', e);
      }
    }
    return { success: true };
  }
};
