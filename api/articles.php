<?php
// api/articles.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/../includes/markdown.php';

$articles = include '../data/articles.php';

// Загружаем секции для названий
$sections = [];
if (file_exists(__DIR__ . '/../data/sections.php')) {
    $sections_config = include __DIR__ . '/../data/sections.php';
    foreach ($sections_config as $key => $section) {
        $sections[$key] = $section['name'];
    }
}

$result = [];
foreach ($articles as $key => $article) {
    $result[] = [
        'id' => $article['id'],
        'num' => $article['num'],
        'title' => $article['title'],
        'desc' => $article['desc'] ?? '',
        'content' => $article['content'] ?? '',
        'tags' => $article['tags'],
        'status' => $article['status'],
        'progress' => $article['progress'],
        'blog' => $article['blog'],
        'section' => $article['section'] ?? 'other',
        'section_name' => $sections[$article['section']] ?? 'Другие',
        'url' => "?page={$key}",
    ];
}

echo json_encode($result, JSON_UNESCAPED_UNICODE);