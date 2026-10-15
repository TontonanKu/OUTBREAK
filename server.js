const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Directories
const DATA_DIR = path.join(__dirname, 'data');
const TASKS_FILE = path.join(DATA_DIR, 'tasks.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const INITIAL_DATA_FILE = path.join(DATA_DIR, 'tasks.initial.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Backup initial file for reset functionality
if (fs.existsSync(TASKS_FILE) && !fs.existsSync(INITIAL_DATA_FILE)) {
  fs.copyFileSync(TASKS_FILE, INITIAL_DATA_FILE);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const sanitized = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${uniqueSuffix}-${sanitized}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 150 * 1024 * 1024 } // Up to 150MB for game assets & zips
});

// Helper: Read Tasks
function readTasks() {
  try {
    if (!fs.existsSync(TASKS_FILE)) return [];
    const data = fs.readFileSync(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading tasks:', err);
    return [];
  }
}

// Helper: Write Tasks
function writeTasks(tasks) {
  try {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing tasks:', err);
    return false;
  }
}

// Helper: Format Bytes
function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024, dm = 1;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Security: SHA-256 Hashes
// Reihan: akuganteng12
// Bintang, Royan, Eby: akujawa12
const HASH_REIHAN = "9ef7d1bdd38d8eb06541cc1586e0e73e45044fc4fc0eb8ca835ab1e8041d84f3";
const HASH_OTHERS = "7beeab3efa220b4ba7845d15801d06e26d048d271d2fa5c1978e0eadb0bcf417";
const VALID_MEMBERS = ['Reihan', 'Bintang', 'Royan', 'Eby'];

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// 1. Get all tasks
app.get('/api/tasks', (req, res) => {
  const tasks = readTasks();
  res.json({ success: true, tasks });
});

// 2. Auth: Login
app.post('/api/auth/login', (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ success: false, message: 'Nama dan password wajib diisi.' });
  }

  const isMemberValid = VALID_MEMBERS.some(m => m.toLowerCase() === name.toLowerCase());
  if (!isMemberValid) {
    return res.status(401).json({ success: false, message: 'Member tidak terdaftar.' });
  }

  // Hash input
  const inputHash = crypto.createHash('sha256').update(password).digest('hex');
  const isReihanUser = name.toLowerCase() === 'reihan';
  const expectedHash = isReihanUser ? HASH_REIHAN : HASH_OTHERS;

  if (inputHash !== expectedHash) {
    return res.status(401).json({ success: false, message: 'Password salah!' });
  }

  const standardName = VALID_MEMBERS.find(m => m.toLowerCase() === name.toLowerCase());
  res.json({
    success: true,
    message: `Selamat datang, ${standardName}!`,
    user: standardName
  });
});

// 3. Claim Task
app.post('/api/tasks/:id/claim', (req, res) => {
  const id = Number(req.params.id);
  const { member } = req.body;
  if (!member) return res.status(400).json({ success: false, message: 'Nama member wajib diisi.' });

  const tasks = readTasks();
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ success: false, message: 'Tugas tidak ditemukan.' });

  task.status = 'doing';
  writeTasks(tasks);

  res.json({ success: true, message: `Tugas #${id} (${task.title}) berhasil diklaim oleh ${member}.`, task });
});

// 4. Update Status (open, doing, done)
app.post('/api/tasks/:id/status', (req, res) => {
  const id = Number(req.params.id);
  const { status, user } = req.body;
  if (!['open', 'doing', 'done'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Status tidak valid.' });
  }

  const tasks = readTasks();
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ success: false, message: 'Tugas tidak ditemukan.' });

  const isReihanUser = user && user.toLowerCase() === 'reihan';
  const isTaskOwner = user && task.owner && task.owner.toLowerCase() === user.toLowerCase();

  // Hanya Reihan atau pemilik tugas yang berwenang membatalkan klaim (status 'open')
  if (status === 'open' && !isReihanUser && !isTaskOwner) {
    return res.status(403).json({ 
      success: false, 
      message: `Akses Dibatasi: Tugas #${task.id} adalah milik ${task.owner}. Hanya ${task.owner} atau Reihan yang berwenang membatalkan klaim!` 
    });
  }

  // Hanya Reihan yang berwenang membuka kembali tugas yang sudah selesai
  if (task.status === 'done' && status === 'doing' && !isReihanUser) {
    return res.status(403).json({ 
      success: false, 
      message: 'Akses Dibatasi: Hanya Reihan (Project Lead) yang berwenang membuka kembali tugas!' 
    });
  }

  task.status = status;
  if (status === 'open') {
    task.claimedBy = '';
  }
  writeTasks(tasks);

  res.json({ success: true, message: `Status tugas #${id} diperbarui menjadi ${status}.`, task });
});

