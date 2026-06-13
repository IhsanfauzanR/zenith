import { useState } from 'react';
import Screen from '../components/Screen.jsx';
import Button from '../components/Button.jsx';
import { useApp } from '../context/AppContext.jsx';
import './CreateTask.css';

export default function CreateTask() {
  const { navigateBack, addTask } = useApp();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const canSave = title.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    addTask({
      id: 't' + Date.now(),
      title: title.trim(),
      category: 'Hidup',
      estMinutes: 15,
      priority: 'low',
      fitsEnergy: ['cerah', 'berawan', 'redup'],
      note: note.trim(),
      suggestion: 'Mulai dari bagian yang paling mudah dulu.',
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

          <article className="create-task__hint-card">
            <p className="create-task__hint-label">
              <span aria-hidden="true">🪶</span> DARI ZENITH
            </p>
            <p className="create-task__hint-body">
              Tuliskan saja apa yang ada di pikiranmu. Biar Zenith yang menata sisanya — kapan dan bagaimana sebaiknya dikerjakan.
            </p>
          </article>

          <p className="create-task__note t-caption t-tertiary">
            Tenang, kamu tak harus mengerjakannya hari ini.
          </p>

          <div className="create-task__actions">
            <Button onClick={handleSave} disabled={!canSave}>Simpan tugas</Button>
          </div>
        </div>
      </Screen>
    </div>
  );
}
