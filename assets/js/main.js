// main.js — точка входа

import { loadArticles, setArticles } from './modules/api.js';
import { renderCards } from './modules/cards.js';
import { updateStats } from './modules/stats.js';
import { doSearch, clearSearch } from './modules/search.js';  // ← добавили clearSearch
import { exportBlog } from './modules/export.js';
import { addNote } from './modules/notes.js';
import { toggleCheck, loadChecklistState, saveChecklistState } from './modules/checklist.js';
import { updateFooterDate } from './modules/utils.js';

// Делаем функции глобальными для onclick в HTML
window.doSearch = doSearch;
window.clearSearch = clearSearch;  // ← добавили
window.exportBlog = exportBlog;
window.addNote = addNote;
window.toggleCheck = toggleCheck;

// Инициализация
async function init() {
  updateFooterDate();

  const articles = await loadArticles();
  setArticles(articles);

  updateStats();

  if (document.getElementById('cards-grid')) {
    renderCards(articles);
  }

  loadChecklistState();
}

window.addEventListener('beforeunload', () => {
  saveChecklistState();
});

document.addEventListener('DOMContentLoaded', init)
