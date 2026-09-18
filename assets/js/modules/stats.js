// stats.js — обновление статистики на главной странице

import { getArticles } from './api.js';

// Обновление статистики
export function updateStats() {
    const articles = getArticles();

    const totalSpan = document.getElementById('stat-total');
    const doneSpan = document.getElementById('stat-done');
    const progressSpan = document.getElementById('stat-progress');
    const blogSpan = document.getElementById('stat-blog');

    if (totalSpan) totalSpan.textContent = articles.length;
    if (doneSpan) doneSpan.textContent = articles.filter(a => a.status === 'done').length;
    if (progressSpan) progressSpan.textContent = articles.filter(a => a.status === 'learning').length;
    if (blogSpan) blogSpan.textContent = articles.filter(a => a.blog).length;
}