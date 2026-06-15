import Screen from '../components/Screen.jsx';
import Button from '../components/Button.jsx';
import { useApp } from '../context/AppContext.jsx';
import { ENERGY_CONFIG } from '../data/data.js';
import './OnboardingEnergyExplained.css';

const CARDS = [
  {
    id: 'cerah',
    desc: 'Energi penuh, kepala jernih.',
    note: 'Semua jenis tugas ditampilkan',
  },
  {
    id: 'berawan',
    desc: 'Cukup, tapi tidak ingin terburu.',
    note: 'Tugas penting & sedang saja',
  },
  {
    id: 'redup',
    desc: 'Lelah, ingin hari yang pelan.',
    note: 'Cuma yang ringan, tiga atau kurang',
  },
];

export default function OnboardingEnergyExplained() {
  const { navigate, settings } = useApp();

  return (
    <Screen className="onb-explained">
      <header className="onb-explained__header">
        <div className="onb-explained__dots" aria-hidden="true">
          <span className="dot" />
          <span className="dot" />
          <span className="dot dot--active" />
        </div>
      </header>

      <div className="onb-explained__copy">
        <h1 className="t-h1 onb-explained__headline">Kenali tiga cuacamu.</h1>
        <p className="t-body t-secondary onb-explained__sub">
          Pilih yang paling sesuai. Zenith atur tugas yang muncul.
        </p>
      </div>

      <section className="onb-explained__cards" aria-label="Penjelasan tiga energi">
        {CARDS.map(card => {
          const cfg = ENERGY_CONFIG[card.id];
          return (
            <article key={card.id} className="energy-explain">
              <div className="energy-explain__top">
                <div
                  className="energy-explain__icon"
                  style={{ background: cfg.soft }}
                  aria-hidden="true"
                >
                  <span>{settings.hideWeatherEmoji ? '•' : cfg.emoji}</span>
                </div>
                <div className="energy-explain__title-block">
                  <h2 className="t-title energy-explain__title">{cfg.label}</h2>
                  <p className="t-body energy-explain__desc">{card.desc}</p>
                </div>
              </div>
              <div className="energy-explain__divider" aria-hidden="true" />
              <div className="energy-explain__footer">
                <span
                  className="energy-explain__dot"
                  style={{ background: cfg.color }}
                  aria-hidden="true"
                />
                <span className="energy-explain__note">{card.note}</span>
              </div>
            </article>
          );
        })}
      </section>

      <p className="t-caption t-tertiary onb-explained__foot">
        Zenith menyesuaikan jumlah dan jenis tugas dengan energi yang kamu pilih.
      </p>

      <div className="onb-explained__actions">
        <Button onClick={() => navigate('login')}>Aku mengerti</Button>
      </div>
    </Screen>
  );
}
