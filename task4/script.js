const output = document.querySelector('#data');
const btn = document.querySelector('.j-btn-test');

// Функция, выводящая текст об ошибке
const error = () => {
    output.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(
        `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`
    )
        .then(response => {
            return response.json();
        })
        .then(data => {
            let outputText = formatOutput(data);
            writeOutput(outputText);
        })

}

btn.addEventListener('click', () => {

    if (!navigator.geolocation) {
        output.textContent = 'Geolocation не поддерживается вашим браузером';
    } else {
        output.textContent = 'Определение местоположения…';
        navigator
            .geolocation
            .getCurrentPosition(success, error);
    }
});

function formatOutput(data) {
    console.log(data);
    let html = `
    <p>Часовой пояс: ${data.timezone}</p>
    <p>Дата и время : ${data.date_time_txt}</p>
  `;
    return html;
}

function writeOutput(message) {
    output.innerHTML = message;
}