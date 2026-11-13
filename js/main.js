/* =========================================================
   OUTBREAK official site
   Semua teks dan link yang perlu diganti ada di CONFIG dan
   data di bawah ini. Sisanya tidak perlu disentuh.
   ========================================================= */

const CONFIG = {
  // ID video YouTube trailer (bagian setelah "v=" di URL). Kosong = tampil screenshot + "Trailer coming soon".
  trailerYouTubeId: "",

  // URL form newsletter (misal Formspree: https://formspree.io/f/xxxx). Kosong = form belum aktif.
  newsletterAction: "",

  // Link yang masih kosong otomatis tampil "Coming soon" (tidak membuka tab baru).
  links: {
    discord: "",
    youtube: "",
    facebook: "",
    email: "", // contoh: "mailto:studio@domain.com"
    presskit: "",
  },

  // Tombol download di bagian atas. href kosong = tombol tampil "Coming soon" dan tidak bisa diklik.
  // Windows PC : isi dengan link file .zip hasil build Unity, contoh "downloads/OUTBREAK_v0.1_Windows.zip"
  //              (taruh file zip di folder website/downloads/) atau link halaman itch.io.
  // itch.io    : isi dengan URL halaman game, contoh "https://rrbystudio.itch.io/outbreak"
  // Google Play: biarkan kosong sampai versi Android benar-benar dibuat. Hapus barisnya kalau tidak jadi.
  stores: [
    { icon: "windows", small: "Download for", name: "Windows PC", href: "" },
    { icon: "itch", small: "Available on", name: "itch.io", href: "" },
    { icon: "gplay", small: "Get it on", name: "Google Play", href: "" },
  ],

  // true = tampilkan NIM di kartu tim. Default disembunyikan karena website ini publik.
  showStudentId: false,
};

const isLive = (href) => !!href && href !== "#";

/* ---------- game data (dari OutbreakUIManager & scene) ---------- */

const HEROES = [
  {
    id: "alekk",
    name: "ALEKK",
    role: "All-Rounder",
    hp: 100, atk: 40, spd: 235,
    unlock: 0,
    quote: "Headphones on. Hood up.\nNobody gets left behind.",
    desc: "The hero every survivor starts with. ALEKK knows every alley of the dead city and carries LUCKY, an old revolver that has never jammed. Balanced health, damage and speed make ALEKK the safe pick for any zone.",
    art: { kind: "alekk" },
    face: { src: "assets/art/hero_run.png", w: "230%", x: "-51%", y: "-14%", flip: true },
  },
  {
    id: "erika",
    name: "ERIKA",
    role: "Speedster",
    hp: 80, atk: 55, spd: 280,
    soon: true, // true = belum bisa dimainkan: siluet + "Coming soon", stat disembunyikan
    quote: "Fast feet,\nfaster trigger.",
    desc: "The quickest runner in the city, trading health for speed and a sharper shot. ERIKA joins the fight in a future update.",
    art: { kind: "img", src: "assets/art/erika_run.png", W: 372, H: 233, box: [44, 0, 262, 233] },
    face: { src: "assets/art/erika_run.png", w: "300%", x: "-46%", y: "-10%" },
  },
  {
    id: "hank",
    name: "HANK",
    role: "Tank",
    hp: 160, atk: 60, spd: 180,
    soon: true,
    quote: "Slow down.\nLet them come to me.",
    desc: "A wall in a green hoodie, trading speed for the most health and the heaviest hits. HANK joins the fight in a future update.",
    art: { kind: "img", src: "assets/art/hank_run.png", W: 372, H: 233, box: [44, 0, 262, 233] },
    face: { src: "assets/art/hank_run.png", w: "300%", x: "-46%", y: "-10%" },
  },
];

const HERO_MAX = { hp: 200, atk: 100, spd: 300 };

// Siluet hitam untuk hero yang masih "Coming soon": dibuat dari art ALEKK terbaru (sama dengan
// 10_game_art_png/sil_hero_hires.png di UI kit). Art asli di `art`/`face` dipakai lagi begitu soon dihapus.
const SILHOUETTE = {
  art: { kind: "img", src: "assets/art/sil_hero.png", W: 1088, H: 920, box: [0, 0, 1088, 920] },
  face: { src: "assets/art/sil_hero.png", w: "160%", x: "-36%", y: "14%" },
};

const ZONES = [
  {
    name: "Highway", diff: "EASY", color: "#FFC870",
    objective: "Kill 20 zombie", cond: "90 sec", reward: 100,
    desc: "The road out of the city is a graveyard of wrecked buses and abandoned cars. Barricades and traffic cones are all that stand between you and the first wave.",
  },
  {
    name: "Bridge", diff: "NORMAL", color: "#C6F26B",
    objective: "Survive 150 sec", cond: "4 waves • runners", reward: 300,
    desc: "A snapped suspension bridge hangs over black water. There is nowhere to run, and the runners know it. Hold the line until the clock hits zero.",
  },
  {
    name: "Water Tower", diff: "HARD", color: "#CD94FF",
    objective: "Defend barricade", cond: "Kill 65 • HP > 50%", reward: 650,
    desc: "A rusted tower leaks something green into the plaza, and the horde keeps coming back to it. Keep the barricade standing and your health above half.",
  },
  {
    name: "Downtown", diff: "EXPERT", color: "#8FD6FF",
    objective: "Survive toxic fog", cond: "240 sec • no medkit", reward: 1400,
    desc: "Glass towers cracked open and streets choked with toxic fog. No medkits allowed. Just you, your gun and four long minutes.",
  },
  {
    name: "The Nest", diff: "NIGHTMARE", color: "#FF8A8A",
    objective: "Slay mutant boss", cond: "100 zombie + Tyrant", reward: 3000,
    desc: "Ground zero. The ruins where it all began, and where something big is still waiting. Cut through a hundred zombies to face the TYRANT.",
  },
];

