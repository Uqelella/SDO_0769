// ==UserScript==
// @name         Yandex Bot 2
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Chizhikov Sergey, Fedyukin Andrey
// @match        https://yandex.ru/*
// @match        https://napli.ru/*
// @grant        none
// ==/UserScript==

let keywords = [
  "DevTools — очень полезная штука для разработчика",
  "Редакции — это резервные копии",
  "Google Fonts очень популярны",
];
let yandexInput = document.getElementsByName("text")[0];
let keyword = keywords[getRandom(0, keywords.length)];

let btn = document.getElementsByClassName('button mini-suggest__button button_theme_search button_size_search i-bem button_js_inited')[0];
let links = document.links;
let i = 0;

if (btn !== undefined) {
  let timerId = setInterval(() => {
    console.log(keyword[i]);
    yandexInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      btn.click();
    }
  }, 500);

} else if (location.hostname == "napli.ru") {
  console.log("Мы на Napli!")

  setInterval(() => {
    let index = getRandom(0, links.length);
    if (getRandom(0, 101) >= 80) {
      location.href = "https://yandex.ru";
    }
    else if (links[index].href.indexOf("napli.ru") !== -1)
      links[index].click();
  }, getRandom(1000, 5000));

} else {
  let nextYandexPage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.includes("napli.ru")) {
      let link = links[i];
      let nextYandexPage = false;
      console.log("Найдена строка " + links[i]);
      setTimeout(() => {
        link.click();
      }, getRandom(1000, 4000));

      break;
    }
  }

  if (document.querySelector(".pager__item_current_yes").innerHTML == "5") {
    nextYandexPage = false;
    location.href = "https://yandex.ru";
  }

  if (nextYandexPage) {
    setTimeout(() => {
      document.querySelector('.pager__item_kind_next').click();
    }, getRandom(2000, 4500));
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
