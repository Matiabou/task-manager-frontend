'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type Language = 'en' | 'es';

type Translations = {
  homeCallout: string;
  homeTitle: string;
  homeDescription: string;
  viewGitHub: string;
  login: string;
  register: string;
  createAccount: string;
  loginPageTitle: string;
  loginError: string;
  loginLoading: string;
  backHome: string;
  loadingMessage: string;
  noAccount: string;
  signUp: string;
  haveAccount: string;
  loginAction: string;
  registerPageTitle: string;
  registerErrorDefault: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  dashboardTitle: string;
  dashboardSubtitle: string;
  createTaskButton: string;
  taskTitlePlaceholder: string;
  taskDescriptionPlaceholder: string;
  noTasksYet: string;
  loadingTasks: string;
  taskActionWorking: string;
  toggleStatus: string;
  deleteTask: string;
  fetchTasksError: string;
  logout: string;
};

const translations: Record<Language, Translations> = {
  en: {
    homeCallout: 'API Integration Demo',
    homeTitle: 'Task Manager API',
    homeDescription:
      'https://github.com/Matiabou/task-manager-api',
    viewGitHub: 'View on GitHub',
    login: 'Login',
    register: 'Register',
    createAccount: 'Create account',
    loginPageTitle: 'Login',
    loginError: 'Incorrect email or password',
    loginLoading: 'Loading...',
    loadingMessage: 'This may take up to a minute.',
    noAccount: "Don't have an account?",
    signUp: 'Sign up',
    haveAccount: 'Already have an account?',
    loginAction: 'Log in',
    registerPageTitle: 'Register',
    registerErrorDefault: 'Something went wrong',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Password',
    backHome: 'Back home',
    dashboardTitle: 'Dashboard',
    dashboardSubtitle: 'Task Management',
    createTaskButton: 'Create task',
    taskTitlePlaceholder: 'Title',
    taskDescriptionPlaceholder: 'Description',
    noTasksYet: 'No tasks yet',
    loadingTasks: 'Loading tasks...',
    taskActionWorking: 'Working…',
    toggleStatus: 'Toggle status',
    deleteTask: 'Delete',
    fetchTasksError: 'Failed to fetch tasks',
    logout: 'Logout',
  },
  es: {
    homeCallout: 'Demo de Integración API',
    homeTitle: 'Task Manager API',
    homeDescription:
      'https://github.com/Matiabou/task-manager-api',
    viewGitHub: 'Ver en GitHub',
    login: 'Iniciar sesión',
    register: 'Registrarse',
    createAccount: 'Crear cuenta',
    loginPageTitle: 'Iniciar sesión',
    loginError: 'Correo o contraseña incorrectos',
    loginLoading: 'Cargando...',
    loadingMessage: 'Puede tardar hasta un minuto.',
    noAccount: '¿No tienes cuenta?',
    signUp: 'Regístrate',
    haveAccount: '¿Ya tienes cuenta?',
    loginAction: 'Iniciar sesión',
    registerPageTitle: 'Registrarse',
    registerErrorDefault: 'Algo salió mal',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Contraseña',
    backHome: 'Volver al inicio',
    dashboardTitle: 'Dashboard',
    dashboardSubtitle: 'Gestión de Tareas',
    createTaskButton: 'Crear tarea',
    taskTitlePlaceholder: 'Título',
    taskDescriptionPlaceholder: 'Descripción',
    noTasksYet: 'No hay tareas todavía',
    loadingTasks: 'Cargando tareas...',
    taskActionWorking: 'Trabajando…',
    toggleStatus: 'Cambiar estado',
    deleteTask: 'Eliminar',
    fetchTasksError: 'Error al obtener tareas',
    logout: 'Cerrar sesión',
  },
};

const LanguageContext = createContext<{
  locale: Language;
  toggleLanguage: () => void;
  setLanguage: (language: Language) => void;
  t: Translations;
}>({
  locale: 'en',
  toggleLanguage: () => {},
  setLanguage: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Language>('en');

  const toggleLanguage = () => {
    setLocale((current) => (current === 'en' ? 'es' : 'en'));
  };

  const value = useMemo(
    () => ({ locale, toggleLanguage, setLanguage: setLocale, t: translations[locale] }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
