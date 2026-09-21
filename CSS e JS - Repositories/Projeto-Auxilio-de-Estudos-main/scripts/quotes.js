/**
 * StudyFlow - Frases motivacionais por idioma
 * Usa locale do usuário (messageLanguage ou navegador)
 */

const ZENQUOTES_URL = 'https://zenquotes.io/api/random';
const ADVICESLIP_URL = 'https://api.adviceslip.com/advice';

let quotesCache = null;

/**
 * Carrega quotes locais (por idioma)
 */
async function loadLocalQuotes() {
  if (quotesCache) return quotesCache;
  try {
    const url = chrome.runtime.getURL('data/quotes.json');
    const res = await fetch(url);
    quotesCache = await res.json();
    return quotesCache;
  } catch (e) {
    console.warn('StudyFlow: Erro ao carregar quotes locais', e);
    return { en: [], pt_BR: [], es: [] };
  }
}

/**
 * Retorna locale para mensagens (do storage ou navegador)
 */
async function getMessageLocale() {
  const result = await chrome.storage.sync.get(['messageLanguage']);
  if (result.messageLanguage) return result.messageLanguage;
  const browser = navigator.language || 'en';
  if (browser.toLowerCase().startsWith('pt')) return 'pt_BR';
  if (browser.toLowerCase().startsWith('es')) return 'es';
  return 'en';
}

/**
 * Busca frase motivacional no idioma do usuário
 * Prioridade: quotes locais > ZenQuotes (en) > Adviceslip (en) > fallback local
 */
export async function fetchMotivationalQuote() {
  const locale = await getMessageLocale();
  const data = await loadLocalQuotes();
  const localQuotes = data[locale] || data.en || [];

  if (localQuotes.length > 0) {
    const q = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    return { text: q.text, author: q.author };
  }

  // Fallback: APIs em inglês (quando não há quotes locais)
  if (locale === 'en') {
    try {
      const res = await fetch(ZENQUOTES_URL);
      if (res.ok) {
        const arr = await res.json();
        if (Array.isArray(arr) && arr[0]) {
          return { text: arr[0].q, author: arr[0].a || 'Unknown' };
        }
      }
    } catch (e) {
      console.warn('StudyFlow: ZenQuotes falhou', e);
    }

    try {
      const res = await fetch(ADVICESLIP_URL);
      if (res.ok) {
        const obj = await res.json();
        if (obj.slip) {
          return { text: obj.slip.advice, author: 'Advice Slip' };
        }
      }
    } catch (e) {
      console.warn('StudyFlow: Adviceslip falhou', e);
    }
  }

  return {
    text: 'Cada pequeno passo conta. Continue assim!',
    author: 'StudyFlow'
  };
}
