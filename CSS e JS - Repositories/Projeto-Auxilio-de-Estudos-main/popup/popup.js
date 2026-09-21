/**
 * StudyFlow - Popup: Timer + Tasks + Config + Gamificação
 */
import {
  getTodos,
  saveTodos,
  incrementTasksCompleted,
  getStreakMetrics,
  shouldShowQuote,
  markQuoteShown,
  getDurations,
  saveDurations,
  getLanguageSettings,
  saveLanguageSettings
} from '../scripts/storage.js';
import { fetchMotivationalQuote } from '../scripts/quotes.js';
import { t, getStrings, getExtensionLocale } from '../scripts/i18n.js';

// --- Refs ---
const timerMinutes = document.getElementById('timerMinutes');
const timerSeconds = document.getElementById('timerSeconds');
const btnStart = document.getElementById('btnStart');
const btnPause = document.getElementById('btnPause');
const btnReset = document.getElementById('btnReset');
const taskInput = document.getElementById('taskInput');
const btnAddTask = document.getElementById('btnAddTask');
const taskList = document.getElementById('taskList');
const streakBadge = document.getElementById('streakCount');
const streakLabel = document.getElementById('streakLabel');
const quoteModal = document.getElementById('quoteModal');
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const btnCloseQuote = document.getElementById('btnCloseQuote');
const customMinutesInput = document.getElementById('customMinutes');
const selectExtensionLang = document.getElementById('selectExtensionLang');
const selectMessageLang = document.getElementById('selectMessageLang');
const btnSaveConfig = document.getElementById('btnSaveConfig');
const configSaved = document.getElementById('configSaved');

const FOCUS_PRESETS = [15, 25, 45, 60];

let timerInterval = null;

// --- i18n: aplicar strings na UI ---
async function applyI18n() {
  const locale = await getExtensionLocale();
  const strings = getStrings(locale);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && strings[key]) el.textContent = strings[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && strings[key]) el.placeholder = strings[key];
  });
}

// --- Tabs ---
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab + 'Panel').classList.add('active');
  });
});

// --- Timer ---
async function getTimerState() {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({ action: 'getTimerState' }, resolve);
  });
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return {
    minutes: String(m).padStart(2, '0'),
    seconds: String(s).padStart(2, '0')
  };
}

function updateTimerDisplay(remaining) {
  const { minutes, seconds } = formatTime(remaining);
  timerMinutes.textContent = minutes;
  timerSeconds.textContent = seconds;
}

async function refreshTimer() {
  const state = await getTimerState();
  updateTimerDisplay(state.remainingSeconds);
  updateModeButtons(state.mode);
  btnStart.disabled = state.isRunning;
  btnPause.disabled = !state.isRunning;
  if (state.durations) {
    await updateFocusDurationUI(state.durations);
  }
}

function updateModeButtons(mode) {
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
}

function startTimerInterval() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(async () => {
    const state = await getTimerState();
    updateTimerDisplay(state.remainingSeconds);
    if (state.remainingSeconds <= 0) {
      clearInterval(timerInterval);
      refreshTimer();
    }
  }, 1000);
}

btnStart.addEventListener('click', async () => {
  chrome.runtime.sendMessage({ action: 'startTimer' }, () => {
    btnStart.disabled = true;
    btnPause.disabled = false;
    startTimerInterval();
  });
});

btnPause.addEventListener('click', async () => {
  chrome.runtime.sendMessage({ action: 'pauseTimer' }, () => {
    btnStart.disabled = false;
    btnPause.disabled = true;
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    refreshTimer();
  });
});

btnReset.addEventListener('click', () => {
  const activeMode = document.querySelector('.mode-btn.active')?.dataset.mode || 'focus';
  chrome.runtime.sendMessage({ action: 'resetTimer', mode: activeMode }, () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    refreshTimer();
  });
});

document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (document.querySelector('.mode-btn.active')?.dataset.mode === btn.dataset.mode) return;
    chrome.runtime.sendMessage({ action: 'resetTimer', mode: btn.dataset.mode }, () => {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      refreshTimer();
    });
  });
});

// --- Duração do foco ---
async function updateFocusDurationUI(durations) {
  const focus = durations.focus || 25;
  const isPreset = FOCUS_PRESETS.includes(focus);
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.classList.toggle('active', isPreset && parseInt(btn.dataset.minutes, 10) === focus);
  });
  customMinutesInput.value = isPreset ? '' : String(focus);
  const customPlaceholder = (await getStrings(await getExtensionLocale())).custom;
  customMinutesInput.placeholder = isPreset ? customPlaceholder : '';
}

