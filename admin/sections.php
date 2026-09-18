<?php
// admin/sections.php
// Управление секциями (рубриками)

session_start();

// Загружаем секции
$sections = [];
if (file_exists(__DIR__ . '/../data/sections.php')) {
    $sections = include __DIR__ . '/../data/sections.php';
}

// Загружаем статьи (для проверки, есть ли статьи в секции)
$articles = [];
if (file_exists(__DIR__ . '/../data/articles.php')) {
    $articles = include __DIR__ . '/../data/articles.php';
}

// Обработка добавления секции
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_section'])) {
    $new_key = 'custom_' . time();
    $new_order = count($sections) + 1;

    $sections[$new_key] = [
        'key' => $new_key,
        'name' => $_POST['section_name'],
        'order' => $new_order,
        'is_system' => false,
    ];

    saveSections($sections);
    header('Location: sections.php?added=1');
    exit;
}

// Обработка удаления секции
if (isset($_GET['delete'])) {
    $delete_key = $_GET['delete'];

    // Проверяем, есть ли статьи в этой секции
    $has_articles = false;
    foreach ($articles as $article) {
        if (($article['section'] ?? 'other') === $delete_key) {
            $has_articles = true;
            break;
        }
    }

    if ($has_articles) {
        $error = "Нельзя удалить секцию, в которой есть статьи. Сначала переместите статьи в другую секцию.";
    } elseif (isset($sections[$delete_key]) && !$sections[$delete_key]['is_system']) {
        unset($sections[$delete_key]);
        saveSections($sections);
        header('Location: sections.php?deleted=1');
        exit;
    } else {
        $error = "Системную секцию нельзя удалить.";
    }
}

// Обработка изменения порядка
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_order'])) {
    $order_data = json_decode($_POST['section_order'], true);
    if ($order_data) {
        foreach ($order_data as $item) {
            if (isset($sections[$item['key']])) {
                $sections[$item['key']]['order'] = $item['order'];
            }
        }
        saveSections($sections);
        header('Location: sections.php?order=1');
        exit;
    }
}

// Функция сохранения секций
function saveSections($sections) {
    $php_code = "<?php\n// data/sections.php\n// Обновлено: " . date('Y-m-d H:i:s') . "\n\nreturn [\n";
    foreach ($sections as $key => $section) {
        $php_code .= "    '" . addslashes($key) . "' => [\n";
        $php_code .= "        'key' => '" . addslashes($section['key']) . "',\n";
        $php_code .= "        'name' => '" . addslashes($section['name']) . "',\n";
        $php_code .= "        'order' => " . $section['order'] . ",\n";
        $php_code .= "        'is_system' => " . ($section['is_system'] ? 'true' : 'false') . ",\n";
        $php_code .= "    ],\n";
    }
    $php_code .= "];\n";

    file_put_contents(__DIR__ . '/../data/sections.php', $php_code);
}

// Сортируем секции по order
uasort($sections, function($a, $b) {
    return $a['order'] <=> $b['order'];
});
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Управление секциями — Редактор</title>
    <link rel="stylesheet" href="../assets/css/main.css">
</head>
<body>
<div class="admin-container" style="max-width: 800px; margin: 40px auto; padding: 0 20px;">
    <div class="admin-header">
        <h1>📂 Управление секциями</h1>
        <a href="../index.php" style="color: var(--ink-3);">← На сайт</a>
    </div>

    <?php if (isset($_GET['added'])): ?>
        <div class="alert alert-success">✅ Секция добавлена!</div>
    <?php endif; ?>

    <?php if (isset($_GET['deleted'])): ?>
        <div class="alert alert-success">🗑️ Секция удалена!</div>
    <?php endif; ?>

    <?php if (isset($_GET['order'])): ?>
        <div class="alert alert-success">📊 Порядок секций обновлён!</div>
    <?php endif; ?>

    <?php if (isset($error)): ?>
        <div class="alert alert-error">❌ <?php echo $error; ?></div>
    <?php endif; ?>

    <!-- Форма добавления секции -->
    <div class="add-section-form">
        <div class="form-group">
            <label>Название новой секции</label>
            <input type="text" id="new_section_name" placeholder="Например: Клиентские кейсы">
        </div>
        <form method="POST" style="display: flex; gap: 16px;">
            <input type="hidden" name="section_name" id="section_name_input">
            <button type="submit" name="add_section" class="btn btn-primary" onclick="document.getElementById('section_name_input').value = document.getElementById('new_section_name').value">➕ Добавить секцию</button>
        </form>
    </div>

    <!-- Список секций -->
    <div class="sections-list">
        <h3 style="margin-bottom: 16px;">Список секций (перетащите для сортировки)</h3>
        <div id="sections-container">
            <?php foreach ($sections as $key => $section): ?>
                <div class="section-item" data-key="<?php echo $key; ?>" data-order="<?php echo $section['order']; ?>">
                    <div class="section-drag">⋮⋮</div>
                    <div class="section-name"><?php echo htmlspecialchars($section['name']); ?></div>
                    <div class="section-key"><?php echo $key; ?></div>
                    <?php if ($section['is_system']): ?>
                        <div class="section-badge system">Системная</div>
                    <?php else: ?>
                        <a href="?delete=<?= $key; ?>" class="delete-btn" onclick="return confirm('Удалить секцию?')" title="Удалить секцию">🗑️</a>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>

        <form method="POST" id="order-form">
            <input type="hidden" name="section_order" id="section_order">
            <input type="hidden" name="update_order" value="1">
            <button type="submit" class="btn btn-primary" style="margin-top: 20px;">💾 Сохранить порядок</button>
        </form>
    </div>

    <div style="margin-top: 30px; text-align: center;">
        <a href="edit.php?edit=new" class="btn btn-secondary">➕ Добавить статью в секцию</a>
        <a href="edit.php" class="btn btn-secondary">✏️ Редактор статей</a>
    </div>
</div>

<script src="../assets/js/pages/admin/sections.js"></script>
</body>
</html>