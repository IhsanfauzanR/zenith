import Screen from '../components/Screen.jsx';
import Button from '../components/Button.jsx';
import BottomNav from '../components/BottomNav.jsx';
import EmptyIllustration from '../components/EmptyIllustration.jsx';
import useDoubleTap from '../components/useDoubleTap.js';
import { useApp } from '../context/AppContext.jsx';
import { WEEKLY_WEATHER, ENERGY_CONFIG, REFLECT_PROMPT } from '../data/data.js';
import './Reflect.css';

export default function Reflect() {
  const { reflections, navigate, settings, demoMode, toggleDemoEmpty } = useApp();
  // Empty hanya saat demo flag aktif — default selalu tampilkan versi terisi
  const isEmpty = demoMode.reflectEmpty || reflections.length === 0;
  const handleTitleDoubleTap = useDoubleTap(() => toggleDemoEmpty('reflectEmpty'));

  return (
    <div className="reflect-screen">
      <Screen className="reflect-screen__screen" padded={false}>
        <div className="reflect-screen__inner">
          <header className="reflect-screen__header">
            <p className="t-micro t-tertiary">MINGGU INI</p>
            <h1 className="t-h1 reflect-screen__title" onClick={handleTitleDoubleTap}>
              Refleksi pelan
            </h1>
          </header>

          {isEmpty ? (
            <>
              <div className="reflect-empty">
                <EmptyIllustration emoji="🪶" glowColor="var(--energy-redup)" size={200} />
                <h2 className="t-h2 reflect-empty__title">Ruang ini masih sunyi.</h2>
                <p className="t-body t-secondary reflect-empty__body">
                  Belum ada refleksi yang kamu tulis. Mulai dari satu kalimat kecil tentang harimu.
                </p>
              </div>

              <article className="reflect-prompt" onClick={() => navigate('create-reflection')}>
                <p className="t-micro reflect-prompt__label" style={{ color: 'var(--energy-redup)' }}>REFLEKSI</p>
                <p className="t-body-lg reflect-prompt__q">{REFLECT_PROMPT}</p>
                <p className="t-caption t-secondary reflect-prompt__hint">Tap untuk menulis · opsional</p>
              </article>

              <div className="reflect-empty__actions">
                <Button tone="redup" onClick={() => navigate('create-reflection')} fullWidth={false} style={{ minWidth: 220 }}>
                  Tulis refleksi pertama
                </Button>
              </div>
            </>
          ) : (
            <>
              <article className="reflect-week-card">
                <p className="t-micro t-tertiary">CUACA MINGGU INI</p>
                <div className="reflect-week-bubbles">
                  {WEEKLY_WEATHER.map((d, i) => {
                    const cfg = ENERGY_CONFIG[d.energy];
                    return (
                      <div key={i} className="reflect-week-bubble">
                        <div className="reflect-week-bubble__dot" style={{ background: cfg.soft }}>
                          <span aria-hidden="true">{settings.hideWeatherEmoji ? '•' : cfg.emoji}</span>
                        </div>
                        <span className="reflect-week-bubble__lab">{d.label}</span>
                      </div>
                    );
                  })}
                </div>
              </article>

              <div className="reflect-stats">
                <article className="reflect-stat">
                  <p className="t-h1 reflect-stat__num">17</p>
                  <p className="t-caption t-secondary">selesai dari yang dipilih</p>
                </article>
                <article className="reflect-stat">
                  <p className="t-h1 reflect-stat__num">2</p>
                  <p className="t-caption t-secondary">hari, tanpa rasa bersalah</p>
                </article>
              </div>

              <article className="reflect-prompt" onClick={() => navigate('create-reflection')}>
                <p className="t-micro reflect-prompt__label" style={{ color: 'var(--energy-redup)' }}>REFLEKSI</p>
                <p className="t-body-lg reflect-prompt__q">{REFLECT_PROMPT}</p>
                <p className="t-caption t-secondary reflect-prompt__hint">Tap untuk menulis · opsional</p>
              </article>
            </>
          )}
        </div>
      </Screen>
      <BottomNav />
    </div>
  );
}
