const DAYS = [{
    num: "День 1",
    color: "#2563a8",
    title: "Основы закона и кто такой оператор",
    time: "3–4 ч",
    goal: "<strong>Цель:</strong> понять фундамент — что такое 152-ФЗ, кто обязан его соблюдать, какие данные он регулирует. После этого дня ты сможешь объяснить клиенту, почему его сайт с формой уже подпадает под закон.",
    tasks: [{
        t: "Прочитать 152-ФЗ, статьи 1–9",
        s: "Основные понятия: ПДн, оператор, субъект, обработка"
    }, {
        t: "Составить список: что считается персональными данными",
        s: "Из ст.3 — выписать примеры в базу знаний"
    }, {
        t: "Найти 3 сайта и проверить: есть ли у них Политика конфиденциальности",
        s: "Первичная разведка без глубокого анализа"
    }, {t: "Записать в базу знаний статью «Оператор ПДн — кто это»", s: "Своими словами, 200–300 слов"},],
    post: "«Узнал сегодня: если на твоём сайте есть форма с именем и телефоном — ты уже оператор персональных данных по 152-ФЗ. Вот что это значит...»"
}, {
    num: "День 2",
    color: "#92570a",
    title: "Штрафы, проверки и реестр РКН",
    time: "3–4 ч",
    goal: "<strong>Цель:</strong> изучить санкционную часть — новые штрафы 2025 года, как РКН проводит проверки, как подать уведомление об обработке данных.",
    tasks: [{
        t: "Изучить 420-ФЗ — новые штрафы с 30 мая 2025",
        s: "Выписать таблицу нарушение → размер штрафа"
    }, {
        t: "Зайти на pd.rkn.gov.ru, найти реестр операторов",
        s: "Понять как работает реестр, проверить 2–3 знакомых сайта"
    }, {
        t: "Изучить порядок подачи уведомления об обработке ПДн",
        s: "Что нужно заполнять, в какие сроки"
    }, {t: "Обновить базу знаний: статья «Штрафы 2025»", s: "Готова к публикации в блог"},],
    post: "«Таблица штрафов, которую должен знать каждый владелец сайта в 2025 году. Спойлер: минимальный штраф за отсутствие уведомления — 100 000 ₽...»"
}, {
    num: "День 3",
    color: "#1d6b3e",
    title: "Документы сайта: политика и cookie",
    time: "3–4 ч",
    goal: "<strong>Цель:</strong> разобраться что конкретно должно быть опубликовано на сайте. Составить первый рабочий шаблон Политики конфиденциальности.",
    tasks: [{
        t: "Изучить требования к Политике конфиденциальности",
        s: "Обязательная структура, что должно быть в каждом разделе"
    }, {
        t: "Изучить новые требования к Cookie-политике (с 1 сент. 2025)",
        s: "Почему это теперь отдельный документ"
    }, {
        t: "Составить первый шаблон Политики конфиденциальности",
        s: "10 обязательных разделов — в виде Google Docs или MD-файла"
    }, {t: "Найти примеры хорошей и плохой политики конфиденциальности", s: "2 примера для будущего поста-разбора"},],
    post: "«Чеклист: 10 разделов, которые обязаны быть в Политике конфиденциальности сайта. Если какого-то нет — это уже нарушение...»"
}, {
    num: "День 4",
    color: "#534ab7",
    title: "Технический аудит: инструменты и процесс",
    time: "4–5 ч",
    goal: "<strong>Цель:</strong> научиться проводить технический аудит. В конце дня — провести первый полноценный аудит любого сайта и зафиксировать находки.",
    tasks: [{
        t: "Изучить инструменты аудита: ПараДок, DevTools, Ghostery",
        s: "Как смотреть куки, трекеры, исходящие запросы"
    }, {
        t: "Провести тестовый аудит своего или чужого сайта",
        s: "Пройти по всем пунктам чеклиста из базы знаний"
    }, {
        t: "Написать мини-отчёт по аудиту (для себя)",
        s: "Формат: нарушение / норма закона / рекомендация"
    }, {t: "Добавить в базу знаний раздел «Разбор сайта №1»", s: "Анонимно, с конкретными примерами ошибок"},],
    post: "«Проверил сайт — нашёл 5 нарушений 152-ФЗ за 20 минут. Вот что именно и как я это делал (с инструментами)...»"
}, {
    num: "День 5",
    color: "#c0392b",
    title: "Упаковка услуги и первое предложение",
    time: "3–4 ч",
    goal: "<strong>Цель:</strong> оформить то, что изучил, в реальную услугу. Сформулировать оффер, определить цену, написать первое предложение потенциальному клиенту.",
    tasks: [{
        t: "Сформулировать оффер: что входит в услугу и что получает клиент",
        s: "Аудит + отчёт + документы + внедрение — разбить по пакетам"
    }, {
        t: "Определить ценообразование для 3 пакетов",
        s: "Базовый / стандарт / полный — с примерными ценами"
    }, {
        t: "Написать 1 пост в блог с анонсом услуги",
        s: "«Я теперь помогаю сайтам соответствовать 152-ФЗ — вот как это работает»"
    }, {
        t: "Написать первое предложение 1–2 потенциальным клиентам",
        s: "Из своей текущей базы клиентов по веб-разработке"
    },],
    post: "«5 дней назад я начал изучать 152-ФЗ. Вот что я узнал и новая услуга, которую я теперь предлагаю. Первые 3 аудита — по сниженной цене...»"
}];

