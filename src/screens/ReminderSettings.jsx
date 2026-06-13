import Screen from '../components/Screen.jsx';
import BackBar from '../components/BackBar.jsx';
import SettingsRow from '../components/SettingsRow.jsx';
import SectionLabel from '../components/SectionLabel.jsx';
import { useApp } from '../context/AppContext.jsx';
import './SettingsShared.css';

export default function ReminderSettings() {
  const { settings, toggleSetting } = useApp();

  return (
    <div className="settings-screen">
      <Screen className="settings-screen__screen" padded={false}>
        <BackBar />
        <div className="settings-screen__inner">
          <h1 className="t-h1 settings-screen__title">Pengingat lembut</h1>
          <p className="t-body t-secondary settings-screen__sub">
            Hanya sapaan kecil, bukan tekanan.
          </p>

          <section className="settings-card">
            <SettingsRow
              variant="toggle"
              icon="🌅"
              title="Sapaan pagi"
              hint="Salam ringan saat membuka aplikasi"
              on={settings.morningGreeting}
              onChange={() => toggleSetting('morningGreeting')}
            />
            <SettingsRow
              variant="toggle"
              icon="📝"
              title="Pengingat tugas"
              hint="Notifikasi tipis untuk tugas hari ini"
              on={settings.taskReminder}
              onChange={() => toggleSetting('taskReminder')}
            />
            <SettingsRow
              variant="toggle"
              icon="🪶"
              title="Ajakan refleksi"
              hint="Ajakan menulis di penghujung hari"
              on={settings.reflectReminder}
              onChange={() => toggleSetting('reflectReminder')}
            />
          </section>

          <section className="settings-card">
            <SettingsRow
              variant="nav"
              icon="⏰"
              title="Waktu sapaan pagi"
              value="07:00"
              onClick={() => {}}
            />
            <SettingsRow
              variant="nav"
              icon="🌙"
              title="Waktu ajakan refleksi"
              value="20:00"
              onClick={() => {}}
            />
          </section>

          <SectionLabel>Saat energi redup</SectionLabel>
          <section className="settings-card">
            <SettingsRow
              variant="toggle"
              icon="🤫"
              title="Mode hening"
              hint="Semua pengingat dimatikan otomatis"
              on={settings.silentOnRedup}
              onChange={() => toggleSetting('silentOnRedup')}
            />
          </section>

          <p className="t-caption t-tertiary settings-screen__sub" style={{ textAlign: 'center', marginTop: 8 }}>
            Kamu boleh diam. Zenith tidak akan memaksa.
          </p>
        </div>
      </Screen>
    </div>
  );
}
