import { useState } from 'react';
import Screen from '../components/Screen.jsx';
import BackBar from '../components/BackBar.jsx';
import SettingsRow from '../components/SettingsRow.jsx';
import SectionLabel from '../components/SectionLabel.jsx';
import './SettingsShared.css';

const FAQ = [
  'Apa itu mode cuaca energi?',
  'Kenapa tugas saya disembunyikan?',
  'Bagaimana cara mengekspor refleksi?',
  'Apakah data saya aman?',
];

export default function HelpSettings() {
  const [q, setQ] = useState('');
  const filtered = FAQ.filter(f => f.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="settings-screen">
      <Screen className="settings-screen__screen" padded={false}>
        <BackBar />
        <div className="settings-screen__inner">
          <h1 className="t-h1 settings-screen__title">Bantuan</h1>

          <div className="faq-search">
            <span className="faq-search__icon" aria-hidden="true">🔍</span>
            <input
              type="search"
              className="faq-search__input"
              placeholder="Cari pertanyaan…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <SectionLabel>Pertanyaan umum</SectionLabel>
          <section className="settings-card">
            {filtered.length === 0 ? (
              <div style={{ padding: '20px 16px', color: 'var(--text-tertiary)', fontSize: 14 }}>
                Tidak ada hasil yang cocok.
              </div>
            ) : (
              filtered.map(f => (
                <SettingsRow key={f} title={f} onClick={() => {}} />
              ))
            )}
          </section>

          <SectionLabel>Hubungi kami</SectionLabel>
          <section className="settings-card">
            <SettingsRow icon="✉️" title="Kirim masukan" onClick={() => {}} />
            <SettingsRow icon="⭐" title="Beri ulasan" onClick={() => {}} />
          </section>

          <div className="settings-brand">
            <span className="settings-brand__name">ZENITH</span>
            <span className="settings-brand__ver">Versi 1.0.0</span>
          </div>
        </div>
      </Screen>
    </div>
  );
}
