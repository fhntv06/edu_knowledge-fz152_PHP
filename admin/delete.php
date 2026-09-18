<?php
// admin/delete.php
// Удаление статьи

// Загружаем существующие статьи
$articles = [];
if (file_exists(__DIR__ . '/../data/articles.php')) {
    $articles = include __DIR__ . '/../data/articles.php';
}

// ID статьи для удаления
$delete_id = $_GET['delete'] ?? '';

if ($delete_id && isset($articles[$delete_id])) {
    // Удаляем статью
    unset($articles[$delete_id]);

    // Сохраняем обновлённый массив
    $php_code = "<?php\n// data/articles.php\n// Обновлено: " . date('Y-m-d H:i:s') . "\n\nreturn [\n";
    foreach ($articles as $key => $article) {
        $php_code .= "    '" . addslashes($key) . "' => [\n";
        $php_code .= "        'id' => '" . addslashes($article['id']) . "',\n";
        $php_code .= "        'num' => '" . addslashes($article['num']) . "',\n";
        $php_code .= "        'title' => '" . addslashes($article['title']) . "',\n";
        $php_code .= "        'desc' => '" . addslashes($article['desc']) . "',\n";
        $php_code .= "        'content' => '" . addslashes($article['content']) . "',\n";
        $php_code .= "        'tags' => [" . implode(',', array_map(function($t) { return "'" . addslashes($t) . "'"; }, $article['tags'])) . "],\n";
        $php_code .= "        'status' => '" . addslashes($article['status']) . "',\n";
        $php_code .= "        'progress' => " . $article['progress'] . ",\n";
        $php_code .= "        'blog' => " . ($article['blog'] ? 'true' : 'false') . ",\n";
        $php_code .= "        'section' => '" . addslashes($article['section']) . "',\n";
        $php_code .= "    ],\n";
    }
    $php_code .= "];\n";

    file_put_contents(__DIR__ . '/../data/articles.php', $php_code);

    // Перенаправляем на главную
    header('Location: ../index.php?deleted=1');
    exit;
} else {
    // Статья не найдена
    header('Location: ../index.php?error=not_found');
    exit;
}
?>