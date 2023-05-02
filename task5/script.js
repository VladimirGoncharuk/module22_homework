function pageLoaded() {
    const wsUri = "wss://echo-ws-service.herokuapp.com/";
    const infoOutput = document.querySelector(".info_output");
    const chatOutput = document.querySelector(".chat_output");
    const input = document.querySelector("input");
    const sendBtn = document.querySelector(".btn_send");
    const sendgeo = document.querySelector(".btn_geo");

    let socket = new WebSocket(wsUri);

    socket.onopen = () => {
        infoOutput.innerText = "Соединение установлено";
    }

    socket.onmessage = (event) => {

        if (event.data.includes('class="geolocation"')) 
            return;
        writeToChat(event.data, true);

    }

    socket.onerror = () => {
        infoOutput.innerText = "При передаче данных произошла ошибка";
    }
    socket.onclose = () => {
        infoOutput.innerText = "Соединение закрыто";
    };

    sendBtn.addEventListener("click", sendMessage);
    sendgeo.addEventListener("click", sendgeolocation);

    function sendMessage() {
        if (!input.value) 
            return;
        socket.send(input.value);
        writeToChat(input.value, false);
        input.value = "";
    }

    function sendgeolocation() {
        const error = () => {
            infoOutput.innerText += 'Информация о местоположении недоступна';
        }

        // Функция, срабатывающая при успешном получении геолокации
        const success = (position) => {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            let href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            let linkgeo = `<a href= ${href} target="_blank" class="geolocation" > Мое местоположение </a>`;
            socket.send(linkgeo);
            writeToChat(linkgeo, false);

        }
        if (!navigator.geolocation) {
            infoOutput.innerText += ' Geolocation не поддерживается вашим браузером';
        } else {
            infoOutput.innerText += ' Определение местоположения…';
            navigator
                .geolocation
                .getCurrentPosition(success, error);
        }

    }

    function writeToChat(message, isRecieved) {

        let messageHTML = `<div class="${isRecieved
            ? "recieved"
            : "sent"}">${message}</div>`;
        chatOutput.innerHTML += messageHTML;

    }

}

document.addEventListener("DOMContentLoaded", pageLoaded);