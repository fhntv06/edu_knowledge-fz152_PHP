<?php
// admin/edit.php
// Простой редактор для управления контентом

session_start();

// Загружаем существующие статьи
$articles = [];
if (file_exists(__DIR__ . '/../data/articles.php')) {
    $articles = include __DIR__ . '/../data/articles.php';
}

// Определяем, какую статью редактируем
$edit_id = $_GET['edit'] ?? '';
$is_new = $edit_id === 'new' || empty($edit_id);
$current_article = [];

if (!$is_new && isset($articles[$edit_id])) {
    $current_article = $articles[$edit_id];
}

// Функция транслитерации и генерации ID из заголовка
function generateIdFromTitle($title) {
    $translit = [
        'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd', 'е' => 'e', 'ё' => 'e',
        'ж' => 'zh', 'з' => 'z', 'и' => 'i', 'й' => 'y', 'к' => 'k', 'л' => 'l', 'м' => 'm',
        'н' => 'n', 'о' => 'o', 'п' => 'p', 'р' => 'r', 'с' => 's', 'т' => 't', 'у' => 'u',
        'ф' => 'f', 'х' => 'h', 'ц' => 'ts', 'ч' => 'ch', 'ш' => 'sh', 'щ' => 'sch', 'ъ' => '',
        'ы' => 'y', 'ь' => '', 'э' => 'e', 'ю' => 'yu', 'я' => 'ya',
        'А' => 'a', 'Б' => 'b', 'В' => 'v', 'Г' => 'g', 'Д' => 'd', 'Е' => 'e', 'Ё' => 'e',
        'Ж' => 'zh', 'З' => 'z', 'И' => 'i', 'Й' => 'y', 'К' => 'k', 'Л' => 'l', 'М' => 'm',
        'Н' => 'n', 'О' => 'o', 'П' => 'p', 'Р' => 'r', 'С' => 's', 'Т' => 't', 'У' => 'u',
        'Ф' => 'f', 'Х' => 'h', 'Ц' => 'ts', 'Ч' => 'ch', 'Ш' => 'sh', 'Щ' => 'sch', 'Ъ' => '',
        'Ы' => 'y', 'Ь' => '', 'Э' => 'e', 'Ю' => 'yu', 'Я' => 'ya'
    ];
    $id = strtr($title, $translit);
    $id = preg_replace('/[^a-zA-Z0-9-]/', '-', $id);
    $id = preg_replace('/-+/', '-', $id);
    $id = trim($id, '-');
    $id = strtolower($id);
    return 'art-' . $id;
}

// Функция проверки уникальности ID
function isIdUnique($id, $articles, $current_id = null) {
    // Если это редактирование существующей статьи, пропускаем проверку для неё же
    if ($current_id !== null && $id === $current_id) {
        return true;
    }
    return !isset($articles[$id]);
}

$error = null; // Переменная для ошибки

