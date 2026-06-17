import { useRef, useEffect } from 'react';
import Screen from '../components/Screen.jsx';
import DeadlineField from '../components/DeadlineField.jsx';
import { useApp } from '../context/AppContext.jsx';
import './TaskDetail.css';

function autosize(el) {
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
}

export default function TaskDetail() {
  const { tasks, selectedTaskId, navigateBack, updateTask, updateAgendaByTask } = useApp();
  const task = tasks.find(t => t.id === selectedTaskId) || tasks[0];

  const titleRef = useRef(null);
  const noteRef = useRef(null);

  useEffect(() => {
    autosize(titleRef.current);
    autosize(noteRef.current);
  }, [task?.id]);

  if (!task) {
    return (
      <Screen><p className="t-body t-secondary">Tugas tidak ditemukan.</p></Screen>
    );
  }

  const handleTitle = (e) => {
    updateTask(task.id, { title: e.target.value });
    autosize(e.target);
  };
  const handleNote = (e) => {
    updateTask(task.id, { note: e.target.value });
    autosize(e.target);
  };

  return (
    <div className="task-detail">
      <Screen className="task-detail__screen" padded={false}>
        <header className="task-detail__topbar">
          <button className="task-detail__back" onClick={navigateBack}>
            <span aria-hidden="true">←</span> Kembali
          </button>
        </header>

        <div className="task-detail__inner">
          <span className="task-detail__tag">{task.category}</span>

          <textarea
            ref={titleRef}
            className="t-h1 task-detail__title task-detail__title-input"
            value={task.title}
            onChange={handleTitle}
            placeholder="Judul tugas"
            rows={1}
            aria-label="Judul tugas"
          />

          <p className="t-body t-secondary task-detail__meta">
            Perkiraan {task.estMinutes} menit
          </p>

          <div className="task-detail__deadline">
            <p className="t-micro task-detail__card-label">JAM</p>
            <input
              type="time"
              className="task-detail__time-input"
              value={task.time || ''}
              onChange={(e) => {
                updateTask(task.id, { time: e.target.value });
                updateAgendaByTask(task.id, { time: e.target.value });
              }}
            />
          </div>

          <div className="task-detail__deadline">
            <p className="t-micro task-detail__card-label">TENGGAT</p>
            <DeadlineField
              value={task.dueDate || null}
              onChange={(iso) => updateTask(task.id, { dueDate: iso })}
            />
          </div>

          <article className="task-detail__card task-detail__card--note">
            <p className="t-micro task-detail__card-label">CATATAN</p>
            <textarea
              ref={noteRef}
              className="t-body task-detail__card-body task-detail__note-input"
              value={task.note || ''}
              onChange={handleNote}
              placeholder="Tambahkan catatan…"
              rows={1}
              aria-label="Catatan tugas"
            />
          </article>

          {task.suggestion && (
            <article className="task-detail__card task-detail__card--suggest">
              <p className="t-micro task-detail__card-label" style={{ color: 'var(--brand-primary)' }}>
                🪶 SARAN DARI ZENITH
              </p>
              <p className="t-body task-detail__card-body">{task.suggestion}</p>
            </article>
          )}
        </div>
      </Screen>
    </div>
  );
}
