import { useState } from 'react';
import { MONTHS_ID, DAYS_ID_SHORT, todayISO, parseISO, toISO } from '../utils/date.js';
import './Calendar.css';

// Kalender mini custom (tanpa library). Mulai Senin.
// Tanggal yang sudah lewat (< minISO) di-disable.
export default function Calendar({ value, onSelect, minISO }) {
  const min = minISO || todayISO();
  const minDate = parseISO(min);
  const initial = value ? parseISO(value) : minDate;

  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());

  const minY = minDate.getFullYear();
  const minM = minDate.getMonth();
  const prevDisabled = viewYear < minY || (viewYear === minY && viewMonth <= minM);

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const startOffset = (firstOfMonth.getDay() + 6) % 7; // Senin = 0
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const todayStr = todayISO();

  const prevMonth = () => {
    if (prevDisabled) return;
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const isPast = (d) => {
    const date = new Date(viewYear, viewMonth, d);
    return date < new Date(minY, minM, minDate.getDate());
  };

  return (
    <div className="zcal" role="dialog" aria-label="Pilih tanggal">
      <div className="zcal__head">
        <button type="button" className="zcal__nav" onClick={prevMonth} disabled={prevDisabled} aria-label="Bulan sebelumnya">‹</button>
        <span className="zcal__title">{MONTHS_ID[viewMonth]} {viewYear}</span>
        <button type="button" className="zcal__nav" onClick={nextMonth} aria-label="Bulan berikutnya">›</button>
      </div>

      <div className="zcal__grid zcal__grid--days">
        {DAYS_ID_SHORT.map((d) => <span key={d} className="zcal__dow">{d}</span>)}
      </div>

      <div className="zcal__grid">
        {cells.map((d, i) => {
          if (d === null) return <span key={`e${i}`} className="zcal__cell zcal__cell--empty" />;
          const iso = toISO(new Date(viewYear, viewMonth, d));
          const past = isPast(d);
          const selected = value === iso;
          const isToday = todayStr === iso;
          return (
            <button
              key={d}
              type="button"
              className={`zcal__cell ${selected ? 'is-selected' : ''} ${isToday ? 'is-today' : ''}`}
              disabled={past}
              onClick={() => onSelect(iso)}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}
