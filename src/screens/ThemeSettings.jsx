import Screen from '../components/Screen.jsx';
import BackBar from '../components/BackBar.jsx';
import SettingsRow from '../components/SettingsRow.jsx';
import SectionLabel from '../components/SectionLabel.jsx';
import { useApp } from '../context/AppContext.jsx';
import './SettingsShared.css';

const MODES = [
  { id: 'light',  label: 'Terang',  cls: 'light' },
  { id: 'dark',   label: 'Gelap',   cls: 'dark' },
  { id: 'system', label: 'Sistem',  cls: 'auto' },
];

const ACCENTS = [
  { id: 'blue',   color: '#3B82F6' },
  { id: 'indigo', color: '#6366F1' },
  { id: 'purple', color: '#7C3AED' },
  { id: 'amber',  color: '#F59E0B' },
  { id: 'green',  color: '#16A34A' },
];

const SIZES = [
  { id: 'standard', label: 'Standar' },
  { id: 'medium',   label: 'Sedang' },
  { id: 'large',    label: 'Besar' },
];

export default function ThemeSettings() {
  const { settings, setSetting, toggleSetting } = useApp();

  return (
    <div className="settings-screen">
      <Screen className="settings-screen__screen" padded={false}>
        <BackBar />
        <div className="settings-screen__inner">
          <h1 className="t-h1 settings-screen__title">Tema & tampilan</h1>
          <p className="t-body t-secondary settings-screen__sub">
            Pilih yang paling nyaman untuk matamu.
          </p>

          <SectionLabel>Mode</SectionLabel>
          <div className="theme-modes">
            {MODES.map(m => (
              <button
                key={m.id}
                type="button"
                className={`theme-mode ${settings.themeMode === m.id ? 'is-active' : ''}`}
                onClick={() => setSetting('themeMode', m.id)}
              >
                <span className={`theme-mode__preview theme-mode__preview--${m.cls}`} />
                <span className="theme-mode__label">{m.label}</span>
              </button>
            ))}
          </div>

          <SectionLabel>Warna aksen</SectionLabel>
          <section className="settings-card settings-card--padded">
            <div className="swatches">
              {ACCENTS.map(a => (
                <button
                  key={a.id}
                  type="button"
                  className={`swatch ${settings.accentColor === a.id ? 'is-active' : ''}`}
                  style={{ '--swatch-color': a.color }}
                  onClick={() => setSetting('accentColor', a.id)}
                  aria-label={a.id}
                />
              ))}
            </div>
          </section>

          <SectionLabel>Ukuran teks</SectionLabel>
          <section className="settings-card settings-card--padded">
            <div className="seg-control">
              {SIZES.map(s => (
                <button
                  key={s.id}
                  type="button"
                  className={`seg-control__opt ${settings.textSize === s.id ? 'is-active' : ''}`}
                  onClick={() => setSetting('textSize', s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </section>

          <section className="settings-card">
            <SettingsRow
              variant="toggle"
              title="Kurangi transparansi"
              hint="Latar belakang lebih solid"
              on={settings.reduceTransparency}
              onChange={() => toggleSetting('reduceTransparency')}
            />
          </section>

          <article className="settings-reassure" style={{ marginTop: 12 }}>
            <span className="settings-reassure__icon" aria-hidden="true">✨</span>
            <span className="settings-reassure__text">Perubahan langsung terlihat.</span>
          </article>
        </div>
      </Screen>
    </div>
  );
}
