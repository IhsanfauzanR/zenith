import { useEffect, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext.jsx';
import OnboardingWelcome from './screens/OnboardingWelcome.jsx';
import OnboardingEnergy from './screens/OnboardingEnergy.jsx';
import Login from './screens/Login.jsx';
import EnergyPicker from './screens/EnergyPicker.jsx';
import HomeToday from './screens/HomeToday.jsx';
import Agenda from './screens/Agenda.jsx';
import Reflect from './screens/Reflect.jsx';
import TaskDetail from './screens/TaskDetail.jsx';
import CreateTask from './screens/CreateTask.jsx';
import CreateReflection from './screens/CreateReflection.jsx';
import Profile from './screens/Profile.jsx';
import SensoryReduced from './screens/SensoryReduced.jsx';
import ReminderSettings from './screens/ReminderSettings.jsx';
import ThemeSettings from './screens/ThemeSettings.jsx';
import PrivacySettings from './screens/PrivacySettings.jsx';
import HelpSettings from './screens/HelpSettings.jsx';

const SCREENS = {
  'onboarding-welcome': OnboardingWelcome,
  'onboarding-energy': OnboardingEnergy,
  'login': Login,
  'energy-picker': EnergyPicker,
  'home-today': HomeToday,
  'agenda': Agenda,
  'reflect': Reflect,
  'task-detail': TaskDetail,
  'create-task': CreateTask,
  'create-reflection': CreateReflection,
  'profile': Profile,
  'sensory-reduced': SensoryReduced,
  'reminder-settings': ReminderSettings,
  'theme-settings': ThemeSettings,
  'privacy-settings': PrivacySettings,
  'help-settings': HelpSettings,
};

function resolveTheme(mode) {
  if (mode === 'dark') return 'dark';
  if (mode === 'system') {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  }
  return 'light';
}

function ScreenSwitcher({ name }) {
  const Comp = SCREENS[name] || OnboardingWelcome;
  return (
    <div key={name} className="screen-anim">
      <Comp />
    </div>
  );
}

function Router() {
  const { currentScreen, settings } = useApp();
  const [theme, setTheme] = useState(() => resolveTheme(settings.themeMode));

  useEffect(() => {
    setTheme(resolveTheme(settings.themeMode));
    if (settings.themeMode === 'system' && typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => setTheme(mq.matches ? 'dark' : 'light');
      mq.addEventListener?.('change', handler);
      return () => mq.removeEventListener?.('change', handler);
    }
  }, [settings.themeMode]);

  // Terapkan attribute ke <html> agar CSS variable override
  // tertangkap saat body resolve color/background.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-text-size', settings.textSize);
    root.setAttribute('data-reduce-motion', String(settings.reduceMotion));
  }, [theme, settings.textSize, settings.reduceMotion]);

  return (
    <div className="app-shell">
      <div className="device-frame">
        <ScreenSwitcher name={currentScreen} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}