let tasks = {};
const STORE_KEY = 'pd_plan_tasks';
try {
    tasks = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
} catch (e) {
}

function saveTasks() {
    try {
        localStorage.setItem(STORE_KEY, JSON.stringify(tasks));
    } catch (e) {
    }
}

function updateProgress() {
    let done = 0, total = 0;
    DAYS.forEach((d, di) => d.tasks.forEach((_, ti) => {
        total++;
        if (tasks[`${di}-${ti}`]) done++;
    }));
    document.getElementById('prog-bar').style.width = (done / total * 100) + '%';
    document.getElementById('prog-text').textContent = `${done} / ${total} задач`;
}

function toggleTask(di, ti) {
    const key = `${di}-${ti}`;
    tasks[key] = !tasks[key];
    saveTasks();
    const el = document.querySelector(`[data-task="${key}"]`);
    if (el) el.classList.toggle('done', tasks[key]);
    updateProgress();
}

function toggleDay(di) {
    const card = document.querySelector(`[data-day="${di}"]`);
    const wasActive = card.classList.contains('active');
    document.querySelectorAll('.day-card').forEach(c => c.classList.remove('active'));
    if (!wasActive) card.classList.add('active');
}

function render() {
    const cont = document.getElementById('days');
    cont.innerHTML = DAYS.map((d, di) => `
        <div class="day-card" data-day="${di}">
            <div class="day-header" onclick="toggleDay(${di})">
                <span class="day-num">${d.num}</span>
                <span class="day-badge" style="background:${d.color}"></span>
                <span class="day-title">${d.title}</span>
                <span class="day-meta">${d.time}</span>
                <span class="day-chevron">▼</span>
            </div>
            <div class="day-body">
                <div class="goal-box">${d.goal}</div>
                <div class="tasks">
                    ${d.tasks.map((t, ti) => `
                        <div class="task ${tasks[`${di}-${ti}`] ? 'done' : ''}" data-task="${di}-${ti}" onclick="toggleTask(${di},${ti})">
                            <div class="task-check"><i>✓</i></div>
                            <div class="task-content">
                                <div class="task-title">${t.t}</div>
                                <div class="task-sub">${t.s}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="post-idea">
                    <div class="post-idea-label">📝 Пост дня</div>
                    ${d.post}
                </div>
            </div>
        </div>
    `).join('');

    let opened = false;
    DAYS.forEach((d, di) => {
        const allDone = d.tasks.every((_, ti) => tasks[`${di}-${ti}`]);
        if (!allDone && !opened) {
            const card = document.querySelector(`[data-day="${di}"]`);
            if (card) card.classList.add('active');
            opened = true;
        }
    });
    if (!opened) {
        const firstCard = document.querySelector('[data-day="0"]');
        if (firstCard) firstCard.classList.add('active');
    }
}

render();
updateProgress();
