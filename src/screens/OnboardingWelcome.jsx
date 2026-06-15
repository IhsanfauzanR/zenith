import Screen from '../components/Screen.jsx';
import Button from '../components/Button.jsx';
import ZenithMark from '../components/ZenithMark.jsx';
import { useApp } from '../context/AppContext.jsx';
import './OnboardingWelcome.css';

export default function OnboardingWelcome() {
  const { navigate, replaceScreen } = useApp();
  return (
    <Screen className="onb-welcome">
      <div className="onb-welcome__top">
        <div className="onb-welcome__mark">
          <div className="onb-welcome__mark-glow" aria-hidden="true" />
          <ZenithMark size={132} strokeWidth={4.5} className="onb-welcome__mark-svg" />
        </div>
        <div className="onb-welcome__brand">ZENITH</div>
      </div>

      <div className="onb-welcome__copy">
        <h1 className="t-display onb-welcome__headline">
          Tugas yang ikut<br />cuaca harimu.
        </h1>
        <p className="t-body-lg t-secondary onb-welcome__sub">
          Pilih cuacamu dulu.<br />
          Zenith pilihkan tugas yang masuk akal.
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
