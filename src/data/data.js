// Dummy data — semua hardcoded. Cukup untuk menunjukkan 10/5/3 task di 3 energi.

export const USER = {
  name: 'Rania',
  fullName: 'Rania Pradipta',
  initial: 'R',
  joinedAt: 'Mei 2026',
  daysWithZenith: 28,
};

// priority: 'high' (berat) | 'med' (campuran) | 'low' (ringan)
// fitsEnergy: array of energies cocok
// Total 10 task — cukup untuk semua skenario adaptif.
export const TASKS = [
  {
    id: 't1',
    title: 'Revisi bab 3 skripsi',
    category: 'Skripsi',
    estMinutes: 90,
    priority: 'high',
    fitsEnergy: ['cerah'],
    note: 'Fokus pada subbab 3.2 — metodologi. Buka feedback Pak Dimas dulu.',
    suggestion: 'Mulai dengan paragraf paling mudah. Bukan paragraf paling penting.',
  },
  {
    id: 't2',
    title: 'Asistensi dengan Dimas',
    category: 'Skripsi',
    estMinutes: 45,
    priority: 'high',
    fitsEnergy: ['cerah', 'berawan'],
    note: 'Bawa pertanyaan tentang sampel penelitian.',
    suggestion: 'Tulis 3 pertanyaan utama sebelum berangkat. Cukup tiga.',
  },
  {
    id: 't3',
    title: 'Bimbingan skripsi',
    category: 'Skripsi',
    estMinutes: 60,
    priority: 'high',
    fitsEnergy: ['cerah'],
    note: 'Cetak draft terbaru. Bawa catatan revisi.',
    suggestion: 'Datang 10 menit lebih awal — kurangi stres menunggu.',
  },
  {
    id: 't4',
    title: 'Kerjakan tugas Statistika',
    category: 'Kuliah',
    estMinutes: 60,
    priority: 'med',
    fitsEnergy: ['cerah', 'berawan'],
    note: 'Bab uji hipotesis — soal nomor 1-5.',
    suggestion: 'Cukup tiga soal hari ini sudah cukup berarti.',
  },
  {
    id: 't5',
    title: 'Cicil revisi proposal',
    category: 'Skripsi',
    estMinutes: 30,
    priority: 'med',
    fitsEnergy: ['cerah', 'berawan'],
    note: 'Perbaiki kalimat di bab 1 — bagian latar belakang.',
    suggestion: 'Satu paragraf saja sudah merupakan kemajuan.',
  },
  {
    id: 't6',
    title: 'Balas email dosen pembimbing',
    category: 'Admin',
    estMinutes: 10,
    priority: 'med',
    fitsEnergy: ['cerah', 'berawan'],
    note: 'Konfirmasi jadwal bimbingan minggu depan.',
    suggestion: 'Cukup tiga kalimat. Tidak perlu panjang.',
  },
  {
    id: 't7',
    title: 'Baca paper referensi',
    category: 'Skripsi',
    estMinutes: 25,
    priority: 'low',
    fitsEnergy: ['cerah', 'berawan', 'redup'],
    note: 'Paper Wijaya (2024) — tentang manajemen kognitif.',
    suggestion: 'Baca abstrak dan kesimpulan dulu. Itu sudah cukup banyak.',
  },
  {
    id: 't8',
    title: 'Rapikan meja belajar',
    category: 'Hidup',
    estMinutes: 15,
    priority: 'low',
    fitsEnergy: ['cerah', 'berawan', 'redup'],
    note: 'Bersihkan kertas dan cangkir kopi kemarin.',
    suggestion: 'Lima menit cukup. Bukan rapi sempurna.',
  },
  {
    id: 't9',
    title: 'Minum air segelas',
    category: 'Hidup',
    estMinutes: 2,
    priority: 'low',
    fitsEnergy: ['cerah', 'berawan', 'redup'],
    note: 'Tubuhmu butuh diingat.',
    suggestion: 'Sambil duduk pelan. Tarik napas dalam dua kali.',
  },
  {
    id: 't10',
    title: 'Tulis satu kalimat refleksi',
    category: 'Hidup',
    estMinutes: 5,
    priority: 'low',
    fitsEnergy: ['cerah', 'berawan', 'redup'],
    note: 'Apa pun yang muncul. Tidak harus dalam.',
    suggestion: 'Mulai dari "Hari ini aku merasa..." — itu sudah cukup.',
  },
];