const ROADMAP = [
  {
    date: "2026 · Nov", title: "Demo v0.1", stamp: "Out now",
    note: "ALEKK, 5 zones, 3 guns and the first playable build.",
    art: '<img src="assets/art/skull_big.png" alt="">',
  },
  {
    date: "Next update", title: "Erika & Hank", stamp: "Coming soon", locked: true,
    note: "Two new heroes are on their way to join ALEKK.",
    art: '<div class="trio trio--sil"><img src="assets/art/sil_hero.png" alt=""><img src="assets/art/sil_hero.png" alt=""></div><img class="rcard__lock" src="assets/icons/uiicon_lock.png" alt="">',
  },
  {
    date: "Later", title: "New Zones", stamp: "Coming soon", locked: true,
    note: "More of the city to clear. Stay tuned.",
    art: '<img src="assets/zones/ikon_misi_5_the_nest@2x.png" alt=""><img class="rcard__lock" src="assets/icons/uiicon_lock.png" alt="">',
  },
  {
    date: "TBA", title: "Full Release", stamp: "Coming soon", locked: true,
    note: "The whole outbreak, start to finish.",
    art: '<img src="assets/sprites/heavy/r0_c0.png" alt=""><img class="rcard__lock" src="assets/icons/uiicon_lock.png" alt="">',
  },
];

// Tim RRBY Studio. pos = titik fokus foto (x% y%), zoom = perbesar foto kalau orangnya kecil di gambar.
const TEAM = [
  { name: "M. Reihan Fahreza", nim: "4352511014", roles: ["Project Manager", "UI/UX", "Programmer"], photo: "assets/team/reihan.png", pos: "50% 22%" },
  { name: "M. Arroyan", nim: "4352511019", roles: ["2D Artist (Hero)", "SFX"], photo: "assets/team/arroyan.webp", pos: "42% 34%" },
  { name: "Bintang Raffi Pasha Islami", nim: "4352511013", roles: ["Sound Designer"], photo: "assets/team/bintang.webp", pos: "57% 74%", zoom: 1.7 },
  { name: "Zahara Febriani Ahmad", nim: "4352511007", roles: ["2D Artist (Zombie)"], photo: "assets/team/zahara.webp", pos: "45% 32%" },
];

const NEWS = [
  {
    tag: "Update", date: "2026.11.13", img: "assets/zones/thumb3.jpg",
    title: "OUTBREAK Demo v0.1 is here",
    text: "Five zones, three guns and one very bad day in the city. Grab the demo and see how far you get.",
  },
  {
    tag: "Heroes", date: "2026.11.13", img: "assets/zones/thumb2.jpg",
    title: "Two new heroes are coming",
    text: "ERIKA the speedster and HANK the tank are on their way to join ALEKK in a future update.",
  },
  {
    tag: "Dev", date: "2026.11.13", img: "assets/zones/thumb5.jpg",
    title: "Welcome to the official OUTBREAK site",
    text: "News, patch notes and community events will land here first.",
  },
];

/* ---------- icons ---------- */

const ICON = {
  discord: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.6 5.6a16.6 16.6 0 0 0-4.2-1.3l-.5 1.1a15.4 15.4 0 0 0-5.8 0l-.5-1.1a16.6 16.6 0 0 0-4.2 1.3C1.8 9.6 1.1 13.5 1.4 17.3a16.8 16.8 0 0 0 5.1 2.6l1.1-1.8c-.6-.2-1.2-.5-1.7-.8l.4-.3a11.9 11.9 0 0 0 11.4 0l.4.3c-.5.3-1.1.6-1.7.8l1.1 1.8a16.8 16.8 0 0 0 5.1-2.6c.4-4.4-.7-8.3-3-11.7zM8.7 15c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15.1V8.9l5.4 3.1z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3V14h2.8v8z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.6 8.5-6.6"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
  windows: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 5.2 10.4 4v7.3H3zm8.4-1.4L21 2.5v8.8h-9.6zM3 12.7h7.4V20L3 18.8zm8.4 0H21v8.8l-9.6-1.3z"/></svg>',
  itch: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7 6.5h10a5 5 0 0 1 4.9 6l-.9 4.3a2.5 2.5 0 0 1-4.2 1.3l-2.2-2.3H9.4l-2.2 2.3A2.5 2.5 0 0 1 3 16.8l-.9-4.3A5 5 0 0 1 7 6.5zm.2 3.2v1.6H5.6v1.5h1.6v1.6h1.5v-1.6h1.6v-1.5H8.7V9.7zm8.9.1a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zm2 2.4a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z"/></svg>',
  gplay: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#00d7fe" d="M3.6 2.3 13.3 12l-9.7 9.7c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1z"/><path fill="#ffce00" d="m16.6 15.3-3.3-3.3 3.3-3.3 3.8 2.2c1 .6 1 1.6 0 2.2z"/><path fill="#ff3a44" d="M16.6 15.3 13.3 12l-9.7 9.7c.4.2.9.2 1.4-.1z"/><path fill="#00f076" d="M16.6 8.7 5 2.4c-.5-.3-1-.3-1.4-.1l9.7 9.7z"/></svg>',
  heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#ff4d4d" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 4.3 2.5h2c.7-1.3 2.2-2.5 4.3-2.5 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>',
  bullet: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#ff9d1f" d="M9 9c0-3.5 1.4-6 3-7 1.6 1 3 3.5 3 7v9H9zm-1 10h8v3H8z"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#ffd400" d="M13.5 2 4 14h6.5L9.5 22 20 9.5h-6.6z"/></svg>',
};

/* ---------- helpers ---------- */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const pad2 = (n) => String(n).padStart(2, "0");
const fmt = (n) => n.toLocaleString("en-US");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const nl2br = (s) => esc(s).replace(/\n/g, "<br>");

function frames(dir, row, count) {
  return Array.from({ length: count }, (_, c) => `assets/sprites/${dir}/r${row}_c${c}.png`);
}

function spriteLoop(img, list, fps) {
  list.forEach((src) => { const i = new Image(); i.src = src; });
  let f = 0;
  return setInterval(() => { f = (f + 1) % list.length; img.src = list[f]; }, 1000 / fps);
}

/* =========================================================
   SOUND
   ========================================================= */

