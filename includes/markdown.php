<?php
// includes/markdown.php

require_once __DIR__ . '/../vendor/autoload.php';

use League\CommonMark\Environment\Environment;
use League\CommonMark\Extension\CommonMark\CommonMarkCoreExtension;
use League\CommonMark\Extension\Table\TableExtension;
use League\CommonMark\Extension\Strikethrough\StrikethroughExtension;
use League\CommonMark\Extension\Autolink\AutolinkExtension;
use League\CommonMark\MarkdownConverter;

// Конфигурация с поддержкой таблиц
$config = [
    'table' => [
        'wrap' => [
            'enabled' => false,  // не оборачиваем таблицу в div
            'tag' => 'div',
            'attributes' => [],
        ],
        'alignment_attributes' => [
            'left'   => ['class' => 'align-left', 'style' => 'text-align: left;'],
            'center' => ['class' => 'align-center', 'style' => 'text-align: center;'],
            'right'  => ['class' => 'align-right', 'style' => 'text-align: right;'],
        ],
    ],
    'html_input' => 'escape',
    'allow_unsafe_links' => false,
];

// Настройка окружения
$environment = new Environment($config);
$environment->addExtension(new CommonMarkCoreExtension());
$environment->addExtension(new TableExtension());           // ← Таблицы!
$environment->addExtension(new StrikethroughExtension());   // ← ~~зачёркивание~~
$environment->addExtension(new AutolinkExtension());        // ← автоматические ссылки

// Создаём конвертер
$converter = new MarkdownConverter($environment);

// Основная функция для полного контента
function includesMarkdownToHtml($text) {
    global $converter;

    if (empty($text)) return '';

    try {
        $html = $converter->convert($text);

        // Дополнительная обработка для callout-блоков (⚠️, 💡, ℹ️)
        $html = convertCallouts($html);

        return $html;
    } catch (Exception $e) {
        return '<p>Ошибка парсинга: ' . htmlspecialchars($e->getMessage()) . '</p>';
    }
}

// Функция для преобразования кастомных callout-блоков
function convertCallouts($html) {
    // Callout с ⚠️ (предупреждение)
    $html = preg_replace_callback('/<p>&gt; ⚠️ \*\*(.+?)\*\*<\/p>\s*<p>(.+?)<\/p>/s', function($matches) {
        $title = trim($matches[1]);
        $content = trim($matches[2]);
        return '<div class="callout callout-warn"><div class="callout-title">' . $title . '</div>' . $content . '</div>';
    }, $html);

    // Callout с 💡 (совет)
    $html = preg_replace_callback('/<p>&gt; 💡 \*\*(.+?)\*\*<\/p>\s*<p>(.+?)<\/p>/s', function($matches) {
        $title = trim($matches[1]);
        $content = trim($matches[2]);
        return '<div class="callout callout-tip"><div class="callout-title">' . $title . '</div>' . $content . '</div>';
    }, $html);

    // Callout с ℹ️ (информация)
    $html = preg_replace_callback('/<p>&gt; ℹ️ \*\*(.+?)\*\*<\/p>\s*<p>(.+?)<\/p>/s', function($matches) {
        $title = trim($matches[1]);
        $content = trim($matches[2]);
        return '<div class="callout callout-info"><div class="callout-title">' . $title . '</div>' . $content . '</div>';
    }, $html);

    return $html;
}

// Функция для краткого описания (только первая строка)
function includesMarkdownToHtmlShort($text) {
    if (empty($text)) return '';

    // Берём только первую строку
    $firstLine = preg_split('/[\n\r]+/', $text)[0];

    // Применяем основной конвертер
    return includesMarkdownToHtml($firstLine);
}