// Konfigurasi adaptif energi — sumber kebenaran untuk perilaku Home.
export const ENERGY_CONFIG = {
  cerah: {
    label: 'Cerah',
    emoji: '☀️',
    color: 'var(--energy-cerah)',
    soft: 'var(--energy-cerah-soft)',
    description: 'Siap untuk tugas berat',
    maxTasks: 10,
    allowPriorities: ['high', 'med', 'low'],
    greeting: 'Energimu sedang baik, Rania.',
    contextMessage: 'Mari ambil yang berat dulu. Kamu bisa pelan-pelan.',
    hint: '{n} tugas lain tersedia di bawah.',
    cardSize: 'normal',
    showPriorityDot: true,
  },
  berawan: {
    label: 'Berawan',
    emoji: '⛅',
    color: 'var(--energy-berawan)',
    soft: 'var(--energy-berawan-soft)',
    description: 'Tugas campuran terasa pas',
    maxTasks: 5,
    allowPriorities: ['high', 'med', 'low'],
    greeting: 'Halo, Rania.',
    contextMessage: 'Lima tugas. Bukan empat belas.',
    hint: '{n} tugas lain disembunyikan agar tidak membebani.',
    cardSize: 'normal',
    showPriorityDot: true,
  },
  redup: {
    label: 'Redup',
    emoji: '🌙',
    color: 'var(--energy-redup)',
    soft: 'var(--energy-redup-soft)',
    description: 'Hanya yang ringan-ringan',
    maxTasks: 3,
    allowPriorities: ['low'],
    greeting: 'Pelan-pelan saja hari ini, Rania.',
    contextMessage: 'Hari ini cukup tiga langkah kecil.',
    hint: 'Sisanya menunggu. Tidak ke mana-mana.',
    cardSize: 'large',
    showPriorityDot: false,
  },
};

// Ambil task untuk Home berdasarkan energi.
export function selectTasksForEnergy(tasks, energy) {
  const cfg = ENERGY_CONFIG[energy] || ENERGY_CONFIG.berawan;
  const eligible = tasks.filter(t => cfg.allowPriorities.includes(t.priority));
  // Urutkan: high → med → low (untuk cerah, biar yang berat dulu)
  const order = { high: 0, med: 1, low: 2 };
  const sorted = [...eligible].sort((a, b) => order[a.priority] - order[b.priority]);
  return sorted.slice(0, cfg.maxTasks);
}

export const AGENDA = [
  { id: 'a1', time: '09:00', title: 'Bimbingan skripsi', category: 'Skripsi', energy: 'cerah', taskId: 't3' },
  { id: 'a2', time: '13:00', title: 'Asistensi Statistika', category: 'Kuliah', energy: 'berawan', taskId: 't4' },
  { id: 'a3', time: '16:00', title: 'Cicil revisi bab 3', category: 'Skripsi', energy: 'cerah', taskId: 't5' },
  { id: 'a4', time: '20:00', title: 'Baca paper referensi', category: 'Skripsi', energy: 'redup', taskId: 't7' },
];

// Default ada isi — Reflect langsung tampil versi terisi.
// Empty state Reflect bisa di-trigger via gesture demo (double-tap judul).
export const REFLECTIONS = [
  { id: 'r1', date: '2026-05-23', mood: 'okay', text: 'Hari yang biasa. Tidak buruk.' },
  { id: 'r2', date: '2026-05-22', mood: 'good', text: 'Selesai satu hal kecil rasanya cukup.' },
];

export const WEEKLY_WEATHER = [
  { day: 'S', label: 'Sen', energy: 'berawan' },
  { day: 'S', label: 'Sel', energy: 'cerah' },
  { day: 'R', label: 'Rab', energy: 'cerah' },
  { day: 'K', label: 'Kam', energy: 'redup' },
  { day: 'J', label: 'Jum', energy: 'berawan' },
  { day: 'S', label: 'Sab', energy: 'cerah' },
  { day: 'M', label: 'Min', energy: 'redup' },
];

export const REFLECT_PROMPT = 'Apa hal kecil yang membuat harimu terasa cukup?';

export const TODAY_DATE_LABEL = 'Jumat, 24 Mei 2026';
