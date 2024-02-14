'use strict';

const left = document.querySelector('.carousel-btn.left');
const right = document.querySelector('.carousel-btn.right');

const carousels = Array.from(document.querySelectorAll('.carousel-item'));
const navItems = Array.from(document.querySelectorAll('.nav-item'));

navItems.forEach((navItem, index) => {
    navItem.addEventListener('click', function (e) {
        const currentNavItem = document.querySelector('.nav-item.active');
        const currentIndex = navItems.indexOf(currentNavItem);
        if (e.currentTarget == currentNavItem) {
            return;
        } 
        else {
            carousels[currentIndex].classList.remove('active');
            navItems[currentIndex].classList.remove('active');
            e.currentTarget.classList.add('active');
            carousels[index].classList.add('active');
        }
    });
});

left.addEventListener('click', swipe);
right.addEventListener('click', swipe);

function swipe(e) {
    const current_carousel = document.querySelector('.carousel-item.active');
    const currentIndex = carousels.indexOf(current_carousel);

    let nextIndex;

    if (e.currentTarget.classList.contains('left')) {
        if(currentIndex === 0) {
            nextIndex = carousels.length - 1;
        }
        else {
            nextIndex = currentIndex - 1;
        }
    }
    else {
        if(currentIndex === carousels.length - 1) {
            nextIndex = 0;
        }
        else {
            nextIndex = currentIndex + 1;
        }
    }

    carousels[nextIndex].classList.add('active');
    navItems[nextIndex].classList.add('active');
    current_carousel.classList.remove('active');
    navItems[currentIndex].classList.remove('active');
}

const api_key = 'cdc1f4dd3681e35a183d1620f15812dc';
let base_keyword = 'fifa 24'
const base_url = `https://gnews.io/api/v4/search?q=${base_keyword}&apikey=${api_key}`

const btn = document.querySelector('button');
const news_content = document.querySelector('.news-content');
const user_input = document.getElementById('keyword');
let errorMessageElement = document.querySelector('.error-msg');
btn.addEventListener('click', getwebsites);
let keyword = base_keyword;

async function getwebsites() {
    errorMessageElement.innerHTML = '';
    let url = base_url;
    if (user_input.value) {
        keyword += ` ${user_input.value}`
        url = `https://gnews.io/api/v4/search?q=${keyword}&apikey=${api_key}`
        console.log(url);
        keyword = base_keyword;
        user_input.value = '';
    }

    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw Error(`Error: ${response.url} ${response.statusText}`);
        }
        const data = await response.json();
        addWebsites(data);
    } catch (error) {
        displayErrorMessage(error.message);
    }
}

function addWebsites(data) {
    news_content.innerHTML = '';
    for(let i = 0; i < 3; i++) {
        const title = document.createElement('h2');
        title.textContent = `Article Title: ${data.articles[i]['title']}`
        const header = document.createElement('h3');
        header.textContent = `Article url: ${data.articles[i]['url']}`;
        const subheader = document.createElement('h4');
        subheader.textContent = `Article description: ${data.articles[i]['description']}`;
        subheader.classList.add('right-indent');
        news_content.append(title, header, subheader);
    }
}

function displayErrorMessage(message) {
    errorMessageElement = document.querySelector('.error-msg');
    errorMessageElement.innerHTML = ''
    errorMessageElement.textContent = `Error: ${message}. Try a different keyword.`;
}



