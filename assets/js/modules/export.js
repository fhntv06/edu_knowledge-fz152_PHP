// export.js — экспорт в блог

import { getArticles, loadArticles } from './api.js';
import { escapeHtml } from './utils.js';

// Экспорт в блог
export async function exportBlog() {
    let articles = getArticles();

    if (articles.length === 0) {
        articles = await loadArticles();
    }

    const blogReady = articles.filter(a => a.blog);

    if (blogReady.length === 0) {
        alert('Нет материалов, готовых к экспорту. Отметьте "В блог" в карточках статей.');
        return;
    }

    let exportHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Блог — Персональные данные и 152-ФЗ</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; line-height: 1.6; }
  h1 { border-bottom: 2px solid #c0392b; padding-bottom: 10px; }
  .post { margin-bottom: 48px; border-bottom: 1px solid #eee; padding-bottom: 24px; }
  .post-title { color: #1a1916; margin-bottom: 8px; }
  .post-meta { color: #7a7870; font-size: 14px; margin-bottom: 16px; }
  .tag { display: inline-block; background: #eceae4; padding: 2px 8px; border-radius: 4px; font-size: 12px; margin-right: 8px; }
</style>
</head>
<body>
<h1>📝 Блог: Персональные данные и 152-ФЗ</h1>
<p>Экспортировано из базы знаний — ${new Date().toLocaleDateString('ru-RU')}</p>`;

    blogReady.forEach(article => {
        exportHtml += `
<div class="post">
  <h2 class="post-title">${escapeHtml(article.title)}</h2>
  <div class="post-meta">
    ${article.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
  </div>
  <p>${escapeHtml(article.desc)}</p>
  <p><strong>Статус изучения:</strong> ${article.status === 'done' ? '✅ Изучено' : '🔄 В процессе'}</p>
  <p><em>→ Полная версия материала доступна в базе знаний</em></p>
</div>`;
    });

    exportHtml += `</body></html>`;

    const blob = new Blob([exportHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blog-export-${new Date().toISOString().slice(0,10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert(`Экспортировано ${blogReady.length} материалов в HTML-файл для блога!`);
}