const Sound = {
  on: false,
  bgm: $("#bgm"),
  btn: $("#btnSound"),
  click: null,

  init() {
    this.bgm.volume = 0;
    this.btn.addEventListener("click", () => this.toggle());
    document.addEventListener("click", (e) => {
      if (!this.on) return;
      if (e.target.closest(".kbtn, .btn-round, .wheel__item, .zthumb, .board__arrow, .diamond a, .btn-trailer, .gnb a, .btn-more"))
        this.sfx();
    });
  },

  toggle(force) {
    this.on = typeof force === "boolean" ? force : !this.on;
    this.btn.setAttribute("aria-pressed", String(this.on));
    this.btn.setAttribute("aria-label", this.on ? "Turn music off" : "Turn music on");
    if (this.on) {
      this.bgm.play().then(() => this.fade(0.42)).catch(() => this.toggle(false));
    } else {
      this.fade(0, () => this.bgm.pause());
    }
  },

  fade(to, done) {
    cancelAnimationFrame(this._raf);
    const from = this.bgm.volume;
    const t0 = performance.now();
    const step = (t) => {
      // timestamp rAF bisa sedikit lebih kecil dari t0, jadi k dijepit ke 0..1
      const k = Math.max(0, Math.min(1, (t - t0) / 600));
      this.bgm.volume = Math.max(0, Math.min(1, from + (to - from) * k));
      if (k < 1) this._raf = requestAnimationFrame(step);
      else if (done) done();
    };
    this._raf = requestAnimationFrame(step);
  },

  sfx() {
    if (!this.click) this.click = new Audio("assets/audio/ui_click.ogg");
    const a = this.click.cloneNode();
    a.volume = 0.5;
    a.play().catch(() => {});
  },

  duck(on) {
    if (!this.on) return;
    this.fade(on ? 0 : 0.42, on ? () => this.bgm.pause() : null);
    if (!on) this.bgm.play().catch(() => {});
  },
};

/* =========================================================
   EMBERS (partikel bara api)
   ========================================================= */

