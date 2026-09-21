/**
 * StudyFlow - Internacionalização (i18n)
 * Idioma padrão: detectado pelo navegador (navigator.language)
 * Override: armazenado em chrome.storage (extensionLanguage, messageLanguage)
 */

const SUPPORTED_LOCALES = ['en', 'pt_BR', 'es'];

const STRINGS = {
  en: {
    tabTimer: 'Timer',
    tabTasks: 'Tasks',
    tabConfig: 'Settings',
    days: 'days',
    focus: 'Focus',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
    focusDuration: 'Focus duration',
    custom: 'Custom',
    min: 'min',
    start: 'Start',
    pause: 'Pause',
    reset: 'Reset',
    newTask: 'New task...',
    add: 'Add',
    delete: 'Delete',
    continue: 'Continue',
    configTitle: 'Settings',
    configExtensionLang: 'Extension language',
    configMessageLang: 'Motivational message language',
    configBoth: 'Extension and messages',
    configExtensionOnly: 'Extension only',
    configMessagesOnly: 'Messages only',
    configSave: 'Save',
    configSaved: 'Saved!',
    configHint: 'Change extension and motivational message language separately.',
    configAuto: 'Auto (browser)'
  },
  pt_BR: {
    tabTimer: 'Timer',
    tabTasks: 'Tarefas',
    tabConfig: 'Configurações',
    days: 'dias',
    focus: 'Foco',
    shortBreak: 'Pausa Curta',
    longBreak: 'Pausa Longa',
    focusDuration: 'Duração do foco',
    custom: 'Personalizado',
    min: 'min',
    start: 'Iniciar',
    pause: 'Pausar',
    reset: 'Resetar',
    newTask: 'Nova tarefa...',
    add: 'Adicionar',
    delete: 'Excluir',
    continue: 'Continuar',
    configTitle: 'Configurações',
    configExtensionLang: 'Idioma da extensão',
    configMessageLang: 'Idioma das mensagens motivacionais',
    configBoth: 'Extensão e mensagens',
    configExtensionOnly: 'Apenas extensão',
    configMessagesOnly: 'Apenas mensagens',
    configSave: 'Salvar',
    configSaved: 'Salvo!',
    configHint: 'Altere separadamente o idioma da extensão e das mensagens motivacionais.',
    configAuto: 'Auto (navegador)'
  },
  es: {
    tabTimer: 'Timer',
    tabTasks: 'Tareas',
    tabConfig: 'Configuración',
    days: 'días',
    focus: 'Enfoque',
    shortBreak: 'Pausa Corta',
    longBreak: 'Pausa Larga',
    focusDuration: 'Duración del enfoque',
    custom: 'Personalizado',
    min: 'min',
    start: 'Iniciar',
    pause: 'Pausar',
    reset: 'Reiniciar',
    newTask: 'Nueva tarea...',
    add: 'Añadir',
    delete: 'Eliminar',
    continue: 'Continuar',
    configTitle: 'Configuración',
    configExtensionLang: 'Idioma de la extensión',
    configMessageLang: 'Idioma de mensajes motivacionales',
    configBoth: 'Extensión y mensajes',
    configExtensionOnly: 'Solo extensión',
    configMessagesOnly: 'Solo mensajes',
    configSave: 'Guardar',
    configSaved: '¡Guardado!',
    configHint: 'Cambia por separado el idioma de la extensión y de los mensajes motivacionales.',
    configAuto: 'Auto (navegador)'
  }
};

const NOTIFICATION_STRINGS = {
  en: {
    focusComplete: 'Focus cycle complete! Time to rest.',
    breakComplete: 'Break over! Back to focus.'
  },
  pt_BR: {
    focusComplete: 'Ciclo de foco completo! Hora de descansar.',
    breakComplete: 'Pausa finalizada! Volte ao foco.'
  },
  es: {
    focusComplete: '¡Ciclo de enfoque completo! Hora de descansar.',
    breakComplete: '¡Pausa finalizada! Vuelve al enfoque.'
  }
};

/**
 * Normaliza locale do navegador para suportado
 */
function normalizeBrowserLocale() {
  const browser = (typeof navigator !== 'undefined' ? navigator.language : 'en') || 'en';
  const simple = browser.split('-')[0];
  if (browser.toLowerCase().startsWith('pt')) return 'pt_BR';
  if (simple === 'es') return 'es';
  return 'en';
}

/**
 * Retorna locale da extensão (storage ou navegador)
 */
export async function getExtensionLocale() {
  const result = await chrome.storage.sync.get(['extensionLanguage']);
  return result.extensionLanguage || normalizeBrowserLocale();
}

/**
 * Retorna locale das mensagens motivacionais
 */
export async function getMessageLocale() {
  const result = await chrome.storage.sync.get(['messageLanguage']);
  return result.messageLanguage || normalizeBrowserLocale();
}

/**
 * Retorna string traduzida da extensão
 */
export async function t(key) {
  const locale = await getExtensionLocale();
  const strings = STRINGS[locale] || STRINGS.en;
  return strings[key] || STRINGS.en[key] || key;
}

/**
 * Retorna string de notificação (para background)
 */
export async function tNotification(key) {
  const locale = await getExtensionLocale();
  const strings = NOTIFICATION_STRINGS[locale] || NOTIFICATION_STRINGS.en;
  return strings[key] || NOTIFICATION_STRINGS.en[key] || key;
}

/**
 * Retorna todas as strings para um locale (útil para aplicar de uma vez)
 */
export function getStrings(locale) {
  const loc = SUPPORTED_LOCALES.includes(locale) ? locale : 'en';
  return { ...STRINGS.en, ...STRINGS[loc] };
}

/**
 * Locales suportados
 */
export { SUPPORTED_LOCALES };
