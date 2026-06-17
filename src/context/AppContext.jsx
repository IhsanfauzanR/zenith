import { createContext, useContext, useMemo, useReducer, useCallback } from 'react';
import { TASKS, REFLECTIONS, AGENDA } from '../data/data.js';

const AppContext = createContext(null);

const INITIAL_STATE = {
  currentScreen: 'onboarding-welcome',
  energy: null,
  activeTab: 'today',
  history: [], // stack of previous screens for back navigation
  selectedTaskId: null,
  selectedReflectionId: null,
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
  agenda: AGENDA,
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
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => (t.id === action.id ? { ...t, ...action.changes } : t)),
      };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.id) };
    case 'SELECT_REFLECTION':
      return { ...state, selectedReflectionId: action.id };
    case 'UPDATE_REFLECTION':
      return {
        ...state,
        reflections: state.reflections.map(r => (r.id === action.id ? { ...r, ...action.changes } : r)),
      };
    case 'ADD_AGENDA':
      return { ...state, agenda: [...state.agenda, action.item] };
    case 'UPDATE_AGENDA_BY_TASK':
      return {
        ...state,
        agenda: state.agenda.map(a =>
          a.taskId === action.taskId ? { ...a, ...action.changes } : a
        ),
      };
    case 'DELETE_AGENDA':
      return { ...state, agenda: state.agenda.filter(a => a.id !== action.id) };
    case 'DELETE_REFLECTION':
      return { ...state, reflections: state.reflections.filter(r => r.id !== action.id) };
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
  const updateTask = useCallback((id, changes) => dispatch({ type: 'UPDATE_TASK', id, changes }), []);
  const deleteTask = useCallback((id) => dispatch({ type: 'DELETE_TASK', id }), []);
  const addAgenda = useCallback((item) => dispatch({ type: 'ADD_AGENDA', item }), []);
  const updateAgendaByTask = useCallback((taskId, changes) => dispatch({ type: 'UPDATE_AGENDA_BY_TASK', taskId, changes }), []);
  const deleteAgenda = useCallback((id) => dispatch({ type: 'DELETE_AGENDA', id }), []);
  const addReflection = useCallback((reflection) => dispatch({ type: 'ADD_REFLECTION', reflection }), []);
  const updateReflection = useCallback((id, changes) => dispatch({ type: 'UPDATE_REFLECTION', id, changes }), []);
  const deleteReflection = useCallback((id) => dispatch({ type: 'DELETE_REFLECTION', id }), []);
  const toggleDemoEmpty = useCallback((key) => dispatch({ type: 'TOGGLE_DEMO_EMPTY', key }), []);

  const openTaskDetail = useCallback((id) => {
    dispatch({ type: 'SELECT_TASK', id });
    dispatch({ type: 'NAVIGATE', screen: 'task-detail' });
  }, []);

  const openReflectionDetail = useCallback((id) => {
    dispatch({ type: 'SELECT_REFLECTION', id });
    dispatch({ type: 'NAVIGATE', screen: 'reflection-detail' });
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
    updateTask,
    deleteTask,
    addAgenda,
    updateAgendaByTask,
    deleteAgenda,
    addReflection,
    updateReflection,
    deleteReflection,
    toggleDemoEmpty,
    openTaskDetail,
    openReflectionDetail,
  }), [state, navigate, navigateBack, replaceScreen, setEnergy, setTab, toggleSetting, setSetting, selectTask, addTask, updateTask, deleteTask, addAgenda, updateAgendaByTask, deleteAgenda, addReflection, updateReflection, deleteReflection, toggleDemoEmpty, openTaskDetail, openReflectionDetail]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
