// utils.js — вспомогательные функции

// Экранирование HTML
export function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Маппинг тегов на CSS-классы
export const tagClasses = {
    'Закон': 'tag-law',
    'Практика': 'tag-practice',
    'Штрафы': 'tag-penalty',
    'Чеклист': 'tag-checklist',
    'Новое': 'tag-new',
    'ИБ-трек': 'tag-law'
};

// Маппинг статусов на цвета
export const statusColors = {
    'learning': 'var(--amber)',
    'done': 'var(--green)',
    'draft': 'var(--ink-3)'
};

// Обновление даты в подвале
export function updateFooterDate() {
    const dateSpan = document.getElementById('updated-date');
    if (dateSpan) {
        dateSpan.textContent = new Date().toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
}

// Функция для короткого описания
// Парсинг происходит через API, но для совместимости с JS-рендером
export function markdownToHtmlShort(text) {
    if (!text) return '';

    // Берём только первую строку
    let firstLine = text.split('\n')[0];

    // Базовое форматирование (без полного парсера, чтобы не дублировать)
    let result = escapeHtml(firstLine);
    result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    result = result.replace(/\*(.*?)\*/g, '<em>$1</em>');
    result = result.replace(/`(.*?)`/g, '<code>$1</code>');
    result = result.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    return result;
}