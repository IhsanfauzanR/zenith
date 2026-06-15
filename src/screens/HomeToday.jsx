import { useState } from 'react';
import Screen from '../components/Screen.jsx';
import EnergyChip from '../components/EnergyChip.jsx';
import TaskCard from '../components/TaskCard.jsx';
import BottomNav from '../components/BottomNav.jsx';
import EmptyToday from './EmptyToday.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import useDoubleTap from '../components/useDoubleTap.js';
import { useApp } from '../context/AppContext.jsx';
import { ENERGY_CONFIG, selectTasksForEnergy, TODAY_DATE_LABEL } from '../data/data.js';
import './HomeToday.css';

export default function HomeToday() {
  const { energy, tasks, navigate, settings, openTaskDetail, demoMode, toggleDemoEmpty, deleteTask } = useApp();
  const [taskToDelete, setTaskToDelete] = useState(null);

  const activeEnergy = energy || 'berawan';
  const cfg = ENERGY_CONFIG[activeEnergy];
  const shownTasks = selectTasksForEnergy(tasks, activeEnergy);
  const hiddenCount = tasks.length - shownTasks.length;
  const hintText = cfg.hint.replace('{n}', hiddenCount);
  const isEmpty = demoMode.todayEmpty || shownTasks.length === 0;

  const handleTitleDoubleTap = useDoubleTap(() => toggleDemoEmpty('todayEmpty'));

  const handleConfirmDelete = () => {
    if (taskToDelete) deleteTask(taskToDelete.id);
    setTaskToDelete(null);
  };

  const Header = (
    <header className="home__header">
      <p className="t-caption t-tertiary home__date">{TODAY_DATE_LABEL}</p>
      <h1 className="t-h1 home__greeting" onClick={handleTitleDoubleTap}>
        {cfg.greeting}
      </h1>
      <div className="home__chip-row">
        <EnergyChip
          energy={activeEnergy}
          onClick={() => navigate('energy-picker')}
          hideEmoji={settings.hideWeatherEmoji}
        />
      </div>
    </header>
  );

  return (
    <div className={`home home--${activeEnergy}`} data-energy={activeEnergy}>
      <Screen className="home__screen" padded={false}>
        {isEmpty ? (
          <>
            <div className="home__inner home__inner--empty-head">{Header}</div>
            <EmptyToday energy={activeEnergy} onAddTask={() => navigate('create-task')} />
          </>
        ) : (
          <div className="home__inner">
            {Header}

            <p className="t-body-lg home__context">{cfg.contextMessage}</p>

            <section className="home__list" aria-label="Daftar tugas hari ini">
              {shownTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  energy={activeEnergy}
                  size={cfg.cardSize}
                  showPriorityDot={cfg.showPriorityDot}
                  onClick={() => openTaskDetail(task.id)}
                  onLongPress={(t) => setTaskToDelete(t)}
                />
              ))}
            </section>

            {hiddenCount > 0 && (
              <p className="home__hint t-caption t-tertiary">{hintText}</p>
            )}
          </div>
        )}
      </Screen>
      <BottomNav />

      <ConfirmDialog
        open={!!taskToDelete}
        title="Hapus tugas ini?"
        message={taskToDelete ? `"${taskToDelete.title}" akan dihapus dari daftarmu.` : ''}
        confirmLabel="Ya"
        cancelLabel="Tidak"
        tone="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setTaskToDelete(null)}
      />
    </div>
  );
}
