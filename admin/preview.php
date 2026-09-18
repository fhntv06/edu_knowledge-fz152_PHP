<?php
// admin/preview.php
$articles = include __DIR__ . '/../data/articles.php';
$edit_id = $_GET['edit'] ?? '';

if (!isset($articles[$edit_id])) {
    die('Статья не найдена');
}

$article = $articles[$edit_id];

// Простая функция для преобразования Markdown в HTML
function markdownToHtml($text) {
    // Базовая обработка Markdown
    $text = htmlspecialchars($text);
    $text = preg_replace('/\*\*(.*?)\*\*/', '<strong>$1</strong>', $text);
    $text = preg_replace('/\*(.*?)\*/', '<em>$1</em>', $text);
    $text = preg_replace('/^# (.*?)$/m', '<h1>$1</h1>', $text);
    $text = preg_replace('/^## (.*?)$/m', '<h2>$1</h2>', $text);
    $text = preg_replace('/^### (.*?)$/m', '<h3>$1</h3>', $text);
    $text = preg_replace('/^> (.*?)$/m', '<blockquote>$1</blockquote>', $text);
    $text = preg_replace('/^- (.*?)$/m', '<li>$1</li>', $text);
    $text = preg_replace('/<li>.*?<\/li>/s', '<ul>$0</ul>', $text);
    $text = nl2br($text);
    return $text;
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title><?php echo htmlspecialchars($article['title']); ?> — Предпросмотр</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans:wght@300;400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/main.css">
</head>
<body style="background: #f5f3ee; padding: 40px;">
<div style="max-width: 820px; margin: 0 auto; background: white; border-radius: 12px; padding: 40px;">
    <div class="article-meta">
        <span class="tag tag-<?php echo $article['status']; ?>"><?php echo $article['status']; ?></span>
        <?php foreach ($article['tags'] as $tag): ?>
            <span class="tag"><?php echo htmlspecialchars($tag); ?></span>
        <?php endforeach; ?>
    </div>
    <h1 class="article-title"><?php echo htmlspecialchars($article['title']); ?></h1>
    <div class="article-body">
        <?php echo markdownToHtml($article['content'] ?? ''); ?>
    </div>
    <hr style="margin: 40px 0 20px;">
    <p><a href="edit.php?edit=<?php echo $edit_id; ?>">← Вернуться к редактированию</a></p>
</div>
</body>
</html>