База знаний для изучения/  
knowledge-base/  
│  
├── index.php  
├── router.php  
│
├── data/  
│   ├── articles.php      # Единый источник (метаданные + content)  
│   └── sections.php      # Секции  
│  
├── includes/  
│   └── markdown.php      # Парсер Markdown в HTML  
│  
├── pages/  
│   ├── home.php          # Главная страница  
│   ├── article-template.php  # Универсальный шаблон для статей  
│   └── 404.php  
│  
├── admin/  
│   └── edit.php          # Редактор (уже есть)  
│  
├── blocks/  
│   ├── head.php  
│   ├── sidebar.php  
│   ├── topbar.php  
│   └── footer.php  
│  
└── assets/  
├── css/  
└── js/  
  
Редактор — использует SimpleMDE (простой, но мощный Markdown редактор) с кнопками форматирования  
Сохранение — данные сохраняются прямо в data/articles.php  
Создание новых статей — просто нажмите "Новая статья"  
Предпросмотр — можно посмотреть, как статья будет выглядеть на сайте  

| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Text     | Text     | Text     |