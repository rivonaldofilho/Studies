# StudyFlow

Extensão Chrome de produtividade para estudantes: Pomodoro Timer + To-Do List + Gamificação.

## Instalação

1. Abra `chrome://extensions/`
2. Ative o **Modo do desenvolvedor**
3. Clique em **Carregar sem compactação**
4. Selecione a pasta do projeto

## Funcionalidades

- **Timer Pomodoro**: Foco (25min), Pausa Curta (5min), Pausa Longa (15min)
- **To-Do List**: Adicionar, concluir e excluir tarefas
- **Streaks**: Dias consecutivos de produtividade (3 tarefas ou 1 Pomodoro/dia)
- **Mensagem motivacional**: Quote diária ao abrir a extensão

## Estrutura

```
Projeto Pomodoro/
├── manifest.json
├── background.js
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
└── scripts/
    ├── storage.js
    └── quotes.js
```
