// checklist.js — обработка чекбоксов в чеклистах

// Переключение чекбокса
export function toggleCheck(box) {
    box.classList.toggle('checked');
    const text = box.nextElementSibling;
    if (text) text.classList.toggle('checked');

    // Сохраняем состояние чекбокса в localStorage
    saveChecklistState();
}

// Сохранение состояния всех чекбоксов
export function saveChecklistState() {
    const checkboxes = document.querySelectorAll('.check-box');
    const states = {};
    checkboxes.forEach((box, index) => {
        states[index] = box.classList.contains('checked');
    });
    localStorage.setItem('checklist_states', JSON.stringify(states));
}

// Загрузка состояния чекбоксов
export function loadChecklistState() {
    const saved = localStorage.getItem('checklist_states');
    if (!saved) return;

    try {
        const states = JSON.parse(saved);
        const checkboxes = document.querySelectorAll('.check-box');
        checkboxes.forEach((box, index) => {
            if (states[index]) {
                box.classList.add('checked');
                const text = box.nextElementSibling;
                if (text) text.classList.add('checked');
            }
        });
    } catch (e) {
        console.error('Ошибка загрузки состояния чеклиста:', e);
    }
}