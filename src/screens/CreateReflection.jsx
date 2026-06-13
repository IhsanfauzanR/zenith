import { useState } from 'react';
import Screen from '../components/Screen.jsx';
import Button from '../components/Button.jsx';
import { useApp } from '../context/AppContext.jsx';
import { REFLECT_PROMPT } from '../data/data.js';
import './CreateReflection.css';

const MOODS = [
  { id: 'sad', emoji: '😔', label: 'Sedih' },
  { id: 'meh', emoji: '😐', label: 'Datar' },
  { id: 'okay', emoji: '🙂', label: 'Cukup' },
  { id: 'good', emoji: '😌', label: 'Tenang' },
  { id: 'tired', emoji: '😴', label: 'Lelah' },
];

export default function CreateReflection() {
  const { navigateBack, addReflection } = useApp();
  const [text, setText] = useState('');
  const [mood, setMood] = useState('good');

  const handleSave = () => {
    addReflection({
      id: 'r' + Date.now(),
      date: new Date().toISOString().slice(0, 10),
      mood,
      text: text.trim() || '(tanpa kata)',
    });
    navigateBack();
  };

  return (
    <div className="create-reflect">
      <Screen className="create-reflect__screen" padded={false}>
        <header className="create-reflect__topbar">
          <button className="create-reflect__close" onClick={navigateBack}>Tutup</button>
        </header>

        <div className="create-reflect__inner">
          <p className="t-caption create-reflect__date">Jumat, 24 Mei · malam</p>
          <h2 className="t-h2 create-reflect__q">{REFLECT_PROMPT}</h2>

          <article className="create-reflect__editor">
            <textarea
              className="create-reflect__textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Hari ini aku merasa…"
              rows={9}
              autoFocus
            />
          </article>

          <div className="create-reflect__mood">
            <p className="t-micro create-reflect__mood-label">SUASANA</p>
            <div className="create-reflect__mood-options">
              {MOODS.map(m => (
                <button
                  key={m.id}
                  type="button"
                  className={`mood-btn ${mood === m.id ? 'is-selected' : ''}`}
                  onClick={() => setMood(m.id)}
                  aria-label={m.label}
                >
                  <span aria-hidden="true">{m.emoji}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="t-caption create-reflect__note">
            Tidak ada jawaban benar atau salah. Ini ruang milikmu.
          </p>

          <div className="create-reflect__actions">
            <Button tone="redup" onClick={handleSave}>Simpan refleksi</Button>
          </div>
        </div>
      </Screen>
    </div>
  );
}
