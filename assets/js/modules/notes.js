// notes.js — работа с заметками (localStorage)

// Сохранение заметки
export function addNote() {
    const title = prompt('Название заметки:');
    if (!title) return;

    const content = prompt('Текст заметки:');
    if (!content) return;

    const notes = JSON.parse(localStorage.getItem('user_notes') || '[]');
    notes.push({
        id: Date.now(),
        title: title,
        content: content,
        date: new Date().toISOString()
    });
    localStorage.setItem('user_notes', JSON.stringify(notes));

    alert('Заметка сохранена!');
}

// Получить все заметки
export function getNotes() {
    return JSON.parse(localStorage.getItem('user_notes') || '[]');
}

// Удалить заметку
export function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem('user_notes') || '[]');
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('user_notes', JSON.stringify(notes));
    alert('Заметка удалена');
}

// Показать заметку
export function showNote(id) {
    const notes = getNotes();
    const note = notes.find(n => n.id === id);
    if (note) {
        alert(`📝 ${note.title}\n\n${note.content}\n\n📅 ${new Date(note.date).toLocaleString()}`);
    }
}