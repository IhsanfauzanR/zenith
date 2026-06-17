import { useState, useRef, useEffect } from 'react';
import Calendar from './Calendar.jsx';
import { formatLongDate } from '../utils/date.js';
import './DeadlineField.css';

// Pemilih tenggat: baris yang bisa diklik untuk membuka popup kalender.
// value = ISO 'YYYY-MM-DD' | null. onChange(iso | null).
export default function DeadlineField({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <div className="deadline-field" ref={ref}>
      <div className="deadline-field__row">
        <button
          type="button"
          className={`deadline-field__trigger ${value ? 'has-value' : ''}`}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="deadline-field__icon" aria-hidden="true">🗓️</span>
          <span className="deadline-field__text">
            {value ? formatLongDate(value) : 'Pilih tanggal'}
          </span>
        </button>
        {value && (
          <button
            type="button"
            className="deadline-field__clear"
            aria-label="Hapus tenggat"
            onClick={() => { onChange(null); setOpen(false); }}
          >
            ✕
          </button>
        )}
      </div>

      {open && (
        <div className="deadline-field__popup">
          <Calendar
            value={value}
            onSelect={(iso) => { onChange(iso); setOpen(false); }}
          />
        </div>
      )}
    </div>
  );
}
