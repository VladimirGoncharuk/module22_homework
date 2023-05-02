const btn = document.querySelector('.j-btn-test');
const btn_icon = document.querySelector('.btn_icon');
const btn_icon_2 = document.querySelector('.btn_icon_2');

btn.addEventListener('click', () => {
    btn_icon
        .classList
        .toggle('none_icon');
    btn_icon_2
        .classList
        .toggle('none_icon');
});