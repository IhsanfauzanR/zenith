import { useState } from 'react';
import Screen from '../components/Screen.jsx';
import BottomNav from '../components/BottomNav.jsx';
import EmptyIllustration from '../components/EmptyIllustration.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import useDoubleTap from '../components/useDoubleTap.js';
import useLongPress from '../components/useLongPress.js';
import { useApp } from '../context/AppContext.jsx';
import { WEEKLY_WEATHER, ENERGY_CONFIG, REFLECT_PROMPT } from '../data/data.js';
import './Reflect.css';

const MOOD_EMOJI = {
  sad: '😔',
  meh: '😐',
  okay: '🙂',
  good: '😌',
  tired: '😴',
};

const MONTHS_ID = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

function formatReflDate(iso) {
  if (!iso) return '';
  const [, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS_ID[(m || 1) - 1]}`;
}

function ReflectEntry({ entry, onLongPress }) {
  const { isPressing, handlers } = useLongPress(() => onLongPress?.(entry));
  return (
    <article className={`reflect-entry ${isPressing ? 'is-pressing' : ''}`} {...handlers}>
      <div className="reflect-entry__mood" aria-hidden="true">
        <span>{MOOD_EMOJI[entry.mood] || '🙂'}</span>
      </div>
      <div className="reflect-entry__body">
        <p className="reflect-entry__date">{formatReflDate(entry.date)}</p>
        <p className="reflect-entry__text">{entry.text}</p>
      </div>
    </article>
  );
}

export default function Reflect() {
  const { reflections, navigate, settings, demoMode, toggleDemoEmpty, deleteReflection } = useApp();
  const [reflToDelete, setReflToDelete] = useState(null);
  // Empty hanya saat demo flag aktif — default selalu tampilkan versi terisi
  const isEmpty = demoMode.reflectEmpty || reflections.length === 0;
  const handleTitleDoubleTap = useDoubleTap(() => toggleDemoEmpty('reflectEmpty'));

  const handleConfirmDelete = () => {
    if (reflToDelete) deleteReflection(reflToDelete.id);
    setReflToDelete(null);
  };

  return (
    <div className="reflect-screen">
      <Screen className="reflect-screen__screen" padded={false}>
        <div className="reflect-screen__inner">
          <header className="reflect-screen__header">
            <p className="t-micro t-tertiary">MINGGU INI</p>
            <h1 className="t-h1 reflect-screen__title" onClick={handleTitleDoubleTap}>
              Refleksi pelan
            </h1>
          </header>

          {isEmpty ? (
            <>
              <div className="reflect-empty">
                <EmptyIllustration emoji="🪶" glowColor="var(--energy-redup)" size={200} />
                <h2 className="t-h2 reflect-empty__title">Belum ada refleksi.</h2>
                <p className="t-body t-secondary reflect-empty__body">
                  Tulis satu kalimat tentang harimu. Itu sudah cukup.
                </p>
              </div>

              <article className="reflect-prompt" onClick={() => navigate('create-reflection')}>
                <p className="t-micro reflect-prompt__label" style={{ color: 'var(--energy-redup)' }}>REFLEKSI</p>
                <p className="t-body-lg reflect-prompt__q">{REFLECT_PROMPT}</p>
                <p className="t-caption t-secondary reflect-prompt__hint">Tap untuk menulis</p>
              </article>
            </>
          ) : (
            <>
              <article className="reflect-week-card">
                <p className="t-micro t-tertiary">CUACA MINGGU INI</p>
                <div className="reflect-week-bubbles">
                  {WEEKLY_WEATHER.map((d, i) => {
                    const cfg = ENERGY_CONFIG[d.energy];
                    return (
                      <div key={i} className="reflect-week-bubble">
                        <div className="reflect-week-bubble__dot" style={{ background: cfg.soft }}>
                          <span aria-hidden="true">{settings.hideWeatherEmoji ? '•' : cfg.emoji}</span>
                        </div>
                        <span className="reflect-week-bubble__lab">{d.label}</span>
                      </div>
                    );
                  })}
                </div>
              </article>

              <div className="reflect-stats">
                <article className="reflect-stat">
                  <p className="t-h1 reflect-stat__num">17</p>
                  <p className="t-caption t-secondary">selesai dari yang dipilih</p>
                </article>
                <article className="reflect-stat">
                  <p className="t-h1 reflect-stat__num">2</p>
                  <p className="t-caption t-secondary">hari, tanpa rasa bersalah</p>
                </article>
              </div>

              <article className="reflect-prompt" onClick={() => navigate('create-reflection')}>
                <p className="t-micro reflect-prompt__label" style={{ color: 'var(--energy-redup)' }}>REFLEKSI</p>
                <p className="t-body-lg reflect-prompt__q">{REFLECT_PROMPT}</p>
                <p className="t-caption t-secondary reflect-prompt__hint">Tap untuk menulis</p>
              </article>

              <section className="reflect-list" aria-label="Refleksi yang sudah ditulis">
                {reflections.map(r => (
                  <ReflectEntry
                    key={r.id}
                    entry={r}
                    onLongPress={(e) => setReflToDelete(e)}
                  />
                ))}
              </section>
            </>
          )}
        </div>
      </Screen>
      <BottomNav />

      <ConfirmDialog
        open={!!reflToDelete}
        title="Hapus refleksi ini?"
        message={reflToDelete ? `Catatan tanggal ${formatReflDate(reflToDelete.date)} akan dihapus.` : ''}
        confirmLabel="Ya"
        cancelLabel="Tidak"
        tone="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setReflToDelete(null)}
      />
    </div>
  );
}
