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

  // Penjelasan Rinci & Panduan Teknis Jobdesk (Revisi Outbreak Tim RRBY)
  const TASK_EXPLANATIONS = {
    1: {
      goal: "Merombak dan merapikan seluruh struktur wireframe & UI High-Fidelity di Figma sesuai arahan revisi asistensi dosen, memastikan layout proporsional pada resolusi 1920x1080 (16:9), typography konsisten (Inter-Black), dan teks berbahasa Inggris.",
      steps: [
        "Review menyeluruh terhadap semua frame, canvas, dan component layer di Figma Game Outbreak.",
        "Buat Layer Daily Reward: Desain kalender pop-up login 7 hari (Hari 1-6 berhadiah +100 Cash / Senjata starter, Hari 7 reward karakter eksklusif).",
        "Buat Layer Cash / Shop: UI terstruktur untuk pembelian dan topup in-game cash serta konfirmasi transaksi.",
        "Rapikan Layer Heroes & Guns: Tata ulang grid katalog pemilihan 3 hero dan 5 senjata dengan layout kartu yang bersih dan modern.",
        "Vektor Senjata: Tentukan identitas visual dan aksen warna untuk 5 tipe senjata (Revolver, SMG, Shotgun, Assault Rifle, Sniper).",
        "Ekspor aset icon & slicing UI dalam format PNG transparan untuk siap diintegrasikan Reihan ke Unity Canvas."
      ],
      specs: [
        { label: "Target Canvas", value: "1920 x 1080 px (16:9 Aspect Ratio)" },
        { label: "Tipografi", value: "Inter (Weights: Bold, Extra-Bold, Black)" },
        { label: "Bahasa UI", value: "Full English (Play, Inventory, Daily Reward, Settings)" },
        { label: "Color Palette", value: "Neo-Brutalist Dark (#0b0c10, #ff4b0b, #ffcf05, #10b981)" }
      ],
      tips: "Catatan Dosen: Perhatikan safe zone HUD in-game agar tombol pause, HP bar, dan ammo count tidak menutupi visibilitas gameplay saat wave zombie padat."
    },
    2: {
      goal: "Memproduksi dan menggantikan seluruh placeholder SFX kode dengan audio efek orisinal/bebas lisensi berkualitas tinggi, crisp, jernih, dan selaras dengan nuansa horor-survival aksi Outbreak.",
      steps: [
        "Produksi SFX Antarmuka (UI): Sound klik tombol, popup modal, beli item di toko, klaim reward harian, dan notifikasi misi.",
        "Produksi SFX Senjata: Audio tembakan unik untuk 5 jenis senjata (Revolver: punchy, SMG: rapid firing, Shotgun: blast berat, AR: rentetan mantap, Sniper: dentuman gema) serta suara reload tiap senjata.",
        "Produksi SFX Gameplay & Pickups: Suara ambil medkit/health pack, pickup cash, empty magazine click, victory fanfare, dan defeat/game over.",
        "Produksi BGM: Musik tema menu utama yang mencekam, musik gameplay ambient survival, dan musik tegang bertempo tinggi untuk misi puncak.",
        "Kolaborasi dengan Royan untuk pengolahan voice hero hurt/death dan suara monster zombie.",
        "Normalisasi audio: Export WAV/OGG dengan master gain terkalibrasi (SFX peak di 0.95, BGM di 0.75)."
      ],
      specs: [
        { label: "Format Master", value: "WAV (24-bit, 44.1 kHz) & OGG Vorbis" },
        { label: "Lisensi", value: "Royalty-Free Commercial / CC0 (Wajib Bebas Hak Cipta)" },
        { label: "Target Gain", value: "Master SFX: 0.95 | BGM: 0.75" },
        { label: "Durasi SFX UI", value: "0.15s – 0.5s (Reaktif tanpa jeda hening)" }
      ],
      tips: "Hindari audio dengan noise desis di background. Uji hasil dengar pada speaker laptop dan headphone untuk memastikan bass tidak pecah (no clipping)."
    },
    3: {
      goal: "Menyediakan 3 hero playable (Alek, Erika, Hank) dengan sprite sheet bersih tanpa noda/pixel noise, memiliki 6 state animasi lengkap dengan style proporsi seragam.",
      steps: [
        "Pembersihan Alek: Bersihkan artefak noda/pixel kotor pada sprite Alek karakter pertama.",
        "Desain Erika: Karakter perempuan survivalist lincah dengan perlengkapan taktis.",
        "Desain Hank: Karakter pria kekar berotot dengan rompi pelindung spesialis senjata berat.",
        "Gambar 6 State Animasi untuk tiap hero: Idle, Walk, Run, Attack/Shoot, Hurt, dan Dead.",
        "Standarisasi proporsi dan palet warna agar selaras dengan style art di Figma.",
        "Ekspor sprite sequence frame PNG transparan dengan pivot point konsisten di telapak kaki (Bottom-Center)."
      ],
      specs: [
        { label: "Format", value: "PNG 32-bit RGBA Transparan" },
        { label: "Jumlah Hero", value: "3 Karakter (Alek, Erika, Hank)" },
        { label: "State Animasi", value: "6 State per hero (Total 18 set animasi)" },
        { label: "Pivot Point", value: "Bottom-Center (Telapak Kaki)" }
      ],
      tips: "Pastikan tinggi badan Erika, Alek, dan Hank proporsional saat disejajarkan agar tidak terlihat aneh saat di-render berdampingan di Unity."
    },
    4: {
      goal: "Menggambar 4 background arena gameplay baru untuk melengkapi 5 level misi berjenjang (Easy s/d Nightmare) dengan kesinambungan tema apokaliptik perkotaan.",
      steps: [
        "Analisis background pertama di Figma (Misi 1: Easy - Area Perkotaan Reruntuhan) sebagai acuan tone dan lighting.",
        "Gambar Background Misi 2 (Medium): Area Pinggiran Kota / Pom Bensin Terbengkalai.",
        "Gambar Background Misi 3 (Hard): Area Rumah Sakit / Laboratorium Karantina Terinfeksi.",
        "Gambar Background Misi 4 (Insane): Terowongan Kereta Bawah Tanah Gelap & Berasap.",
        "Gambar Background Misi 5 (Nightmare): Episentrum Wabah / Fasilitas Militer Rusak Total.",
        "Pisahkan elemen layer latar jika diperlukan efek 2D parallax di Unity."
      ],
      specs: [
        { label: "Resolusi Wajib", value: "1920 x 1080 px (16:9 Aspect Ratio)" },
        { label: "Format", value: "PNG Tanpa Kompresi Rusak (sRGB)" },
        { label: "Jumlah Area", value: "5 Level Misi Berjenjang" },
        { label: "Kontras Visual", value: "Dark Atmospheric (Hero & Zombie tetap terbaca jelas)" }
      ],
      tips: "Jangan menggambar objek terlalu terang di bagian tengah arena bermain agar karakter pemain dan gerombolan zombie tidak tersamarkan."
    },
    5: {
      goal: "Merekam dan mengolah sulih suara ekspresif untuk 3 karakter hero dan kawanan monster zombie guna menghadirkan atmosfer survival yang imersif dan menegangkan.",
      steps: [
        "Rekaman Hero Voice Hurt: Buat variasi rintihan kena serang untuk Alek, Erika, dan Hank.",
        "Rekaman Hero Voice Dead: Suara jeritan terakhir saat gugur yang berbeda karakter tiap hero.",
        "Rekaman Zombie Voice: Erangan idle/patroli, jeritan buas mendeteksi pemain, suara cakar/gigit, dan rintihan roboh.",
        "Sound Processing Zombie Khusus: Gunakan pitch shifter & distortion reverb untuk suara Tank Zombie dan Boss Nightmare agar berbobot berat dan mengerikan.",
        "Pembersihan sinyal rekaman: Lakukan noise gate & reduction untuk menghilangkan desah nafas dan ambient kamar.",
        "Ekspor file WAV/OGG siap pakai dan bagikan ke Reihan & Bintang."
      ],
      specs: [
        { label: "Format", value: "WAV 24-bit / 44.1 kHz & OGG Vorbis" },
        { label: "Peak Level", value: "-2.0 dB (Maksimal, bebas clipping)" },
        { label: "Variasi Take", value: "Minimal 2-3 take per state (Mencegah kebosanan)" },
        { label: "Karakter Suara", value: "3 Hero Unik + Geraman Buas Kawanan Zombie" }
      ],
      tips: "Lakukan take di ruangan hening berkarpet/kasur untuk meredam pantulan gema (flutter echo). Koordinasikan dengan Bintang untuk penyelarasan tone."
    },
    6: {
      goal: "Mengembangkan 6 varian zombie lengkap (1 zombie acuan + 5 varian baru) dengan animasi lengkap 6 state per varian, sesuai pedoman visual zombie pertama di Figma.",
      steps: [
        "Review zombie pertama di Figma sebagai acuan bentuk dasar dan siluet visual (Normal Walker).",
        "Desain Varian 2 & 3: Zombie Sipil Terinfeksi & Zombie Ramping Merayap.",
        "Desain Varian 4 (Fast Runner): Zombie kurus dengan postur condong ke depan, agresif dan sangat cepat.",
        "Desain Varian 5 (Tank Zombie): Monster kekar berotot mutasi masif dengan pertahanan tebal.",
        "Desain Varian 6 (Boss Nightmare): Mutasi puncak dengan siluet menakutkan dan senjata organik.",
        "Gambar 6 State Animasi untuk seluruh 6 varian: Idle, Walk, Run, Attack, Hurt, Dead.",
        "Ekspor ke format PNG transparan dengan resolusi grid dan pivot seragam."
      ],
      specs: [
        { label: "Format", value: "PNG 32-bit RGBA Transparan" },
        { label: "Total Varian", value: "6 Varian Zombie Lengkap" },
        { label: "State Animasi", value: "6 State per varian (Total 36 set animasi)" },
        { label: "Pivot Point", value: "Bottom-Center (Telapak Kaki)" }
      ],
      tips: "Pastikan siluet tiap varian langsung dapat dibedakan pemain hanya dalam sepersekian detik (misal Tank berpostur lebar, Runner condong ke depan)."
    },
    7: {
      goal: "Menyatukan seluruh aset grafis tim (3 Hero, 6 Varian Zombie, 5 Background Misi, dan Icon UI) ke dalam project Unity 6 secara rapi, optimal, dan siap digerakkan.",
      steps: [
        "Strukturisasi Folder: Susun direktori `Assets/Sprites/` (`Heroes/`, `Zombies/`, `Environments/`, `UI/`).",
        "Konfigurasi Import Texture: Set ke `Sprite (2D and UI)`, standarisasi Pixels Per Unit (PPU 100), filter mode, dan format kompresi.",
        "Sprite Editor & Pivot: Slice sprite sheet dengan rapi dan tetapkan pivot konsisten di Bottom-Center untuk seluruh karakter.",
        "Buat Sprite Atlas: Satukan sprite ke dalam Sprite Atlas Unity untuk meminimalkan draw call GPU.",
        "Setup Animation Clip: Susun urutan frame untuk tiap state (Idle, Walk, Run, Attack, Hurt, Dead).",
        "Rangkai Animator Controller: Konfigurasi Transition, Has Exit Time, Blend Tree, dan parameter trigger yang sinkron dengan Controller script."
      ],
      specs: [
        { label: "Engine", value: "Unity 6 (6000.x) 2D URP" },
        { label: "Pixels Per Unit", value: "100 PPU (Seragam seluruh sprite)" },
        { label: "Optimasi", value: "Sprite Atlas Unity (Minimalisir Draw Calls)" },
        { label: "Animator Controller", value: "Blend Trees & State Transitions" }
      ],
      tips: "Pastikan centang 'Generate Physics Shape' dicek agar polygon collider otomatis mengikuti bentuk sprite jika menggunakan 2D Collider."
    },
    8: {
      goal: "Mengintegrasikan seluruh efek audio (SFX UI, tembakan senjata, reload, hurt, dead, zombie roar, dan BGM) ke dalam sistem AudioManager terpusat di Unity 6.",
      steps: [
        "Import audio ke `Assets/Audio/` (`SFX/`, `Voice/`, `BGM/`).",
        "Setup Unity Audio Mixer: Buat hierarki grup Master -> BGM & SFX.",
        "Implementasikan Object Pool untuk AudioSource agar tembakan senjata otomatis beruntun tidak memotong sound effect sebelumnya.",
        "Hubungkan Event Game ke AudioManager: OnShoot, OnReload, OnHurt, OnZombieRoar, OnButtonClick.",
        "Konfigurasi Volume Balance: Standar SFX pada 0.95 dan BGM pada 0.75 sesuai instruksi dosen.",
        "Tambahkan fungsi Volume Slider & Mute Audio yang tersimpan di PlayerPrefs."
      ],
      specs: [
        { label: "Audio System", value: "Unity AudioMixer & Scriptable AudioManager" },
        { label: "Audio Loading", value: "Decompress On Load (SFX), Streaming (BGM)" },
        { label: "Default Balance", value: "Master SFX: 0.95 | Master BGM: 0.75" },
        { label: "Performance", value: "AudioSource Object Pooling (Anti-Lag)" }
      ],
      tips: "Pastikan trek BGM di-set looping seamless di Unity Inspector tanpa ada jeda sepersekian detik di awal/akhir audio clip."
    },
    9: {
      goal: "Mengimplementasikan seluruh desain antarmuka revisi Figma ke dalam Canvas Unity (UGUI), memastikan layout responsif pada rasio 16:9 dan terhubung dengan data game.",
      steps: [
        "Konfigurasi Canvas Scaler: Mode `Scale With Screen Size`, Reference Resolution `1920 x 1080`, Match 0.5 (Width/Height).",
        "Implementasi UI Daily Reward: Grid kalender 7 hari, tracking hari aktif, tombol klaim, dan penyimpanan state ke PlayerPrefs/SaveData.",
        "Implementasi UI Topup Cash: Tampilan paket cash, balance counter, dan feedback pop-up pembelian.",
        "Implementasi Katalog Heroes & Guns: Kartu pilihan hero dan senjata lengkap dengan indikator status (Damage, Fire Rate, Ammo).",
        "Pasang HUD In-Game: Bar HP, icon senjata aktif, sisa peluru (Ammo Count), indikator wave, dan tombol jeda.",
        "Pastikan seluruh teks antarmuka menggunakan TextMeshPro dengan font Inter dan berbahasa Inggris."
      ],
      specs: [
        { label: "Canvas Resolution", value: "1920 x 1080 px (16:9 Aspect Ratio)" },
        { label: "UI System", value: "Unity UGUI & TextMeshPro" },
        { label: "Anchoring", value: "Corner & Stretch Anchors (Bebas Distorsi Layar)" },
        { label: "Teks UI", value: "Full English Language" }
      ],
      tips: "Gunakan 9-slicing pada border panel UI agar sudut Neo-Brutalist tetap tajam saat panel memanjang atau menyesuaikan konten teks."
    }
  };

  // State - Preloaded with DEFAULT_TASKS so UI renders immediately in 0ms!
  let tasks = JSON.parse(JSON.stringify(DEFAULT_TASKS));
  try {
    const local = localStorage.getItem('rrby_outbreak_tasks_v2');
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length) tasks = parsed;
    }
  } catch (e) {}

  const MEMBER_INFO = {
    Reihan: {
      role: "Lead & Unity Developer",
      icon: "laptop",
      color: "#ff4b0b",
      tagline: "Arsitek sistem game Unity 6, AudioManager, logic gameplay, dan integrasi aset tim."
    },
    Bintang: {
      role: "UI Designer & SFX Audio",
      icon: "palette",
      color: "#ffcf05",
      tagline: "Perancang UI Figma (1920x1080 16:9), layer daily/cash/senjata, dan SFX audio."
    },
    Royan: {
      role: "Character, BG & Voice Artist",
      icon: "shield",
      color: "#3b82f6",
      tagline: "Illustrator 3 hero (Alek, Erika, Hank), background 5 misi berjenjang, dan pengisi suara."
    },
    Eby: {
      role: "Zombie Artist & Animator",
      icon: "skull",
      color: "#10b981",
      tagline: "Spesialis pembuat 6 varian zombie Outbreak lengkap dengan 6 state animasi format PNG."
    }
  };

  let currentUser = localStorage.getItem('rrby_outbreak_current_user') || null;
  let activeStatusFilter = 'all';
  let activeMemberFilter = 'all';
  let searchQuery = '';
  let stagedFile = null;
  let editTaskId = null;
  let progressUpdates = [];
  let currentProfileTab = 'feed';
  let stagedProgressImg = null;

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
    setupEventListeners();
    updateAuthUI();
    render(); // Immediate synchronous render! All 9 tasks display right away without waiting!

    // Load progress updates
    loadProgressUpdates();

    // Connect to Firebase in the background
    await syncWithCloud();
    startLiveSync();
  }

  async function syncWithCloud() {
    updateSyncUI('loading');
    const cloudTasks = await API.getTasks();
    if (cloudTasks && cloudTasks.length) {
      tasks = cloudTasks;
      saveLocalBackup();
      render();
    } else {
      // If cloud is somehow empty, seed DEFAULT_TASKS
      await API.saveAllTasks(DEFAULT_TASKS);
    }
    await loadProgressUpdates();
    updateSyncUI();
  }

  function saveLocalBackup() {
    localStorage.setItem('rrby_outbreak_tasks_v2', JSON.stringify(tasks));
  }

  // ----------------------------------------------------
  // SERVER SYNC & REALTIME COLLABORATION (FIREBASE CLOUD)
  // ----------------------------------------------------
  function updateSyncUI(status) {
    const btn = $('btn-sync-status');
    const dot = $('sync-dot');
    const text = $('sync-status-text');
    if (!btn || !text) return;

    if (status === 'loading') {
      btn.className = 'sync-status-badge offline';
      text.textContent = 'Syncing...';
      if (dot) dot.style.background = '#eab308';
      return;
    }

    if (API.isCloudConnected || API.isServerAvailable) {
      btn.className = 'sync-status-badge online';
      text.textContent = 'Live Sync';
      if (dot) dot.style.background = '#22c55e';
    } else {
      btn.className = 'sync-status-badge offline';
      text.textContent = 'Offline';
      if (dot) dot.style.background = '#eab308';
    }
  }

  function openSyncModal() {
    const isOnline = API.isCloudConnected || API.isServerAvailable;
    const dot = $('sync-modal-dot');
    const txt = $('sync-modal-status-text');
    const detail = $('sync-modal-detail');

    if (dot) dot.style.background = isOnline ? '#22c55e' : '#eab308';
    if (txt) {
      txt.textContent = isOnline 
        ? 'Terhubung ke Google Firebase Cloud (Realtime Live Sync 24 Jam) 🟢' 
        : 'Mode Offline / Memeriksa Koneksi Cloud 🟡';
      txt.style.color = isOnline ? '#15803d' : '#854d0e';
    }
    if (detail) {
      if (isOnline) {
        detail.innerHTML = `✅ <b>Koneksi Cloud Aktif!</b> Seluruh 4 anggota tim (Reihan, Bintang, Royan, Eby) kini terhubung ke satu database Google Firebase yang sama.<br><br>Setiap kali ada yang mengklaim tugas atau mengumpulkan link/file, datanya langsung terupdate otomatis di layar semua orang tanpa perlu me-refresh halaman!`;
      } else {
        detail.innerHTML = `⚠️ Sedang menyambungkan ke Google Firebase Cloud...`;
      }
    }

    $('modal-sync-wrap').classList.add('show');
    refreshIcons();
  }

  function closeSyncModal() {
    $('modal-sync-wrap').classList.remove('show');
  }

  let syncPollingInterval = null;
  function startLiveSync() {
    // 1. Instant Realtime WebSocket / EventSource Listener via Firebase
    API.setupRealtimeListener(
      (remoteTasks) => {
        if (remoteTasks && remoteTasks.length) {
          tasks = remoteTasks;
          saveLocalBackup();
          render();
          console.log('⚡ Realtime WebSocket update received from Firebase!');
        }
      },
      (remoteUpdates) => {
        if (remoteUpdates) {
          progressUpdates = remoteUpdates;
          updateFeedBadge();
          if ($('view-profile-container') && $('view-profile-container').style.display !== 'none') {
            renderMemberProfile(activeProfileMember);
          }
          console.log('📸 Realtime progress update received from Firebase!');
        }
      }
    );

    // 2. Fallback periodic polling every 4 seconds
    let pollCount = 0;
    if (syncPollingInterval) clearInterval(syncPollingInterval);
    syncPollingInterval = setInterval(async () => {
      pollCount++;
      if (API.isServerAvailable || API.isCloudConnected) {
        const remoteTasks = await API.getTasks();
        if (remoteTasks && remoteTasks.length) {
          const currentSig = JSON.stringify(tasks.map(t => [t.id, t.status, t.owner, t.submissionLink, t.fileMeta ? t.fileMeta.name : '']));
          const remoteSig = JSON.stringify(remoteTasks.map(t => [t.id, t.status, t.owner, t.submissionLink, t.fileMeta ? t.fileMeta.name : '']));
          if (currentSig !== remoteSig) {
            tasks = remoteTasks;
            saveLocalBackup();
            render();
            if ($('view-profile-container') && $('view-profile-container').style.display !== 'none') {
              renderMemberProfile(activeProfileMember);
            }
            console.log('🔄 Data tugas tim diperbarui secara realtime dari Firebase.');
          }
        }

        // Poll progress updates every 8 seconds (every 2 cycles)
        if (pollCount % 2 === 0) {
          const latestProgs = await API.getProgressUpdates();
          if (latestProgs && latestProgs.length !== progressUpdates.length) {
            progressUpdates = latestProgs;
            updateFeedBadge();
            if ($('view-profile-container') && $('view-profile-container').style.display !== 'none') {
              renderMemberProfile(activeProfileMember);
            }
          }
        }
      }
    }, 4000);
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
      document.querySelectorAll('#auth-logged-out .member-pill').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.user && btn.dataset.user.toLowerCase() === currentUser.toLowerCase());
      });

      // Sinkronkan status aktif tombol navigasi Profil Saya vs Tugas Saya
      const profileContainer = $('view-profile-container');
      const isProfileOpen = profileContainer && profileContainer.style.display !== 'none';
      if (isProfileOpen && activeProfileMember && activeProfileMember.toLowerCase() === currentUser.toLowerCase()) {
        updateNavButtons('profile');
      } else if (!isProfileOpen && activeMemberFilter && activeMemberFilter.toLowerCase() === currentUser.toLowerCase()) {
        updateNavButtons('my-tasks');
      } else {
        updateNavButtons('none');
      }
    } else {
      $('auth-logged-out').style.display = 'flex';
      $('auth-logged-in').style.display = 'none';
      document.querySelectorAll('#auth-logged-out .member-pill').forEach(btn => btn.classList.remove('active'));
      updateNavButtons('none');
    }
  }

  function updateNavButtons(activeState) {
    const profileBtn = $('btn-open-my-profile');
    const myTasksBtn = $('btn-my-tasks');
    if (profileBtn) {
      profileBtn.classList.toggle('active', activeState === 'profile');
    }
    if (myTasksBtn) {
      myTasksBtn.classList.toggle('active', activeState === 'my-tasks');
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
      const statusIcon = t.status === 'done' ? 'check-circle-2' : t.status === 'doing' ? 'flame' : 'sparkles';
      const statusLabel = t.status === 'done' ? 'DONE' : t.status === 'doing' ? 'IN PROGRESS' : 'AVAILABLE';
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
        <article class="task ${isMine ? 'is-mine' : ''}" data-id="${t.id}" title="Klik kartu untuk melihat rincian &amp; panduan pengerjaan jobdesk">
          <div class="taskhead">
            <span class="id-badge">TASK / ${String(t.id).padStart(3, '0')}</span>
            <span class="category-badge">${safeHTML(t.category || 'Jobdesk')}</span>
            <span class="status ${statusClass}">
              <i data-lucide="${statusIcon}" style="width:12px;height:12px"></i>
              ${statusLabel}
            </span>
          </div>

          <h3>${safeHTML(t.title)}</h3>

          <div class="owner-tag ${!t.owner ? 'unclaimed' : 'clickable'}" ${t.owner ? `data-view-profile="${safeHTML(t.owner)}" title="Klik untuk cek profil &amp; preview progres ${safeHTML(t.owner)}"` : ''}>
            <i data-lucide="${t.owner ? 'user-check' : 'user-x'}" style="width:13px;height:13px"></i>
            <span>${t.owner ? safeHTML(t.owner.toUpperCase()) : 'TERSEDIA (OPEN)'}</span>
            ${isMine ? '<span class="tag-mine"><i data-lucide="star" style="width:10px;height:10px"></i> TUGAS KAMU</span>' : ''}
            ${t.owner ? '<span class="owner-tag-link"><i data-lucide="arrow-up-right" style="width:10px;height:10px"></i> Profil</span>' : ''}
          </div>

          <div class="desc">${safeHTML(t.desc || 'Tidak ada deskripsi.')}</div>

          <!-- PANDUAN LENGKAP BUTTON BAR -->
          <div class="card-detail-bar" data-act="view-detail" data-id="${t.id}" title="Klik untuk panduan &amp; checklist teknis jobdesk ini">
            <span style="display:flex;align-items:center;gap:6px">
              <i data-lucide="book-open" style="width:14px;height:14px;color:var(--orange)"></i>
              <span>Panduan &amp; Rincian Pengerjaan</span>
            </span>
            <span style="display:flex;align-items:center;gap:2px;font-size:10px;color:#555">
              Detail <i data-lucide="chevron-right" style="width:13px;height:13px"></i>
            </span>
          </div>

          ${t.figmaLink ? `
            <a href="${safeHTML(validURL(t.figmaLink))}" target="_blank" rel="noopener noreferrer" class="figma-link-btn">
              <i data-lucide="palette" style="width:13px;height:13px"></i>
              <span>Buka Acuan Figma ↗</span>
            </a>
          ` : ''}

          ${hasSubmission && (isMine || (currentUser && isReihan())) ? `
            <div class="submission-box">
              <div class="submission-title">
                <span style="display:flex;align-items:center;gap:4px">
                  <i data-lucide="check-check" style="width:12px;height:12px"></i> HASIL TERKUMPUL (VERIFIKASI MEMBER)
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
              ${t.status === 'done' 
                ? '<span style="display:inline-flex;align-items:center;gap:4px;color:#065f46;font-weight:900"><i data-lucide="check-check" style="width:13px;height:13px"></i> SELESAI</span>' 
                : t.status === 'doing' 
                ? '<span style="display:inline-flex;align-items:center;gap:4px;color:#b45309;font-weight:900"><i data-lucide="zap" style="width:13px;height:13px"></i> PROGRES AKTIF</span>' 
                : '<span style="display:inline-flex;align-items:center;gap:4px;color:#6b7280;font-weight:900"><i data-lucide="circle-dot" style="width:13px;height:13px"></i> BELUM DIAMBIL</span>'}
            </span>
            <div class="task-actions">
              <button class="taskbtn submit" data-act="submit-task" data-id="${t.id}" title="Kumpulkan hasil / update status">
                <i data-lucide="upload-cloud" style="width:13px;height:13px"></i> KUMPULKAN
              </button>

              ${t.status === 'open' ? `
                <button class="taskbtn claim" data-act="take" data-id="${t.id}">
                  <i data-lucide="sparkles" style="width:12px;height:12px"></i> KLAIM
                </button>
              ` : t.status === 'doing' ? `
                <button class="taskbtn" data-act="mark-done" data-id="${t.id}" title="Tandai selesai">
                  <i data-lucide="check" style="width:12px;height:12px"></i> SELESAI
                </button>
                ${(isReihan() || (currentUser && t.owner && t.owner.toLowerCase() === currentUser.toLowerCase())) ? `
                  <button class="taskbtn" data-act="cancel-claim" data-id="${t.id}" title="${isReihan() && (!currentUser || !t.owner || t.owner.toLowerCase() !== currentUser.toLowerCase()) ? 'Batalkan klaim tugas ini (Reihan)' : 'Batalkan klaim tugas milik kamu'}" style="background:#fff2f2;color:#b91c1c;border-color:#b91c1c">
                    <i data-lucide="x" style="width:12px;height:12px"></i> BATAL KLAIM
                  </button>
                ` : `
                  <button class="taskbtn" data-act="cancel-claim" data-id="${t.id}" title="Hanya pemilik tugas (${safeHTML(t.owner || 'Member')}) atau Reihan yang dapat membatalkan klaim" style="color:#777;background:#f3f4f6">
                    <i data-lucide="lock" style="width:12px;height:12px"></i> BATAL KLAIM
                  </button>
                `}
              ` : `
                ${isReihan() ? `
                  <button class="taskbtn" data-act="reopen" data-id="${t.id}" title="Buka kembali tugas (Khusus Reihan)">
                    <i data-lucide="rotate-ccw" style="width:12px;height:12px"></i> BUKA LAGI
                  </button>
                ` : `
                  <button class="taskbtn" data-act="reopen" data-id="${t.id}" title="Hanya Reihan yang berwenang membuka kembali tugas" style="color:#777;background:#f3f4f6">
                    <i data-lucide="lock" style="width:12px;height:12px"></i> BUKA LAGI
                  </button>
                `}
              `}

              ${isReihan() ? `
                <button class="taskbtn" data-act="edit" data-id="${t.id}" title="Edit Jobdesk (Reihan)">
                  <i data-lucide="edit-2" style="width:12px;height:12px"></i> EDIT
                </button>
              ` : `
                <button class="taskbtn" data-act="edit" data-id="${t.id}" title="Hanya Reihan yang berwenang mengedit jobdesk" style="color:#777;background:#f3f4f6">
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
  // TASK DETAIL & GUIDELINES POPUP MODAL
  // ----------------------------------------------------
  function openTaskDetailModal(task) {
    if (!task) return;
    const modal = $('modal-task-detail-wrap');
    if (!modal) return;

    const exp = TASK_EXPLANATIONS[task.id] || {
      goal: task.desc || "Menyelesaikan jobdesk sesuai arahan dan revisi dosen.",
      steps: [
        "Pahami kebutuhan dan instruksi yang tertera pada deskripsi jobdesk.",
        "Kerjakan tahapan pengerjaan secara bertahap dan rapi.",
        "Komunikasikan progres secara berkala dengan tim di halaman Profil.",
        "Kumpulkan hasil akhir melalui tautan Google Drive / file ZIP."
      ],
      specs: [
        { label: "Target", value: "Revisi Game Outbreak" },
        { label: "Format", value: "Sesuai Standar Aset / Kode" }
      ],
      tips: "Pastikan selalu berkonsultasi dengan Reihan (Lead) sebelum finalisasi."
    };

    const isMine = currentUser && task.owner && task.owner.toLowerCase() === currentUser.toLowerCase();
    const isDoing = task.status === 'doing';
    const isDone = task.status === 'done';
    const isOpen = task.status === 'open';

    $('detail-modal-header-id').textContent = `TASK / #${String(task.id).padStart(3, '0')} — ${(task.category || 'JOBDESK').toUpperCase()}`;

    const statusPillClass = `status-${task.status}`;
    const statusLabel = isDone ? 'SELESAI (DONE)' : isDoing ? 'SEDANG DIKERJAKAN' : 'TERSEDIA (OPEN)';
    const statusIcon = isDone ? 'check-circle-2' : isDoing ? 'flame' : 'sparkles';

    const stepsHtml = (exp.steps || []).map((step, idx) => `
      <li class="detail-step-item">
        <span class="detail-step-num">${idx + 1}</span>
        <div>${safeHTML(step)}</div>
      </li>
    `).join('');

    const specsHtml = (exp.specs || []).map(sp => `
      <div class="detail-spec-chip">
        <span class="detail-spec-label">${safeHTML(sp.label)}</span>
        <span class="detail-spec-val">${safeHTML(sp.value)}</span>
      </div>
    `).join('');

    let submissionInfoHtml = '';
    if ((task.submissionLink || task.fileMeta) && (isMine || (currentUser && isReihan()))) {
      submissionInfoHtml = `
        <div class="detail-box" style="background:#f0fdf4;border-color:#16a34a">
          <div class="detail-box-head" style="color:#15803d;border-bottom-color:#16a34a">
            <i data-lucide="check-check" style="width:16px;height:16px"></i>
            <span>HASIL TUGAS TELAH DIKUMPULKAN (VERIFIKASI MEMBER)</span>
          </div>
          ${task.submissionLink ? `
            <div style="margin-bottom:8px">
              <span style="font-weight:900;font-size:12px">Link Hasil:</span>
              <a href="${safeHTML(validURL(task.submissionLink))}" target="_blank" rel="noopener noreferrer" style="color:#047857;font-weight:900;text-decoration:underline;margin-left:4px">
                ${safeHTML(task.submissionLink)} ↗
              </a>
            </div>
          ` : ''}
          ${task.fileMeta ? `
            <div style="display:flex;align-items:center;justify-content:space-between;background:#fff;border:1.5px solid #16a34a;padding:8px 12px;margin-top:6px;gap:8px;flex-wrap:wrap">
              <span style="font-size:12px;font-weight:800;color:#166534;display:flex;align-items:center;gap:6px">
                <i data-lucide="archive" style="width:14px;height:14px"></i>
                Lampiran File: ${safeHTML(task.fileMeta.name)} (${safeHTML(task.fileMeta.size)})
              </span>
              ${task.fileMeta.downloadUrl ? `
                <a href="${safeHTML(task.fileMeta.downloadUrl)}" target="_blank" download="${safeHTML(task.fileMeta.name)}" class="download-btn" style="padding:4px 10px;font-size:11px">
                  <i data-lucide="download" style="width:12px;height:12px"></i> Unduh File
                </a>
              ` : ''}
            </div>
          ` : ''}
          ${task.notes ? `
            <div style="font-size:12px;color:#333;font-style:italic;margin-top:6px">
              Catatan: "${safeHTML(task.notes)}"
            </div>
          ` : ''}
        </div>
      `;
    }

    $('detail-modal-body').innerHTML = `
      <div class="detail-header-meta">
        <span class="detail-pill cat">
          <i data-lucide="tag" style="width:12px;height:12px"></i> ${safeHTML(task.category || 'Jobdesk')}
        </span>
        <span class="detail-pill owner">
          <i data-lucide="user-check" style="width:12px;height:12px"></i> PJ: ${task.owner ? safeHTML(task.owner.toUpperCase()) : 'BELUM DIAMBIL'}
        </span>
        <span class="detail-pill ${statusPillClass}">
          <i data-lucide="${statusIcon}" style="width:12px;height:12px"></i> ${statusLabel}
        </span>
        ${isMine ? '<span class="tag-mine"><i data-lucide="star" style="width:11px;height:11px"></i> TUGAS KAMU</span>' : ''}
      </div>

      <h1 class="detail-task-title">${safeHTML(task.title)}</h1>

      <!-- Goal & Output -->
      <div class="detail-box goal">
        <div class="detail-box-head">
          <i data-lucide="target" style="width:16px;height:16px"></i>
          <span>Tujuan &amp; Ekspektasi Output</span>
        </div>
        <div class="detail-box-p goal-p">${safeHTML(exp.goal)}</div>
      </div>

      <!-- Technical Specs -->
      ${exp.specs && exp.specs.length ? `
        <div class="detail-box">
          <div class="detail-box-head">
            <i data-lucide="cpu" style="width:16px;height:16px"></i>
            <span>Spesifikasi Teknis &amp; Standarisasi</span>
          </div>
          <div class="detail-specs-grid">
            ${specsHtml}
          </div>
        </div>
      ` : ''}

      <!-- Step by Step Checklist -->
      <div class="detail-box">
        <div class="detail-box-head">
          <i data-lucide="list-checks" style="width:16px;height:16px"></i>
          <span>Checklist Langkah Pengerjaan</span>
        </div>
        <ol class="detail-step-list">
          ${stepsHtml}
        </ol>
      </div>

      <!-- Lecturer Notes / Tips -->
      ${exp.tips ? `
        <div class="detail-box tips">
          <div class="detail-box-head">
            <i data-lucide="lightbulb" style="width:16px;height:16px"></i>
            <span>Catatan Masukan Dosen &amp; Tips Penting</span>
          </div>
          <div class="detail-box-p tips-p">${safeHTML(exp.tips)}</div>
        </div>
      ` : ''}

      ${submissionInfoHtml}
    `;

    // Modal Footer Actions
    let actionButtons = '';
    if (task.figmaLink) {
      actionButtons += `
        <a href="${safeHTML(validURL(task.figmaLink))}" target="_blank" rel="noopener noreferrer" class="primary" style="background:#111;text-decoration:none">
          <i data-lucide="palette" style="width:14px;height:14px"></i> Buka Acuan Figma ↗
        </a>
      `;
    }

    if (isOpen) {
      actionButtons += `
        <button type="button" class="primary" data-detail-act="take" data-id="${task.id}" style="background:var(--yellow);color:#111">
          <i data-lucide="sparkles" style="width:14px;height:14px"></i> Klaim Jobdesk Ini
        </button>
      `;
    } else if (isMine || (currentUser && isReihan())) {
      actionButtons += `
        <button type="button" class="primary" data-detail-act="submit" data-id="${task.id}">
          <i data-lucide="upload-cloud" style="width:14px;height:14px"></i> Kumpulkan Hasil
        </button>
      `;
      if (isDoing) {
        actionButtons += `
          <button type="button" class="secondary" data-detail-act="cancel-claim" data-id="${task.id}" style="color:#b91c1c;border-color:#b91c1c;background:#fff2f2" title="Batalkan klaim tugas ini">
            <i data-lucide="x" style="width:13px;height:13px"></i> Batal Klaim
          </button>
        `;
      }
    }

    $('detail-modal-footer').innerHTML = `
      <div style="font-size:12px;font-weight:800;color:#555">
        Jobdesk #${task.id} • Game Outbreak (RRBY)
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        ${actionButtons}
        <button type="button" class="secondary" id="btn-footer-close-detail" style="border:2px solid var(--ink);padding:9px 16px;font-weight:900;font-size:12px;cursor:pointer;background:#fff">
          Tutup
        </button>
      </div>
    `;

    // Bind footer actions
    const closeBtn = $('btn-footer-close-detail');
    if (closeBtn) closeBtn.addEventListener('click', closeTaskDetailModal);

    const detailTakeBtn = $('detail-modal-footer').querySelector('[data-detail-act="take"]');
    if (detailTakeBtn) {
      detailTakeBtn.addEventListener('click', async () => {
        closeTaskDetailModal();
        if (!currentUser) {
          openLoginModal(task.owner || '');
        } else {
          await API.claimTask(task.id, currentUser);
          task.status = 'doing';
          saveLocalBackup();
          render();
          showToast(`Tugas #${task.id} (${task.title}) berhasil diklaim! ⚡`);
        }
      });
    }

    const detailCancelBtn = $('detail-modal-footer').querySelector('[data-detail-act="cancel-claim"]');
    if (detailCancelBtn) {
      detailCancelBtn.addEventListener('click', async () => {
        closeTaskDetailModal();
        const canCancel = confirm(`Batalkan klaim tugas #${task.id} (${task.title})?\nStatus tugas akan dikembalikan menjadi Available.`);
        if (!canCancel) return;
        const res = await API.updateStatus(task.id, 'open', currentUser);
        if (res && res.success === false) {
          alert(res.message || 'Gagal membatalkan klaim tugas.');
          return;
        }
        task.status = 'open';
        task.claimedBy = '';
        saveLocalBackup();
        render();
        const canceledBy = isReihan() && !isMine ? 'Reihan' : currentUser;
        showToast(`Klaim tugas #${task.id} dibatalkan oleh ${canceledBy} (Available kembali).`, '↩');
      });
    }

    const detailSubmitBtn = $('detail-modal-footer').querySelector('[data-detail-act="submit"]');
    if (detailSubmitBtn) {
      detailSubmitBtn.addEventListener('click', () => {
        closeTaskDetailModal();
        if (!currentUser) {
          alert('Akses Dibatasi: Silakan login terlebih dahulu sebagai member untuk mengumpulkan hasil tugas!');
          openLoginModal(task.owner || '');
          return;
        }
        openSubmitModal(task.id);
      });
    }

    modal.classList.add('show');
    refreshIcons();
  }

  function closeTaskDetailModal() {
    const modal = $('modal-task-detail-wrap');
    if (modal) modal.classList.remove('show');
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
    if (!currentUser) {
      alert('Akses Dibatasi: Silakan login terlebih dahulu sebagai member untuk mengumpulkan hasil tugas!');
      const task = taskId ? tasks.find(t => t.id === Number(taskId)) : null;
      openLoginModal(task ? task.owner || '' : '');
      return;
    }

    const task = taskId ? tasks.find(t => t.id === Number(taskId)) : null;

    if (currentUser) {
      $('sub-owner').value = isReihan() && task && task.owner ? task.owner : currentUser;
      if (!isReihan()) {
        $('sub-owner').style.pointerEvents = 'none';
        $('sub-owner').style.background = '#f3f4f6';
      } else {
        $('sub-owner').style.pointerEvents = 'auto';
        $('sub-owner').style.background = '#fff';
      }
    } else {
      $('sub-owner').value = '';
      $('sub-owner').style.pointerEvents = 'auto';
      $('sub-owner').style.background = '#fff';
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
    if (!currentUser) {
      alert('Akses Dibatasi: Rekap hasil pengumpulan & folder uploads hanya dapat diakses oleh member tim Outbreak!');
      openLoginModal();
      return;
    }

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
                <span style="background:var(--yellow);border:1.5px solid var(--ink);padding:2px 8px;font-size:11px;font-weight:900;display:inline-flex;align-items:center;gap:4px">
                  <i data-lucide="user-check" style="width:12px;height:12px"></i> ${safeHTML(s.owner)}
                </span>
                <b style="margin-left:8px;font-size:13px">#${s.id} - ${safeHTML(s.title)}</b>
              </div>
              <span style="font-size:10px;font-weight:900;color:#065f46;background:#b8f5a5;border:1px solid #065f46;padding:2px 6px;display:inline-flex;align-items:center;gap:3px">
                <i data-lucide="check-check" style="width:11px;height:11px"></i> TERKUMPUL
              </span>
            </div>

            ${hasLink ? `
              <div style="margin-bottom:6px">
                <span style="font-size:11px;font-weight:900;display:inline-flex;align-items:center;gap:4px">
                  <i data-lucide="link" style="width:12px;height:12px"></i> Tautan Hasil:
                </span>
                <a href="${safeHTML(validURL(s.submissionLink))}" target="_blank" rel="noopener noreferrer" style="color:#047857;font-weight:900;text-decoration:underline;margin-left:4px">
                  ${safeHTML(s.submissionLink)} ↗
                </a>
              </div>
            ` : ''}

            ${hasFile ? `
              <div style="display:flex;align-items:center;justify-content:space-between;background:#fff;border:1px solid #111;padding:6px 10px;margin-bottom:6px">
                <span style="font-size:11px;font-weight:800;display:flex;align-items:center;gap:6px">
                  <i data-lucide="archive" style="width:14px;height:14px"></i>
                  ${safeHTML(s.fileMeta.name)} (${safeHTML(s.fileMeta.size)})
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
  // PROFILE & DAILY PROGRESS LOG CONTROLLER
  // ----------------------------------------------------
  function compressImage(file, maxWidth = 1000, maxHeight = 1000, quality = 0.72) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('Gagal memuat file gambar'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Gagal membaca file gambar'));
      reader.readAsDataURL(file);
    });
  }

  async function loadProgressUpdates() {
    progressUpdates = await API.getProgressUpdates();
    updateFeedBadge();
  }

  function updateFeedBadge() {
    const badge = $('feed-count-badge');
    if (badge) {
      badge.textContent = progressUpdates.length;
    }
  }

  let activeProfileMember = 'Reihan';

  function openProfilePage(memberName) {
    if (!memberName) memberName = currentUser || 'Reihan';
    activeProfileMember = memberName;
    
    const tasksView = $('view-tasks-container');
    const profileView = $('view-profile-container');
    if (tasksView) tasksView.style.display = 'none';
    if (profileView) profileView.style.display = 'block';

    // Jika membuka profil sendiri, tombol "Profil Saya" menjadi aktif (oranye) dan "Tugas Saya" non-aktif
    if (currentUser && memberName.toLowerCase() === currentUser.toLowerCase()) {
      updateNavButtons('profile');
    } else {
      updateNavButtons('none');
    }

    renderMemberProfile(activeProfileMember);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    refreshIcons();
  }

  function backToTaskBoard() {
    const tasksView = $('view-tasks-container');
    const profileView = $('view-profile-container');
    if (tasksView) tasksView.style.display = 'block';
    if (profileView) profileView.style.display = 'none';

    // Jika filter tugas saat ini adalah currentUser, tombol "Tugas Saya" aktif
    if (currentUser && activeMemberFilter && activeMemberFilter.toLowerCase() === currentUser.toLowerCase()) {
      updateNavButtons('my-tasks');
    } else {
      updateNavButtons('none');
    }

    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    refreshIcons();
  }

  function renderMemberProfile(memberName) {
    const container = $('view-profile-container');
    if (!container) return;

    activeProfileMember = memberName;
    const info = MEMBER_INFO[memberName] || {
      role: 'Anggota Tim Outbreak',
      icon: 'user',
      color: '#ff4b0b',
      tagline: 'Tim Pengembang Game 2D Zombie Survival Outbreak.'
    };

    // Filter tasks for this member
    const memberTasks = tasks.filter(t => 
      t.owner && t.owner.toLowerCase() === memberName.toLowerCase()
    );
    const claimedTasks = memberTasks.filter(t => t.status === 'doing');
    const otherTasks = memberTasks.filter(t => t.status !== 'doing');

    // Filter progress updates for this member (newest first)
    const memberUpdates = progressUpdates
      .filter(p => p.author && p.author.toLowerCase() === memberName.toLowerCase())
      .sort((a, b) => (b.id || 0) - (a.id || 0));
    const latestUpdate = memberUpdates[0];

    const isOwnProfile = currentUser && currentUser.toLowerCase() === memberName.toLowerCase();
    const canPost = isOwnProfile;

    let html = `
      <!-- TOP NAVIGATION BAR -->
      <div class="profile-top-bar">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <button type="button" class="btn-back" id="btn-back-to-tasks-top">
            <i data-lucide="arrow-left" style="width:14px;height:14px"></i>
            <span>Kembali ke Task Board</span>
          </button>
          <div style="font-size:12px;font-weight:900;color:#666">
            PILIH PROFIL ANGGOTA:
          </div>
          <div class="profile-tabs-bar" id="profile-tabs-bar">
            ${['Reihan', 'Bintang', 'Royan', 'Eby'].map(m => `
              <button type="button" class="profile-tab ${m.toLowerCase() === memberName.toLowerCase() ? 'active' : ''}" data-member-tab="${m}">
                <i data-lucide="${MEMBER_INFO[m].icon}" style="width:12px;height:12px"></i>
                <span>${m}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div>
          ${isOwnProfile ? `
            <span style="background:var(--yellow);border:1.5px solid var(--ink);padding:6px 12px;font-size:11.5px;font-weight:900;box-shadow:2px 2px 0 var(--ink);display:inline-flex;align-items:center;gap:5px">
              <i data-lucide="sparkles" style="width:13px;height:13px"></i> PROFIL KAMU (${safeHTML(currentUser)})
            </span>
          ` : `
            <span style="background:#fff;border:1.5px solid var(--ink);padding:6px 12px;font-size:11.5px;font-weight:900;box-shadow:2px 2px 0 var(--ink);display:inline-flex;align-items:center;gap:5px">
              <i data-lucide="eye" style="width:13px;height:13px"></i> PROFIL: ${safeHTML(memberName.toUpperCase())}
            </span>
          `}
        </div>
      </div>

      <!-- MEMBER HERO CARD -->
      <div class="profile-hero-card">
        <div class="profile-avatar-lg" style="background:${info.color}">
          ${memberName.charAt(0).toUpperCase()}
        </div>
        <div class="profile-meta-wrap">
          <div class="profile-name-title">
            <span>${safeHTML(memberName.toUpperCase())}</span>
            <span class="profile-role-pill">
              <i data-lucide="${info.icon}" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:2px"></i>
              ${safeHTML(info.role)}
            </span>
          </div>
          <div class="profile-tagline">${safeHTML(info.tagline)}</div>

          <div class="profile-stats-grid">
            <div class="profile-mini-stat">
              <div class="val">${memberTasks.length}</div>
              <div class="lbl">Total Jobdesk</div>
            </div>
            <div class="profile-mini-stat" style="background:#fef08a">
              <div class="val" style="color:#854d0e">${claimedTasks.length}</div>
              <div class="lbl">Sedang Di-Claim</div>
            </div>
            <div class="profile-mini-stat" style="background:#b8f5a5">
              <div class="val" style="color:#065f46">${memberTasks.filter(t => t.status === 'done').length}</div>
              <div class="lbl">Selesai</div>
            </div>
            <div class="profile-mini-stat" style="background:#fed7aa">
              <div class="val" style="color:#9a3412">${memberUpdates.length}</div>
              <div class="lbl">Foto Progres</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2-COLUMN SECTION: KIRI (JOBDESK DI-CLAIM) | KANAN (PREVIEW HARIAN) -->
      <div class="profile-cols-grid">
        
        <!-- ============================================== -->
        <!-- KOLOM KIRI: JOBDESK YANG DI-CLAIM SAAT INI     -->
        <!-- ============================================== -->
        <div class="profile-col-box">
          <div class="profile-col-header">
            <h3 class="profile-col-title">
              <i data-lucide="check-square" style="width:17px;height:17px;color:var(--orange)"></i>
              <span>JOBDESK YANG DI-CLAIM SAAT INI</span>
              <span style="background:var(--yellow);border:1px solid var(--ink);font-size:10.5px;padding:2px 7px;font-weight:900">${claimedTasks.length} Aktif</span>
            </h3>
            <div class="profile-col-subtitle">
              Tugas berstatus <b>In Progress / Sedang Dikerjakan</b> oleh ${safeHTML(memberName)}.
            </div>
          </div>

          <!-- Claimed tasks cards list -->
          <div id="claimed-tasks-list">
    `;

    if (claimedTasks.length === 0) {
      html += `
        <div class="empty" style="padding:24px 16px;font-size:12.5px;margin-bottom:12px">
          <i data-lucide="inbox" style="width:32px;height:32px;color:#888;margin-bottom:6px"></i>
          <div>Saat ini tidak ada jobdesk yang sedang di-claim oleh ${safeHTML(memberName)}.</div>
          ${isOwnProfile ? `
            <div style="font-size:11px;color:#555;margin-top:6px">
              Buka Task Board dan klik tombol <b>[KLAIM]</b> pada tugas kamu untuk mulai mengerjakan!
            </div>
            <button type="button" class="secondary" id="btn-claim-more-tasks" style="margin-top:10px;padding:8px 12px;font-size:11.5px">
              ← Buka Task Board untuk Klaim
            </button>
          ` : ''}
        </div>
      `;
    } else {
      claimedTasks.forEach(t => {
        const hasSubmission = Boolean(t.submissionLink || t.fileMeta);
        html += `
          <div class="claimed-task-card">
            <div class="claimed-task-top">
              <span style="font-size:10.5px;font-weight:900;background:#fff;border:1px solid var(--ink);padding:2px 6px">
                TASK / #${String(t.id).padStart(3, '0')} • ${safeHTML(t.category)}
              </span>
              <span class="status doing" style="font-size:10px;padding:2px 7px">
                <i data-lucide="clock" style="width:10px;height:10px"></i>
                IN PROGRESS
              </span>
            </div>

            <div class="claimed-task-title">${safeHTML(t.title)}</div>
            <div class="claimed-task-desc">${safeHTML(t.desc)}</div>

            ${t.figmaLink ? `
              <a href="${safeHTML(validURL(t.figmaLink))}" target="_blank" rel="noopener noreferrer" class="figma-link-btn" style="margin-bottom:10px;display:inline-flex">
                <i data-lucide="palette" style="width:12px;height:12px"></i>
                <span>Buka Acuan Figma ↗</span>
              </a>
            ` : ''}

            ${hasSubmission && (isOwnProfile || isReihan()) ? `
              <div style="background:#fff;border:1.5px solid var(--ink);padding:8px 10px;margin-bottom:10px;font-size:11px">
                <div style="font-weight:900;color:#047857;margin-bottom:3px;display:flex;align-items:center;gap:4px">
                  <i data-lucide="check-check" style="width:12px;height:12px"></i> Hasil Terkumpul (Verifikasi Member):
                </div>
                ${t.submissionLink ? `<a href="${safeHTML(validURL(t.submissionLink))}" target="_blank" rel="noopener noreferrer" style="color:var(--orange);font-weight:800;text-decoration:underline">Buka Tautan Drive/Figma ↗</a>` : ''}
                ${t.fileMeta ? `
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-top:4px;gap:6px;flex-wrap:wrap">
                    <span>File Aset: <b>${safeHTML(t.fileMeta.name)}</b> (${safeHTML(t.fileMeta.size)})</span>
                    ${t.fileMeta.downloadUrl ? `
                      <a href="${safeHTML(t.fileMeta.downloadUrl)}" target="_blank" download="${safeHTML(t.fileMeta.name)}" class="download-btn" style="padding:2px 8px;font-size:10px">
                        <i data-lucide="download" style="width:10px;height:10px"></i> Unduh File
                      </a>
                    ` : ''}
                  </div>
                ` : ''}
              </div>
            ` : ''}

            ${isOwnProfile || isReihan() ? `
              <div class="claimed-task-actions">
                ${isOwnProfile ? `
                  <button type="button" class="primary" data-profile-act="submit-task" data-id="${t.id}" style="padding:7px 12px;font-size:11px">
                    <i data-lucide="upload-cloud" style="width:12px;height:12px"></i>
                    <span>Kumpulkan Hasil</span>
                  </button>
                  <button type="button" class="secondary" data-profile-act="mark-done" data-id="${t.id}" style="padding:7px 12px;font-size:11px">
                    <i data-lucide="check" style="width:12px;height:12px"></i>
                    <span>Tandai Selesai</span>
                  </button>
                ` : ''}
                <button type="button" class="secondary" data-profile-act="cancel-claim" data-id="${t.id}" style="padding:7px 10px;font-size:11px;color:#991b1b;background:#fff2f2;border-color:#b91c1c" title="Batalkan klaim tugas #${t.id}">
                  <i data-lucide="x" style="width:12px;height:12px"></i>
                  <span>Batal Klaim${isReihan() && !isOwnProfile ? ' (Reihan)' : ''}</span>
                </button>
              </div>
            ` : `
              <div style="font-size:11px;font-weight:800;color:#555;padding-top:6px;border-top:1px dashed #ccc;display:flex;align-items:center;gap:4px">
                <i data-lucide="flame" style="width:12px;height:12px;color:var(--orange)"></i> Sedang dikerjakan oleh ${safeHTML(memberName)}.
              </div>
            `}
          </div>
        `;
      });
    }

    // Other tasks summary below
    if (otherTasks.length > 0) {
      html += `
        <div style="margin-top:14px;border-top:2px dashed #ddd;padding-top:12px">
          <div style="font-size:11.5px;font-weight:900;margin-bottom:8px;color:#444;display:flex;align-items:center;gap:5px">
            <i data-lucide="layers" style="width:13px;height:13px"></i> JOBDESK LAINNYA MILIK ${safeHTML(memberName.toUpperCase())} (${otherTasks.length})
          </div>
          <div style="display:flex;flex-direction:column;gap:6px">
            ${otherTasks.map(ot => `
              <div style="background:var(--paper);border:1px solid var(--ink);padding:8px 10px;display:flex;justify-content:space-between;align-items:center;font-size:11px">
                <div>
                  <span style="font-weight:900">#${ot.id}</span>
                  <span style="margin-left:4px">${safeHTML(ot.title)}</span>
                </div>
                <span class="status ${ot.status}" style="font-size:9.5px;padding:2px 6px">
                  ${ot.status === 'done' ? '<span style="display:inline-flex;align-items:center;gap:3px"><i data-lucide="check" style="width:10px;height:10px"></i> SELESAI</span>' : 'AVAILABLE'}
                </span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    html += `
          </div>
        </div>

        <!-- ============================================== -->
        <!-- KOLOM KANAN: PREVIEW JOBDESK HARIAN            -->
        <!-- ============================================== -->
        <div class="profile-col-box">
          <div class="profile-col-header">
            <h3 class="profile-col-title">
              <i data-lucide="camera" style="width:17px;height:17px;color:var(--orange)"></i>
              <span>PREVIEW JOBDESK HARIAN</span>
            </h3>
            <div class="profile-col-subtitle">
              Screenshot tangkapan layar pengerjaan hari ini (misal: layer setting UI, sprite zombie, audio).
            </div>
          </div>
    `;

    // If own profile: show upload form
    if (canPost) {
      html += `
        <div class="progress-upload-box" style="margin-bottom:14px;border:2px solid var(--ink);box-shadow:none;padding:14px">
          <div style="font-size:12.5px;font-weight:900;margin-bottom:8px;display:flex;align-items:center;gap:6px">
            <i data-lucide="plus-circle" style="width:14px;height:14px;color:var(--orange)"></i>
            <span>BAGIKAN PREVIEW HARI INI</span>
          </div>
          <div style="font-size:11px;color:#555;margin-bottom:10px">
            Paste screenshot langsung dengan <b>Ctrl + V</b> atau seret gambar ke kotak bawah:
          </div>

          <form id="form-progress-upload">
            <div class="field" style="margin-bottom:10px">
              <label for="prog-task-select" style="font-size:10.5px">JOBDESK YANG DIKERJAKAN *</label>
              <select id="prog-task-select" required style="padding:8px 10px;font-size:12px">
                <option value="">-- Pilih Jobdesk Terkait --</option>
                ${memberTasks.map(t => `<option value="${t.id}" data-title="${safeHTML(t.title)}">[#${t.id}] ${safeHTML(t.title)} (${t.status === 'doing' ? 'SEDANG DI-CLAIM' : t.status})</option>`).join('')}
                <option value="0" data-title="Progres Umum Tim">Lainnya / Progres Umum Tim</option>
              </select>
            </div>

            <div class="field" style="margin-bottom:10px">
              <label for="prog-title" style="font-size:10.5px">CATATAN / PREVIEW PROGRES *</label>
              <input type="text" id="prog-title" required placeholder="Contoh: Buat layer setting UI Figma / Animasi zombie walk" style="padding:8px 10px;font-size:12px">
            </div>

            <div class="field" style="margin-bottom:10px">
              <label style="font-size:10.5px">SCREENSHOT GAMBAR (DRAG / PASTE CTRL+V) *</label>
              <div class="img-dropzone" id="prog-dropzone" style="padding:14px">
                <i data-lucide="image-plus" style="width:24px;height:24px;color:var(--ink);margin-bottom:2px"></i>
                <div style="font-size:11.5px;font-weight:900">Klik / Tarik file / Tekan Ctrl+V</div>
                <input type="file" id="prog-file-input" style="display:none" accept="image/*">
              </div>

              <div id="prog-img-preview-wrap" style="display:none">
                <div class="img-preview-container" style="max-height:180px">
                  <img id="prog-img-preview" src="" alt="Preview">
                  <button type="button" class="img-preview-remove" id="btn-remove-prog-img">Ganti / Hapus ✕</button>
                </div>
              </div>
            </div>

            <button type="submit" class="primary" id="btn-submit-prog" style="width:100%;padding:9px;font-size:12px">
              <i data-lucide="send" style="width:13px;height:13px"></i>
              <span id="btn-submit-prog-text">🚀 Bagikan Preview Progres Hari Ini</span>
            </button>
          </form>
        </div>
      `;
    }

    // Latest progress preview card
    if (latestUpdate) {
      html += `
        <div style="font-size:11.5px;font-weight:900;letter-spacing:0.5px;color:#444;margin-bottom:6px">
          🌟 PREVIEW TERAKHIR DARI ${safeHTML(memberName.toUpperCase())}
        </div>
        <div class="daily-preview-featured">
          ${latestUpdate.imageData ? `
            <div class="daily-preview-img-wrap" data-lightbox-src="${latestUpdate.imageData}" data-title="${safeHTML(latestUpdate.title)}" data-author="${safeHTML(latestUpdate.author)}" data-date="${safeHTML(latestUpdate.dateStr || '')}" data-notes="${safeHTML(latestUpdate.notes || '')}">
              <img src="${latestUpdate.imageData}" alt="${safeHTML(latestUpdate.title)}" loading="lazy">
              <div class="post-img-overlay">
                <i data-lucide="maximize-2" style="width:16px;height:16px"></i>
                <span>KLIK ZOOM PERBESAR</span>
              </div>
            </div>
          ` : ''}
          <div class="daily-preview-content">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:6px">
              <span class="post-task-badge" style="margin:0">${safeHTML(latestUpdate.taskTitle || 'Jobdesk')}</span>
              <span style="font-size:10px;font-weight:700;color:#666">${safeHTML(latestUpdate.dateStr || '')}</span>
            </div>
            <div style="font-size:13.5px;font-weight:900;margin-bottom:4px">${safeHTML(latestUpdate.title)}</div>
            ${latestUpdate.notes ? `<div style="font-size:11.5px;color:#555;line-height:1.4">${safeHTML(latestUpdate.notes)}</div>` : ''}
          </div>
        </div>
      `;
    } else {
      html += `
        <div class="empty" style="padding:28px 16px">
          <i data-lucide="image" style="width:36px;height:36px;color:#888;margin-bottom:8px"></i>
          <div style="font-size:13px;font-weight:900">Belum ada preview progres harian yang dibagikan oleh ${safeHTML(memberName)}.</div>
          <div style="font-size:11.5px;color:#666;margin-top:4px">
            ${isOwnProfile ? 'Gunakan form di atas untuk mengunggah screenshot progres kamu!' : `Nantikan update screenshot hasil kerja dari ${safeHTML(memberName)}!`}
          </div>
        </div>
      `;
    }

    html += `
        </div>
      </div>

      <!-- ============================================== -->
      <!-- BAGIAN BAWAH: RIWAYAT LOG PROGRES HARIAN       -->
      <!-- ============================================== -->
      <div class="profile-history-box">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px">
          <div>
            <h3 style="font-size:16px;font-weight:900;letter-spacing:-0.5px;margin:0;display:flex;align-items:center;gap:6px">
              <i data-lucide="history" style="width:18px;height:18px;color:var(--orange)"></i>
              <span>RIWAYAT LOG PROGRES HARIAN ${safeHTML(memberName.toUpperCase())} (${memberUpdates.length})</span>
            </h3>
            <div style="font-size:11.5px;color:#555;font-weight:700;margin-top:3px">
              Seluruh riwayat screenshot perkembangan yang pernah dibagikan oleh ${safeHTML(memberName)}. Klik gambar untuk zoom.
            </div>
          </div>
        </div>
    `;

    if (memberUpdates.length === 0) {
      html += `
        <div class="empty" style="padding:24px 16px;font-size:12px">
          Belum ada riwayat postingan progres sebelumnya.
        </div>
      `;
    } else {
      html += `<div class="progress-feed-grid">`;
      memberUpdates.forEach(p => {
        html += `
          <article class="progress-post-card" data-post-id="${p.id}">
            <div class="post-header">
              <span class="post-task-badge" style="margin:0">${safeHTML(p.taskTitle || 'Jobdesk')}</span>
              <span class="post-date">${safeHTML(p.dateStr || '')}</span>
            </div>

            ${p.imageData ? `
              <div class="post-img-wrap" data-lightbox-src="${p.imageData}" data-title="${safeHTML(p.title)}" data-author="${safeHTML(p.author)}" data-date="${safeHTML(p.dateStr || '')}" data-notes="${safeHTML(p.notes || '')}">
                <img src="${p.imageData}" alt="${safeHTML(p.title)}" loading="lazy">
                <div class="post-img-overlay">
                  <i data-lucide="maximize-2" style="width:16px;height:16px"></i>
                  <span>KLIK ZOOM</span>
                </div>
              </div>
            ` : ''}

            <div class="post-body">
              <h4 class="post-title">${safeHTML(p.title)}</h4>
              ${p.notes ? `<p class="post-notes">${safeHTML(p.notes)}</p>` : ''}
            </div>

            <div class="post-footer">
              <span style="font-weight:800;color:#666">⚡ Outbreak 2D</span>
              ${(currentUser === p.author || isReihan()) ? `
                <button type="button" class="btn-post-del" data-del-prog="${p.id}">
                  <i data-lucide="trash-2" style="width:11px;height:11px"></i> Hapus
                </button>
              ` : ''}
            </div>
          </article>
        `;
      });
      html += `</div>`;
    }

    html += `
        <div style="display:flex;justify-content:center;margin-top:20px">
          <button type="button" class="btn-back" id="btn-back-to-tasks-bottom" style="padding:10px 18px;font-size:12.5px;font-weight:900;background:var(--yellow);border:2px solid var(--ink);cursor:pointer;box-shadow:3px 3px 0 var(--ink)">
            ← Kembali ke Task Board
          </button>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Bind event handlers inside profile view:
    const backBtnTop = $('btn-back-to-tasks-top');
    if (backBtnTop) backBtnTop.addEventListener('click', backToTaskBoard);

    const backBtnBottom = $('btn-back-to-tasks-bottom');
    if (backBtnBottom) backBtnBottom.addEventListener('click', backToTaskBoard);

    const claimMoreBtn = $('btn-claim-more-tasks');
    if (claimMoreBtn) claimMoreBtn.addEventListener('click', backToTaskBoard);

    // Member tabs switcher in profile top bar
    document.querySelectorAll('#profile-tabs-bar [data-member-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        openProfilePage(btn.dataset.memberTab);
      });
    });

    // Claimed task actions in profile (submit, done, cancel claim)
    container.querySelectorAll('[data-profile-act]').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const act = btn.dataset.profileAct;
        const taskId = Number(btn.dataset.id);
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        if (act === 'submit-task') {
          if (!currentUser) {
            alert('Akses Dibatasi: Silakan login terlebih dahulu sebagai member untuk mengumpulkan hasil tugas!');
            openLoginModal(memberName);
            return;
          }
          openSubmitModal(taskId);
          return;
        }

        if (act === 'mark-done') {
          await API.updateStatus(taskId, 'done');
          task.status = 'done';
          saveLocalBackup();
          renderMemberProfile(memberName);
          showToast(`Tugas #${taskId} ditandai selesai! ✓`);
          return;
        }

        if (act === 'cancel-claim') {
          if (!currentUser) {
            alert('Akses Dibatasi: Silakan login terlebih dahulu untuk membatalkan klaim tugas!');
            openLoginModal(memberName);
            return;
          }

          const isOwner = task.owner && task.owner.toLowerCase() === currentUser.toLowerCase();
          if (!isOwner && !isReihan()) {
            alert(`Akses Dibatasi: Tugas #${task.id} adalah milik ${task.owner}. Hanya ${task.owner} atau Reihan yang memiliki wewenang untuk membatalkan klaim tugas!`);
            return;
          }

          const ok = confirm(`Batalkan klaim tugas #${taskId}? Status akan kembali menjadi Available.`);
          if (!ok) return;

          const res = await API.updateStatus(taskId, 'open', currentUser);
          if (res && res.success === false) {
            alert(res.message || 'Gagal membatalkan klaim tugas.');
            return;
          }

          task.status = 'open';
          task.claimedBy = '';
          saveLocalBackup();
          renderMemberProfile(memberName);
          const canceledBy = isReihan() && !isOwner ? 'Reihan' : currentUser;
          showToast(`Klaim tugas #${taskId} dibatalkan oleh ${canceledBy}.`, '↩');
          return;
        }
      });
    });

    if (canPost) {
      setupProgressUploadForm(memberName);
    }

    bindPostCardEvents(container);
    refreshIcons();
  }

  function setupProgressUploadForm(memberName) {
    const dropzone = $('prog-dropzone');
    const fileInput = $('prog-file-input');
    const previewWrap = $('prog-img-preview-wrap');
    const removeBtn = $('btn-remove-prog-img');
    const form = $('form-progress-upload');

    if (!form || !dropzone || !fileInput) return;

    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', async (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        await stageProgressImage(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', async () => {
      if (fileInput.files && fileInput.files[0]) {
        await stageProgressImage(fileInput.files[0]);
      }
    });

    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        stagedProgressImg = null;
        fileInput.value = '';
        if (previewWrap) previewWrap.style.display = 'none';
        if (dropzone) dropzone.style.display = 'block';
      });
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!stagedProgressImg) {
        alert('Mohon lampirkan gambar/screenshot progres terlebih dahulu!');
        return;
      }

      const taskSelect = $('prog-task-select');
      const taskId = taskSelect ? Number(taskSelect.value) : 0;
      const taskOpt = taskSelect ? taskSelect.options[taskSelect.selectedIndex] : null;
      const taskTitle = taskOpt ? taskOpt.dataset.title || taskOpt.textContent : 'Jobdesk';
      const titleEl = $('prog-title');
      const title = titleEl ? titleEl.value.trim() : 'Preview Progres';
      const notesEl = $('prog-notes');
      const notes = notesEl ? notesEl.value.trim() : '';

      const submitBtn = $('btn-submit-prog');
      const submitText = $('btn-submit-prog-text');
      if (submitBtn) submitBtn.disabled = true;
      if (submitText) submitText.textContent = 'Menyimpan ke Cloud... ⏳';

      const updateObj = {
        author: memberName,
        taskId: taskId,
        taskTitle: taskTitle,
        title: title,
        notes: notes || title,
        imageData: stagedProgressImg
      };

      try {
        const res = await API.addProgressUpdate(updateObj);
        if (res && res.success) {
          stagedProgressImg = null;
          await loadProgressUpdates();
          renderMemberProfile(activeProfileMember);
          showToast('Progres harian berhasil dibagikan & tersimpan! 🚀');
        } else {
          alert('Gagal mengupload progres: ' + (res.error || 'Koneksi error'));
          if (submitBtn) submitBtn.disabled = false;
          if (submitText) submitText.textContent = '🚀 Bagikan Preview Progres Hari Ini';
        }
      } catch (err) {
        console.error('Submit error', err);
        alert('Terjadi kesalahan saat memproses progres: ' + err.message);
        if (submitBtn) submitBtn.disabled = false;
        if (submitText) submitText.textContent = '🚀 Bagikan Preview Progres Hari Ini';
      }
    });
  }

  async function stageProgressImage(file) {
    if (!file || !file.type.startsWith('image/')) {
      alert('File harus berupa gambar (PNG, JPG, WebP)!');
      return;
    }
    try {
      const dataUrl = await compressImage(file, 1000, 1000, 0.72);
      stagedProgressImg = dataUrl;
      const previewWrap = $('prog-img-preview-wrap');
      const previewImg = $('prog-img-preview');
      const dropzone = $('prog-dropzone');
      if (previewImg) previewImg.src = dataUrl;
      if (previewWrap) previewWrap.style.display = 'block';
      if (dropzone) dropzone.style.display = 'none';
      showToast('Gambar screenshot siap diposting! 📸');
    } catch (err) {
      alert('Gagal memproses gambar: ' + err.message);
    }
  }

  function bindPostCardEvents(container) {
    container.querySelectorAll('[data-lightbox-src]').forEach(wrap => {
      wrap.addEventListener('click', () => {
        openLightbox(
          wrap.dataset.lightboxSrc,
          wrap.dataset.title,
          wrap.dataset.author,
          wrap.dataset.date,
          wrap.dataset.notes
        );
      });
    });

    container.querySelectorAll('[data-del-prog]').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = btn.dataset.delProg;
        if (!confirm('Yakin ingin menghapus postingan progres ini?')) return;
        const res = await API.deleteProgressUpdate(id);
        if (res && res.success) {
          await loadProgressUpdates();
          renderMemberProfile(activeProfileMember);
          showToast('Postingan progres telah dihapus.');
        } else {
          alert('Gagal menghapus progres!');
        }
      });
    });
  }

  function openLightbox(imgSrc, title, author, date, notes) {
    const wrap = $('modal-lightbox-wrap');
    if (!wrap) return;
    $('lightbox-img').src = imgSrc;
    $('lightbox-title').textContent = title || 'Preview Progres';
    $('lightbox-meta').textContent = `Oleh ${author || 'Anggota Tim'} • ${date || ''}`;
    $('lightbox-notes').textContent = notes || '';
    wrap.classList.add('show');
  }

  function closeLightbox() {
    const wrap = $('modal-lightbox-wrap');
    if (wrap) wrap.classList.remove('show');
  }

  // ----------------------------------------------------
  // EVENT LISTENERS
  // ----------------------------------------------------
  function setupEventListeners() {
    // Auth & Login
    $('btn-open-login').addEventListener('click', () => openLoginModal());
    document.querySelectorAll('.member-pill[data-user]').forEach(pill => {
      pill.addEventListener('click', () => {
        openProfilePage(pill.dataset.user);
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
      if (!currentUser) {
        openLoginModal();
        return;
      }
      const tasksView = $('view-tasks-container');
      const profileView = $('view-profile-container');
      if (tasksView) tasksView.style.display = 'block';
      if (profileView) profileView.style.display = 'none';

      activeMemberFilter = currentUser;
      document.querySelectorAll('#member-filters .filter').forEach(f => {
        f.classList.toggle('active', f.dataset.member === currentUser);
      });
      updateNavButtons('my-tasks');
      render();
      showToast(`Menampilkan tugas milik ${currentUser} ⭐`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      refreshIcons();
    });

    // Dedicated Profile Navigation
    const myProfileBtn = $('btn-open-my-profile');
    if (myProfileBtn) {
      myProfileBtn.addEventListener('click', () => {
        openProfilePage(currentUser || 'Reihan');
      });
    }

    const closeLightboxBtn = $('btn-close-lightbox');
    if (closeLightboxBtn) {
      closeLightboxBtn.addEventListener('click', closeLightbox);
    }

    const lightboxWrap = $('modal-lightbox-wrap');
    if (lightboxWrap) {
      lightboxWrap.addEventListener('click', (e) => {
        if (e.target === lightboxWrap) closeLightbox();
      });
    }

    // Ctrl+V Paste handler for screenshot image upload into in-page profile
    document.addEventListener('paste', async (e) => {
      const viewContainer = $('view-profile-container');
      if (!viewContainer || viewContainer.style.display === 'none') return;
      if (e.clipboardData && e.clipboardData.items) {
        for (let item of e.clipboardData.items) {
          if (item.type && item.type.indexOf('image') !== -1) {
            const file = item.getAsFile();
            if (file) {
              await stageProgressImage(file);
              break;
            }
          }
        }
      }
    });

    // Submissions
    $('btn-main-submit').addEventListener('click', () => {
      if (!currentUser) {
        alert('Akses Dibatasi: Silakan login terlebih dahulu sebagai member untuk mengumpulkan hasil tugas!');
        openLoginModal();
        return;
      }
      openSubmitModal();
    });
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
      if (!currentUser) {
        alert('Akses Dibatasi: Silakan login terlebih dahulu sebagai member untuk mengumpulkan hasil tugas!');
        closeSubmitModal();
        openLoginModal();
        return;
      }

      const owner = isReihan() ? ($('sub-owner').value || currentUser) : currentUser;
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

      const submitBtn = $('form-submit').querySelector('button[type="submit"]');
      const progressWrap = $('upload-progress-wrap');
      const progressBar = $('upload-progress-bar');
      const progressPercent = $('upload-progress-percent');
      const progressStatus = $('upload-progress-status');

      if (stagedFile) {
        if (progressWrap) {
          progressWrap.style.display = 'block';
          if (progressBar) progressBar.style.width = '0%';
          if (progressPercent) progressPercent.textContent = '0%';
          if (progressStatus) progressStatus.textContent = 'Memulai unggahan ke Cloud Storage...';
        }
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>Mengunggah file ke cloud...</span>`;
        }
      }

      const formData = new FormData();
      formData.append('owner', owner);
      formData.append('link', link);
      formData.append('notes', notes);
      formData.append('status', status);
      if (stagedFile) {
        formData.append('file', stagedFile);
      }

      const onProgress = (p) => {
        if (progressBar) progressBar.style.width = `${p.percent}%`;
        if (progressPercent) progressPercent.textContent = `${p.percent}%`;
        if (progressStatus) progressStatus.textContent = `Mengunggah file ke Cloud Storage (${p.percent}%)...`;
      };

      const res = await API.submitWork(taskId, formData, onProgress);

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i data-lucide="send" style="width:14px;height:14px"></i><span>KUMPULKAN SEKARANG</span>`;
        refreshIcons();
      }
      if (progressWrap) progressWrap.style.display = 'none';

      if (!res.success) {
        if (res.storageError) {
          const proceedWithoutFile = confirm(
            `⚠️ GAGAL MENGUNGGAH FILE KE CLOUD:\n` +
            `${res.error}\n\n` +
            `👉 Kamu bisa memasukkan tautan Google Drive file aset kamu di kolom Link Hasil Tugas.\n` +
            `Apakah ingin tetap mengumpulkan tugas dengan Link Google Drive / Catatan saja tanpa melampirkan file fisik?`
          );
          if (proceedWithoutFile) {
            const noFileForm = new FormData();
            noFileForm.append('owner', owner);
            noFileForm.append('link', link);
            noFileForm.append('notes', notes);
            noFileForm.append('status', status);
            const res2 = await API.submitWork(taskId, noFileForm);
            if (res2 && res2.success) {
              if (task && res2.task) Object.assign(task, res2.task);
              stagedFile = null;
              $('file-input').value = '';
              $('file-preview-wrap').style.display = 'none';
              saveLocalBackup();
              closeSubmitModal();
              render();
              showToast(`Hasil tugas #${taskId} berhasil dikumpulkan! 🚀`);
              return;
            }
          }
          return;
        } else {
          alert(res.message || 'Gagal mengumpulkan hasil tugas.');
          return;
        }
      }

      if (res && res.success && res.task) {
        Object.assign(task, res.task);
      }
      stagedFile = null;
      $('file-input').value = '';
      $('file-preview-wrap').style.display = 'none';

      saveLocalBackup();
      closeSubmitModal();
      render();
      showToast(`Hasil tugas #${taskId} & file aset berhasil dikumpulkan! 🚀`);
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

    // Sync Modal & Manual Refresh
    if ($('btn-sync-status')) $('btn-sync-status').addEventListener('click', openSyncModal);
    if ($('btn-close-sync')) $('btn-close-sync').addEventListener('click', closeSyncModal);
    if ($('btn-manual-sync')) {
      $('btn-manual-sync').addEventListener('click', async () => {
        showToast('Memeriksa server dan menyinkronkan data... 🔄');
        await API.checkServer();
        await loadTasks();
        updateSyncUI();
        render();
        if (API.isServerAvailable) {
          showToast('Data berhasil disinkronkan dengan server! 🟢');
        } else {
          showToast('Server tidak terdeteksi. Berjalan dalam mode lokal offline.', '🟡');
        }
      });
    }

    if ($('btn-save-backend-url')) {
      $('btn-save-backend-url').addEventListener('click', async () => {
        const url = $('input-backend-url').value.trim();
        API.setBaseUrl(url);
        showToast('Mencoba menyambungkan ke backend baru... ⏳');
        const ok = await API.checkServer();
        updateSyncUI();
        if (ok) {
          await loadTasks();
          render();
          showToast('Berhasil terhubung ke server backend! 🟢');
          closeSyncModal();
        } else {
          alert('Tidak dapat terhubung ke URL backend tersebut. Pastikan URL aktif dan mendukung CORS.');
        }
      });
    }

    if ($('btn-test-connection')) {
      $('btn-test-connection').addEventListener('click', async () => {
        showToast('Menguji koneksi server... ⏳');
        const ok = await API.checkServer();
        updateSyncUI();
        openSyncModal();
        if (ok) {
          showToast('Koneksi server aktif! 🟢');
        } else {
          showToast('Server tidak merespons.', '⚠️');
        }
      });
    }

    // Reset Data (Optional/Dev command)
    if ($('btn-reset-data')) {
      $('btn-reset-data').addEventListener('click', async () => {
        if (!isReihan()) {
          alert('Akses Dibatasi: Hanya Reihan (Project Lead) yang memiliki izin untuk mereset seluruh data tugas!');
          return;
        }
        if (confirm('PERINGATAN: Apakah kamu yakin ingin mereset seluruh data kembali ke daftar revisi awal Word dosen?\nSeluruh progres, status klaim, dan hasil terkumpul akan dikembalikan ke kondisi awal.')) {
          const res = await API.resetTasks(currentUser, DEFAULT_TASKS);
          if (res && res.success) {
            tasks = (res.tasks && res.tasks.length) ? res.tasks : JSON.parse(JSON.stringify(DEFAULT_TASKS));
            saveLocalBackup();
            render();
            showToast('Data berhasil direset ke revisi awal Word oleh Reihan.', '🔄');
          } else {
            alert((res && res.message) || 'Gagal mereset data.');
          }
        }
      });
    }

    // Console helper for Lead if ever needed
    window.resetProjectTasks = async () => {
      if (confirm('Reset seluruh tugas ke default?')) {
        await API.resetTasks('Reihan', DEFAULT_TASKS);
        location.reload();
      }
    };

    // Dismiss on background click
    ['modal-submit-wrap', 'modal-login-wrap', 'modal-guidelines-wrap', 'modal-task-wrap', 'modal-archive-wrap', 'modal-sync-wrap', 'modal-task-detail-wrap'].forEach(id => {
      const el = $(id);
      if (el) {
        el.addEventListener('click', (e) => {
          if (e.target === el) el.classList.remove('show');
        });
      }
    });

    // Close button for Task Detail Modal
    const btnCloseDetail = $('btn-close-task-detail');
    if (btnCloseDetail) {
      btnCloseDetail.addEventListener('click', closeTaskDetailModal);
    }

    // Filters: Status
    $('status-filters').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-status]');
      if (!btn) return;
      activeStatusFilter = btn.dataset.status;
      document.querySelectorAll('#status-filters .filter').forEach(f => f.classList.toggle('active', f === btn));
      render();
    });

    // Filters: Member / Profile
    $('member-filters').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-member]');
      if (!btn) return;
      const member = btn.dataset.member;
      if (member === 'all') {
        activeMemberFilter = 'all';
        document.querySelectorAll('#member-filters .filter').forEach(f => f.classList.toggle('active', f === btn));
        updateNavButtons('none');
        render();
        showToast('Menampilkan semua jobdesk tim.');
      } else {
        openProfilePage(member);
      }
    });

    // Search query
    $('search-input').addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      render();
    });

    // Task Card Actions & Member Profile Click & Detail Popup
    $('tasks').addEventListener('click', async (e) => {
      // 1. Cek profil anggota: jika klik badge nama PJ, buka halaman profilnya (jangan buka popup detail)
      const profileBadge = e.target.closest('[data-view-profile]');
      if (profileBadge) {
        openProfilePage(profileBadge.dataset.viewProfile);
        return;
      }

      // 2. Cek aksi tombol langsung
      const btn = e.target.closest('[data-act]');
      if (btn) {
        const act = btn.dataset.act;
        const taskId = Number(btn.dataset.id);
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        if (act === 'view-detail') {
          openTaskDetailModal(task);
          return;
        }

        if (act === 'submit-task') {
          if (!currentUser) {
            alert('Akses Dibatasi: Silakan login terlebih dahulu sebagai member untuk mengumpulkan hasil tugas!');
            openLoginModal(task.owner || '');
            return;
          }
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
          if (!currentUser) {
            alert('Akses Dibatasi: Silakan login terlebih dahulu untuk membatalkan klaim tugas!');
            openLoginModal(task.owner || '');
            return;
          }

          const isOwner = task.owner && task.owner.toLowerCase() === currentUser.toLowerCase();
          if (!isOwner && !isReihan()) {
            alert(`Akses Dibatasi: Tugas #${task.id} adalah milik ${task.owner}. Hanya ${task.owner} atau Reihan yang memiliki wewenang untuk membatalkan klaim tugas!`);
            return;
          }

          const canCancel = confirm(`Batalkan klaim tugas #${taskId} (${task.title})?\nStatus tugas akan dikembalikan menjadi Available.`);
          if (!canCancel) return;

          const res = await API.updateStatus(taskId, 'open', currentUser);
          if (res && res.success === false) {
            alert(res.message || 'Gagal membatalkan klaim tugas.');
            return;
          }

          task.status = 'open';
          task.claimedBy = '';
          saveLocalBackup();
          render();
          const canceledBy = isReihan() && !isOwner ? 'Reihan' : currentUser;
          showToast(`Klaim tugas #${taskId} dibatalkan oleh ${canceledBy} (Available kembali).`, '↩');
          return;
        }

        if (act === 'mark-done') {
          if (!currentUser) {
            alert('Akses Dibatasi: Silakan login terlebih dahulu untuk menandai tugas ini selesai.');
            openLoginModal(task.owner || '');
            return;
          }

          const isOwner = task.owner && task.owner.toLowerCase() === currentUser.toLowerCase();
          if (!isOwner && !isReihan()) {
            alert(`Akses Dibatasi: Tugas #${task.id} adalah milik ${task.owner}. Hanya ${task.owner} atau Reihan yang dapat menandai tugas ini selesai!`);
            return;
          }

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
          if (!currentUser) {
            alert('Akses Dibatasi: Silakan login terlebih dahulu. Hanya Reihan (Project Lead) yang berwenang membuka kembali tugas!');
            openLoginModal();
            return;
          }
          if (!isReihan()) {
            alert('Akses Dibatasi: Hanya Reihan (Project Lead) yang memiliki wewenang untuk membuka kembali tugas yang sudah selesai!');
            return;
          }

          await API.updateStatus(taskId, 'doing');
          task.status = 'doing';
          saveLocalBackup();
          render();
          showToast(`Tugas #${taskId} dibuka kembali oleh Reihan.`);
          return;
        }
      }

      // 3. Jika klik link (misal link Figma/Drive) atau klik di dalam kontainer tombol aksi, jangan buka popup
      if (e.target.closest('a') || e.target.closest('.task-actions')) {
        return;
      }

      // 4. Klik kartu tugas (task card) -> Buka modal rincian & penjelasan jobdesk!
      const taskCard = e.target.closest('.task');
      if (taskCard) {
        const taskId = Number(taskCard.dataset.id);
        const task = tasks.find(t => t.id === taskId);
        if (task) {
          openTaskDetailModal(task);
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
