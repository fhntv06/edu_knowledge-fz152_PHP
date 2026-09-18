<?php
// router.php

// Загружаем данные статей
$articles = include 'data/articles.php';

// Формируем маршруты
$routes = ['home' => 'pages/home.php'];
$page_titles = ['home' => 'Все материалы'];

foreach ($articles as $key => $article) {
    // Все статьи теперь используют один шаблон
    $routes[$key] = 'pages/article-template.php';
    $page_titles[$key] = $article['title'];
}

$routes['404'] = 'pages/404.php';
$page_titles['404'] = 'Страница не найдена';

// Определяем страницу
$page = $_GET['page'] ?? 'home';

// ============================================================
// НОВАЯ ЛОГИКА: Проверяем, есть ли прямой файл в pages/
// ============================================================
$direct_file = __DIR__ . '/pages/' . $page . '.php';
if (file_exists($direct_file)) {
    $page_titles[$page] = ucfirst(str_replace('-', ' ', $page)); // Автоматический заголовок
    $current_page = $page;

    // Если файл существует — используем его напрямую
    $content_file = 'pages/' . $page . '.php';
    $page_title = 'База знаний — ' . str_replace('-', ' ', ucfirst($page));
} elseif (isset($routes[$page])) {
    $content_file = $routes[$page];
    $page_title = 'База знаний — ' . ($page_titles[$page] ?? '152-ФЗ');
    $current_page = $page;

    // Для статей передаём данные в шаблон
    if ($page !== 'home' && $page !== '404') {
        $current_article = $articles[$page] ?? null;
        if (!$current_article) {
            $content_file = 'pages/404.php';
            $current_page = '404';
        }
    }
} else {
    $content_file = 'pages/404.php';
    $page_title = '404 — Страница не найдена';
    $current_page = '404';
}


// Проверяем, что файл контента действительно существует
if (!file_exists($content_file)) {
    $content_file = 'pages/404.php';
    $page_title = '404 — Страница не найдена';
    $current_page = '404';
}

include 'blocks/header.php';
include 'blocks/sidebar.php';
?>

    <main class="main">
        <?php include 'blocks/topbar.php'; ?>
        <?php include $content_file; ?>
    </main>

<?php include 'blocks/footer.php'; ?>