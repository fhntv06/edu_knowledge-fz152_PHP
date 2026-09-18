// cards.js — рендер карточек на главной странице

import {escapeHtml, tagClasses, statusColors, markdownToHtmlShort} from './utils.js';

// Рендер карточек
export function renderCards(articles) {
    const grid = document.getElementById('cards-grid');
    if (!grid) return;

    if (!articles || articles.length === 0) {
        grid.innerHTML = '<h2 class="not-found">Ничего не найдено</h2>';
        return;
    }

    grid.innerHTML = articles.map((a, i) => `
        <div class="card-item" onclick="location.href='${a.url}'">
            <div class="card-item-num">${i + 1 < 10 ? `0${i + 1}` : `${i + 1}` }</div>
            <div class="card-item-title">${escapeHtml(a.title)}</div>
            <div class="card-item-desc">${markdownToHtmlShort(a.desc)}</div>
            <div class="card-item-footer">
                ${a.tags.map(t => `<span class="tag ${tagClasses[t] || 'tag-law'}">${escapeHtml(t)}</span>`).join('')}
                ${a.blog ? '<span class="tag" style="background:var(--ink);color:var(--paper)">В блог</span>' : ''}
            </div>
            <div class="card-progress">
                <div class="card-progress-bar" style="width:${a.progress}%;background:${statusColors[a.status]}"></div>
            </div>
        </div>
    `).join('');
}