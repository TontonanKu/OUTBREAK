/**
 * RRBY Outbreak Task Portal - Frontend Controller (Neo-Brutalist Edition)
 */

(() => {
  'use strict';

  // Constants
  const FIGMA_URL = 'https://www.figma.com/design/3z6xuNL6snILkeac92TvGJ/Untitled?node-id=0-1&t=1fbwPhcLpaRk8gBK-1';
  const VALID_MEMBERS = ['Reihan', 'Bintang', 'Royan', 'Eby'];

  const DEFAULT_TASKS = [
    {
      id: 1,
      title: "Desain & Revisi UI Figma",
      category: "UI / Design",
      owner: "Bintang",
      status: "open",
      figmaLink: FIGMA_URL,
      desc: "• Preview semua layer UI di Figma dan revisi masukan dosen.\n• [Usulan] Layer Daily: isi kotak 7 hari (hari 1-6 +100 cash/senjata, hari 7 hadiah karakter).\n• [Usulan] Layer Cash: buat fitur topup cash.\n• [Usulan] Rapikan Layer Heroes & Layer Gun.\n• [Usulan] Vektor guns di Figma: tentukan warna untuk 5 guns.\n• Acuan: Resolusi 1920x1080 (16:9), Font Inter-Black, Teks UI Bahasa Inggris.",
      submissionLink: "",
      notes: "",
      fileMeta: null
    },
    {
      id: 2,
      title: "Produksi SFX & Audio Game (Bintang)",
      category: "Audio",
      owner: "Bintang",
      status: "open",
      figmaLink: "",
      desc: "• Rekaman & produksi audio asli bersama Royan menggantikan suara tes kode.\n• UI: Klik tombol, beli item, klaim daily, misi terbuka.\n• Senjata: Tembakan terpisah 5 senjata (Revolver, SMG, Shotgun, Assault Rifle, Sniper) + reload.\n• Item & Hasil: Ambil health pack, victory, game over.\n• Musik: BGM menu, BGM gameplay, versi tegang misi akhir.\n• Spek teknis: Format WAV/OGG bebas lisensi. Level volume: SFX 0.95 dan BGM 0.75.",
      submissionLink: "",
      notes: "",
      fileMeta: null
    },
    {
      id: 3,
      title: "Aset Karakter Hero (Alek, Erika, Hank)",
      category: "Visual Assets",
      owner: "Royan",
      status: "open",
      figmaLink: FIGMA_URL,
      desc: "• Hapus noda pada aset karakter pertama (Alek).\n• Tambah aset karakter baru: Erika dan Hank.\n• Tiap hero memiliki 5 state animasi: Idle, Walk, Run, Attack, Hurt, Dead.\n• Format: PNG transparan, style dan proporsi seragam mengikuti Figma.",
      submissionLink: "",
      notes: "",
      fileMeta: null
    },
    {
      id: 4,
      title: "Background Gameplay 5 Misi",
      category: "Visual Assets",
      owner: "Royan",
      status: "open",
      figmaLink: FIGMA_URL,
      desc: "• Tambah 4 background gameplay baru untuk 5 misi berjenjang (Easy, Medium, Hard, Insane, Nightmare).\n• 1 background pertama sudah ada di Figma sebagai acuan style visual.\n• Resolusi wajib: 1920 x 1080 (16:9) PNG.",
      submissionLink: "",
      notes: "",
      fileMeta: null
    },
    {
      id: 5,
      title: "Produksi Voice Karakter & Audio (Royan)",
      category: "Audio",
      owner: "Royan",
      status: "open",
      figmaLink: "",
      desc: "• Rekaman suara bersama Bintang untuk voice over karakter dan zombie.\n• Hero: Voice hurt & death (dibuat beda tiap hero: Alek, Erika, Hank).\n• Zombie: Erangan/chase, attack, hurt, death.\n• Bantuan rekaman SFX senjata dan BGM gameplay.\n• Format WAV/OGG bebas lisensi. Hindari clipping/suara pecah.",
      submissionLink: "",
      notes: "",
      fileMeta: null
    },
    {
      id: 6,
      title: "Aset Zombie (6 Varian Zombie Lengkap)",
      category: "Visual Assets",
      owner: "Eby",
      status: "open",
      figmaLink: FIGMA_URL,
      desc: "• Total zombie menjadi 6 varian (tambah 5 zombie baru).\n• Pembagian 6 zombie: 1 zombie pertama (di Figma), 2-3 varian zombie biasa, lalu Fast Runner, Tank, dan Boss untuk misi Hard s/d Nightmare.\n• Style disamakan dengan zombie pertama di Figma.\n• Tiap zombie wajib memiliki state lengkap: Idle, Walk, Run, Attack, Hurt, Dead.\n• Format: PNG transparan resolusi seragam.",
      submissionLink: "",
      notes: "",
      fileMeta: null
    },
    {
      id: 7,
      title: "Import & Setup Seluruh Aset di Unity 6",
      category: "Unity Development",
      owner: "Reihan",
      status: "open",
      figmaLink: FIGMA_URL,
      desc: "• Import semua aset baru (karakter Erika/Hank, 6 varian zombie, background 5 misi, dan icon UI) ke project Unity 6 Game Outbreak.\n• Setup sprite slicing, pivot point, sprite atlas, dan konfigurasi animator controller.",
      submissionLink: "",
      notes: "",
      fileMeta: null
    },
    {
      id: 8,
      title: "Integrasi Audio ke AudioManager Unity",
      category: "Unity Development",
      owner: "Reihan",
      status: "open",
      figmaLink: "",
      desc: "• Sambungkan semua file audio asli (SFX tombol, tembakan 5 senjata, reload, hurt, death, suara zombie, BGM menu & gameplay) ke script AudioManager di Unity.\n• Set volume balance master: SFX 0.95 dan BGM 0.75.",
      submissionLink: "",
      notes: "",
      fileMeta: null
    },
    {
      id: 9,
      title: "Implementasi Ulang UI Revisi di Unity Canvas",
      category: "Unity Development",
      owner: "Reihan",
      status: "open",
      figmaLink: FIGMA_URL,
      desc: "• Implementasikan ulang UI hasil revisi Figma ke Canvas Unity.\n• UI Daily Reward 7 hari, UI Topup Cash, perapihan menu Heroes & Guns, serta HUD in-game.\n• Pastikan sinkron dengan game logic dan teks UI berbahasa Inggris pada aspect ratio 16:9.",
      submissionLink: "",
      notes: "",
      fileMeta: null
    }
  ];

  // State
  let tasks = [];
  let currentUser = localStorage.getItem('rrby_outbreak_current_user') || null;
  let activeStatusFilter = 'all';
  let activeMemberFilter = 'all';
  let searchQuery = '';
  let stagedFile = null;
  let editTaskId = null;

  const $ = id => document.getElementById(id);

  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  function showToast(msg) {
    const t = $('toast');
    $('toast-msg').textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
  }

  function formatBytes(bytes) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024, dm = 1;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  function safeHTML(str) {
    return String(str || '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function validURL(str) {
    try {
      let u = new URL(str);
      return ['http:', 'https:'].includes(u.protocol) ? u.href : '';
    } catch (e) {
      return '';
    }
  }

  // ----------------------------------------------------
  // INITIALIZATION & DATA FETCHING
  // ----------------------------------------------------
  async function init() {
    await API.checkServer();
    await loadTasks();
    setupEventListeners();
    updateAuthUI();
    render();
  }

  async function loadTasks() {
    const loaded = await API.getTasks();
    if (loaded && loaded.length) {
      tasks = loaded;
      saveLocalBackup();
    } else {
      const local = localStorage.getItem('rrby_outbreak_tasks_v2');
      if (local) {
        tasks = JSON.parse(local);
      } else {
        tasks = JSON.parse(JSON.stringify(DEFAULT_TASKS));
        saveLocalBackup();
      }
    }
  }

  function saveLocalBackup() {
    localStorage.setItem('rrby_outbreak_tasks_v2', JSON.stringify(tasks));
  }

  // ----------------------------------------------------
  // AUTH UI
  // ----------------------------------------------------
  function updateAuthUI() {
    if (currentUser) {
      $('auth-logged-out').style.display = 'none';
      $('auth-logged-in').style.display = 'flex';
      $('user-avatar').textContent = currentUser.charAt(0).toUpperCase();
      $('user-display-name').textContent = `Halo, ${currentUser} ⚡`;
      document.querySelectorAll('.member-pill').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.user && btn.dataset.user.toLowerCase() === currentUser.toLowerCase());
      });
    } else {
      $('auth-logged-out').style.display = 'flex';
      $('auth-logged-in').style.display = 'none';
      document.querySelectorAll('.member-pill').forEach(btn => btn.classList.remove('active'));
    }
  }

  function openLoginModal(prefillName = '') {
    $('login-name').value = prefillName;
    $('login-password').value = '';
    document.querySelectorAll('.member-card-opt').forEach(card => {
      card.classList.toggle('selected', card.dataset.name === prefillName);
    });
    $('modal-login-wrap').classList.add('show');
    if (prefillName) {
      $('login-password').focus();
    }
    refreshIcons();
  }

  function closeLoginModal() {
    $('modal-login-wrap').classList.remove('show');
  }

  // ----------------------------------------------------
  // RENDERING FUNCTIONS
  // ----------------------------------------------------
  function renderStats() {
    const total = tasks.length;
    const doing = tasks.filter(t => t.status === 'doing').length;
    const done = tasks.filter(t => t.status === 'done').length;
    const submitted = tasks.filter(t => t.submissionLink || t.fileMeta).length;
    const pct = total ? Math.round((done / total) * 100) : 0;

    $('total').textContent = String(total).padStart(2, '0');
    $('doing').textContent = String(doing).padStart(2, '0');
    $('done').textContent = String(done).padStart(2, '0');
    $('submitted-count').textContent = String(submitted).padStart(2, '0');
    $('hero-percent').textContent = `${String(pct).padStart(2, '0')}%`;

    $('progress-label').textContent = `${done} / ${total}`;
    $('progress-fill').style.width = `${pct}%`;

    if (pct === 100 && total > 0) {
      $('progress-heading').textContent = 'SEMUA TUGAS TUNTAS! 🎉';
      $('progress-hint').textContent = 'Selamat! Seluruh revisi game Outbreak telah selesai!';
    } else {
      $('progress-heading').textContent = `${pct}% COMPLETED`;
      $('progress-hint').textContent = `${done} dari ${total} tugas telah diselesaikan dan dikumpulkan.`;
    }

    // Member progress breakdown
    const memberContainer = $('member-progress-container');
    memberContainer.innerHTML = VALID_MEMBERS.map(name => {
      const memTasks = tasks.filter(t => t.owner.toLowerCase() === name.toLowerCase());
      const memDone = memTasks.filter(t => t.status === 'done').length;
      const memTotal = memTasks.length;
      const memPct = memTotal ? Math.round((memDone / memTotal) * 100) : 0;
      return `
        <div class="mini-prog">
          <div class="mini-prog-name">
            <span>${name}</span>
            <span>${memDone}/${memTotal} (${memPct}%)</span>
          </div>
          <div class="mini-bar">
            <div class="mini-fill" style="width:${memPct}%"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderTasks() {
    renderStats();
    updateAuthUI();

    let filtered = tasks.filter(t => {
      if (activeStatusFilter !== 'all' && t.status !== activeStatusFilter) return false;
      if (activeMemberFilter !== 'all' && t.owner.toLowerCase() !== activeMemberFilter.toLowerCase()) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = t.title.toLowerCase().includes(q);
        const matchDesc = (t.desc || '').toLowerCase().includes(q);
        const matchOwner = (t.owner || '').toLowerCase().includes(q);
        const matchCat = (t.category || '').toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchOwner && !matchCat) return false;
      }
      return true;
    });

    const container = $('tasks');
    if (!filtered.length) {
      container.innerHTML = `<div class="empty">TIDAK ADA JOBDESK YANG SESUAI FILTER / PENCARIAN 🔍</div>`;
      refreshIcons();
      return;
    }

    container.innerHTML = filtered.map(t => {
      const isMine = currentUser && t.owner.toLowerCase() === currentUser.toLowerCase();
      const statusClass = t.status;
      const statusLabel = t.status === 'done' ? 'DONE ✓' : t.status === 'doing' ? 'IN PROGRESS' : 'AVAILABLE';
      const hasSubmission = Boolean(t.submissionLink || t.fileMeta);

      let downloadBtnHtml = '';
      if (t.fileMeta) {
        const dlUrl = t.fileMeta.downloadUrl || `/api/download/${t.fileMeta.storedName}`;
        downloadBtnHtml = `
          <div class="sub-file-badge">
            <span style="display:flex;align-items:center;gap:5px">
              <i data-lucide="archive" style="width:13px;height:13px"></i>
              ${safeHTML(t.fileMeta.name)} (${safeHTML(t.fileMeta.size)})
            </span>
            <a href="${dlUrl}" download="${safeHTML(t.fileMeta.name)}" class="download-btn">
              <i data-lucide="download" style="width:11px;height:11px"></i> Unduh
            </a>
          </div>
        `;
      }

      return `
        <article class="task ${isMine ? 'is-mine' : ''}" data-id="${t.id}">
          <div class="taskhead">
            <span class="id-badge">TASK / ${String(t.id).padStart(3, '0')}</span>
            <span class="category-badge">${safeHTML(t.category || 'Jobdesk')}</span>
            <span class="status ${statusClass}">
              <i data-lucide="${t.status === 'done' ? 'check-circle-2' : t.status === 'doing' ? 'clock' : 'circle'}" style="width:11px;height:11px"></i>
              ${statusLabel}
            </span>
          </div>

          <h3>${safeHTML(t.title)}</h3>

          <div class="owner-tag ${!t.owner ? 'unclaimed' : ''}">
            <i data-lucide="user" style="width:13px;height:13px"></i>
            <span>${t.owner ? safeHTML(t.owner.toUpperCase()) : 'BELUM DIAMBIL'}</span>
            ${isMine ? ' • (TUGAS KAMU ⭐)' : ''}
          </div>

          <div class="desc">${safeHTML(t.desc || 'Tidak ada deskripsi.')}</div>

          ${t.figmaLink ? `
            <a href="${safeHTML(validURL(t.figmaLink))}" target="_blank" rel="noopener noreferrer" class="figma-link-btn">
              <i data-lucide="palette" style="width:13px;height:13px"></i>
              <span>Buka Acuan Figma ↗</span>
            </a>
          ` : ''}

          ${hasSubmission ? `
            <div class="submission-box">
              <div class="submission-title">
                <span style="display:flex;align-items:center;gap:4px">
                  <i data-lucide="check" style="width:12px;height:12px"></i> HASIL TERKUMPUL
                </span>
                <span>${t.status === 'done' ? 'SELESAI' : 'PROGRES'}</span>
              </div>
              ${t.submissionLink ? `
                <div>
                  <a href="${safeHTML(validURL(t.submissionLink))}" target="_blank" rel="noopener noreferrer" class="sub-link">
                    <i data-lucide="external-link" style="width:12px;height:12px"></i>
                    Buka Link Hasil (Drive / Figma)
                  </a>
                </div>
              ` : ''}
              ${downloadBtnHtml}
              ${t.notes ? `
                <div style="margin-top:6px;font-size:11px;color:#333;font-style:italic">
                  "${safeHTML(t.notes)}"
                </div>
              ` : ''}
            </div>
          ` : ''}

          <div class="taskfoot">
            <span class="taskfoot-status">
              ${t.status === 'done' ? '✓ COMPLETED' : t.status === 'doing' ? '↗ IN ACTION' : '＋ OPEN JOB'}
            </span>
            <div class="task-actions">
              <button class="taskbtn submit" data-act="submit-task" data-id="${t.id}" title="Kumpulkan hasil / update status">
                <i data-lucide="upload-cloud" style="width:13px;height:13px"></i> KUMPULKAN
              </button>

              ${t.status === 'open' ? `
                <button class="taskbtn claim" data-act="take" data-id="${t.id}">
                  <i data-lucide="hand" style="width:12px;height:12px"></i> KLAIM
                </button>
              ` : t.status === 'doing' ? `
                <button class="taskbtn" data-act="mark-done" data-id="${t.id}" title="Tandai selesai">
                  <i data-lucide="check" style="width:12px;height:12px"></i> DONE ✓
                </button>
                <button class="taskbtn" data-act="cancel-claim" data-id="${t.id}" title="Batalkan klaim tugas ini (kembali ke Available)" style="background:#fff2f2;color:#b91c1c;border-color:#b91c1c">
                  <i data-lucide="x-circle" style="width:12px;height:12px"></i> BATAL KLAIM
                </button>
              ` : `
                <button class="taskbtn" data-act="reopen" data-id="${t.id}">
                  <i data-lucide="rotate-ccw" style="width:12px;height:12px"></i> RE-OPEN
                </button>
              `}

              ${isReihan() ? `
                <button class="taskbtn" data-act="edit" data-id="${t.id}" title="Edit Jobdesk (Reihan)">
                  <i data-lucide="edit-2" style="width:12px;height:12px"></i> EDIT
                </button>
              ` : `
                <button class="taskbtn" data-act="edit" data-id="${t.id}" title="Hanya Reihan yang berwenang mengedit jobdesk" style="color:#666">
                  <i data-lucide="lock" style="width:12px;height:12px"></i> EDIT
                </button>
              `}
            </div>
          </div>
        </article>
      `;
    }).join('');

    refreshIcons();
  }

  function render() {
    renderStats();
    renderTasks();
  }

  // ----------------------------------------------------
  // SUBMISSION MODAL
  // ----------------------------------------------------
  function populateTaskSelect(selectedTaskId = null, filterOwner = null) {
    const sel = $('sub-task-select');
    sel.innerHTML = '<option value="">-- Pilih Jobdesk yang Dikumpulkan --</option>';

    tasks.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = `[${t.owner}] #${t.id} - ${t.title} (${t.status.toUpperCase()})`;
      if (selectedTaskId && Number(selectedTaskId) === t.id) {
        opt.selected = true;
      }
      sel.appendChild(opt);
    });
  }

  function openSubmitModal(taskId = null) {
    const task = taskId ? tasks.find(t => t.id === Number(taskId)) : null;

    if (currentUser) {
      $('sub-owner').value = currentUser;
    } else if (task && task.owner) {
      $('sub-owner').value = task.owner;
    } else {
      $('sub-owner').value = '';
    }

    populateTaskSelect(task ? task.id : null, $('sub-owner').value);

    if (task) {
      $('sub-link').value = task.submissionLink || '';
      $('sub-notes').value = task.notes || '';
      $('sub-status').value = task.status === 'done' ? 'done' : 'doing';
      if (task.fileMeta) {
        $('file-name-display').textContent = `${task.fileMeta.name} (${task.fileMeta.size})`;
        $('file-preview-wrap').style.display = 'block';
      } else {
        $('file-preview-wrap').style.display = 'none';
      }
    } else {
      $('sub-link').value = '';
      $('sub-notes').value = '';
      $('sub-status').value = 'done';
      $('file-preview-wrap').style.display = 'none';
    }

    stagedFile = null;
    $('modal-submit-wrap').classList.add('show');
    refreshIcons();
  }

  function closeSubmitModal() {
    $('modal-submit-wrap').classList.remove('show');
    stagedFile = null;
  }

  function isReihan() {
    return currentUser && currentUser.toLowerCase() === 'reihan';
  }

  // ----------------------------------------------------
  // TASK EDITOR MODAL (Khusus Reihan)
  // ----------------------------------------------------
  function openTaskEditor(task = null) {
    if (!isReihan()) {
      alert('Akses Dibatasi: Hanya Reihan (Lead) yang memiliki izin untuk menambah atau mengedit jobdesk!');
      return;
    }

    editTaskId = task ? task.id : null;
    $('task-modal-eyebrow').textContent = task ? `EDIT TASK / #${String(task.id).padStart(3, '0')}` : 'TAMBAH JOBDESK BARU';
    $('task-modal-title').innerHTML = task ? 'EDIT<br>JOBDESK.' : 'TAMBAH<br>JOBDESK.';

    $('task-title').value = task ? task.title : '';
    $('task-category').value = task ? task.category : 'Visual Assets';
    $('task-owner').value = task ? task.owner : (currentUser || 'Reihan');
    $('task-desc').value = task ? task.desc : '';
    $('task-figma').value = task ? task.figmaLink : '';
    $('task-status').value = task ? task.status : 'open';

    $('modal-task-wrap').classList.add('show');
    refreshIcons();
  }

  function closeTaskEditor() {
    $('modal-task-wrap').classList.remove('show');
    editTaskId = null;
  }

  // ----------------------------------------------------
  // SUBMISSIONS ARCHIVE MODAL (Rekap Hasil & Folder Uploads)
  // ----------------------------------------------------
  async function openArchiveModal() {
    const data = await API.getSubmissions();
    const container = $('archive-content-container');
    const submissions = data && data.submissions ? data.submissions : [];

    if (!submissions.length) {
      container.innerHTML = `
        <div style="text-align:center;padding:30px;color:#666">
          <i data-lucide="archive" style="width:36px;height:36px;margin:auto;display:block;margin-bottom:8px"></i>
          <div style="font-weight:900;font-size:13px">Belum ada hasil yang dikumpulkan oleh tim.</div>
          <div style="font-size:11px;margin-top:4px">Klik tombol "KUMPULKAN HASIL TUGAS / SUBMIT" untuk mengunggah link atau file ZIP.</div>
        </div>
      `;
    } else {
      container.innerHTML = submissions.map(s => {
        const hasLink = Boolean(s.submissionLink);
        const hasFile = Boolean(s.fileMeta);
        const dlUrl = s.fileMeta ? (s.fileMeta.downloadUrl || `/api/download/${s.fileMeta.storedName}`) : '';
        return `
          <div style="border:2px solid var(--ink);padding:12px;margin-bottom:10px;background:#faf9f5">
            <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #ddd;padding-bottom:6px;margin-bottom:8px">
              <div>
                <span style="background:var(--yellow);border:1px solid #111;padding:2px 8px;font-size:11px;font-weight:900">👤 ${safeHTML(s.owner)}</span>
                <b style="margin-left:8px;font-size:13px">#${s.id} - ${safeHTML(s.title)}</b>
              </div>
              <span style="font-size:10px;font-weight:900;color:#065f46;background:#b8f5a5;border:1px solid #065f46;padding:2px 6px">TERKUMPUL ✓</span>
            </div>

            ${hasLink ? `
              <div style="margin-bottom:6px">
                <span style="font-size:11px;font-weight:900">🔗 Tautan Hasil:</span>
                <a href="${safeHTML(validURL(s.submissionLink))}" target="_blank" rel="noopener noreferrer" style="color:#047857;font-weight:900;text-decoration:underline;margin-left:4px">
                  ${safeHTML(s.submissionLink)} ↗
                </a>
              </div>
            ` : ''}

            ${hasFile ? `
              <div style="display:flex;align-items:center;justify-content:space-between;background:#fff;border:1px solid #111;padding:6px 10px;margin-bottom:6px">
                <span style="font-size:11px;font-weight:800;display:flex;align-items:center;gap:6px">
                  <i data-lucide="archive" style="width:14px;height:14px"></i>
                  📦 ${safeHTML(s.fileMeta.name)} (${safeHTML(s.fileMeta.size)})
                </span>
                <a href="${dlUrl}" download="${safeHTML(s.fileMeta.name)}" class="download-btn" style="padding:4px 10px;font-size:11px">
                  <i data-lucide="download" style="width:12px;height:12px"></i> Unduh File ZIP
                </a>
              </div>
            ` : ''}

            ${s.notes ? `
              <div style="font-size:11px;color:#444;font-style:italic;margin-top:4px">
                Catatan: "${safeHTML(s.notes)}"
              </div>
            ` : ''}
          </div>
        `;
      }).join('');
    }

    $('modal-archive-wrap').classList.add('show');
    refreshIcons();
  }

  // ----------------------------------------------------
  // EVENT LISTENERS
  // ----------------------------------------------------
  function setupEventListeners() {
    // Auth & Login
    $('btn-open-login').addEventListener('click', () => openLoginModal());
    document.querySelectorAll('.member-pill[data-user]').forEach(pill => {
      pill.addEventListener('click', () => {
        openLoginModal(pill.dataset.user);
      });
    });

    document.querySelectorAll('.member-card-opt').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.member-card-opt').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        $('login-name').value = card.dataset.name;
        $('login-password').focus();
      });
    });

    $('btn-toggle-pwd').addEventListener('click', () => {
      const inp = $('login-password');
      inp.type = inp.type === 'password' ? 'text' : 'password';
    });

    $('form-login').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = $('login-name').value.trim();
      const pwd = $('login-password').value;

      if (!name) {
        alert('Pilih nama anggota terlebih dahulu.');
        return;
      }

      const res = await API.login(name, pwd);
      if (res && res.success) {
        currentUser = res.user || name;
        localStorage.setItem('rrby_outbreak_current_user', currentUser);
        closeLoginModal();
        updateAuthUI();
        render();
        showToast(`Berhasil login sebagai ${currentUser}! ⚡`);
      } else {
        alert(res.message || 'Password salah!');
        $('login-password').value = '';
        $('login-password').focus();
      }
    });

    $('btn-logout').addEventListener('click', () => {
      currentUser = null;
      localStorage.removeItem('rrby_outbreak_current_user');
      updateAuthUI();
      render();
      showToast('Kamu telah logout.');
    });

    $('btn-my-tasks').addEventListener('click', () => {
      if (!currentUser) return;
      activeMemberFilter = currentUser;
      document.querySelectorAll('#member-filters .filter').forEach(f => {
        f.classList.toggle('active', f.dataset.member === currentUser);
      });
      render();
      showToast(`Menampilkan tugas milik ${currentUser} ⭐`);
    });

    // Submissions
    $('btn-main-submit').addEventListener('click', () => openSubmitModal());
    $('btn-cancel-submit').addEventListener('click', closeSubmitModal);
    $('btn-cancel-login').addEventListener('click', closeLoginModal);
    $('btn-cancel-task').addEventListener('click', closeTaskEditor);

    // Dropzone
    const dropzone = $('dropzone');
    const fileInput = $('file-input');

    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        stageFile(e.dataTransfer.files[0]);
      }
    });
    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        stageFile(fileInput.files[0]);
      }
    });

    function stageFile(file) {
      stagedFile = file;
      $('file-name-display').textContent = `${file.name} (${formatBytes(file.size)})`;
      $('file-preview-wrap').style.display = 'block';
      showToast(`File ${file.name} siap dikirim! 📦`);
    }

    $('btn-remove-file').addEventListener('click', () => {
      stagedFile = null;
      fileInput.value = '';
      $('file-preview-wrap').style.display = 'none';
    });

    // Submit Form
    $('form-submit').addEventListener('submit', async (e) => {
      e.preventDefault();
      const owner = $('sub-owner').value;
      const taskId = Number($('sub-task-select').value);
      const link = $('sub-link').value.trim();
      const notes = $('sub-notes').value.trim();
      const status = $('sub-status').value;

      if (!owner || !taskId) {
        alert('Mohon pilih nama dan tugas yang dikumpulkan.');
        return;
      }
      if (link && !validURL(link)) {
        alert('Masukkan link valid dengan https://');
        return;
      }

      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      const formData = new FormData();
      formData.append('owner', owner);
      formData.append('link', link);
      formData.append('notes', notes);
      formData.append('status', status);
      if (stagedFile) {
        formData.append('file', stagedFile);
      }

      const res = await API.submitWork(taskId, formData);
      if (res && res.success && res.task) {
        Object.assign(task, res.task);
      } else {
        task.owner = owner;
        task.submissionLink = link;
        task.notes = notes;
        task.status = status;
        if (stagedFile) {
          task.fileMeta = {
            name: stagedFile.name,
            size: formatBytes(stagedFile.size),
            uploadedAt: new Date().toLocaleString('id-ID')
          };
        }
      }

      saveLocalBackup();
      closeSubmitModal();
      render();
      showToast(`Hasil tugas #${taskId} berhasil dikumpulkan! 🚀`);
    });

    // Task Editor
    $('btn-add-custom-task').addEventListener('click', () => openTaskEditor(null));

    $('form-task').addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = $('task-title').value.trim();
      const category = $('task-category').value;
      const owner = $('task-owner').value;
      const desc = $('task-desc').value.trim();
      const figmaLink = $('task-figma').value.trim();
      const status = $('task-status').value;

      if (!title) return;
      if (figmaLink && !validURL(figmaLink)) {
        alert('Link Figma harus berupa URL valid dengan https://');
        return;
      }

      const taskData = { title, category, owner, desc, figmaLink, status };
      const res = await API.saveTask(taskData, editTaskId, currentUser);

      if (res && res.success) {
        if (editTaskId) {
          const t = tasks.find(x => x.id === editTaskId);
          if (t) Object.assign(t, taskData);
          showToast(`Jobdesk #${editTaskId} berhasil diupdate!`);
        } else {
          const newT = res.task || { id: Math.max(0, ...tasks.map(x => x.id)) + 1, ...taskData };
          tasks.push(newT);
          showToast(`Jobdesk baru berhasil ditambahkan!`);
        }
      } else {
        alert((res && res.message) || 'Akses ditolak: Hanya Reihan yang berwenang!');
        return;
      }

      saveLocalBackup();
      closeTaskEditor();
      render();
    });

    // Guidelines Modal
    $('btn-open-guidelines').addEventListener('click', () => {
      $('modal-guidelines-wrap').classList.add('show');
      refreshIcons();
    });
    $('btn-close-guidelines').addEventListener('click', () => $('modal-guidelines-wrap').classList.remove('show'));

    // Archive Modal (Rekap Hasil & Folder Uploads)
    $('btn-open-archive').addEventListener('click', openArchiveModal);
    $('btn-close-archive').addEventListener('click', () => $('modal-archive-wrap').classList.remove('show'));

    // Reset Data (Khusus Reihan)
    $('btn-reset-data').addEventListener('click', async () => {
      if (!isReihan()) {
        alert('Akses Dibatasi: Hanya Reihan (Project Lead) yang memiliki izin untuk mereset seluruh data tugas!');
        return;
      }
      if (confirm('PERINGATAN: Apakah kamu yakin ingin mereset seluruh data kembali ke daftar revisi awal Word dosen?\nSeluruh progres, status klaim, dan hasil terkumpul akan dikembalikan ke kondisi awal.')) {
        const res = await API.resetTasks(currentUser);
        if (res && res.success) {
          if (res.tasks) {
            tasks = res.tasks;
          } else {
            localStorage.removeItem('rrby_outbreak_tasks_v2');
            await loadTasks();
          }
          saveLocalBackup();
          render();
          showToast('Data berhasil direset ke revisi awal Word oleh Reihan.', '🔄');
        } else {
          alert((res && res.message) || 'Gagal mereset data.');
        }
      }
    });

    // Dismiss on background click
    ['modal-submit-wrap', 'modal-login-wrap', 'modal-guidelines-wrap', 'modal-task-wrap', 'modal-archive-wrap'].forEach(id => {
      $(id).addEventListener('click', (e) => {
        if (e.target === $(id)) $(id).classList.remove('show');
      });
    });

    // Filters: Status
    $('status-filters').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-status]');
      if (!btn) return;
      activeStatusFilter = btn.dataset.status;
      document.querySelectorAll('#status-filters .filter').forEach(f => f.classList.toggle('active', f === btn));
      render();
    });

    // Filters: Member
    $('member-filters').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-member]');
      if (!btn) return;
      activeMemberFilter = btn.dataset.member;
      document.querySelectorAll('#member-filters .filter').forEach(f => f.classList.toggle('active', f === btn));
      render();
    });

    // Search query
    $('search-input').addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      render();
    });

    // Task Card Actions
    $('tasks').addEventListener('click', async (e) => {
      const btn = e.target.closest('[data-act]');
      if (!btn) return;
      const act = btn.dataset.act;
      const taskId = Number(btn.dataset.id);
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      if (act === 'submit-task') {
        openSubmitModal(taskId);
        return;
      }

      if (act === 'edit') {
        if (!isReihan()) {
          alert('Akses Dibatasi: Hanya Reihan (Lead) yang memiliki izin untuk mengedit rincian jobdesk!');
          return;
        }
        openTaskEditor(task);
        return;
      }

      if (act === 'take') {
        if (!currentUser) {
          const want = confirm('Silakan login terlebih dahulu untuk klaim tugas ini. Buka dialog login?');
          if (want) openLoginModal(task.owner || '');
          return;
        }

        if (task.owner && task.owner.toLowerCase() !== currentUser.toLowerCase()) {
          const proceed = confirm(`Perhatian: Tugas #${task.id} ini dialokasikan untuk ${task.owner}.\nApakah kamu (${currentUser}) yakin ingin mengklaim tugas milik ${task.owner}?`);
          if (!proceed) return;
        }

        await API.claimTask(taskId, currentUser);
        task.status = 'doing';
        saveLocalBackup();
        render();
        showToast(`Tugas #${taskId} (${task.title}) berhasil diklaim! ⚡`);
        return;
      }

      if (act === 'cancel-claim') {
        const canCancel = confirm(`Batalkan klaim tugas #${taskId} (${task.title})?\nStatus tugas akan dikembalikan menjadi Available.`);
        if (!canCancel) return;

        await API.updateStatus(taskId, 'open');
        task.status = 'open';
        saveLocalBackup();
        render();
        showToast(`Klaim tugas #${taskId} dibatalkan (Available kembali).`, '↩');
        return;
      }

      if (act === 'mark-done') {
        if (!task.submissionLink && !task.fileMeta) {
          const want = confirm('Tugas ini belum memiliki tautan Drive atau file ZIP. Buka form pengumpulan sekarang?');
          if (want) {
            openSubmitModal(taskId);
            return;
          }
        }
        await API.updateStatus(taskId, 'done');
        task.status = 'done';
        saveLocalBackup();
        render();
        showToast(`Tugas #${taskId} ditandai selesai! ✓`);
        return;
      }

      if (act === 'reopen') {
        await API.updateStatus(taskId, 'doing');
        task.status = 'doing';
        saveLocalBackup();
        render();
        showToast(`Tugas #${taskId} dibuka kembali.`);
        return;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
