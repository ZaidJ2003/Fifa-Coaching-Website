'use strict';

// Adding tabs UI to active homepage 

const tabs = Array.from(document.querySelectorAll('.tab-btn'));
const contents = Array.from(document.querySelectorAll('.content'));

tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) =>{   
        tabs.forEach(tab=>{
            tab.classList.remove('active')
        });
        tab.classList.add('active');

        let line = document.querySelector('.line');
        line.style.width = e.target.offsetWidth + "px";
        line.style.left = e.target.offsetLeft + "px";

        contents.forEach(content =>{
            content.classList.remove('active');
        })
        contents[index].classList.add('active');
    })
});