// attestation.js — логика тестирования

const STORAGE_KEY = 'attestation_results';
const BIG_TEST_KEY = 'big_test_results';

const BIG_TEST = [
    {
        mod: "Модуль 1 — Новеллы 152-ФЗ",
        q: "Оператор персональных данных обязан уведомить Роскомнадзор об изменении сведений, содержащихся в уведомлении об обработке ПДн. В какой срок это необходимо сделать?",
        opts: [
            "В течение 5 рабочих дней с момента изменения",
            "В течение 10 рабочих дней с момента изменения",
            "В течение 30 календарных дней с момента изменения"
        ],
        correct: 1,
        explain: "<strong>10 рабочих дней</strong> — срок, установленный ч. 7 ст. 22 152-ФЗ в редакции 2025 года. Это один из ключевых новых порядков: раньше срок не был чётко прописан, теперь фиксирован."
    },
    {
        mod: "Модуль 1 — Новеллы 152-ФЗ",
        q: "Оператор выявил утечку персональных данных. В течение какого времени он обязан уведомить Роскомнадзор о факте утечки?",
        opts: [
            "В течение 24 часов",
            "В течение 72 часов",
            "В течение 5 рабочих дней"
        ],
        correct: 0,
        explain: "<strong>24 часа</strong> — первичное уведомление о самом факте утечки. Затем в течение ещё 72 часов нужно провести внутреннее расследование и направить повторное уведомление с его результатами. Нарушение этого срока — отдельный состав КоАП."
    },
    {
        mod: "Модуль 1 — Новеллы 152-ФЗ",
        q: "При оценке степеней вреда субъекту ПДн в рамках одной деятельности по обработке выявлены нарушения нескольких степеней серьёзности. Какая степень вреда применяется?",
        opts: [
            "Самая низкая из выявленных",
            "Наиболее высокая из выявленных",
            "Средняя между выявленными"
        ],
        correct: 1,
        explain: "<strong>Применяется наиболее высокая степень</strong> — принцип «худшего случая» защищает интересы субъекта. Это прямо следует из методических рекомендаций РКН по оценке вреда."
    },
    {
        mod: "Модуль 1 — Новеллы 152-ФЗ",
        q: "Оператор прекратил обработку персональных данных. Что он обязан сделать с ПДн по истечении установленного срока хранения?",
        opts: [
            "Передать в архив на неопределённый срок",
            "Уничтожить или обезличить",
            "Передать субъекту по его запросу"
        ],
        correct: 1,
        explain: "<strong>Уничтожить или обезличить</strong> — ст. 21 152-ФЗ. Важно: факт уничтожения нужно документально подтвердить (акт об уничтожении). Без такого акта доказать уничтожение при проверке невозможно."
    },
    {
        mod: "Модуль 1 — Новеллы 152-ФЗ",
        q: "С 30 мая 2025 года изменились штрафы за непредставление уведомления в РКН о начале обработки ПДн. Какой максимальный штраф установлен для юридического лица?",
        opts: [
            "До 5 000 рублей",
            "До 300 000 рублей",
            "До 1 000 000 рублей"
        ],
        correct: 1,
        explain: "<strong>До 300 000 рублей</strong> для юридического лица (ч. 1 ст. 19.7 КоАП в новой редакции). Для сравнения: до мая 2025 штраф составлял 3–5 тысяч рублей. Рост — в 60 раз."
    },
    {
        mod: "Модуль 2 — Основания обработки",
        q: "Интернет-магазин собирает имя, email и телефон покупателя для выполнения договора купли-продажи. Требуется ли отдельное согласие субъекта на обработку этих данных?",
        opts: [
            "Да, согласие обязательно в любом случае",
            "Нет, основанием является исполнение договора",
            "Да, но только для телефонного номера"
        ],
        correct: 1,
        explain: "<strong>Согласие не требуется</strong> — ч. 5 ст. 6 152-ФЗ: обработка необходима для исполнения договора, стороной которого является субъект. Достаточно указать это основание в Политике обработки ПДн."
    },
    {
        mod: "Модуль 2 — Основания обработки",
        q: "Согласие на обработку персональных данных в электронной форме на сайте должно быть:",
        opts: [
            "Предзаполненным чекбоксом для удобства пользователя",
            "Активным действием пользователя — самостоятельной постановкой отметки",
            "Достаточно ссылки на политику в тексте кнопки отправки формы"
        ],
        correct: 1,
        explain: "<strong>Только активное действие</strong> — предзаполненный чекбокс прямо нарушает требование «конкретного и сознательного» согласия (ч. 1 ст. 9 152-ФЗ). Это одно из типичных нарушений, выявляемых ботом РКН."
    },
    {
        mod: "Модуль 2 — Основания обработки",
        q: "Субъект ПДн отозвал своё согласие на обработку данных. Что обязан сделать оператор?",
        opts: [
            "Продолжить обработку до окончания договорных отношений",
            "Прекратить обработку и уничтожить данные, если нет иного правового основания",
            "Уточнить у субъекта причину отзыва и принять решение"
        ],
        correct: 1,
        explain: "<strong>Прекратить и уничтожить</strong> — ч. 5 ст. 21 152-ФЗ. Если при этом есть другое законное основание обработки (договор, закон), обработку можно продолжить на этом основании, но не на основании согласия."
    },
    {
        mod: "Модуль 2 — Основания обработки",
        q: "Обработка биометрических персональных данных (отпечаток пальца, фото лица):",
        opts: [
            "Осуществляется свободно, как и обычные ПДн",
            "Осуществляется только с письменного согласия субъекта, за рядом исключений",
            "Запрещена для коммерческих организаций"
        ],
        correct: 1,
        explain: "<strong>Только с письменного согласия</strong> — ч. 1 ст. 11 152-ФЗ. Исключения: идентификация при осуществлении правосудия, оперативно-разыскная деятельность, транспортная безопасность и ряд других случаев, предусмотренных законом."
    },
    {
        mod: "Модуль 2 — Основания обработки",
        q: "Оператор передаёт персональные данные клиентов подрядчику (колл-центру) для обзвона. Какой документ обязателен при такой передаче?",
        opts: [
            "Достаточно устной договорённости с подрядчиком",
            "Поручение на обработку ПДн — отдельный договор или раздел основного договора",
            "Повторное согласие субъекта специально для подрядчика"
        ],
        correct: 1,
        explain: "<strong>Поручение на обработку</strong> — ст. 6 ч. 3 и ст. 11.1 152-ФЗ. Подрядчик в этом случае действует как «обработчик», но ответственность перед субъектом несёт оператор. Без поручения передача данных третьему лицу — нарушение."
    },
    {
        mod: "Модуль 3 — Политика обработки ПДн",
        q: "Политика обработки персональных данных обязана быть размещена на сайте оператора:",
        opts: [
            "В любом месте сайта, лишь бы была",
            "В открытом доступе — доступна без авторизации, в один клик с главной страницы",
            "Только в формате PDF для официальности"
        ],
        correct: 1,
        explain: "<strong>Открытый доступ без ограничений</strong> — ч. 2 ст. 18.1 152-ФЗ. Размещение в виде PDF прямо противоречит требованию «неограниченного доступа» — PDF может не открыться в ряде браузеров, и РКН расценивает это как нарушение."
    },
    {
        mod: "Модуль 3 — Политика обработки ПДн",
        q: "Политика обработки ПДн должна содержать сведения о лицах, которым передаются данные. Сайт подключил Яндекс.Метрику. Нужно ли упоминать Яндекс в Политике?",
        opts: [
            "Нет, аналитические сервисы — не передача ПДн",
            "Да, Яндекс.Метрика передаёт данные на серверы Яндекса — это третье лицо",
            "Только если пользователь явно кликнул на элемент аналитики"
        ],
        correct: 1,
        explain: "<strong>Да, необходимо</strong>. Яндекс.Метрика получает данные посетителей (IP, поведение, устройство) — это обработка ПДн. Яндекс — третье лицо, которому оператор фактически передаёт данные. Отсутствие в Политике — типичное нарушение при проверках."
    },
    {
        mod: "Модуль 3 — Политика обработки ПДн",
        q: "Ответственность за отсутствие опубликованной Политики обработки ПДн на сайте предусмотрена:",
        opts: [
            "Только предупреждением без штрафа",
            "Ч. 3 ст. 13.11 КоАП — штраф до 60 000 рублей для ИП и до 100 000 для юрлица",
            "Уголовной ответственностью"
        ],
        correct: 1,
        explain: "<strong>Ч. 3 ст. 13.11 КоАП</strong>: непредоставление субъекту возможности ознакомиться с Политикой. Штраф: граждане — до 6 тыс., должностные лица и ИП — до 60 тыс., юрлица — до 100 тыс. При повторном нарушении суммы удваиваются."
    },
    {
        mod: "Модуль 3 — Политика обработки ПДн",
        q: "Обязательный элемент Политики — сроки обработки и хранения ПДн. Как они должны быть указаны?",
        opts: [
            "Достаточно формулировки «до достижения целей обработки»",
            "Конкретными сроками или критериями их определения для каждой цели обработки",
            "Ссылкой на внутренний регламент, недоступный пользователям"
        ],
        correct: 1,
        explain: "<strong>Конкретные сроки или чёткие критерии</strong> — формулировка «до достижения целей» считается недостаточно определённой по позиции РКН. Практичнее указывать, например: «3 года с момента последнего обращения» или «до отзыва согласия»."
    },
    {
        mod: "Модуль 4 — Уведомление в РКН",
        q: "В какой момент оператор обязан направить уведомление об обработке ПДн в Роскомнадзор?",
        opts: [
            "В течение 30 дней после начала обработки",
            "До начала обработки персональных данных",
            "В течение 10 рабочих дней после регистрации юрлица или ИП"
        ],
        correct: 1,
        explain: "<strong>До начала обработки</strong> — ч. 1 ст. 22 152-ФЗ. Порядок нарушен даже если уведомление подано через день после фактического начала сбора данных. После мая 2025 РКН не предупреждает — сразу штраф."
    },
    {
        mod: "Модуль 4 — Уведомление в РКН",
        q: "Организация использует несколько серверов для хранения ПДн: основной в России и CDN-сервер зарубежного провайдера. Что нужно указать в уведомлении?",
        opts: [
            "Только основной российский сервер",
            "Все места хранения и обработки, включая зарубежный CDN с указанием трансграничной передачи",
            "Зарубежный CDN можно не указывать, так как это техническая инфраструктура"
        ],
        correct: 1,
        explain: "<strong>Все места хранения</strong>, включая CDN. Использование зарубежного CDN, который кэширует данные пользователей — это фактическая трансграничная передача ПДн, которая требует отдельного уведомления или отказа от такого сервиса."
    },
    {
        mod: "Модуль 4 — Уведомление в РКН",
        q: "Оператор подал уведомление в РКН, после чего подключил новую CRM-систему, в которую импортировал базу клиентов. Обязан ли он обновить уведомление?",
        opts: [
            "Нет, уведомление подаётся один раз при регистрации",
            "Да, в течение 10 рабочих дней с момента изменения обрабатываемых сведений",
            "Только если CRM хранится на зарубежных серверах"
        ],
        correct: 1,
        explain: "<strong>Да, обязан обновить</strong> — новая CRM изменяет состав информационных систем, где обрабатываются данные. Это обязательный элемент уведомления, при изменении которого нужно подать уточнение в течение 10 рабочих дней."
    },
    {
        mod: "Модуль 4 — Уведомление в РКН",
        q: "Самозанятый фотограф ведёт базу клиентов с именами, телефонами и датами съёмок. Обязан ли он подавать уведомление в РКН?",
        opts: [
            "Нет, самозанятые освобождены от требований 152-ФЗ",
            "Нет, если база содержит менее 1000 человек",
            "Да, самозанятые являются операторами ПДн и обязаны подавать уведомление"
        ],
        correct: 2,
        explain: "<strong>Да, обязан</strong>. С 2025 года уведомление обязательно для всех операторов без исключения: юрлиц, ИП и самозанятых. Размер базы значения не имеет — сам факт ведения базы с ПДн обязывает к уведомлению."
    },
    {
        mod: "Модуль 5 — Аудит ПДн",
        q: "На каком этапе аудита определяется перечень всех персональных данных, которые фактически обрабатывает организация?",
        opts: [
            "На этапе оформления итогового отчёта",
            "На этапе инвентаризации — первом шаге аудита",
            "После получения ответов от сотрудников на анкеты"
        ],
        correct: 1,
        explain: "<strong>Инвентаризация — первый шаг</strong>. Без понимания того, какие данные и где обрабатываются, невозможно оценить соответствие закону. На практике это делается через опрос подразделений, анализ форм на сайте и технический мониторинг исходящих запросов."
    },
    {
        mod: "Модуль 5 — Аудит ПДн",
        q: "По результатам аудита сайта выявлено несколько нарушений. Как следует расставить приоритеты при их устранении?",
        opts: [
            "Устранять в любом порядке — все нарушения равнозначны",
            "Сначала нарушения, которые легче всего исправить",
            "По критичности: сначала нарушения с наибольшим размером штрафа и наибольшей вероятностью обнаружения ботом РКН"
        ],
        correct: 2,
        explain: "<strong>Приоритизация по риску</strong>: отсутствие уведомления в РКН и предзаполненные чекбоксы — высокий риск и высокий штраф. Некорректная формулировка срока хранения в Политике — нарушение, но менее очевидное для автоматической проверки. Клиент должен понимать, что исправлять в первую очередь."
    }
];

