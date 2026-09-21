# AGENTS.MD - Chrome Extension: StudyFlow (Pomodoro & Gamification)

## Contexto do Projeto
Extensão de produtividade para Chrome voltada a estudantes. Combina a técnica Pomodoro, gestão de tarefas (To-Do List) e gamificação para incentivar a consistência diária.

## Histórico de Decisões
- 2026-02-08: Definição inicial.
- 2026-02-08: Escolha de **Vanilla JS** para a Tech Stack inicial (foco em performance e leveza).
- 2026-02-08: Persistência do Timer via `chrome.alarms` no **Background Service Worker** para evitar interrupções ao fechar o popup.
- 2026-02-08: Armazenamento via `chrome.storage.sync` para To-Do e Streaks; `chrome.storage.local` para estados temporários de timer.
- 2026-02-08: Gamificação: Streak ativado por conclusão de 3 tarefas OU 1 ciclo Pomodoro completo.
- 2026-02-08: Internacionalização (i18n): idioma padrão do navegador; configuração separada para extensão e mensagens motivacionais na aba Config.

## Tech Stack
- **Linguagem:** HTML5, CSS3, JavaScript (ES6+).
- **APIs Chrome:** `chrome.alarms`, `chrome.storage`, `chrome.notifications`, `chrome.runtime`.
- **API Externa:** ZenQuotes API (ou Adviceslip) para mensagens motivacionais.

## Funcionalidades Principais

### 1. Pomodoro Timer (Core)
- **Modos:** Foco (25 min), Pausa Curta (5 min), Pausa Longa (15 min).
- **Resiliência:** O tempo deve ser processado no `background.js`. O `popup.js` apenas consulta o tempo restante.
- **Notificações:** Alerta nativo ao final de cada ciclo.

### 2. To-Do List
- Adicionar, marcar como concluído e deletar tarefas.
- Persistência em `chrome.storage.sync`.
- Contador interno de tarefas concluídas no dia (reset às 00:00).

### 3. Gamificação (Streaks)
- **Lógica de Streak:** Incrementa se (Tarefas concluídas >= 3) OU (Ciclo Pomodoro concluído >= 1).
- **Métricas:** Dias consecutivos, total de horas de foco, total de minutos.
- **Reset:** Se o usuário não cumprir o requisito em 24h, o "Daily Streak" volta a 0.

### 4. Mensagem Motivacional
- Ao abrir a extensão pela primeira vez no dia, exibir frase motivacional no idioma configurado (local ou API).
- Quotes locais por idioma (en, pt_BR, es); fallback ZenQuotes/Adviceslip para inglês.

### 5. Internacionalização (i18n)
- **Idioma padrão:** Detectado pelo navegador (`navigator.language`).
- **Configuração:** Aba Config permite alterar separadamente:
  - Idioma da extensão (UI, botões, labels).
  - Idioma das mensagens motivacionais.
- **Idiomas suportados:** English, Português (Brasil), Español.

## Arquitetura de Arquivos
- `manifest.json`: Configurações V3 e permissões (`alarms`, `storage`, `notifications`).
- `popup/`:
  - `popup.html`: Estrutura da interface.
  - `popup.css`: Estilização (foco em UI limpa/estudante).
  - `popup.js`: Manipulação de DOM e comunicação com o background.
- `background.js`: Service worker gerenciando `chrome.alarms` e lógica de tempo.
- `scripts/`:
  - `storage.js`: Helper para salvar/ler dados.
  - `quotes.js`: Frases motivacionais por idioma (local + API).
  - `i18n.js`: Strings traduzidas e helpers de locale.
- `data/`:
  - `quotes.json`: Quotes locais por idioma (en, pt_BR, es).

## Regras de Negócio e [ASSUMPTIONS]
- [ASSUMPTION] O dia vira às 00:00 do horário local do navegador para fins de streak.
- [ASSUMPTION] A extensão não requer login; os dados são vinculados à conta Google do Chrome (via sync).
- [ASSUMPTION] O som de alerta é opcional e pode ser desativado (padrão: ativado).
