<?php
// blocks/topbar.php
?>

<div class="topbar">
    <div class="topbar-breadcrumb">
        <a href="./index.php">База знаний</a> / <span><?= $page_titles[$current_page] ?? 'Главная'; ?></span>
    </div>
    <div class="topbar-actions">
        <!-- Кнопка ДОБАВИТЬ — всегда видна -->
        <a href="admin/edit.php?edit=new" class="btn btn-primary">➕ Добавить статью</a>

        <!-- Кнопка УДАЛИТЬ — видна только на странице статьи -->
        <?php if ($current_page !== 'home' && $current_page !== '404'): ?>
            <button class="btn" style="background: #c0392b; color: white; border-color: #c0392b;" onclick="confirmDelete('<?php echo $current_page; ?>')">
                🗑️ Удалить
            </button>
        <?php endif; ?>

        <!-- Кнопка РЕДАКТИРОВАТЬ — только на странице статьи -->
        <?php if ($current_page !== 'home' && $current_page !== '404'): ?>
            <a href="admin/edit.php?edit=<?php echo $current_page; ?>" class="btn" style="background: #2563a8; color: white; border-color: #2563a8;">
                ✏️ Редактировать
            </a>
        <?php endif; ?>

        <button class="btn" onclick="exportBlog()">Экспорт в блог</button>
        <button class="btn" onclick="addNote()">+ Заметка</button>
    </div>
</div>

<script>
    function confirmDelete(articleId) {
        if (confirm('Вы уверены, что хотите удалить эту статью? Это действие нельзя отменить.')) {
            window.location.href = 'admin/delete.php?delete=' + articleId;
        }
    }
</script>