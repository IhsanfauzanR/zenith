import Screen from '../components/Screen.jsx';
import BackBar from '../components/BackBar.jsx';
import SettingsRow from '../components/SettingsRow.jsx';
import { useApp } from '../context/AppContext.jsx';
import './SettingsShared.css';

const TEXT_SIZES = [
  { id: 'standard', label: 'Standar' },
  { id: 'medium', label: 'Sedang' },
  { id: 'large', label: 'Besar' },
];

export default function SensoryReduced() {
  const { settings, toggleSetting, setSetting } = useApp();

  return (
    <div className="settings-screen">
      <Screen className="settings-screen__screen" padded={false}>
        <BackBar />
        <div className="settings-screen__inner">
          <h1 className="t-h1 settings-screen__title">Kenyamanan visual</h1>
          <p className="t-body t-secondary settings-screen__sub">
            Sesuaikan tampilan biar enak dilihat.
          </p>

          <section className="settings-card">
            <SettingsRow
              variant="toggle"
              title="Kurangi animasi"
              hint="Transisi & gerakan dibuat sangat halus"
              on={settings.reduceMotion}
              onChange={() => toggleSetting('reduceMotion')}
            />
            <SettingsRow
              variant="toggle"
              title="Mode monokrom"
              hint="Hilangkan warna untuk fokus penuh"
              on={settings.monochrome}
              onChange={() => toggleSetting('monochrome')}
            />
            <SettingsRow
              variant="toggle"
              title="Tingkatkan kontras"
              hint="Tulisan lebih tegas dibaca"
              on={settings.increaseContrast}
              onChange={() => toggleSetting('increaseContrast')}
            />
            <SettingsRow
              variant="toggle"
              title="Hilangkan emoji cuaca"
              hint="Pakai titik netral menggantikan ☀️⛅🌙"
              on={settings.hideWeatherEmoji}
              onChange={() => toggleSetting('hideWeatherEmoji')}
            />
          </section>

          <section className="settings-card settings-card--padded">
            <h3 className="t-title settings-card__title">Ukuran teks</h3>
            <div className="seg-control">
              {TEXT_SIZES.map(t => (
                <button
                  key={t.id}
                  type="button"
                  className={`seg-control__opt ${settings.textSize === t.id ? 'is-active' : ''}`}
                  onClick={() => setSetting('textSize', t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <p className="t-caption t-tertiary settings-card__hint">
              Perubahan langsung terlihat di seluruh aplikasi.
            </p>
          </section>
        </div>
      </Screen>
    </div>
  );
}
