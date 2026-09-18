<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $page_title; ?></title>
    <link rel="stylesheet" href="assets/css/main.css">

    <?php
    // ============================================================
    // ДИНАМИЧЕСКОЕ ПОДКЛЮЧЕНИЕ CSS
    // ============================================================

    // Базовые пути
    $css_page_path = __DIR__ . '/../assets/css/pages/' . $current_page . '.css';

    // Подключаем CSS для страницы, если файл существует
    if (file_exists($css_page_path)) {
        echo '<link rel="stylesheet" href="assets/css/pages/' . $current_page . '.css">' . "\n";
    }
    ?>
</head>
<body>
<div class="layout">