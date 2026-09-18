<?php
// pages/article-template.php

if (!isset($current_article)) {
    header('Location: ?page=home');
    exit;
}

$article = $current_article;

require_once __DIR__ . '/../includes/markdown.php';
?>

<article class="view active content-area content-area-wide">
    <div class="article-meta">
        <?php foreach ($article['tags'] as $tag): ?>
            <span class="tag
                <?php
            if ($tag === 'Закон') echo 'tag-law';
            elseif ($tag === 'Практика') echo 'tag-practice';
            elseif ($tag === 'Штрафы') echo 'tag-penalty';
            elseif ($tag === 'Чеклист') echo 'tag-checklist';
            elseif ($tag === 'Новое') echo 'tag-new';
            else echo 'tag-law';
            ?>
            "><?php echo htmlspecialchars($tag); ?></span>
        <?php endforeach; ?>
        <div class="article-status">
            <div class="status-dot status-<?php echo $article['status']; ?>"></div>
            <?php
            $status_text = [
                'learning' => 'Изучается',
                'done' => 'Изучено',
                'draft' => 'Черновик'
            ];
            echo $status_text[$article['status']] ?? 'Черновик';
            ?>
        </div>
    </div>

    <h1 class="article-title"><?php echo htmlspecialchars($article['title']); ?></h1>

    <?php if (!empty($article['desc'])): ?>
        <div class="article-subtitle">
            <?= includesMarkdownToHtml($article['desc']); ?>
        </div>
    <?php endif; ?>

    <div class="article-body">
        <?= includesMarkdownToHtml($article['content'] ?? ''); ?>
    </div>
</article>