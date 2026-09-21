/**
 * StudyFlow - Helper para persistência via chrome.storage
 */

const STORAGE_KEYS = {
  todos: 'todos',
  streakData: 'streakData',
  tasksCompletedToday: 'tasksCompletedToday',
  lastResetDate: 'lastResetDate',
  lastQuoteDate: 'lastQuoteDate',
  lastQuote: 'lastQuote',
  soundEnabled: 'soundEnabled',
  durations: 'durations',
  extensionLanguage: 'extensionLanguage',
  messageLanguage: 'messageLanguage'
};

const DEFAULT_DURATIONS = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15
};

/**
 * Retorna chave do dia atual (YYYY-MM-DD)
 */
function getTodayKey() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

/**
 * To-Do: salvar no sync
 */
export async function saveTodos(todos) {
  await chrome.storage.sync.set({ [STORAGE_KEYS.todos]: todos });
}

/**
 * To-Do: ler do sync
 */
export async function getTodos() {
  const result = await chrome.storage.sync.get([STORAGE_KEYS.todos]);
  return result[STORAGE_KEYS.todos] || [];
}

/**
 * Streak: salvar dados do dia
 */
export async function saveStreakData(streakData) {
  await chrome.storage.sync.set({ [STORAGE_KEYS.streakData]: streakData });
}

/**
 * Streak: ler dados
 */
export async function getStreakData() {
  const result = await chrome.storage.sync.get([STORAGE_KEYS.streakData]);
  return result[STORAGE_KEYS.streakData] || {};
}

/**
 * Incrementa tarefas concluídas hoje e atualiza streak
 */
export async function incrementTasksCompleted() {
  const today = getTodayKey();
  const streakData = await getStreakData();
  if (!streakData[today]) streakData[today] = { pomodoros: 0, tasks: 0 };
  streakData[today].tasks = (streakData[today].tasks || 0) + 1;
  await saveStreakData(streakData);
  return streakData[today].tasks;
}

/**
 * Calcula streak (dias consecutivos) e métricas
 */
export async function getStreakMetrics() {
  const streakData = await getStreakData();
  const today = getTodayKey();
  const REQUIREMENT = { minTasks: 3, minPomodoros: 1 };

  let consecutiveDays = 0;
  let totalFocusMinutes = 0;

  // Ordena datas decrescente
  const dates = Object.keys(streakData).sort((a, b) => b.localeCompare(a));

  for (const date of dates) {
    const day = streakData[date];
    const meetsGoal = (day.tasks || 0) >= REQUIREMENT.minTasks ||
      (day.pomodoros || 0) >= REQUIREMENT.minPomodoros;

    if (!meetsGoal) break;
    consecutiveDays++;
    totalFocusMinutes += (day.pomodoros || 0) * 25;
  }

  return {
    consecutiveDays,
    totalFocusMinutes,
    totalFocusHours: Math.floor(totalFocusMinutes / 60)
  };
}

/**
 * Verifica se precisa exibir mensagem motivacional (primeira vez no dia)
 */
export async function shouldShowQuote() {
  const today = getTodayKey();
  const result = await chrome.storage.sync.get([STORAGE_KEYS.lastQuoteDate]);
  return result[STORAGE_KEYS.lastQuoteDate] !== today;
}

/**
 * Marca que a mensagem do dia foi exibida
 */
export async function markQuoteShown() {
  const today = getTodayKey();
  await chrome.storage.sync.set({ [STORAGE_KEYS.lastQuoteDate]: today });
}

/**
 * Salva última quote em cache
 */
export async function saveLastQuote(quote) {
  await chrome.storage.sync.set({ [STORAGE_KEYS.lastQuote]: quote });
}

/**
 * Lê última quote em cache
 */
export async function getLastQuote() {
  const result = await chrome.storage.sync.get([STORAGE_KEYS.lastQuote]);
  return result[STORAGE_KEYS.lastQuote] || null;
}

/**
 * Durações do timer (minutos): focus, shortBreak, longBreak
 */
export async function getDurations() {
  const result = await chrome.storage.sync.get([STORAGE_KEYS.durations]);
  const stored = result[STORAGE_KEYS.durations] || {};
  return {
    ...DEFAULT_DURATIONS,
    ...stored
  };
}

export async function saveDurations(durations) {
  await chrome.storage.sync.set({ [STORAGE_KEYS.durations]: durations });
}

/**
 * Idioma: extensão e mensagens motivacionais (null = usar do navegador)
 */
export async function getLanguageSettings() {
  const result = await chrome.storage.sync.get([
    STORAGE_KEYS.extensionLanguage,
    STORAGE_KEYS.messageLanguage
  ]);
  return {
    extensionLanguage: result[STORAGE_KEYS.extensionLanguage] ?? null,
    messageLanguage: result[STORAGE_KEYS.messageLanguage] ?? null
  };
}

export async function saveLanguageSettings({ extensionLanguage, messageLanguage }) {
  const obj = {};
  if (extensionLanguage != null) obj[STORAGE_KEYS.extensionLanguage] = extensionLanguage;
  else obj[STORAGE_KEYS.extensionLanguage] = null;
  if (messageLanguage != null) obj[STORAGE_KEYS.messageLanguage] = messageLanguage;
  else obj[STORAGE_KEYS.messageLanguage] = null;
  await chrome.storage.sync.set(obj);
}
