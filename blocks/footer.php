</div> <!-- закрываем .layout из header.php -->
</main>

<!-- Основной JS -->
<script type="module" src="assets/js/main.js"></script>

<?php
// ============================================================
// ДИНАМИЧЕСКОЕ ПОДКЛЮЧЕНИЕ JS
// ============================================================

// Базовые пути
$js_page_path = __DIR__ . '/../assets/js/pages/' . $current_page . '.js';
// Подключаем JS для страницы, если файл существует
if (file_exists($js_page_path)) {
    echo '<script src="assets/js/pages/' . $current_page . '.js" defer></script>' . "\n";
}
?>

</body>
</html>