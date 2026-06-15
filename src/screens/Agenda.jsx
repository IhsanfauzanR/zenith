import { useState } from 'react';
import Screen from '../components/Screen.jsx';
import Button from '../components/Button.jsx';
import BottomNav from '../components/BottomNav.jsx';
import EmptyIllustration from '../components/EmptyIllustration.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import useDoubleTap from '../components/useDoubleTap.js';
import useLongPress from '../components/useLongPress.js';
import { useApp } from '../context/AppContext.jsx';
import './Agenda.css';

const DAYS = [
  { d: 20, lab: 'Sen' },
  { d: 21, lab: 'Sel' },
  { d: 22, lab: 'Rab' },
  { d: 23, lab: 'Kam' },
  { d: 24, lab: 'Jum' },
  { d: 25, lab: 'Sab' },
  { d: 26, lab: 'Min' },
];

const ENERGY_BAR = {
  cerah: 'var(--energy-cerah)',
  berawan: 'var(--brand-primary)',
  redup: 'var(--energy-redup)',
};

function AgendaItem({ item, onClick, onLongPress }) {
  const { isPressing, handlers } = useLongPress(() => onLongPress?.(item));
  return (
    <article
      className={`agenda-item ${isPressing ? 'is-pressing' : ''}`}
      onClick={onClick}
      {...handlers}
    >
      <span className="agenda-item__bar" style={{ background: ENERGY_BAR[item.energy] }} />
      <div className="agenda-item__body">
        <div className="agenda-item__time">{item.time}</div>
        <div className="agenda-item__title">{item.title}</div>
        <div className="agenda-item__meta">{item.category}</div>
      </div>
    </article>
  );
}

export default function Agenda() {
  const { navigate, openTaskDetail, demoMode, toggleDemoEmpty, agenda, deleteAgenda } = useApp();
  const [itemToDelete, setItemToDelete] = useState(null);

  const items = demoMode.agendaEmpty ? [] : agenda;
  const isEmpty = items.length === 0;
  const todayIdx = 4; // Jumat = index 4
  const handleTitleDoubleTap = useDoubleTap(() => toggleDemoEmpty('agendaEmpty'));

  const handleConfirmDelete = () => {
    if (itemToDelete) deleteAgenda(itemToDelete.id);
    setItemToDelete(null);
  };

  return (
    <div className="agenda-screen">
      <Screen className="agenda-screen__screen" padded={false}>
        <div className="agenda-screen__inner">
          <header className="agenda-screen__header">
            <p className="t-caption t-tertiary">MEI 2026</p>
            <h1 className="t-h1 agenda-screen__title" onClick={handleTitleDoubleTap}>
              Agenda
            </h1>
          </header>

          <div className="agenda-week" role="list">
            {DAYS.map((day, i) => {
              const hasDot = !isEmpty && (i === todayIdx || i === 1 || i === 6);
              return (
                <div
                  key={day.d}
                  className={`agenda-week__day ${i === todayIdx ? 'is-today' : ''}`}
                  role="listitem"
                >
                  <span className="agenda-week__lab">{day.lab}</span>
                  <span className="agenda-week__num">{day.d}</span>
                  {hasDot && <span className="agenda-week__dot" />}
                </div>
              );
            })}
          </div>

          {isEmpty ? (
            <div className="agenda-empty">
              <EmptyIllustration emoji="📭" glowColor="var(--brand-primary)" size={200} />
              <h2 className="t-h2 agenda-empty__title">Belum ada jadwal.</h2>
              <p className="t-body t-secondary agenda-empty__body">
                Tambah tugas dan atur waktunya di sini.
              </p>
              <div className="agenda-empty__actions">
                <Button onClick={() => navigate('create-task')} fullWidth={false} style={{ minWidth: 220 }}>
                  Tambah tugas
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="t-title agenda-day-label">Jumat, 24 Mei</h3>
              <section className="agenda-list" aria-label="Daftar agenda hari ini">
                {items.map(it => (
                  <AgendaItem
                    key={it.id}
                    item={it}
                    onClick={() => openTaskDetail(it.taskId)}
                    onLongPress={(item) => setItemToDelete(item)}
                  />
                ))}
              </section>
            </>
          )}
        </div>
      </Screen>

      {!isEmpty && (
        <button className="agenda-fab" onClick={() => navigate('create-task')} aria-label="Tambah tugas">
          +
        </button>
      )}

      <BottomNav />

      <ConfirmDialog
        open={!!itemToDelete}
        title="Hapus agenda ini?"
        message={itemToDelete ? `"${itemToDelete.title}" pukul ${itemToDelete.time} akan dihapus dari jadwalmu.` : ''}
        confirmLabel="Ya"
        cancelLabel="Tidak"
        tone="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
}
