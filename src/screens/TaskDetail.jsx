import Screen from '../components/Screen.jsx';
import { useApp } from '../context/AppContext.jsx';
import './TaskDetail.css';

export default function TaskDetail() {
  const { tasks, selectedTaskId, navigateBack } = useApp();
  const task = tasks.find(t => t.id === selectedTaskId) || tasks[0];

  if (!task) {
    return (
      <Screen><p className="t-body t-secondary">Tugas tidak ditemukan.</p></Screen>
    );
  }

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
          <h1 className="t-h1 task-detail__title">{task.title}</h1>
          <p className="t-body t-secondary task-detail__meta">
            Perkiraan {task.estMinutes} menit
          </p>

          {task.note && (
            <article className="task-detail__card task-detail__card--note">
              <p className="t-micro task-detail__card-label">CATATAN</p>
              <p className="t-body task-detail__card-body">{task.note}</p>
            </article>
          )}

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