// Bara api digambar dari sprite cahaya yang dibuat sekali di awal (bukan shadowBlur per partikel,
// yang sangat berat), resolusi 1x, dan gerakannya mengikuti waktu supaya sama di layar 60/90/144 Hz.
class Embers {
  constructor(canvas, density = 1) {
    this.c = canvas;
    this.ctx = canvas.getContext("2d");
    this.density = density;
    this.parts = [];
    this.running = false;
    this.sprites = [Embers.glow(24), Embers.glow(48)]; // oranye, kuning
    this.resize = this.resize.bind(this);
    this.tick = this.tick.bind(this);
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  static glow(hue) {
    const s = 32, c = document.createElement("canvas");
    c.width = c.height = s;
    const g = c.getContext("2d");
    const grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    grd.addColorStop(0, `hsla(${hue}, 100%, 78%, 1)`);
    grd.addColorStop(0.16, `hsla(${hue}, 100%, 60%, .95)`);
    grd.addColorStop(0.42, `hsla(${hue}, 100%, 50%, .28)`);
    grd.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`);
    g.fillStyle = grd;
    g.fillRect(0, 0, s, s);
    return c;
  }

  resize() {
    const w = this.c.clientWidth, h = this.c.clientHeight;
    this.w = w; this.h = h;
    this.c.width = w; this.c.height = h;
    const n = Math.round((w * h) / 20000 * this.density);
    this.parts = Array.from({ length: n }, () => this.spawn(true));
  }

  spawn(anywhere) {
    const r = Math.random() * 1.8 + 0.6;
    return {
      x: Math.random() * this.w,
      y: anywhere ? Math.random() * this.h : this.h + 10,
      d: r * 7,
      vy: Math.random() * 0.6 + 0.25,
      vx: (Math.random() - 0.5) * 0.3,
      sway: Math.random() * Math.PI * 2,
      life: Math.random() * 0.6 + 0.4,
      img: this.sprites[Math.random() < 0.8 ? 0 : 1],
    };
  }

  start() { if (!this.running && !reduceMotion) { this.running = true; this.last = 0; requestAnimationFrame(this.tick); } }
  stop() { this.running = false; }

  tick(t) {
    if (!this.running) return;
    const k = this.last ? Math.min(3, (t - this.last) / 16.67) : 1;
    this.last = t;
    const { ctx } = this;
    ctx.clearRect(0, 0, this.w, this.h);
    ctx.globalCompositeOperation = "lighter";
    for (const p of this.parts) {
      p.sway += 0.02 * k;
      p.y -= p.vy * k;
      p.x += (p.vx + Math.sin(p.sway) * 0.35) * k;
      if (p.y < -10) Object.assign(p, this.spawn(false));
      const fade = Math.min(1, p.y / (this.h * 0.35));
      const a = p.life * fade * (0.6 + 0.4 * Math.sin(t / 300 + p.sway));
      if (a <= 0.01) continue;
      ctx.globalAlpha = a;
      ctx.drawImage(p.img, p.x - p.d / 2, p.y - p.d / 2, p.d, p.d);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    requestAnimationFrame(this.tick);
  }
}

/* =========================================================
   FULLPAGE
   ========================================================= */

const FP = {
  el: $("#fp"),
  secs: $$(".sec"),
  idx: 0,
  enabled: false,
  locked: false,
  mq: matchMedia("(min-width: 1025px) and (min-height: 560px)"),
  listeners: [],

  init() {
    this.mq.addEventListener("change", () => this.setMode());
    this.setMode();

    document.addEventListener("click", (e) => {
      const a = e.target.closest("[data-goto]");
      if (!a) return;
      e.preventDefault();
      Nav.close();
      const t = a.dataset.goto;
      this.goTo(/^\d+$/.test(t) ? +t : this.secs.findIndex((s) => s.id === t));
      if (a.dataset.focus === "stores") flashStores();
    });

    window.addEventListener("resize", () => { if (this.enabled) this.apply(false); });
  },

  setMode() {
    const want = this.mq.matches;
    document.documentElement.classList.toggle("fp-on", want);
    this.enabled = want;
    this.unbind();
    if (want) {
      window.scrollTo(0, 0);
      this.bindDesktop();
      this.apply(false);
      this.settleNear();
    } else {
      this.el.style.transform = "";
      this.bindMobile();
    }
    this.activate(this.idx);
  },

  on(target, type, fn, opts) {
    target.addEventListener(type, fn, opts);
    this.listeners.push(() => target.removeEventListener(type, fn, opts));
  },

  unbind() { this.listeners.forEach((off) => off()); this.listeners = []; if (this.io) this.io.disconnect(); },

  bindDesktop() {
    let acc = 0, accTimer;
    this.on(window, "wheel", (e) => {
      if (Modal.open || e.ctrlKey) return;
      e.preventDefault();
      if (this.locked) return;
      acc += e.deltaY;
      clearTimeout(accTimer);
      accTimer = setTimeout(() => { acc = 0; }, 160);
      if (Math.abs(acc) < 24) return;
      this.goTo(this.idx + (acc > 0 ? 1 : -1));
      acc = 0;
    }, { passive: false });

    let y0 = null;
    this.on(window, "touchstart", (e) => { y0 = e.touches[0].clientY; }, { passive: true });
    this.on(window, "touchend", (e) => {
      if (y0 === null || Modal.open) return;
      const dy = y0 - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 50) this.goTo(this.idx + (dy > 0 ? 1 : -1));
      y0 = null;
    });

    this.on(window, "keydown", (e) => {
      if (Modal.open || /input|textarea|select/i.test(e.target.tagName)) return;
      const k = e.key;
      if (["ArrowDown", "PageDown", " "].includes(k)) { e.preventDefault(); this.goTo(this.idx + 1); }
      else if (["ArrowUp", "PageUp"].includes(k)) { e.preventDefault(); this.goTo(this.idx - 1); }
      else if (k === "Home") { e.preventDefault(); this.goTo(0); }
      else if (k === "End") { e.preventDefault(); this.goTo(this.secs.length - 1); }
    });
  },

  bindMobile() {
    this.io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && en.intersectionRatio > 0.3) {
          en.target.classList.add("is-active");
          const i = this.secs.indexOf(en.target);
          this.idx = i;
          document.body.dataset.section = i;
          Nav.mark(i);
          onSection(i);
        }
      });
    }, { threshold: [0.3, 0.6] });
    this.secs.forEach((s) => this.io.observe(s));
  },

  offsetOf(i) {
    const max = this.el.scrollHeight - window.innerHeight;
    return Math.min(this.secs[i].offsetTop, max);
  },

  apply(animate = true) {
    if (!animate) this.el.style.transition = "none";
    this.el.style.transform = `translate3d(0, ${-this.offsetOf(this.idx)}px, 0)`;
    if (!animate) { void this.el.offsetHeight; this.el.style.transition = ""; }
  },

  goTo(i) {
    i = Math.max(0, Math.min(this.secs.length - 1, i));
    if (!this.enabled) {
      const top = i === 0 ? 0 : this.secs[i].getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
      return;
    }
    if (i === this.idx) return;
    this.locked = true;
    this.setNear(this.idx, i);
    this.idx = i;
    this.apply(true);
    this.activate(i);
    setTimeout(() => { this.locked = false; }, 1100);
  },

  // Section yang dilewati selama transisi ikut digambar; setelah sampai, hanya section aktif yang tetap tampil.
  setNear(from, to) {
    const lo = Math.min(from, to), hi = Math.max(from, to);
    this.secs.forEach((s, k) => s.classList.toggle("is-near", k >= lo && k <= hi));
    clearTimeout(this._near);
    this._near = setTimeout(() => this.settleNear(), 1150);
  },

  settleNear() {
    const i = this.idx, isFooter = this.secs[i].id === "footer";
    this.secs.forEach((s, k) => s.classList.toggle("is-near", k === i || (isFooter && k === i - 1)));
  },

  activate(i) {
    document.body.dataset.section = i;
    Nav.mark(i);
    history.replaceState(null, "", i === 0 ? location.pathname + location.search : "#" + this.secs[i].id);
    if (!this.enabled) return;
    const isFooter = this.secs[i].id === "footer";
    this.secs.forEach((s, k) => {
      const keep = k === i || (isFooter && k === i - 1);
      if (!keep) s.classList.remove("is-active");
    });
    clearTimeout(this._t);
    this._t = setTimeout(() => {
      this.secs[i].classList.add("is-active");
      if (isFooter && i > 0) this.secs[i - 1].classList.add("is-active");
    }, 260);
    onSection(i);
  },
};

function onSection(i) {
  const id = FP.secs[i].id;
  if (embersHome) (id === "home" ? embersHome.start() : embersHome.stop());
  if (embersComm) (id === "community" || id === "footer" ? embersComm.start() : embersComm.stop());
}

function flashStores() {
  const s = $("#stores");
  s.animate(
    [{ transform: "scale(1)" }, { transform: "scale(1.06)" }, { transform: "scale(1)" }],
    { duration: 600, delay: 700, easing: "ease-out", iterations: 2 }
  );
}

/* =========================================================
   NAV
   ========================================================= */

const Nav = {
  gnb: $("#gnb"),
  burger: $("#burger"),

  init() {
    this.burger.addEventListener("click", () => this.toggle());
  },

  toggle(force) {
    const open = typeof force === "boolean" ? force : !this.gnb.classList.contains("is-open");
    this.gnb.classList.toggle("is-open", open);
    this.burger.setAttribute("aria-expanded", String(open));
    this.burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open && !FP.enabled ? "hidden" : "";
  },

  close() { if (this.gnb.classList.contains("is-open")) this.toggle(false); },

  mark(i) {
    $$("[data-nav]").forEach((a) => {
      a.classList.toggle("is-active", a.dataset.nav.split(",").includes(FP.secs[i].id));
    });
  },
};

/* =========================================================
   HOME: stores + socials
   ========================================================= */

function renderStores() {
  $("#stores").innerHTML = CONFIG.stores.map((s) => {
    const live = isLive(s.href);
    const inner = `${ICON[s.icon] || ""}<span><small>${esc(live ? s.small : "Coming soon")}</small><b>${esc(s.name)}</b></span>`;
    if (!live) return `<span class="store is-soon" aria-disabled="true">${inner}</span>`;
    const isFile = /\.(zip|exe|7z|rar)$/i.test(s.href);
    return `<a class="store" href="${esc(s.href)}" ${isFile ? "download" : 'target="_blank" rel="noopener"'}>${inner}</a>`;
  }).join("");
}

// Atribut link: link asli buka tab baru, link kosong cuma munculin "Coming soon".
function linkAttrs(href) {
  if (!isLive(href)) return 'href="#" data-soon';
  return /^mailto:/i.test(href) ? `href="${esc(href)}"` : `href="${esc(href)}" target="_blank" rel="noopener"`;
}

document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-soon]");
  if (!a) return;
  e.preventDefault();
  toast("Coming soon!");
});

function renderTeam() {
  $("#teamGrid").innerHTML = TEAM.map((m, i) => `
    <li class="tcard" style="--d:${i}">
      <div class="tcard__photo">
        <img src="${m.photo}" alt="${esc(m.name)}" loading="lazy" style="object-position:${m.pos || "50% 30%"};--z:${m.zoom || 1};transform-origin:${m.pos || "50% 30%"}">
        <span class="tcard__no">#${pad2(i + 1)}</span>
      </div>
      <div class="tcard__plate">
        <h3 class="tcard__name">${esc(m.name)}</h3>
        ${CONFIG.showStudentId && m.nim ? `<p class="tcard__nim">${esc(m.nim)}</p>` : ""}
      </div>
      <ul class="tcard__roles">${m.roles.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
    </li>`).join("");

  $("#footerCredits").innerHTML = "Made by RRBY Studio: " +
    TEAM.map((m) => `${esc(m.name)} <span>(${m.roles.map(esc).join(", ")})</span>`).join(" &middot; ");
}

function renderSocials() {
  const L = CONFIG.links;
  const items = [
    ["discord", "Discord", L.discord],
    ["youtube", "YouTube", L.youtube],
    ["facebook", "Facebook", L.facebook],
    ["mail", "Email", L.email],
  ];
  $("#socials").innerHTML =
    items.map(([ic, label, href]) => `<li><a class="btn-round" ${linkAttrs(href)} aria-label="${label}">${ICON[ic]}</a></li>`).join("") +
    `<li><button class="btn-round" type="button" id="btnShare" aria-label="Share">${ICON.share}</button></li>`;

  $("#btnShare").addEventListener("click", async () => {
    const data = { title: document.title, url: location.href.split("#")[0] };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(data.url); toast("Link copied!"); }
    } catch (_) { /* dibatalkan */ }
  });

  $("#diamonds").innerHTML = items.map(([ic, label, href], k) => `
    <li class="diamond diamond--${ic}">
      <a ${linkAttrs(href)} aria-label="${label}">${ICON[ic]}</a>
      <span class="diamond__label">${label}</span>
      ${k === 0 ? `<p class="bubble"><i class="bubble__face" aria-hidden="true"></i><span>Official community<br>for survivors!</span></p>` : ""}
    </li>`).join("");

  const setLink = (a, href) => {
    if (isLive(href)) { a.href = href; a.removeAttribute("data-soon"); if (!/^mailto:/i.test(href)) { a.target = "_blank"; a.rel = "noopener"; } }
    else { a.href = "#"; a.setAttribute("data-soon", ""); }
  };
  setLink($("#presskit"), L.presskit);
  $$(".js-presskit").forEach((a) => setLink(a, L.presskit));
  $$(".js-contact").forEach((a) => setLink(a, L.email));
}

function toast(msg) {
  const t = document.createElement("div");
  t.textContent = msg;
  Object.assign(t.style, {
    position: "fixed", left: "50%", bottom: "90px", transform: "translateX(-50%)", zIndex: 300,
    padding: "10px 18px", background: "#F2C200", color: "#0B0B0B", font: "900 15px Inter, sans-serif",
    border: "3px solid #0B0B0B", boxShadow: "3px 4px 0 rgba(0,0,0,.6)",
  });
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1800);
}

/* =========================================================
   HEROES
   ========================================================= */

const Heroes = {
  cur: 0,
  art: $("#heroArt"),
  wheel: $("#heroWheel"),
  info: $("#heroInfo"),
  moreBtn: $("#heroMoreBtn"),
  more: $("#heroMore"),

  init() {
    this.wheel.innerHTML = HEROES.map((h, i) => {
      const f = h.soon ? SILHOUETTE.face : h.face;
      return `
      <button class="wheel__item${h.soon ? " is-soon" : ""}" type="button" role="tab" data-i="${i}" aria-label="${h.name}${h.soon ? " (coming soon)" : ""}">
        <span class="wheel__face"><img src="${f.src}" alt="" style="--fw:${f.w};--fx:${f.x};--fy:${f.y};${f.flip ? "transform:scaleX(-1)" : ""}">${h.soon ? '<img class="wheel__lock" src="assets/icons/uiicon_lock.png" alt="">' : ""}</span>
        <span class="wheel__tag">${h.name}</span>
      </button>`;
    }).join("");

    this.wheel.addEventListener("click", (e) => {
      const b = e.target.closest(".wheel__item");
      if (b) this.select(+b.dataset.i);
    });

    this.moreBtn.addEventListener("click", () => {
      const open = this.moreBtn.getAttribute("aria-expanded") !== "true";
      this.moreBtn.setAttribute("aria-expanded", String(open));
      this.moreBtn.setAttribute("aria-label", open ? "Show less" : "Read more");
      this.more.classList.toggle("is-open", open);
    });

    window.addEventListener("keydown", (e) => {
      if (Modal.open || FP.secs[FP.idx].id !== "heroes") return;
      if (e.key === "ArrowRight") this.select((this.cur + 1) % HEROES.length);
      if (e.key === "ArrowLeft") this.select((this.cur - 1 + HEROES.length) % HEROES.length);
    });

    this.select(0, true);
  },

  figure(h) {
    const a = h.soon ? SILHOUETTE.art : h.art;
    if (a.kind === "alekk") {
      const cid = `fist-${++this._uid || (this._uid = 1)}`;
      return `<svg class="hero-figure__img hero-figure__img--svg" viewBox="0 0 1088 920" preserveAspectRatio="xMidYMax meet" style="aspect-ratio:1088/920;scale:-1 1" role="img" aria-label="${h.name}">
        <defs><clipPath id="${cid}"><path clip-rule="evenodd" d="M-200-200H1300V1200H-200ZM700 524 812 520 845 560 848 615 832 645 780 652 700 632Z"/></clipPath></defs>
        <image href="assets/art/hero_run_tanpa_pistol.png" width="993" height="920"/>
        <g clip-path="url(#${cid})"><image href="assets/art/gun_lucky.png" x="717.8" y="414.1" width="372.5" height="257.3"/></g>
      </svg>`;
    }
    const [x, y, w, hh] = a.box;
    return `<svg class="hero-figure__img hero-figure__img--svg" viewBox="${x} ${y} ${w} ${hh}" preserveAspectRatio="xMidYMax meet" style="aspect-ratio:${w}/${hh}" role="img" aria-label="${h.name}">
      <image href="${a.src}" width="${a.W}" height="${a.H}"/>
    </svg>`;
  },

  select(i, first = false) {
    const h = HEROES[i];
    this.cur = i;

    // wheel
    const n = HEROES.length;
    $$(".wheel__item", this.wheel).forEach((b, k) => {
      let rel = k - i;
      if (rel > n / 2) rel -= n;
      if (rel < -n / 2) rel += n;
      b.style.setProperty("--a", `${rel * 13}deg`);
      b.style.order = rel;
      b.classList.toggle("is-active", rel === 0);
      b.classList.toggle("is-off", rel !== 0);
      b.classList.toggle("is-hidden", Math.abs(rel) > 1);
      b.setAttribute("aria-selected", String(rel === 0));
    });

    // stage
    const old = $$(".hero-figure", this.art);
    old.forEach((f) => { f.classList.remove("is-in"); f.classList.add("is-out"); setTimeout(() => f.remove(), 500); });
    const fig = document.createElement("div");
    fig.className = "hero-figure" + (!h.soon && h.art.kind === "img" ? " hero-figure--lowres" : "") + (h.soon ? " hero-figure--soon" : "");
    fig.innerHTML = this.figure(h) + (h.soon ? '<span class="hero-figure__stamp">Coming soon</span>' : "");
    this.art.appendChild(fig);
    void fig.offsetWidth; // paksa layout dulu supaya transisi masuknya tetap jalan
    fig.classList.add("is-in");

    // info
    const fill = () => {
      $("#heroName").textContent = h.name;
      $("#heroRole").textContent = h.role;
      const stat = (v) => (h.soon ? "???" : v);
      $("#heroChips").innerHTML = `
        <li>${ICON.heart}HP <b>${stat(h.hp)}</b></li>
        <li>${ICON.bullet}ATK <b>${stat(h.atk)}</b></li>
        <li>${ICON.bolt}SPD <b>${stat(h.spd)}</b></li>`;
      $("#heroQuote").innerHTML = nl2br(h.quote);
      $("#heroDesc").textContent = h.desc;
      const bar = (label, v, max, c) => {
        const on = Math.round((v / max) * 10);
        return `<div class="statbar" style="--c:${c}"><span>${label}</span><span class="statbar__track">${Array.from({ length: 10 }, (_, k) => `<i class="${k < on ? "on" : ""}"></i>`).join("")}</span><span class="statbar__val">${v}</span></div>`;
      };
      $("#heroStats").innerHTML = h.soon
        ? `<p class="statbar__note">Coming soon in a future update. Stats are still being tuned.</p>`
        : bar("HP", h.hp, HERO_MAX.hp, "#E53935") +
          bar("ATK", h.atk, HERO_MAX.atk, "#FF8F00") +
          bar("SPD", h.spd, HERO_MAX.spd, "#F2C200") +
          `<p class="statbar__note">Starter hero, free from day one</p>`;
      this.info.classList.toggle("is-soon", !!h.soon);
    };

    if (first) { fill(); return; }
    this.info.classList.add("is-swap");
    setTimeout(() => { fill(); this.info.classList.remove("is-swap"); }, 220);
  },
};

/* =========================================================
   ZONES
   ========================================================= */

const Zones = {
  cur: -1,
  sec: $("#zones"),

  init() {
    $("#zoneBgs").innerHTML = ZONES.map((_, i) => `<div class="zones__bg" style="background-image:url(assets/zones/zone${i + 1}.jpg)"></div>`).join("");
    const icons = ["1_highway", "2_bridge", "3_water_tower", "4_downtown", "5_the_nest"];
    $("#zoneThumbs").innerHTML = ZONES.map((z, i) => `
      <li><button class="zthumb" type="button" role="tab" data-i="${i}" style="--c:${z.color}" aria-label="Zone ${i + 1}: ${z.name}">
        <span class="zthumb__img"><img src="assets/zones/thumb${i + 1}.jpg" alt="" loading="lazy"></span>
        <span class="zthumb__badge"><img src="assets/zones/ikon_misi_${icons[i]}@2x.png" alt=""></span>
        <span class="zthumb__label">${z.name.toUpperCase()}</span>
      </button></li>`).join("");

    $("#zoneThumbs").addEventListener("click", (e) => {
      const b = e.target.closest(".zthumb");
      if (b) this.select(+b.dataset.i);
    });

    window.addEventListener("keydown", (e) => {
      if (Modal.open || FP.secs[FP.idx].id !== "zones") return;
      if (e.key === "ArrowRight") this.select((this.cur + 1) % ZONES.length);
      if (e.key === "ArrowLeft") this.select((this.cur - 1 + ZONES.length) % ZONES.length);
    });

    this.select(0, true);
  },

  select(i, first = false) {
    if (i === this.cur) return;
    this.cur = i;
    const z = ZONES[i];
    $$(".zones__bg").forEach((b, k) => b.classList.toggle("is-on", k === i));
    $$(".zthumb").forEach((b, k) => { b.classList.toggle("is-active", k === i); b.setAttribute("aria-selected", String(k === i)); });
    this.sec.style.setProperty("--zc", z.color);

    const fill = () => {
      $("#zoneEyebrow").textContent = `Zone ${pad2(i + 1)}`;
      $("#zoneTitle").textContent = z.name;
      $("#zoneMeta").innerHTML = `
        <span class="diff" style="--c:${z.color}">${z.diff}</span>
        <span class="intel"><img src="assets/art/w_skull.png" alt="">${esc(z.objective.toUpperCase())}</span>
        <span class="intel"><img src="assets/icons/uiicon_clock.png" alt="">${esc(z.cond.toUpperCase())}</span>
        <span class="intel"><img src="assets/icons/uiicon_trophy.png" alt="">REWARD <b>+${fmt(z.reward)}</b></span>`;
      $("#zoneDesc").textContent = z.desc;
    };

    if (first) { fill(); return; }
    const c = $("#zoneContent");
    c.classList.add("is-swap");
    setTimeout(() => { fill(); c.classList.remove("is-swap"); }, 260);
  },
};

/* =========================================================
   ROADMAP
   ========================================================= */

const Roadmap = {
  page: 0,
  track: $("#roadTrack"),

  init() {
    this.track.innerHTML = ROADMAP.map((r) => `
      <li class="rslot"><article class="rcard${r.locked ? " is-locked" : ""}">
        <p class="rcard__date">${esc(r.date)}</p>
        <h3 class="rcard__title">${esc(r.title)}</h3>
        <div class="rcard__art">${r.art}</div>
        <p class="rcard__note">${esc(r.note)}</p>
        <span class="rcard__stamp">${esc(r.stamp)}</span>
      </article></li>`).join("");

    $$("[data-sprite]", this.track).forEach((img) => spriteLoop(img, frames(img.dataset.sprite, 0, 6), 7));

    $("#roadPrev").addEventListener("click", () => this.go(this.page - 1));
    $("#roadNext").addEventListener("click", () => this.go(this.page + 1));
    window.addEventListener("resize", () => this.go(this.page, false));
    this.go(0, false);
  },

  perView() {
    const w = window.innerWidth;
    return w <= 640 ? 1 : w <= 1024 ? 2 : 3;
  },

  go(p, anim = true) {
    const pages = Math.max(1, ROADMAP.length - this.perView() + 1);
    this.page = Math.max(0, Math.min(pages - 1, p));
    const card = this.track.children[0];
    const gap = parseFloat(getComputedStyle(this.track).columnGap || getComputedStyle(this.track).gap) || 0;
    const step = card ? card.getBoundingClientRect().width + gap : 0;
    if (!anim) this.track.style.transition = "none";
    this.track.style.transform = `translateX(${-this.page * step}px)`;
    if (!anim) { void this.track.offsetHeight; this.track.style.transition = ""; }
    $("#roadPrev").disabled = this.page === 0;
    $("#roadNext").disabled = this.page >= pages - 1;
    $("#roadDots").innerHTML = Array.from({ length: pages }, (_, k) =>
      `<button type="button" class="${k === this.page ? "is-on" : ""}" data-p="${k}" aria-label="Page ${k + 1}"></button>`).join("");
    $$("#roadDots button").forEach((b) => b.addEventListener("click", () => this.go(+b.dataset.p)));
  },
};

/* =========================================================
   MODAL
   ========================================================= */

const Modal = {
  open: false,
  el: $("#modal"),
  title: $("#modalTitle"),
  body: $("#modalBody"),
  lastFocus: null,

  init() {
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-modal]");
      if (t) { e.preventDefault(); Nav.close(); this.show(t.dataset.modal); return; }
      if (e.target.closest("[data-close]")) this.hide();
    });
    window.addEventListener("keydown", (e) => {
      if (!this.open) return;
      if (e.key === "Escape") this.hide();
      if (e.key === "Tab") this.trap(e);
    });
  },

  views: {
    trailer() {
      const id = CONFIG.trailerYouTubeId;
      if (id) {
        Sound.duck(true);
        return ["Trailer", `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0" title="OUTBREAK trailer" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`];
      }
      return ["Trailer", `<div class="video"><img src="assets/shots/gameplay.png" alt="OUTBREAK gameplay: ALEKK fights zombies in the city"><p class="video__soon">Trailer coming soon<small>Here's a first look at the gameplay.</small></p></div>`];
    },
    news() {
      return ["News", `<div class="news">${NEWS.map((n) => `
        <a href="#" onclick="return false"><img src="${n.img}" alt="">
          <div><span class="news__tag">${esc(n.tag.toUpperCase())}</span><h4>${esc(n.title)}</h4><p>${esc(n.text)}</p><time>${n.date}</time></div>
        </a>`).join("")}</div>`];
    },
    guide() {
      return ["How to Play", `<div class="guide">
        <div class="guide__row"><span class="guide__keys"><kbd class="key">W</kbd><kbd class="key">A</kbd><kbd class="key">S</kbd><kbd class="key">D</kbd></span><div><b>Move</b><span>Run along the street and dodge.</span></div></div>
        <div class="guide__row"><span class="guide__keys"><kbd class="key key--red">CLICK</kbd></span><div><b>Shoot</b><span>Aim at the horde and fire.</span></div></div>
        <div class="guide__row"><span class="guide__keys"><kbd class="key">E</kbd></span><div><b>Medkit</b><span>Restore 50 HP.</span></div></div>
        <div class="guide__row"><span class="guide__keys"><kbd class="key">Q</kbd></span><div><b>Ammo box</b><span>Refill your gun.</span></div></div>
        <p class="guide__tip"><span class="tag-tip">TIP</span><span>Clear zones to earn cash, then spend it on guns and medkits in the SHOP.</span></p>
      </div>`];
    },
    subscribe() {
      return ["Newsletter", `<form class="form" id="subForm" novalidate>
        <p>Get patch notes, events and release news straight to your inbox.</p>
        <label for="subEmail">Email</label>
        <input type="email" id="subEmail" name="email" autocomplete="email" placeholder="you@example.com" required>
        <label class="form__check"><input type="checkbox" id="subAgree" required>I agree to receive OUTBREAK news by email. I can unsubscribe at any time.</label>
        <button class="kbtn kbtn--red" type="submit"><span>Subscribe</span></button>
        <p class="form__msg" id="subMsg" role="status"></p>
      </form>`];
    },
    legal() {
      return ["Legal", `<div class="legal"><p>This page is a placeholder for the OUTBREAK privacy policy and terms of service.</p><p>RRBY Studio will publish the full text here before the public release.</p></div>`];
    },
  },

