import Screen from '../components/Screen.jsx';
import Button from '../components/Button.jsx';
import { useApp } from '../context/AppContext.jsx';
import { ENERGY_CONFIG, USER } from '../data/data.js';
import './EnergyPicker.css';

const OPTIONS = ['cerah', 'berawan', 'redup'];

export default function EnergyPicker() {
  const { energy, setEnergy, setTab, navigateBack, history, settings } = useApp();
  const isReturning = history.length > 0 && history[history.length - 1] === 'home-today';

  const handleConfirm = () => {
    if (!energy) return;
    if (isReturning) {
      navigateBack();
    } else {
      setTab('today');
    }
  };

  return (
    <Screen className="picker">
      <header className="picker__header">
        <p className="t-caption t-tertiary">Halo, {USER.name}.</p>
        <h1 className="t-h1 picker__title">Cuaca hari ini seperti apa?</h1>
        <p className="t-body t-secondary picker__sub">
          Tidak ada jawaban benar. Pilih yang paling jujur dengan tubuhmu.
        </p>
      </header>

      <div className="picker__options">
        {OPTIONS.map(key => {
          const cfg = ENERGY_CONFIG[key];
          const selected = energy === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setEnergy(key)}
              className={`picker__card ${selected ? 'is-selected' : ''}`}
              style={selected ? {
                background: cfg.soft,
                borderColor: cfg.color,
              } : undefined}
            >
              <div
                className="picker__emoji-wrap"
                style={{ background: selected ? 'rgba(255,255,255,0.6)' : cfg.soft }}
              >
                <span aria-hidden="true">{settings.hideWeatherEmoji ? '•' : cfg.emoji}</span>
              </div>
              <div className="picker__card-body">
                <div className="picker__card-label">{cfg.label}</div>
                <div className="picker__card-desc">{cfg.description}</div>
              </div>
              {selected && (
                <div
                  className="picker__badge"
                  style={{ background: cfg.color }}
                  aria-label="Terpilih"
                >
                  ✓
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="picker__footer">
        {!energy && (
          <p className="picker__hint">Pilih satu untuk melanjutkan</p>
        )}
        <Button onClick={handleConfirm} disabled={!energy}>
          {isReturning ? 'Ganti energi' : 'Lanjutkan'}
        </Button>
      </div>
    </Screen>
  );
}
