const screen = document.querySelector('#screen');
const btn = document.querySelector('.j-btn-test');
const stat = document.querySelector('#status');

// Функция, выводящая текст об ошибке
const error = () => {
    stat.textContent = 'Информация о местоположении недоступна';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    stat.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
}

btn.addEventListener('click', () => {

    screen.textContent = `Параметры экрана ${window.screen.width} px  ${window.screen.height} px `
    if (!navigator.geolocation) {
        stat.textContent = 'Информация о местоположении недоступна';
    } else {
        stat.textContent = 'Определение местоположения…';
        navigator
            .geolocation
            .getCurrentPosition(success, error);
    }
});