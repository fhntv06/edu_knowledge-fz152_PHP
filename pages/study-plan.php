<?php
// pages/study-plan.php
// Страница с планом обучения
?>
<div class="view active content-area">
    <div class="article-meta">
        <span class="tag tag-checklist">План обучения</span>
        <span class="tag tag-new">5 дней</span>
        <div class="article-status"><div class="status-dot status-learning"></div>В процессе</div>
    </div>

    <h1 class="article-title">Интерактивный план изучения 152-ФЗ</h1>
    <p class="article-subtitle">5-дневный интенсив для веб-разработчика. Нажимай на день, чтобы раскрыть задачи и отмечай выполненное.</p>
    <div class="article-divider"></div>

    <div class="plan">
        <div class="progress-label">
            <span>Общий прогресс</span>
            <span id="prog-text">0 / 20 задач</span>
        </div>
        <div class="progress-bar-wrap">
            <div class="progress-bar" id="prog-bar" style="width:0%"></div>
        </div>

        <div id="days"></div>
    </div>
</div>
