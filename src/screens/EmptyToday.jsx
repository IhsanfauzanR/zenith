import EmptyIllustration from '../components/EmptyIllustration.jsx';
import Button from '../components/Button.jsx';
import { ENERGY_CONFIG } from '../data/data.js';
import './EmptyToday.css';

const COPY = {
  cerah: {
    emoji: '☀️',
    title: 'Hari yang kosong.',
    body: 'Belum ada tugas. Mau tambah satu sekarang?',
  },
  berawan: {
    emoji: '⛅',
    title: 'Belum ada rencana.',
    body: 'Tambahkan kapan saja, tidak harus sekarang.',
  },
  redup: {
    emoji: '🌙',
    title: 'Hari yang pelan.',
    body: 'Tidak harus diisi. Satu tugas kecil juga cukup.',
  },
};

export default function EmptyToday({ energy = 'berawan', onAddTask }) {
  const c = COPY[energy] || COPY.berawan;
  const cfg = ENERGY_CONFIG[energy];

  return (
    <div className="empty-today">
      <EmptyIllustration emoji={c.emoji} glowColor={cfg.color} size={220} />
      <h2 className="t-h2 empty-today__title">{c.title}</h2>
      <p className="t-body t-secondary empty-today__body">{c.body}</p>
      <div className="empty-today__actions">
        <Button onClick={onAddTask} fullWidth={false} style={{ minWidth: 220 }}>
          Tambah tugas
        </Button>
      </div>
    </div>
  );
}
