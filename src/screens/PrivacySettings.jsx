import Screen from '../components/Screen.jsx';
import BackBar from '../components/BackBar.jsx';
import SettingsRow from '../components/SettingsRow.jsx';
import SectionLabel from '../components/SectionLabel.jsx';
import { useApp } from '../context/AppContext.jsx';
import './SettingsShared.css';

export default function PrivacySettings() {
  const { settings, toggleSetting } = useApp();

  return (
    <div className="settings-screen">
      <Screen className="settings-screen__screen" padded={false}>
        <BackBar />
        <div className="settings-screen__inner">
          <h1 className="t-h1 settings-screen__title">Privasi & data</h1>

          <article className="settings-reassure">
            <span className="settings-reassure__icon" aria-hidden="true">🔒</span>
            <span className="settings-reassure__text">Tersimpan di perangkatmu.</span>
          </article>

          <section className="settings-card">
            <SettingsRow
              variant="toggle"
              title="Cadangkan ke cloud"
              hint="Terenkripsi end-to-end (opsional)"
              on={settings.cloudBackup}
              onChange={() => toggleSetting('cloudBackup')}
            />
            <SettingsRow
              variant="toggle"
              title="Analitik anonim"
              hint="Bantu kami membuat Zenith lebih baik"
              on={settings.anonAnalytics}
              onChange={() => toggleSetting('anonAnalytics')}
            />
          </section>

          <SectionLabel>Kelola</SectionLabel>
          <section className="settings-card">
            <SettingsRow icon="📤" title="Ekspor refleksi" onClick={() => {}} />
            <SettingsRow icon="📄" title="Kebijakan privasi" onClick={() => {}} />
          </section>

          <section className="settings-card" style={{ marginTop: 12 }}>
            <SettingsRow
              icon="🗑️"
              title="Hapus semua data"
              danger
              onClick={() => {}}
            />
          </section>

          <p className="t-caption t-tertiary settings-screen__sub" style={{ marginTop: 10 }}>
            Hapus data bersifat permanen dan tidak dapat dipulihkan.
          </p>
        </div>
      </Screen>
    </div>
  );
}
