import { useState } from 'react';
import './TaskCard.css';

const PRIORITY_COLOR = {
  high: 'var(--energy-cerah)',
  med: 'var(--text-tertiary)',
  low: 'var(--energy-redup)',
};

export default function TaskCard({ task, energy = 'berawan', showPriorityDot = true, size = 'normal', onClick }) {
  const [done, setDone] = useState(false);

  const handleToggle = (e) => {
    e.stopPropagation();
    setDone(d => !d);
  };

  return (
    <div
      className={`task-card task-card--${size} ${done ? 'is-done' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick?.(); }}
    >
      <button
        type="button"
        className={`task-card__check ${done ? 'is-checked' : ''}`}
        onClick={handleToggle}
        aria-label={done ? 'Tandai belum selesai' : 'Tandai selesai'}
      >
        {done && <span className="task-card__tick" aria-hidden="true">✓</span>}
      </button>
      <div className="task-card__body">
        <div className="task-card__title">{task.title}</div>
        <div className="task-card__meta">
          {task.category} · {task.estMinutes} menit
        </div>
      </div>
      {showPriorityDot && (
        <span
          className="task-card__dot"
          style={{ background: PRIORITY_COLOR[task.priority] }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
