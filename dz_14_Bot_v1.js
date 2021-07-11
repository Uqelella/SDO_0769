// ==UserScript==
// @name         Yandex Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Chizhikov Sergey, Fedyukin Andrey
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==

let keywords = [
  "10 самых популярных шрифтов от Google",
  "Отключение редакций и ревизий в WordPress",
  "Вывод произвольных типов записей и полей в WordPress",
];
let keyword = keywords[getRandom(0, keywords.length)];

document.getElementsByName("text")[0].value = keyword;
let button = document.querySelector(".mini-suggest__button");
let links = document.links;

if (button !== undefined) {
  document.getElementsByName("text")[0].value = keyword;
  document.querySelector(".mini-suggest__button").click();
} else {
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.includes("napli.ru")) {
      let link = links[i];
      console.log("Найдена строка " + links[i]);
      link.click();
      break;
    }
  }
}
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}