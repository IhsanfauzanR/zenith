import { useApp } from '../context/AppContext.jsx';
import './BottomNav.css';

const TABS = [
  { id: 'today', label: 'Hari Ini', emoji: '🏔️' },
  { id: 'agenda', label: 'Agenda', emoji: '📅' },
  { id: 'reflect', label: 'Refleksi', emoji: '🪶' },
  { id: 'profile', label: 'Saya', emoji: '🌿' },
];

export default function BottomNav() {
  const { activeTab, setTab } = useApp();
  return (
    <nav className="bottom-nav" aria-label="Navigasi utama">
      {TABS.map(t => (
        <button
          key={t.id}
          className={`bottom-nav__item ${activeTab === t.id ? 'is-active' : ''}`}
          onClick={() => setTab(t.id)}
          aria-current={activeTab === t.id ? 'page' : undefined}
        >
          <span className="bottom-nav__emoji" aria-hidden="true">{t.emoji}</span>
          <span className="bottom-nav__label">{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