async function applyFocusDuration(minutes) {
  const min = Math.max(1, Math.min(120, Math.round(minutes)));
  const durations = await getDurations();
  durations.focus = min;
  await saveDurations(durations);
  await updateFocusDurationUI(durations);
  const activeMode = document.querySelector('.mode-btn.active')?.dataset.mode || 'focus';
  if (activeMode === 'focus') {
    chrome.runtime.sendMessage({ action: 'resetTimer', mode: 'focus' }, () => {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      refreshTimer();
    });
  }
}

document.querySelectorAll('.preset-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const minutes = parseInt(btn.dataset.minutes, 10);
    applyFocusDuration(minutes);
  });
});

customMinutesInput.addEventListener('blur', () => {
  const val = parseInt(customMinutesInput.value, 10);
  if (!isNaN(val) && val >= 1 && val <= 120) {
    applyFocusDuration(val);
  }
});

customMinutesInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') customMinutesInput.blur();
});

// --- Tasks ---
async function renderTasks() {
  const todos = await getTodos();
  const deleteLabel = await t('delete');
  taskList.innerHTML = todos.map((t, i) => `
    <li class="task-item ${t.done ? 'done' : ''}" data-idx="${i}">
      <input type="checkbox" class="task-checkbox" ${t.done ? 'checked' : ''}>
      <span class="task-text">${escapeHtml(t.text)}</span>
      <button class="task-delete" aria-label="${escapeHtml(deleteLabel)}">×</button>
    </li>
  `).join('');

  taskList.querySelectorAll('.task-checkbox').forEach(cb => {
    cb.addEventListener('change', async (e) => {
      const idx = parseInt(e.target.closest('.task-item').dataset.idx, 10);
      const todos = await getTodos();
      todos[idx].done = e.target.checked;
      await saveTodos(todos);
      if (e.target.checked) await incrementTasksCompleted();
      renderTasks();
      refreshStreak();
    });
  });

  taskList.querySelectorAll('.task-delete').forEach(btn => {
    btn.addEventListener('click', async () => {
      const idx = parseInt(btn.closest('.task-item').dataset.idx, 10);
      const todos = await getTodos();
      todos.splice(idx, 1);
      await saveTodos(todos);
      renderTasks();
    });
  });
}

function escapeHtml(s) {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

btnAddTask.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

async function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  const todos = await getTodos();
  todos.push({ text, done: false });
  await saveTodos(todos);
  taskInput.value = '';
  renderTasks();
}

// --- Streak ---
async function refreshStreak() {
  const metrics = await getStreakMetrics();
  streakBadge.textContent = metrics.consecutiveDays;
}

// --- Config ---
async function loadConfig() {
  const { extensionLanguage, messageLanguage } = await getLanguageSettings();
  selectExtensionLang.value = extensionLanguage ?? 'browser';
  selectMessageLang.value = messageLanguage ?? 'browser';
}

btnSaveConfig.addEventListener('click', async () => {
  const ext = selectExtensionLang.value === 'browser' ? null : selectExtensionLang.value;
  const msg = selectMessageLang.value === 'browser' ? null : selectMessageLang.value;
  await saveLanguageSettings({ extensionLanguage: ext, messageLanguage: msg });
  configSaved.classList.remove('hidden');
  await applyI18n();
  setTimeout(() => configSaved.classList.add('hidden'), 2000);
});

// --- Quote Modal ---
async function showQuoteIfNeeded() {
  const should = await shouldShowQuote();
  if (!should) return;

  const quote = await fetchMotivationalQuote();
  quoteText.textContent = `"${quote.text}"`;
  quoteAuthor.textContent = `— ${quote.author}`;
  quoteModal.classList.remove('hidden');
  await markQuoteShown();
}

btnCloseQuote.addEventListener('click', () => {
  quoteModal.classList.add('hidden');
});

// --- Init ---
(async () => {
  await applyI18n();
  await loadConfig();
  await refreshTimer();
  renderTasks();
  refreshStreak();
  showQuoteIfNeeded();

  const state = await getTimerState();
  if (state.isRunning) startTimerInterval();
})();
