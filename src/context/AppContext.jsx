import { createContext, useContext, useMemo, useReducer, useCallback } from 'react';
import { TASKS, REFLECTIONS } from '../data/data.js';

const AppContext = createContext(null);

const INITIAL_STATE = {
  currentScreen: 'onboarding-welcome',
  energy: null,
  activeTab: 'today',
  history: [], // stack of previous screens for back navigation
  selectedTaskId: null,
  settings: {
    // accessibility
    reduceMotion: true,
    monochrome: false,
    increaseContrast: true,
    hideWeatherEmoji: false,
    textSize: 'medium',
    // reminders
    morningGreeting: true,
    taskReminder: true,
    reflectReminder: false,
    silentOnRedup: true,
    // theme
    themeMode: 'light',
    accentColor: 'blue',
    reduceTransparency: false,
    // privacy
    cloudBackup: false,
    anonAnalytics: false,
  },
  tasks: TASKS,
  reflections: REFLECTIONS,
  // Demo mode untuk presentasi — toggle empty state per tab via gesture
  demoMode: {
    todayEmpty: false,
    agendaEmpty: false,
    reflectEmpty: false,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'NAVIGATE':
      if (action.screen === state.currentScreen) return state;
      return {
        ...state,
        currentScreen: action.screen,
        history: [...state.history, state.currentScreen],
      };
    case 'NAVIGATE_BACK': {
      if (state.history.length === 0) return state;
      const prev = state.history[state.history.length - 1];
      return {
        ...state,
        currentScreen: prev,
        history: state.history.slice(0, -1),
      };
    }
    case 'REPLACE_SCREEN':
      return { ...state, currentScreen: action.screen };
    case 'SET_ENERGY':
      return { ...state, energy: action.energy };
    case 'SET_TAB':
      return { ...state, activeTab: action.tab, currentScreen: tabToScreen(action.tab) };
    case 'TOGGLE_SETTING':
      return {
        ...state,
        settings: { ...state.settings, [action.key]: !state.settings[action.key] },
      };
    case 'SET_SETTING':
      return {
        ...state,
        settings: { ...state.settings, [action.key]: action.value },
      };
    case 'SELECT_TASK':
      return { ...state, selectedTaskId: action.id };
    case 'ADD_TASK':
      return { ...state, tasks: [action.task, ...state.tasks] };
    case 'ADD_REFLECTION':
      return { ...state, reflections: [action.reflection, ...state.reflections] };
    case 'TOGGLE_DEMO_EMPTY':
      return {
        ...state,
        demoMode: {
          ...state.demoMode,
          [action.key]: !state.demoMode[action.key],
        },
      };
    default:
      return state;
  }
}

function tabToScreen(tab) {
  switch (tab) {
    case 'today': return 'home-today';
    case 'agenda': return 'agenda';
    case 'reflect': return 'reflect';
    case 'profile': return 'profile';
    default: return 'home-today';
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const navigate = useCallback((screen) => dispatch({ type: 'NAVIGATE', screen }), []);
  const navigateBack = useCallback(() => dispatch({ type: 'NAVIGATE_BACK' }), []);
  const replaceScreen = useCallback((screen) => dispatch({ type: 'REPLACE_SCREEN', screen }), []);
  const setEnergy = useCallback((energy) => dispatch({ type: 'SET_ENERGY', energy }), []);
  const setTab = useCallback((tab) => dispatch({ type: 'SET_TAB', tab }), []);
  const toggleSetting = useCallback((key) => dispatch({ type: 'TOGGLE_SETTING', key }), []);
  const setSetting = useCallback((key, value) => dispatch({ type: 'SET_SETTING', key, value }), []);
  const selectTask = useCallback((id) => dispatch({ type: 'SELECT_TASK', id }), []);
  const addTask = useCallback((task) => dispatch({ type: 'ADD_TASK', task }), []);
  const addReflection = useCallback((reflection) => dispatch({ type: 'ADD_REFLECTION', reflection }), []);
  const toggleDemoEmpty = useCallback((key) => dispatch({ type: 'TOGGLE_DEMO_EMPTY', key }), []);

  const openTaskDetail = useCallback((id) => {
    dispatch({ type: 'SELECT_TASK', id });
    dispatch({ type: 'NAVIGATE', screen: 'task-detail' });
  }, []);

  const value = useMemo(() => ({
    ...state,
    navigate,
    navigateBack,
    replaceScreen,
    setEnergy,
    setTab,
    toggleSetting,
    setSetting,
    selectTask,
    addTask,
    addReflection,
    toggleDemoEmpty,
    openTaskDetail,
  }), [state, navigate, navigateBack, replaceScreen, setEnergy, setTab, toggleSetting, setSetting, selectTask, addTask, addReflection, toggleDemoEmpty, openTaskDetail]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
