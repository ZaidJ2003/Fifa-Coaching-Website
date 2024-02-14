'use strict';

const root = document.documentElement;
const buttons = Array.from(document.querySelectorAll('.accordion-label'));
console.log(buttons);
buttons.forEach(button => {
    button.addEventListener('click', create_accordion)
});

function create_accordion(e) {
    const btn = e.target;
    btn.classList.toggle('open');
    const btn_content = btn.nextElementSibling;
    btn_content.classList.toggle('open');
    root.style.setProperty('--content-height', btn.nextElementSibling.scrollHeight + 'px');

    buttons.forEach(button => {
        if (button !== btn && button.classList.contains('open')) {
            button.classList.remove('open');
            button.nextElementSibling.classList.remove('open');
        }
    });
}