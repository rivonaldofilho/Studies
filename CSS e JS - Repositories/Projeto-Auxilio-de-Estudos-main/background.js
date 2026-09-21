/**
 * StudyFlow - Background Service Worker
 * Gerencia chrome.alarms para o Pomodoro Timer (resiliência ao fechar popup)
 * Nota: chrome.alarms tem período mínimo de 1 min. Usamos "when" para disparo exato.
 */
import { getDurations } from './scripts/storage.js';
import { tNotification } from './scripts/i18n.js';

const ALARM_TIMER = 'pomodoro-timer';

// Durações padrão (fallback)
const DEFAULT_DURATIONS = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15
};

// Estado do timer (persistido em chrome.storage.local)
let timerState = {
  mode: 'focus',
  endTimestamp: null, // Date.now() + remainingSeconds * 1000
  isRunning: false
};

/**
 * Retorna durações (storage ou padrão)
 */
async function getDurationsOrDefault() {
  try {
    return await getDurations();
  } catch (e) {
    return DEFAULT_DURATIONS;
  }
}

/**
 * Inicializa o background ao instalar/atualizar
 */
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.clearAll();
  loadTimerState();
});

/**
 * Escuta quando o alarme dispara (fim do ciclo)
 */
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_TIMER) {
    onTimerComplete();
  }
});

/**
 * Carrega estado do timer do storage
 */
async function loadTimerState() {
  try {
    const result = await chrome.storage.local.get(['timerState']);
    if (result.timerState) {
      timerState = result.timerState;
    }
  } catch (e) {
    console.error('StudyFlow: Erro ao carregar timer', e);
  }
}

/**
 * Salva estado do timer no storage
 */
async function saveTimerState() {
  try {
    await chrome.storage.local.set({ timerState });
  } catch (e) {
    console.error('StudyFlow: Erro ao salvar timer', e);
  }
}

/**
 * Calcula segundos restantes a partir do endTimestamp
 */
function getRemainingSeconds() {
  if (timerState.pausedRemaining != null) {
    return timerState.pausedRemaining;
  }
  if (!timerState.endTimestamp || !timerState.isRunning) {
    return null; // popup will get from getDurations when reset
  }
  const remaining = Math.floor((timerState.endTimestamp - Date.now()) / 1000);
  return Math.max(0, remaining);
}

/**
 * Chamado quando um ciclo Pomodoro termina
 */
async function onTimerComplete() {
  chrome.alarms.clear(ALARM_TIMER);

  // Notificação nativa (localizada)
  try {
    const msgKey = timerState.mode === 'focus' ? 'focusComplete' : 'breakComplete';
    const message = await tNotification(msgKey);
    await chrome.notifications.create({
      type: 'basic',
      title: 'StudyFlow',
      message
    });
  } catch (e) {
    console.warn('StudyFlow: Notificação não disponível', e);
  }

  if (timerState.mode === 'focus') {
    // Incrementa Pomodoro completado (para streak)
    const { streakData = {} } = await chrome.storage.sync.get(['streakData']);
    const today = getTodayKey();
    if (!streakData[today]) streakData[today] = { pomodoros: 0, tasks: 0 };
    streakData[today].pomodoros = (streakData[today].pomodoros || 0) + 1;
    await chrome.storage.sync.set({ streakData });
  }

  // Avança para próximo modo
  const nextMode = timerState.mode === 'focus' ? 'shortBreak' : 'focus';
  timerState.mode = nextMode;
  timerState.endTimestamp = null;
  timerState.isRunning = false;
  await saveTimerState();
}

/**
 * Retorna chave do dia atual (YYYY-MM-DD)
 */
function getTodayKey() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

/**
 * Handlers para mensagens do popup
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getTimerState') {
    loadTimerState().then(async () => {
      const remaining = getRemainingSeconds();
      const durations = await getDurationsOrDefault();
      const defaultMode = timerState.mode || 'focus';
      const defaultSeconds = durations[defaultMode] * 60;
      sendResponse({
        ...timerState,
        remainingSeconds: remaining != null ? remaining : defaultSeconds,
        durations
      });
    });
    return true; // async response
  }

  if (message.action === 'startTimer') {
    loadTimerState().then(async () => {
      const durations = await getDurationsOrDefault();
      let remaining;
      if (timerState.pausedRemaining != null) {
        remaining = timerState.pausedRemaining;
        timerState.pausedRemaining = null;
      } else if (timerState.endTimestamp && timerState.isRunning) {
        remaining = Math.floor((timerState.endTimestamp - Date.now()) / 1000);
      } else {
        remaining = durations[timerState.mode] * 60;
      }
      timerState.endTimestamp = Date.now() + remaining * 1000;
      timerState.isRunning = true;
      saveTimerState();
      chrome.alarms.create(ALARM_TIMER, { when: timerState.endTimestamp });
      sendResponse({ ok: true });
    });
    return true;
  }

  if (message.action === 'pauseTimer') {
    loadTimerState().then(async () => {
      const remaining = getRemainingSeconds();
      const durations = await getDurationsOrDefault();
      const defaultMode = timerState.mode || 'focus';
      timerState.endTimestamp = null;
      timerState.isRunning = false;
      timerState.pausedRemaining = remaining != null ? remaining : durations[defaultMode] * 60;
      saveTimerState();
      chrome.alarms.clear(ALARM_TIMER);
      sendResponse({ ok: true });
    });
    return true;
  }

  if (message.action === 'resetTimer') {
    const mode = message.mode || 'focus';
    loadTimerState().then(async () => {
      const durations = await getDurationsOrDefault();
      timerState.mode = mode;
      timerState.endTimestamp = null;
      timerState.isRunning = false;
      timerState.pausedRemaining = null;
      saveTimerState();
      chrome.alarms.clear(ALARM_TIMER);
      sendResponse({ ok: true });
    });
    return true;
  }
});
