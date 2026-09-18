<?php
// pages/attestation.php
// Страница для самопроверки и аттестации
?>

<div class="view active content-area">
    <div class="article-meta">
        <span class="tag tag-checklist">Аттестация</span>
        <span class="tag tag-new">Самопроверка</span>
        <div class="article-status"><div class="status-dot status-learning"></div>В процессе</div>
    </div>

    <h1 class="article-title">Аттестация по 152-ФЗ</h1>
    <p class="article-subtitle">Проверь свои знания. По каждому модулю — тесты. В конце — итоговая аттестация.</p>
    <div class="article-divider"></div>

    <!-- Общий прогресс -->
    <div class="attestation-progress">
        <div class="progress-label">
            <span>Общий прогресс аттестации</span>
            <span id="attestation-progress-text">0 / 6 модулей</span>
        </div>
        <div class="progress-bar-wrap">
            <div class="progress-bar" id="attestation-progress-bar" style="width:0%"></div>
        </div>
    </div>

    <!-- Модуль 1 -->
    <div class="module-card" data-module="1">
        <div class="module-header" onclick="toggleModule(1)">
            <span class="module-num">Модуль 1</span>
            <span class="module-title">Новеллы 152-ФЗ "О персональных данных"</span>
            <span class="module-status" id="module-status-1">📋 Не пройден</span>
            <span class="module-chevron">▼</span>
        </div>
        <div class="module-body" id="module-body-1">
            <div class="module-desc">
                <strong>Проверяемые ЗУН:</strong>
                <ul>
                    <li>знание актуальных требований законодательства в сфере персональных данных</li>
                    <li>знание основных понятий и определений, используемых в сфере персональных данных</li>
                </ul>
            </div>
            <div class="test-questions" id="test-1">
                <!-- Вопросы загружаются из JS -->
            </div>
            <button class="btn btn-primary" onclick="submitModule(1)">📝 Завершить модуль</button>
        </div>
    </div>

    <!-- Модуль 2 -->
    <div class="module-card" data-module="2">
        <div class="module-header" onclick="toggleModule(2)">
            <span class="module-num">Модуль 2</span>
            <span class="module-title">Основания обработки персональных данных</span>
            <span class="module-status" id="module-status-2">📋 Не пройден</span>
            <span class="module-chevron">▼</span>
        </div>
        <div class="module-body" id="module-body-2">
            <div class="module-desc">
                <strong>Проверяемые ЗУН:</strong>
                <ul>
                    <li>знание оснований обработки персональных данных</li>
                    <li>знание случаев получения согласия на обработку ПДн</li>
                    <li>знание требований к различным видам согласий</li>
                </ul>
            </div>
            <div class="test-questions" id="test-2"></div>
            <button class="btn btn-primary" onclick="submitModule(2)">📝 Завершить модуль</button>
        </div>
    </div>

    <!-- Модуль 3 -->
    <div class="module-card" data-module="3">
        <div class="module-header" onclick="toggleModule(3)">
            <span class="module-num">Модуль 3</span>
            <span class="module-title">Политика обработки персональных данных</span>
            <span class="module-status" id="module-status-3">📋 Не пройден</span>
            <span class="module-chevron">▼</span>
        </div>
        <div class="module-body" id="module-body-3">
            <div class="module-desc">
                <strong>Проверяемые ЗУН:</strong>
                <ul>
                    <li>знание требований к содержанию «Политики обработки персональных данных»</li>
                    <li>знание требований по размещению документа</li>
                    <li>знание мер ответственности за отсутствие документа</li>
                </ul>
            </div>
            <div class="test-questions" id="test-3"></div>
            <button class="btn btn-primary" onclick="submitModule(3)">📝 Завершить модуль</button>
        </div>
    </div>

    <!-- Модуль 4 -->
    <div class="module-card" data-module="4">
        <div class="module-header" onclick="toggleModule(4)">
            <span class="module-num">Модуль 4</span>
            <span class="module-title">Уведомление об обработке персональных данных</span>
            <span class="module-status" id="module-status-4">📋 Не пройден</span>
            <span class="module-chevron">▼</span>
        </div>
        <div class="module-body" id="module-body-4">
            <div class="module-desc">
                <strong>Проверяемые ЗУН:</strong>
                <ul>
                    <li>знание порядка подачи уведомления в Роскомнадзор</li>
                    <li>знание содержания уведомления</li>
                </ul>
            </div>
            <div class="test-questions" id="test-4"></div>
            <button class="btn btn-primary" onclick="submitModule(4)">📝 Завершить модуль</button>
        </div>
    </div>

    <!-- Модуль 5 -->
    <div class="module-card" data-module="5">
        <div class="module-header" onclick="toggleModule(5)">
            <span class="module-num">Модуль 5</span>
            <span class="module-title">Аудит в сфере персональных данных</span>
            <span class="module-status" id="module-status-5">📋 Не пройден</span>
            <span class="module-chevron">▼</span>
        </div>
        <div class="module-body" id="module-body-5">
            <div class="module-desc">
                <strong>Проверяемые ЗУН:</strong>
                <ul>
                    <li>знание порядка проведения аудита персональных данных в организации</li>
                </ul>
            </div>
            <div class="test-questions" id="test-5"></div>
            <button class="btn btn-primary" onclick="submitModule(5)">📝 Завершить модуль</button>
        </div>
    </div>

    <!-- ============================================================ -->
    <!-- БОЛЬШОЙ АТТЕСТАЦИОННЫЙ ТЕСТ -->
    <!-- ============================================================ -->

    <div class="module-card final" style="margin-top: 40px; border-color: var(--accent);">
        <div class="module-header" onclick="toggleBigTest()">
            <span class="module-num" style="color: var(--accent);">📝</span>
            <span class="module-title" style="font-weight: 600;">Аттестационный тест — 152-ФЗ</span>
            <span class="module-status" id="big-test-status">📋 20 вопросов</span>
            <span class="module-chevron">▼</span>
        </div>
        <div class="module-body" id="big-test-body">
            <div id="big-test-container"></div>
        </div>
    </div>

    <!-- Итоговая аттестация -->
    <div class="module-card final" data-module="final">
        <div class="module-header" onclick="toggleModule('final')">
            <span class="module-num">🎓 Итоговая аттестация</span>
            <span class="module-title">Комплексное тестирование</span>
            <span class="module-status" id="module-status-final">🔒 Доступна после всех модулей</span>
            <span class="module-chevron">▼</span>
        </div>
        <div class="module-body" id="module-body-final">
            <div class="module-desc">
                <strong>Проверяемые ЗУН:</strong>
                <ul>
                    <li>знание нормативно-правовой базы в сфере ПДн</li>
                    <li>знание оснований обработки ПДн</li>
                    <li>знание требований к согласиям и Политике</li>
                    <li>знание порядка подачи уведомления в РКН</li>
                    <li>знание порядка проведения аудита</li>
                </ul>
            </div>
            <div class="test-questions" id="test-final"></div>
            <button class="btn btn-success" onclick="submitFinal()">🏆 Завершить итоговую аттестацию</button>
        </div>
    </div>
</div>
