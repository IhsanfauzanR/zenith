import Screen from '../components/Screen.jsx';
import Button from '../components/Button.jsx';
import { useApp } from '../context/AppContext.jsx';
import './OnboardingEnergy.css';

export default function OnboardingEnergy() {
  const { navigate, replaceScreen } = useApp();
  return (
    <Screen className="onb-energy">
      <header className="onb-energy__header">
        <div className="onb-energy__dots" aria-hidden="true">
          <span className="dot" />
          <span className="dot dot--active" />
          <span className="dot" />
        </div>
        <button className="onb-energy__skip" onClick={() => replaceScreen('login')}>
          Lewati
        </button>
      </header>

      <div className="onb-energy__illustration" aria-hidden="true">
        <div className="bubble bubble--sm bubble--cerah">☀️</div>
        <div className="bubble bubble--lg bubble--berawan">⛅</div>
        <div className="bubble bubble--sm bubble--redup">🌙</div>
      </div>

      <div className="onb-energy__copy">
        <h2 className="t-h1 onb-energy__headline">
          Setiap hari punya cuacanya sendiri.
        </h2>
        <p className="t-body-lg t-secondary">
          Kadang kamu cerah, kadang berawan, kadang redup. Zenith mengikuti — bukan menuntutmu untuk selalu produktif.
        </p>
      </div>

      <div className="onb-energy__actions">
        <Button onClick={() => navigate('login')}>Lanjut</Button>
      </div>
    </Screen>
  );
}
