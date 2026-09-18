<?php
// Загружаем данные
$articles = include __DIR__ . '/../data/articles.php';
$sections_config = include __DIR__ . '/../data/sections.php';

// Группируем статьи по секциям
$sections = [];

// Инициализируем все секции из конфига
foreach ($sections_config as $section_key => $config) {
    $sections[$section_key] = [
        'key' => $section_key,
        'name' => $config['name'],
        'order' => $config['order'],
        'items' => []
    ];
}

// Распределяем статьи по секциям
foreach ($articles as $key => $article) {
    $section_key = $article['section'] ?? 'other';

    // Если секция не найдена в конфиге — отправляем в "Другие"
    if (!isset($sections[$section_key])) {
        $section_key = 'other';
    }

    $sections[$section_key]['items'][] = [
        'id' => $key,
        'title' => $article['title'],
        'num' => $article['num'],
    ];
}

// Удаляем пустые секции (кроме "other" — её оставляем всегда)
// Но если в "other" нет статей, тоже удаляем
foreach ($sections as $section_key => $section) {
    if (empty($section['items'])) {
        unset($sections[$section_key]);
    }
}

// Сортируем секции по order
uasort($sections, function($a, $b) {
    return $a['order'] <=> $b['order'];
});
?>

<aside class="sidebar">
    <div class="sidebar-header">
        <div class="sidebar-logo">База знаний / v1.0</div>
        <div class="sidebar-title">Персональные данные и 152-ФЗ</div>
    </div>
    <div class="sidebar-search">
        <input
            type="text"
            id="search-input"
            placeholder="Поиск по базе..."
            oninput="doSearch(this.value)"
            onkeydown="if(event.key === 'Escape'){ this.value = ''; clearSearch(); }"
        >
    </div>
    <nav class="sidebar-nav">
        <!-- Обзор всегда первый -->
        <div class="nav-section">
            <div class="nav-section-label">Обзор</div>
            <a class="nav-item <?php echo ($current_page === 'home') ? 'active' : ''; ?>" href="?page=home">
                <span class="nav-dot"></span> Все материалы
            </a>
            <a class="nav-item <?php echo ($current_page === 'study-plan') ? 'active' : ''; ?>" href="?page=study-plan">
                <span class="nav-dot"></span> 📚 План обучения
            </a>
            <a class="nav-item <?php echo ($current_page === 'attestation') ? 'active' : ''; ?>" href="?page=attestation">
                <span class="nav-dot"></span> 🎓 Аттестация
            </a>
        </div>

        <!-- Динамические секции -->
        <?php foreach ($sections as $section): ?>
            <div class="nav-section">
                <div class="nav-section-label"><?php echo htmlspecialchars($section['name']); ?></div>
                <?php foreach ($section['items'] as $item): ?>
                    <a class="nav-item <?php echo ($current_page === $item['id']) ? 'active' : ''; ?>" href="?page=<?php echo $item['id']; ?>">
                        <span class="nav-dot"></span> <?php echo htmlspecialchars($item['title']); ?>
                    </a>
                <?php endforeach; ?>
            </div>
        <?php endforeach; ?>
    </nav>
    <div class="sidebar-footer">
        Обновлено: <span id="updated-date"></span>
    </div>
</aside>