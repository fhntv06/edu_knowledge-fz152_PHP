// assets/js/modules/search.js

import { renderCards } from './cards.js';
import { getArticles } from './api.js';

let searchTimeout = null;
let currentQuery = '';

// Поиск с debounce (задержка для оптимизации)
export function doSearch(q, event) {
    console.log(q, event)
    // Если event существует и это нажатие Escape — очищаем
    if (event && event.key === 'Escape') {
        clearSearch();
        return;
    }

    currentQuery = q;

    // Debounce: ждём 300ms после последнего ввода
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
        performSearch(q);
    }, 300);
}

// Выполнение поиска
function performSearch(q) {
    const articles = getArticles();

    console.log('Поиск:', q);
    console.log('Всего статей:', articles.length);

    if (!q || !q.trim()) {
        console.log('Очистка поиска');
        renderCards(articles);
        updateSearchStats(null);
        return;
    }

    const ql = q.toLowerCase();
    const filtered = articles.filter(a => {
        const titleMatch = a.title && a.title.toLowerCase().includes(ql);
        const descMatch = a.desc && a.desc.toLowerCase().includes(ql);
        const tagsMatch = a.tags && a.tags.some(t => t.toLowerCase().includes(ql));

        const match = titleMatch || descMatch || tagsMatch;
        if (match) {
            console.log('Найдено:', a.title);
        }
        return match;
    });

    console.log('Отфильтровано:', filtered.length);
    console.log('Результаты:', filtered);

    renderCards(filtered);
    updateSearchStats(filtered, q);
}

// Очистка поиска
export function clearSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = '';
    }
    currentQuery = '';
    performSearch('');
}

// Отображение статистики поиска
function updateSearchStats(results, query) {
    // Удаляем старый индикатор, если есть
    const oldStats = document.querySelector('.search-stats');
    if (oldStats) oldStats.remove();

    // Если нет результатов и есть запрос — показываем сообщение
    if (query && query.trim() && results && results.length === 0) {
        const grid = document.getElementById('cards-grid');
        if (grid && !grid.querySelector('.no-results')) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results search-stats';
            noResults.style.cssText = 'text-align: center; padding: 48px; color: var(--ink-3);';
            noResults.innerHTML = `
                🔍 Ничего не найдено по запросу "${escapeHtml(query)}"
                <br><br>
                <button class="btn" onclick="window.clearSearch()">Очистить поиск</button>
            `;
            // Вставляем только если карточек нет
            if (grid && grid.children.length === 0) {
                grid.appendChild(noResults);
            }
        }
    }

    // Показываем количество результатов
    if (query && query.trim() && results && results.length > 0) {
        const topbar = document.querySelector('.topbar-breadcrumb');
        if (topbar && !document.querySelector('.search-stats')) {
            const statsSpan = document.createElement('span');
            statsSpan.className = 'search-stats';
            statsSpan.style.cssText = 'margin-left: 12px; font-size: 12px; color: var(--ink-3);';
            statsSpan.innerHTML = `🔍 найдено: ${results.length}`;
            topbar.appendChild(statsSpan);
        }
    } else {
        // Удаляем статистику, если поиск очищен
        const stats = document.querySelector('.search-stats');
        if (stats) stats.remove();
    }
}

// Подсветка найденного текста (опционально)
export function highlightText(text, query) {
    if (!query || !query.trim() || !text) return escapeHtml(text);

    const ql = query.toLowerCase();
    const escapedText = escapeHtml(text);
    const escapedQuery = escapeHtml(ql);

    const regex = new RegExp(`(${escapedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return escapedText.replace(regex, '<mark class="search-highlight">$1</mark>');
}

// Вспомогательная функция экранирования
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Делаем функции глобальными для onclick
if (typeof window !== 'undefined') {
    window.doSearch = doSearch;
    window.clearSearch = clearSearch;
}