// Обработка сохранения
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Сохраняем и остаёмся в редакторе
    if (isset($_POST['save'])) {
        $article_id = $_POST['article_id'] ?? '';
        $is_new_article = $article_id === 'new' || empty($article_id);

        // Для новой статьи генерируем ID из заголовка
        if ($is_new_article) {
            $generated_id = generateIdFromTitle($_POST['title'] ?? '');

            // Проверяем уникальность ID
            if (!isIdUnique($generated_id, $articles)) {
                $error = "❌ Статья с названием \"" . htmlspecialchars($_POST['title']) . "\" уже существует! Используйте другое название.";
            } else {
                $article_id = $generated_id;
            }
        } else {
            // Для существующей статьи проверяем, не изменился ли заголовок
            $new_title = $_POST['title'] ?? '';
            $old_title = $articles[$article_id]['title'] ?? '';

            if ($new_title !== $old_title) {
                $new_generated_id = generateIdFromTitle($new_title);
                if ($new_generated_id !== $article_id && !isIdUnique($new_generated_id, $articles, $article_id)) {
                    $error = "❌ Статья с названием \"" . htmlspecialchars($new_title) . "\" уже существует! Используйте другое название.";
                }
            }
        }

        // Если ошибки нет — сохраняем
        if (!$error) {
            $new_article = [
                'id' => $article_id,
                'num' => $_POST['num'] ?? '99',
                'title' => $_POST['title'] ?? 'Без названия',
                'desc' => $_POST['desc'] ?? '',
                'content' => $_POST['content'] ?? '',
                'tags' => explode(',', $_POST['tags'] ?? ''),
                'status' => $_POST['status'] ?? 'draft',
                'progress' => intval($_POST['progress'] ?? 0),
                'blog' => isset($_POST['blog']) ? true : false,
                'section' => $_POST['section'] ?? 'other',
            ];

            $new_article['tags'] = array_filter(array_map('trim', $new_article['tags']));

            $articles[$article_id] = $new_article;
            saveArticlesToFile($articles);

            header('Location: edit.php?edit=' . $article_id . '&saved=1');
            exit;
        }
    }

    // Сохраняем и переходим к просмотру
    if (isset($_POST['save_and_view'])) {
        $article_id = $_POST['article_id'] ?? '';
        $is_new_article = $article_id === 'new' || empty($article_id);

        // Для новой статьи генерируем ID из заголовка
        if ($is_new_article) {
            $generated_id = generateIdFromTitle($_POST['title'] ?? '');

            // Проверяем уникальность ID
            if (!isIdUnique($generated_id, $articles)) {
                $error = "❌ Статья с названием \"" . htmlspecialchars($_POST['title']) . "\" уже существует! Используйте другое название.";
            } else {
                $article_id = $generated_id;
            }
        } else {
            // Для существующей статьи проверяем, не изменился ли заголовок
            $new_title = $_POST['title'] ?? '';
            $old_title = $articles[$article_id]['title'] ?? '';

            if ($new_title !== $old_title) {
                $new_generated_id = generateIdFromTitle($new_title);
                if ($new_generated_id !== $article_id && !isIdUnique($new_generated_id, $articles, $article_id)) {
                    $error = "❌ Статья с названием \"" . htmlspecialchars($new_title) . "\" уже существует! Используйте другое название.";
                }
            }
        }

        // Если ошибки нет — сохраняем
        if (!$error) {
            $new_article = [
                'id' => $article_id,
                'num' => $_POST['num'] ?? '99',
                'title' => $_POST['title'] ?? 'Без названия',
                'desc' => $_POST['desc'] ?? '',
                'content' => $_POST['content'] ?? '',
                'tags' => explode(',', $_POST['tags'] ?? ''),
                'status' => $_POST['status'] ?? 'draft',
                'progress' => intval($_POST['progress'] ?? 0),
                'blog' => isset($_POST['blog']) ? true : false,
                'section' => $_POST['section'] ?? 'other',
            ];

            $new_article['tags'] = array_filter(array_map('trim', $new_article['tags']));

            $articles[$article_id] = $new_article;
            saveArticlesToFile($articles);

            header('Location: ../index.php?page=' . $article_id);
            exit;
        }
    }
}

// Функция сохранения статей в файл
function saveArticlesToFile($articles) {
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
}

// Загружаем секции
$sections = [];
if (file_exists(__DIR__ . '/../data/sections.php')) {
    $sections_config = include __DIR__ . '/../data/sections.php';
    foreach ($sections_config as $key => $section) {
        $sections[$key] = $section['name'];
    }
}
$sections['other'] = 'Другие';
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $is_new ? 'Новая статья' : 'Редактирование: ' . htmlspecialchars($current_article['title'] ?? ''); ?> — Редактор</title>

    <!-- Подключаем SimpleMDE Markdown редактор -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">
    <script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>

    <!-- Подключаем CSS для админки -->
    <link rel="stylesheet" href="../assets/css/main.css">
