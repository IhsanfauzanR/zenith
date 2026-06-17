import { useRef, useEffect } from 'react';
import Screen from '../components/Screen.jsx';
import { useApp } from '../context/AppContext.jsx';
import { formatLongDate } from '../utils/date.js';
import './ReflectionDetail.css';

const MOODS = [
  { id: 'sad', emoji: '😔', label: 'Sedih' },
  { id: 'meh', emoji: '😐', label: 'Datar' },
  { id: 'okay', emoji: '🙂', label: 'Cukup' },
  { id: 'good', emoji: '😌', label: 'Tenang' },
  { id: 'tired', emoji: '😴', label: 'Lelah' },
];

// Detail + edit inline sebuah refleksi. Perubahan langsung ke context (auto-save).
export default function ReflectionDetail() {
  const { reflections, selectedReflectionId, navigateBack, updateReflection } = useApp();
  const entry = reflections.find((r) => r.id === selectedReflectionId) || reflections[0];
  const taRef = useRef(null);

  useEffect(() => {
    const el = taRef.current;
    if (el) { el.style.height = 'auto'; el.style.height = `${el.scrollHeight}px`; }
  }, [entry?.id]);

  if (!entry) {
    return <Screen><p className="t-body t-secondary">Refleksi tidak ditemukan.</p></Screen>;
  }

  const handleText = (e) => {
    updateReflection(entry.id, { text: e.target.value });
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <div className="reflection-detail">
      <Screen className="reflection-detail__screen" padded={false}>
        <header className="reflection-detail__topbar">
          <button className="reflection-detail__back" onClick={navigateBack}>
            <span aria-hidden="true">←</span> Kembali
          </button>
        </header>

        <div className="reflection-detail__inner">
          <p className="t-caption reflection-detail__date">{formatLongDate(entry.date)}</p>

          <article className="reflection-detail__editor">
            <textarea
              ref={taRef}
              className="reflection-detail__textarea"
              value={entry.text}
              onChange={handleText}
              placeholder="Tulis apa adanya…"
            />
          </article>

          <div className="reflection-detail__mood">
            <p className="t-micro reflection-detail__mood-label">SUASANA</p>
            <div className="reflection-detail__mood-options">
              {MOODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`rd-mood-btn ${entry.mood === m.id ? 'is-selected' : ''}`}
                  onClick={() => updateReflection(entry.id, { mood: m.id })}
                  aria-label={m.label}
                >
                  <span aria-hidden="true">{m.emoji}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Screen>
    </div>
  );
}
