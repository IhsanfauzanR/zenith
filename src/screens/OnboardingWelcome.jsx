import Screen from '../components/Screen.jsx';
import Button from '../components/Button.jsx';
import { useApp } from '../context/AppContext.jsx';
import './OnboardingWelcome.css';

export default function OnboardingWelcome() {
  const { navigate, replaceScreen } = useApp();
  return (
    <Screen className="onb-welcome">
      <div className="onb-welcome__top">
        <div className="onb-welcome__hero" aria-hidden="true">
          <div className="onb-welcome__hero-glow" />
        </div>
        <div className="onb-welcome__brand">ZENITH</div>
      </div>

      <div className="onb-welcome__copy">
        <h1 className="t-display onb-welcome__headline">
          Ruang istirahat<br />untuk pikiranmu.
        </h1>
        <p className="t-body-lg t-secondary onb-welcome__sub">
          Bukan lagi daftar tugas yang menuntut.<br />
          Ini ruang yang menyesuaikan dengan harimu.
        </p>
      </div>

      <div className="onb-welcome__actions">
        <Button onClick={() => navigate('onboarding-energy')}>
          Mulai perlahan
        </Button>
        <button
          type="button"
          className="onb-welcome__skip"
          onClick={() => replaceScreen('login')}
        >
          Lewati perkenalan
        </button>
      </div>
    </Screen>
  );
}
