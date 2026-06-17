import { useState } from 'react';
import Screen from '../components/Screen.jsx';
import Button from '../components/Button.jsx';
import DeadlineField from '../components/DeadlineField.jsx';
import { useApp } from '../context/AppContext.jsx';
import './CreateTask.css';

export default function CreateTask() {
  const { navigateBack, addTask, addAgenda } = useApp();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [time, setTime] = useState('');

  const canSave = title.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    const ts = Date.now();
    const taskId = 't' + ts;
    addTask({
      id: taskId,
      title: title.trim(),
      category: 'Hidup',
      estMinutes: 15,
      priority: 'low',
      fitsEnergy: ['cerah', 'berawan', 'redup'],
      note: note.trim(),
      dueDate,
      time: time || '',
      suggestion: 'Mulai dari bagian yang paling mudah dulu.',
    });
    addAgenda({
      id: 'a' + ts,
      time: time || '—',
      title: title.trim(),
      category: 'Hidup',
      energy: 'berawan',
      taskId,
    });
    navigateBack();
  };

  return (
    <div className="create-task">
      <Screen className="create-task__screen" padded={false}>
        <header className="create-task__topbar">
          <button className="create-task__cancel" onClick={navigateBack}>
            <span aria-hidden="true">←</span> Batal
          </button>
        </header>

        <div className="create-task__inner">
          <h1 className="t-h1 create-task__title">Tugas baru</h1>

          <label className="create-task__field">
            <span className="create-task__label">Apa yang ingin kamu kerjakan?</span>
            <input
              className="create-task__input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Mis. Bimbingan skripsi Pak Dosen"
              autoFocus
            />
          </label>

          <label className="create-task__field">
            <span className="create-task__label">Catatan (opsional)</span>
            <textarea
              className="create-task__textarea"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Konteks kecil untuk dirimu nanti…"
              rows={3}
            />
          </label>

          <label className="create-task__field">
            <span className="create-task__label">Jam</span>
            <input
              type="time"
              className="create-task__input create-task__time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>

          <div className="create-task__field">
            <span className="create-task__label">Tenggat</span>
            <DeadlineField value={dueDate} onChange={setDueDate} />
          </div>

          <article className="create-task__hint-card">
            <p className="create-task__hint-label">
              <span aria-hidden="true">🪶</span> DARI ZENITH
            </p>
            <p className="create-task__hint-body">
              Tulis dulu yang muncul di kepala. Kapan dan bagaimana bisa diatur nanti.
            </p>
          </article>

          <p className="create-task__note t-caption t-tertiary">
            Tidak harus dikerjakan hari ini.
          </p>

          <div className="create-task__actions">
            <Button onClick={handleSave} disabled={!canSave}>Simpan tugas</Button>
          </div>
        </div>
      </Screen>
    </div>
  );
}