// 5. Submit Work (Link or File or both)
app.post('/api/tasks/:id/submit', upload.single('file'), (req, res) => {
  const id = Number(req.params.id);
  const { owner, link, notes, status } = req.body;

  const validMembers = ['reihan', 'bintang', 'royan', 'eby'];
  if (!owner || !validMembers.includes(owner.toLowerCase())) {
    return res.status(403).json({ 
      success: false, 
      message: 'Akses Dibatasi: Hanya member tim Outbreak (Reihan, Bintang, Royan, Eby) yang berwenang mengumpulkan hasil tugas!' 
    });
  }

  const tasks = readTasks();
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ success: false, message: 'Tugas tidak ditemukan.' });

  task.owner = owner;
  if (link !== undefined) task.submissionLink = link.trim();
  if (notes !== undefined) task.notes = notes.trim();
  task.status = status || 'done';

  // If file uploaded
  if (req.file) {
    task.fileMeta = {
      originalName: req.file.originalname,
      name: req.file.originalname,
      storedName: req.file.filename,
      size: formatBytes(req.file.size),
      sizeBytes: req.file.size,
      downloadUrl: `/uploads/${req.file.filename}`,
      uploadedAt: new Date().toLocaleString('id-ID')
    };
  }

  writeTasks(tasks);
  res.json({ success: true, message: `Hasil tugas #${id} (${task.title}) berhasil dikumpulkan!`, task });
});

// Standalone File Upload (Menyimpan langsung ke folder uploads/)
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Tidak ada file yang diunggah.' });
  }
  const fileMeta = {
    originalName: req.file.originalname,
    name: req.file.originalname,
    storedName: req.file.filename,
    size: formatBytes(req.file.size),
    sizeBytes: req.file.size,
    downloadUrl: `/uploads/${req.file.filename}`,
    uploadedAt: new Date().toLocaleString('id-ID')
  };
  res.json({ success: true, fileMeta });
});

// 6. Create Task (Hanya Reihan yang berwenang)
app.post('/api/tasks', (req, res) => {
  const requester = req.headers['x-user'] || req.body.requester;
  if (!requester || requester.toLowerCase() !== 'reihan') {
    return res.status(403).json({
      success: false,
      message: 'Akses ditolak: Hanya Reihan (Lead) yang berwenang membuat jobdesk baru!'
    });
  }

  const { title, category, owner, desc, figmaLink, status } = req.body;
  if (!title) return res.status(400).json({ success: false, message: 'Judul tugas wajib diisi.' });

  const tasks = readTasks();
  const newId = Math.max(0, ...tasks.map(t => t.id)) + 1;
  const newTask = {
    id: newId,
    title: title.trim(),
    category: category || 'General',
    owner: owner || 'Reihan',
    status: status || 'open',
    figmaLink: figmaLink ? figmaLink.trim() : '',
    desc: desc ? desc.trim() : '',
    submissionLink: '',
    notes: '',
    fileMeta: null
  };

  tasks.push(newTask);
  writeTasks(tasks);
  res.json({ success: true, message: `Jobdesk baru #${newId} berhasil dibuat oleh Reihan.`, task: newTask });
});

// 7. Update Task (Hanya Reihan yang berwenang)
app.put('/api/tasks/:id', (req, res) => {
  const requester = req.headers['x-user'] || req.body.requester;
  if (!requester || requester.toLowerCase() !== 'reihan') {
    return res.status(403).json({
      success: false,
      message: 'Akses ditolak: Hanya Reihan (Lead) yang berwenang mengedit jobdesk!'
    });
  }

  const id = Number(req.params.id);
  const { title, category, owner, desc, figmaLink, status } = req.body;

  const tasks = readTasks();
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ success: false, message: 'Tugas tidak ditemukan.' });

  if (title) task.title = title.trim();
  if (category) task.category = category;
  if (owner) task.owner = owner;
  if (desc !== undefined) task.desc = desc.trim();
  if (figmaLink !== undefined) task.figmaLink = figmaLink.trim();
  if (status) task.status = status;

  writeTasks(tasks);
  res.json({ success: true, message: `Jobdesk #${id} berhasil diupdate oleh Reihan.`, task });
});

// 7b. Get All Submissions (Rekap Pengumpulan & Info Folder)
app.get('/api/submissions', (req, res) => {
  const tasks = readTasks();
  const submissions = tasks.filter(t => t.submissionLink || t.fileMeta);
  res.json({
    success: true,
    count: submissions.length,
    uploadsDir: UPLOADS_DIR,
    submissions
  });
});

// 8. Reset to Word original data (Khusus Reihan)
app.post('/api/tasks/reset', (req, res) => {
  const requester = req.headers['x-user'] || req.body.requester;
  if (!requester || requester.toLowerCase() !== 'reihan') {
    return res.status(403).json({
      success: false,
      message: 'Akses ditolak: Hanya Reihan (Lead) yang memiliki izin untuk mereset data!'
    });
  }

  if (fs.existsSync(INITIAL_DATA_FILE)) {
    fs.copyFileSync(INITIAL_DATA_FILE, TASKS_FILE);
  }
  const tasks = readTasks();
  res.json({ success: true, message: 'Data berhasil direset ke revisi awal Word oleh Reihan.', tasks });
});

// 9. Download endpoint
app.get('/api/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(UPLOADS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File tidak ditemukan.');
  }
  res.download(filePath);
});

// Serve static assets
app.use('/uploads', express.static(UPLOADS_DIR));
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to public/index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 RRBY Outbreak Task Portal Server is RUNNING!`);
  console.log(`📡 Local URL: http://localhost:${PORT}`);
  console.log(`📂 Uploads directory: ${UPLOADS_DIR}`);
  console.log(`=======================================================`);
});
