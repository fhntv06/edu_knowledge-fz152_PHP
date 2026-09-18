// api.js — загрузка данных с сервера

let articlesData = [];

// Загрузка данных с сервера
export async function loadArticles() {
    try {
        const response = await fetch('api/articles.php');
        articlesData = await response.json();

        return articlesData;
    } catch (error) {
        console.error('Ошибка загрузки статей:', error);
        return [];
    }
}

// Получить данные статей
export function getArticles() {
    return articlesData;
}

// Установить данные статей
export function setArticles(data) {
    articlesData = data;
}