  show(name) {
    const v = this.views[name];
    if (!v) return;
    const [title, html] = v();
    this.lastFocus = document.activeElement;
    this.title.textContent = title;
    this.body.innerHTML = html;
    this.el.classList.toggle("modal--narrow", name === "subscribe" || name === "legal");
    this.el.hidden = false;
    this.open = true;
    this.name = name;
    if (!FP.enabled) document.body.style.overflow = "hidden";
    $(".modal__close", this.el).focus();
    if (name === "subscribe") this.bindForm();
  },

  hide() {
    if (!this.open) return;
    if (this.name === "trailer" && CONFIG.trailerYouTubeId) Sound.duck(false);
    this.el.hidden = true;
    this.body.innerHTML = "";
    this.open = false;
    if (!FP.enabled) document.body.style.overflow = "";
    if (this.lastFocus) this.lastFocus.focus();
  },

  trap(e) {
    const f = $$('a[href], button, input, iframe, [tabindex]:not([tabindex="-1"])', this.el).filter((x) => !x.disabled && x.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  },

  bindForm() {
    const form = $("#subForm"), msg = $("#subMsg");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = $("#subEmail").value.trim();
      msg.className = "form__msg";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.classList.add("err"); msg.textContent = "Please enter a valid email address."; return; }
      if (!$("#subAgree").checked) { msg.classList.add("err"); msg.textContent = "Please tick the box to agree."; return; }
      if (!CONFIG.newsletterAction) { msg.classList.add("ok"); msg.textContent = "Newsletter sign-up opens soon. Join our Discord for now!"; return; }
      try {
        const r = await fetch(CONFIG.newsletterAction, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
        if (!r.ok) throw new Error();
        msg.classList.add("ok"); msg.textContent = "You're on the list. Stay alive out there!";
        form.reset();
      } catch (_) {
        msg.classList.add("err"); msg.textContent = "Couldn't subscribe right now. Please try again later.";
      }
    });
  },
};