// ============================================================
// СОХРАНЕНИЕ И ЗАГРУЗКА РЕЗУЛЬТАТОВ БОЛЬШОГО ТЕСТА
// ============================================================

let bigTestResults = { answers: {}, passed: false, percent: 0 };

try {
    const saved = localStorage.getItem(BIG_TEST_KEY);
    if (saved) bigTestResults = JSON.parse(saved);
} catch(e) {}

function saveBigTestResults() {
    localStorage.setItem(BIG_TEST_KEY, JSON.stringify(bigTestResults));
}

// ============================================================
// РЕНДЕР БОЛЬШОГО ТЕСТА
// ============================================================

function renderBigTest() {
    const container = document.getElementById('big-test-container');
    if (!container) return;

    let html = `
        <div class="big-test-header">
            <h2>📝 Аттестационный тест — 152-ФЗ</h2>
            <p>20 вопросов по всем модулям. После выбора ответа сразу показывается результат и пояснение.</p>
            <div class="big-test-progress">
                <span>Прогресс: <strong id="big-test-count">0</strong> / ${BIG_TEST.length}</span>
                <button class="btn btn-secondary" onclick="resetBigTest()">🔄 Сбросить</button>
            </div>
        </div>
        <div class="big-test-questions">
    `;

    BIG_TEST.forEach((item, idx) => {
        const savedAnswer = bigTestResults.answers[idx];
        const isAnswered = savedAnswer !== undefined;
        const isCorrect = savedAnswer === item.correct;

        html += `
            <div class="big-test-question ${isAnswered ? (isCorrect ? 'correct' : 'incorrect') : ''}" data-q="${idx}">
                <div class="big-test-q-header">
                    <span class="big-test-q-num">Вопрос ${idx + 1}</span>
                    <span class="big-test-q-mod">${item.mod}</span>
                    ${isAnswered ? `<span class="big-test-q-status ${isCorrect ? 'correct' : 'incorrect'}">${isCorrect ? '✅ Верно' : '❌ Неверно'}</span>` : ''}
                </div>
                <div class="big-test-q-text">${item.q}</div>
                <div class="big-test-opts">
                    ${item.opts.map((opt, optIdx) => `
                        <label class="big-test-opt ${isAnswered ? (optIdx === item.correct ? 'correct-answer' : (optIdx === savedAnswer ? 'wrong-answer' : '')) : ''}">
                            <input type="radio" name="big_q_${idx}" value="${optIdx}" 
                                ${savedAnswer === optIdx ? 'checked' : ''}
                                ${isAnswered ? 'disabled' : ''}
                                onchange="answerBigTest(${idx}, ${optIdx})">
                            <span>${opt}</span>
                        </label>
                    `).join('')}
                </div>
                ${isAnswered ? `
                    <div class="big-test-explain">
                        <strong>${isCorrect ? '✅ Правильно!' : '❌ Неправильно.'}</strong>
                        ${item.explain}
                    </div>
                ` : ''}
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
    updateBigTestProgress();
}

// ============================================================
// ЛОГИКА БОЛЬШОГО ТЕСТА
// ============================================================

function answerBigTest(idx, answer) {
    // Запрещаем перезапись ответа
    if (bigTestResults.answers[idx] !== undefined) return;

    bigTestResults.answers[idx] = answer;
    saveBigTestResults();

    // Проверяем все ответы
    const allAnswered = BIG_TEST.every((_, i) => bigTestResults.answers[i] !== undefined);
    if (allAnswered) {
        const correctCount = BIG_TEST.filter((item, i) => bigTestResults.answers[i] === item.correct).length;
        bigTestResults.percent = Math.round((correctCount / BIG_TEST.length) * 100);
        bigTestResults.passed = bigTestResults.percent >= 80;
        saveBigTestResults();
    }

    renderBigTest();
    updateBigTestProgress();
}

function updateBigTestProgress() {
    const answered = Object.keys(bigTestResults.answers).length;
    const countEl = document.getElementById('big-test-count');
    if (countEl) countEl.textContent = answered;

    // Если все отвечены — показываем результат
    if (answered === BIG_TEST.length) {
        const container = document.getElementById('big-test-container');
        if (container) {
            const resultHtml = `
                <div class="big-test-result ${bigTestResults.passed ? 'passed' : 'failed'}">
                    <h3>${bigTestResults.passed ? '🎉 Поздравляем!' : '📚 Есть пробелы'}</h3>
                    <p>Правильных ответов: ${BIG_TEST.filter((item, i) => bigTestResults.answers[i] === item.correct).length} из ${BIG_TEST.length}</p>
                    <p>Результат: <strong>${bigTestResults.percent}%</strong> ${bigTestResults.passed ? '✅ Проходной балл 80% достигнут!' : '❌ Нужно набрать 80% для сдачи'}</p>
                    ${!bigTestResults.passed ? '<p class="big-test-retake">Повторите материал и попробуйте снова. Кнопка сброса вверху.</p>' : ''}
                </div>
            `;
            // Вставляем результат в начало
            const header = container.querySelector('.big-test-header');
            const existingResult = container.querySelector('.big-test-result');
            if (existingResult) existingResult.remove();
            if (header) {
                header.insertAdjacentHTML('afterend', resultHtml);
            }
        }
    }
}

function resetBigTest() {
    if (!confirm('Сбросить все ответы в аттестационном тесте?')) return;
    bigTestResults = { answers: {}, passed: false, percent: 0 };
    saveBigTestResults();
    renderBigTest();
}

// Вопросы для модулей
const QUESTIONS = {
    1: [  // Модуль 1: Новеллы 152-ФЗ
        {
            text: "Что такое персональные данные (ПДн)?",
            options: [
                "Только паспортные данные",
                "Любая информация о конкретном человеке",
                "Только биометрические данные",
                "Данные только о юридических лицах"
            ],
            correct: 1,
            explanation: "Ст.3 152-ФЗ: персональные данные — любая информация, относящаяся к прямо или косвенно определенному физическому лицу"
        },
        {
            text: "Кто такой оператор персональных данных?",
            options: [
                "Только государственные органы",
                "Любой сотрудник, работающий с данными",
                "Лицо, которое организует и осуществляет обработку ПДн",
                "Только организации с лицензией ФСТЭК"
            ],
            correct: 2,
            explanation: "Ст.3 152-ФЗ: оператор — государственный орган, юрлицо или физлицо, организующее обработку ПДн"
        },
        {
            text: "Какой максимальный штраф за базовое нарушение 152-ФЗ?",
            options: [
                "100 000 ₽",
                "500 000 ₽",
                "1 000 000 ₽",
                "500 000 000 ₽ (оборотный штраф)"
            ],
            correct: 1,
            explanation: "Ст.13.11 КоАП РФ — до 500 000 ₽. Оборотные штрафы до 500 млн ₽ — за утечки"
        }
    ],
    2: [  // Модуль 2: Основания обработки
        {
            text: "В каких случаях согласие на обработку ПДн НЕ требуется?",
            options: [
                "Всегда требуется согласие",
                "При обработке по договору, законному интересу, госфункциям",
                "Только при обработке анонимных данных",
                "При обработке внутри компании"
            ],
            correct: 1,
            explanation: "Ст.6 152-ФЗ — 6 оснований: согласие, договор, законный интерес и др."
        },
        {
            text: "Из каких частей должно состоять согласие на обработку ПДн?",
            options: [
                "Письменное и устное",
                "Конкретное, информированное, сознательное, конклюдентное",
                "Простое и нотариальное",
                "Предварительное и последующее"
            ],
            correct: 1,
            explanation: "Ст.9 152-ФЗ — согласие должно быть конкретным, информированным, сознательным, конклюдентным"
        }
    ],
    3: [  // Модуль 3: Политика конфиденциальности
        {
            text: "Сколько обязательных разделов должно быть в Политике конфиденциальности?",
            options: [
                "3 раздела",
                "5 разделов",
                "10 разделов",
                "Количество не регламентировано"
            ],
            correct: 2,
            explanation: "Рекомендации РКН — 10 обязательных разделов"
        },
        {
            text: "В каком формате должна быть опубликована Политика конфиденциальности?",
            options: [
                "Только в PDF",
                "Отдельная HTML-страница на сайте",
                "В виде ссылки на облачное хранилище",
                "В исходном коде сайта"
            ],
            correct: 1,
            explanation: "Политика должна быть доступна в 1 клик, отдельная страница на сайте"
        }
    ],
    4: [  // Модуль 4: Уведомление РКН
        {
            text: "Кто должен подавать уведомление об обработке ПДн в Роскомнадзор?",
            options: [
                "Только крупные компании",
                "Все операторы ПДн без исключения",
                "Только государственные органы",
                "Только ИП"
            ],
            correct: 1,
            explanation: "С 2024 года уведомление обязательно для всех операторов"
        },
        {
            text: "В какой срок нужно подать уведомление об утечке ПДн?",
            options: [
                "24 часа",
                "3 дня",
                "7 дней",
                "30 дней"
            ],
            correct: 0,
            explanation: "Ст.21 152-ФЗ — уведомить РКН в течение 24 часов"
        }
    ],
    5: [  // Модуль 5: Аудит
        {
            text: "Что из перечисленного входит в аудит ПДн?",
            options: [
                "Только проверка документов",
                "Разведка, техпроверка, документы, отчёт",
                "Только техническая проверка",
                "Только юридическая экспертиза"
            ],
            correct: 1,
            explanation: "Полный аудит: разведка, техническая проверка, документарная проверка, итоговый отчёт"
        }
    ],
    final: [  // Итоговая аттестация
        {
            text: "В случае если по итогам оценки вреда установлено несколько степеней вреда, подлежит применению:",
            options: [
                "Более высокая степень вреда",
                "Самая низкая степень вреда",
                "Степень вреда по выбору контролирующего органа",
                "Средняя степень вреда"
            ],
            correct: 0,
            explanation: "Применяется более высокая степень вреда"
        },
        {
            text: "Обработка биометрических персональных данных:",
            options: [
                "Осуществляется только с согласия субъекта",
                "Осуществляется без согласия субъекта",
                "Осуществляется с согласия субъекта, за рядом исключений",
                "Запрещена полностью"
            ],
            correct: 2,
            explanation: "Ст.11 152-ФЗ — с согласия, кроме исключений (госфункции, правосудие)"
        },
        {
            text: "Что такое трансграничная передача ПДн?",
            options: [
                "Передача данных внутри одного города",
                "Передача данных за пределы РФ",
                "Передача данных внутри компании",
                "Передача данных через VPN"
            ],
            correct: 1,
            explanation: "Ст.12 152-ФЗ — передача на территорию иностранных государств"
        },
        {
            text: "Какой документ регламентирует технические меры защиты ПДн?",
            options: [
                "152-ФЗ",
                "Приказ ФСТЭК №21",
                "КоАП РФ",
                "Трудовой кодекс"
            ],
            correct: 1,
            explanation: "Приказ ФСТЭК №21 — меры защиты информационных систем ПДн"
        }
    ]
};

let results = {};

// Загрузка сохранённых результатов
try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) results = JSON.parse(saved);
} catch(e) {}

// Сохранение результатов
function saveResults() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
    updateProgress();
}

// Переключение модуля
function toggleModule(moduleId) {
    const card = document.querySelector(`[data-module="${moduleId}"]`);
    if (card) card.classList.toggle('active');
}

// Рендер вопросов
function renderQuestions() {
    for (const [moduleId, questions] of Object.entries(QUESTIONS)) {
        const container = document.getElementById(`test-${moduleId}`);
        if (!container) continue;

        const savedAnswers = results[moduleId]?.answers || {};

        container.innerHTML = questions.map((q, idx) => `
            <div class="question" data-question="${moduleId}-${idx}">
                <div class="question-text">${idx+1}. ${q.text}</div>
                <div class="question-options">
                    ${q.options.map((opt, optIdx) => `
                        <label>
                            <input type="radio" name="q_${moduleId}_${idx}" value="${optIdx}" 
                                ${savedAnswers[idx] === optIdx ? 'checked' : ''}
                                onchange="saveAnswer('${moduleId}', ${idx}, ${optIdx})">
                            ${opt}
                        </label>
                    `).join('')}
                </div>
                <div class="question-correct" id="feedback-${moduleId}-${idx}"></div>
            </div>
        `).join('');
    }
}

// Сохранение ответа
function saveAnswer(moduleId, qIdx, answer) {
    if (!results[moduleId]) {
        results[moduleId] = { answers: {}, passed: false };
    }
    results[moduleId].answers[qIdx] = answer;
    saveResults();

    // Проверяем правильность
    const question = QUESTIONS[moduleId][qIdx];
    const isCorrect = answer === question.correct;
    const feedback = document.getElementById(`feedback-${moduleId}-${qIdx}`);

    if (feedback) {
        feedback.innerHTML = isCorrect ? '✅ Правильно!' : `❌ Неправильно. ${question.explanation}`;
        feedback.className = `question-correct ${isCorrect ? 'correct' : 'incorrect'}`;
    }
}

// Завершение модуля
function submitModule(moduleId) {
    const moduleResults = results[moduleId];
    if (!moduleResults || !moduleResults.answers) {
        alert('Ответьте хотя бы на один вопрос');
        return;
    }

    const questions = QUESTIONS[moduleId];
    let correctCount = 0;

    for (let i = 0; i < questions.length; i++) {
        if (moduleResults.answers[i] === questions[i].correct) {
            correctCount++;
        }
    }

    const percent = (correctCount / questions.length) * 100;
    const passed = percent >= 70;

    moduleResults.passed = passed;
    moduleResults.percent = percent;
    saveResults();

    const statusSpan = document.getElementById(`module-status-${moduleId}`);
    if (statusSpan) {
        statusSpan.innerHTML = passed ? '✅ Пройден' : '❌ Не пройден (нужно 70%)';
        statusSpan.className = `module-status ${passed ? 'passed' : 'failed'}`;
    }

    alert(`Модуль ${moduleId}: ${correctCount}/${questions.length} правильных (${percent}%). ${passed ? 'Пройден!' : 'Нужно пересдать (70%+)'}`);
}

// Завершение итоговой аттестации
function submitFinal() {
    // Проверяем, все ли модули пройдены
    const allModulesPassed = [1,2,3,4,5].every(m => results[m]?.passed === true);

    if (!allModulesPassed) {
        alert('Сначала пройдите все модули (нужно 70%+ в каждом)');
        return;
    }

    const finalResults = results.final;
    if (!finalResults || !finalResults.answers) {
        alert('Ответьте на вопросы итоговой аттестации');
        return;
    }

    const questions = QUESTIONS.final;
    let correctCount = 0;

    for (let i = 0; i < questions.length; i++) {
        if (finalResults.answers[i] === questions[i].correct) {
            correctCount++;
        }
    }

    const percent = (correctCount / questions.length) * 100;
    const passed = percent >= 80;

    finalResults.passed = passed;
    finalResults.percent = percent;
    saveResults();

    const statusSpan = document.getElementById('module-status-final');
    if (statusSpan) {
        statusSpan.innerHTML = passed ? '🏆 Аттестация пройдена!' : '❌ Не пройдена (нужно 80%)';
        statusSpan.className = `module-status ${passed ? 'passed' : 'failed'}`;
    }

    alert(`Итоговая аттестация: ${correctCount}/${questions.length} правильных (${percent}%). ${passed ? 'Поздравляем! Вы освоили программу!' : 'Нужно пересдать (80%+)'}`);
}

// Обновление общего прогресса
function updateProgress() {
    const modules = [1,2,3,4,5];
    let passedCount = 0;

    modules.forEach(m => {
        if (results[m]?.passed === true) passedCount++;
        const statusSpan = document.getElementById(`module-status-${m}`);
        if (statusSpan && results[m]) {
            statusSpan.innerHTML = results[m].passed ? '✅ Пройден' : '❌ Не пройден';
            statusSpan.className = `module-status ${results[m].passed ? 'passed' : 'failed'}`;
        }
    });

    const progressPercent = (passedCount / modules.length) * 100;
    const progressBar = document.getElementById('attestation-progress-bar');
    const progressText = document.getElementById('attestation-progress-text');

    if (progressBar) progressBar.style.width = `${progressPercent}%`;
    if (progressText) progressText.textContent = `${passedCount} / ${modules.length} модулей`;

    // Разблокируем итоговую аттестацию
    const finalStatus = document.getElementById('module-status-final');
    if (finalStatus && passedCount === modules.length) {
        finalStatus.innerHTML = '📝 Доступна';
        finalStatus.className = 'module-status';
    } else if (finalStatus) {
        finalStatus.innerHTML = '🔒 Пройдите все модули';
    }
}

// Восстанавливаем статусы модулей
function restoreModuleStatuses() {
    for (let i = 1; i <= 5; i++) {
        if (results[i]?.passed) {
            const statusSpan = document.getElementById(`module-status-${i}`);
            if (statusSpan) {
                statusSpan.innerHTML = '✅ Пройден';
                statusSpan.className = 'module-status passed';
            }
        }
    }

    if (results.final?.passed) {
        const statusSpan = document.getElementById('module-status-final');
        if (statusSpan) {
            statusSpan.innerHTML = '🏆 Аттестация пройдена!';
            statusSpan.className = 'module-status passed';
        }
    }
}

// ПЕРЕКЛЮЧЕНИЕ БОЛЬШОГО ТЕСТА
// ============================================================

function toggleBigTest() {
    const card = document.querySelector('.module-card.final:has(.big-test-header)');
    if (card) {
        card.classList.toggle('active');
    } else {
        // Запасной вариант — ищем по data-атрибуту
        const container = document.getElementById('big-test-container');
        if (container) {
            const card = container.closest('.module-card');
            if (card) card.classList.toggle('active');
        }
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    renderQuestions();
    updateProgress();

    // Рендер большого теста
    renderBigTest();

    // Восстанавливаем статусы модулей
    restoreModuleStatuses();
});

// Делаем функции глобальными
window.toggleBigTest = toggleBigTest;
window.answerBigTest = answerBigTest;
window.resetBigTest = resetBigTest;
window.toggleModule = toggleModule;
window.submitModule = submitModule;
window.submitFinal = submitFinal;