</head>
<body>
<div class="admin-container">
    <div class="admin-header">
        <h1>✏️ Редактор базы знаний</h1>
        <a href="../index.php">← На сайт</a>
    </div>

    <?php if (isset($_GET['saved'])): ?>
        <div class="alert alert-success">
            ✅ Статья успешно сохранена!
        </div>
    <?php endif; ?>

    <?php if ($error): ?>
        <div class="alert alert-error">
            <?php echo $error; ?>
        </div>
    <?php endif; ?>

    <form method="POST" class="admin-form">
        <input type="hidden" name="article_id" value="<?php echo htmlspecialchars($is_new ? 'new' : $edit_id); ?>">

        <div class="form-row">
            <div class="form-group">
                <label>Номер (для сортировки)</label>
                <input type="number" name="num" value="<?php echo htmlspecialchars($current_article['num'] ?? '99'); ?>">
            </div>

            <!-- Выбор секции -->
            <div class="form-group">
                <label>Рубрика (секция)</label>
                <select name="section">
                    <?php
                    // Загружаем актуальные секции
                    $sections_list = [];
                    if (file_exists(__DIR__ . '/../data/sections.php')) {
                        $sections_config = include __DIR__ . '/../data/sections.php';
                        uasort($sections_config, function($a, $b) {
                            return $a['order'] <=> $b['order'];
                        });
                        foreach ($sections_config as $key => $section) {
                            echo '<option value="' . htmlspecialchars($key) . '" ' .
                                (($current_article['section'] ?? 'other') === $key ? 'selected' : '') . '>' .
                                htmlspecialchars($section['name']) . '</option>';
                        }
                    }
                    ?>
                    <option value="other" <?php echo ($current_article['section'] ?? 'other') === 'other' ? 'selected' : ''; ?>>Другие</option>
                </select>
                <div class="tag-hint">
                    <a href="sections.php" style="color: var(--blue);">➕ Управление секциями</a>
                </div>
            </div>

            <div class="form-group">
                <label>Статус</label>
                <select name="status">
                    <option value="learning" <?php echo ($current_article['status'] ?? 'draft') === 'learning' ? 'selected' : ''; ?>>📖 Изучается</option>
                    <option value="done" <?php echo ($current_article['status'] ?? 'draft') === 'done' ? 'selected' : ''; ?>>✅ Изучено</option>
                    <option value="draft" <?php echo ($current_article['status'] ?? 'draft') === 'draft' ? 'selected' : ''; ?>>📝 Черновик</option>
                </select>
            </div>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label>Прогресс изучения (0-100)</label>
                <input type="number" name="progress" min="0" max="100" value="<?php echo $current_article['progress'] ?? 0; ?>">
            </div>

            <div class="form-group checkbox-group">
                <label style="margin-bottom: 0;">Готово к блогу</label>
                <input type="checkbox" name="blog" <?php echo ($current_article['blog'] ?? false) ? 'checked' : ''; ?>>
            </div>

            <div class="form-group">
                <label>Теги (через запятую)</label>
                <input type="text" name="tags" value="<?php echo htmlspecialchars(implode(', ', $current_article['tags'] ?? [])); ?>" placeholder="Закон, Практика, Чеклист">
                <div class="tag-hint">Доступные теги: Закон, Новое, Штрафы, Чеклист, Практика, ИБ-трек</div>
            </div>
        </div>

        <div class="form-group">
            <label>Заголовок статьи</label>
            <input type="text" name="title" required value="<?php echo htmlspecialchars($current_article['title'] ?? ''); ?>">
        </div>

        <!-- Краткое описание (с таким же редактором) -->
        <div class="form-group">
            <label>Краткое описание (для карточки на главной)</label>
            <textarea id="desc-editor" name="desc" rows="5" placeholder="Поддерживает Markdown: **жирный**, *курсив*, - списки, > цитаты, [ссылки](url)"><?php echo htmlspecialchars($current_article['desc'] ?? ''); ?></textarea>
            <div class="tag-hint">
                📝 Поддерживается полный синтаксис Markdown:<br>
                **жирный**, *курсив*, ~~зачёркнутый~~, `код`, [ссылки](url)<br>
                - списки, 1. нумерованные списки, > цитаты<br>
                | таблицы | с | заголовками |<br>
                ⚠️ **Важно** — callout-блоки<br>
                💡 **Совет** — callout-блоки<br>
                ℹ️ **Информация** — callout-блоки
            </div>
        </div>

        <!-- Содержание статьи (основной редактор) -->
        <div class="form-group">
            <label>Содержание статьи (Markdown)</label>
            <textarea id="content-editor" name="content"><?php echo htmlspecialchars($current_article['content'] ?? ''); ?></textarea>
        </div>

        <div class="button-group buttons-options">
            <?php if (!$is_new && isset($current_article['id'])): ?>
                <a style="margin-right: auto;" href="../index.php?page=<?php echo $edit_id; ?>" class="btn btn-secondary">← Назад к статье</a>
            <?php endif; ?>
            <button type="submit" name="save" class="btn btn-primary">💾 Сохранить</button>
            <button type="submit" name="save_and_view" class="btn btn-success">👁️ Сохранить и смотреть</button>
            <?php if (!$is_new): ?>
                <button type="button" class="btn btn-danger" onclick="confirmDelete('<?php echo $edit_id; ?>')">🗑️ Удалить</button>
            <?php endif; ?>
            <a href="edit.php?edit=new" class="btn btn-secondary">➕ Новая статья</a>
        </div>
    </form>
</div>

<script>
    // Инициализация редактора для содержания
    var contentEditor = new SimpleMDE({
        element: document.getElementById("content-editor"),
        spellChecker: false,
        placeholder: "Напишите текст статьи здесь...\n\n# Заголовок\n\nОбычный текст с **жирным** и *курсивом*\n\n- Список\n- Элементы\n\n> Цитата\n\n```php\necho 'Hello World';\n```",
        toolbar: [
            "bold", "italic", "heading", "|",
            "quote", "code", "unordered-list", "ordered-list", "|",
            "link", "image", "table", "|",
            "preview", "side-by-side", "fullscreen", "|",
            "guide"
        ]
    });

    // Инициализация редактора для краткого описания (с ограничением по высоте)
    var descEditor = new SimpleMDE({
        element: document.getElementById("desc-editor"),
        spellChecker: false,
        placeholder: "Краткое описание статьи. Поддерживает Markdown.\n\n**Важно:** На главной покажется только первая строка!",
        toolbar: [
            "bold", "italic", "heading", "|",
            "quote", "unordered-list", "ordered-list", "|",
            "link", "|",
            "preview", "guide"
        ],
        status: false,  // убираем статус-бар для компактности
        minHeight: "150px"
    });
</script>
</body>
</html>