/* =========================================================
   MASCOT
   ========================================================= */

function initMascot() {
  const img = $("#mascotImg"), btn = $("#mascot"), bub = $(".mascot__bubble");
  spriteLoop(img, frames("walker", 0, 4), 6);
  const lines = ["BRAAINS?", "Play OUTBREAK!", "Grrr...", "Join the Discord!", "Run, human!"];
  let k = 0, t;
  btn.addEventListener("click", () => {
    k = (k + 1) % lines.length;
    bub.textContent = lines[k];
    btn.classList.add("is-talking");
    clearTimeout(t);
    t = setTimeout(() => btn.classList.remove("is-talking"), 1800);
  });
}

/* =========================================================
   PRELOADER + BOOT
   ========================================================= */

let embersHome = null, embersComm = null;

function preload(list, onProgress) {
  let done = 0;
  return Promise.all(list.map((src) => new Promise((res) => {
    const i = new Image();
    i.onload = i.onerror = () => { done++; onProgress(done / list.length); res(); };
    i.src = src;
  })));
}

function boot() {
  $("#year").textContent = new Date().getFullYear();

  const fill = $("#loadFill"), pct = $("#loadPct"), runner = $("#loadRunner");
  const runTimer = spriteLoop(runner, frames("alekk", 4, 6), 12);
  let shown = 0, target = 0;
  const setP = (p) => {
    target = p;
  };
  const anim = setInterval(() => {
    shown += (target - shown) * 0.18 + 0.004;
    shown = Math.min(shown, target);
    const v = Math.round(shown * 100);
    fill.style.width = v + "%";
    runner.style.left = `min(${v}%, calc(100% - 150px))`;
    pct.textContent = v + "%";
  }, 30);

  const assets = [
    "assets/bg/hero.jpg", "assets/art/skull_big.png", "assets/art/logo_word.png", "assets/bg/stage.jpg",
    "assets/art/hero_run_tanpa_pistol.png", "assets/art/gun_lucky.png", "assets/zones/zone1.jpg",
    "assets/art/sil_hero.png", "assets/bg/map.jpg",
  ];

  const minTime = new Promise((r) => setTimeout(r, reduceMotion ? 200 : 1300));
  const hashIdx = $$(".sec").findIndex((s) => "#" + s.id === location.hash);
  document.body.dataset.section = Math.max(0, hashIdx);

  Promise.all([preload(assets, setP), minTime]).then(() => {
    setP(1);
    // tunggu bar benar-benar penuh dulu, baru tutup preloader
    const waitFull = setInterval(() => {
      if (shown < 0.999) return;
      clearInterval(waitFull);
      setTimeout(() => {
        clearInterval(anim);
        clearInterval(runTimer);
        document.body.classList.remove("is-loading");
        start();
      }, 280);
    }, 40);
  });

  renderStores();
  renderSocials();
  renderTeam();
  Sound.init();
  Nav.init();
  Modal.init();
  Heroes.init();
  Zones.init();
  Roadmap.init();
  initMascot();
}

function start() {
  embersHome = new Embers($("#embers"), 1);
  embersComm = new Embers($("#embers2"), 0.6);

  const hashIdx = FP.secs.findIndex((s) => "#" + s.id === location.hash);
  FP.idx = hashIdx > 0 ? hashIdx : 0;
  FP.init();
  if (!FP.enabled && hashIdx > 0) FP.secs[hashIdx].scrollIntoView();
  onSection(FP.idx);
}

boot();
