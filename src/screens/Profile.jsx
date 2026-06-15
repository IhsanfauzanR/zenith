import Screen from '../components/Screen.jsx';
import BottomNav from '../components/BottomNav.jsx';
import SettingsRow from '../components/SettingsRow.jsx';
import { useApp } from '../context/AppContext.jsx';
import { USER } from '../data/data.js';
import './Profile.css';

const SETTING_LINKS = [
  { id: 'sensory-reduced',  icon: '🌫️', title: 'Kenyamanan visual',  hint: 'Animasi, kontras, ukuran teks' },
  { id: 'reminder-settings', icon: '🔔', title: 'Pengingat lembut',  hint: 'Sapaan pagi & ajakan refleksi' },
  { id: 'theme-settings',    icon: '🎨', title: 'Tema & tampilan',    hint: 'Terang, gelap, warna aksen' },
  { id: 'privacy-settings',  icon: '🔒', title: 'Privasi & data',     hint: 'Cadangan, ekspor, hapus' },
  { id: 'help-settings',     icon: '❓', title: 'Bantuan',             hint: 'FAQ & masukan' },
];

export default function Profile() {
  const { navigate, replaceScreen } = useApp();

  return (
    <div className="profile-screen">
      <Screen className="profile-screen__screen" padded={false}>
        <div className="profile-screen__inner">
          <h1 className="t-h1 profile-screen__title">Saya</h1>

          <article className="profile-card">
            <div className="profile-card__avatar" aria-hidden="true">
              <span>{USER.initial}</span>
            </div>
            <div className="profile-card__body">
              <h2 className="t-title profile-card__name">{USER.fullName}</h2>
              <p className="t-caption t-tertiary profile-card__joined">Bergabung sejak {USER.joinedAt}</p>
            </div>
          </article>

          <article className="profile-summary">
            <span className="profile-summary__icon" aria-hidden="true">🌿</span>
            <div className="profile-summary__body">
              <p className="t-title profile-summary__line">{USER.daysWithZenith} hari pakai Zenith</p>
              <p className="t-caption profile-summary__sub">Sesuai energi yang kamu punya</p>
            </div>
          </article>

          <section className="profile-list" aria-label="Pengaturan">
            {SETTING_LINKS.map(s => (
              <SettingsRow
                key={s.id}
                icon={s.icon}
                title={s.title}
                hint={s.hint}
                variant="nav"
                onClick={() => navigate(s.id)}
              />
            ))}
          </section>

          <button
            className="profile-logout"
            onClick={() => replaceScreen('login')}
          >
            Keluar
          </button>
        </div>
      </Screen>
      <BottomNav />
    </div>
  );
}
