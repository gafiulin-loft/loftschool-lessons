/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns.html

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

import './towns.html';

const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
  const promise = new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(
      'GET',
      'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json',
      true
    );
    request.addEventListener('readystatechange', function () {
      if (request.readyState === 4 && request.status === 200) {
        const towns = JSON.parse(request.responseText);

        towns.sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        });
        resolve(towns);
      }
    });
    request.send();
  });

  return promise;
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
  if (full.toUpperCase().indexOf(chunk.toUpperCase()) !== -1) return true;

  return false;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с надписью "Не удалось загрузить города" и кнопкой "Повторить" */
const loadingFailedBlock = homeworkContainer.querySelector('#loading-failed');
/* Кнопка "Повторить" */
const retryButton = homeworkContainer.querySelector('#retry-button');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

retryButton.addEventListener('click', () => {
  getTowns();
});

filterInput.addEventListener('input', function () {
  filterResult.textContent = '';

  setTimeout(() => {
    towns.forEach((element) => {
      if (this.value && isMatching(element.name, this.value)) {
        const elem = document.createElement('div');
        elem.textContent = element.name;
        filterResult.appendChild(elem);
      }
    });
  }, 1);
});

loadingFailedBlock.classList.add('hidden');
filterBlock.classList.add('hidden');

let towns;

async function getTowns() {
  try {
    towns = await loadTowns();

    loadingBlock.classList.add('hidden');
    filterBlock.classList.remove('hidden');
  } catch (e) {
    loadingFailedBlock.classList.remove('hidden');
    loadingBlock.classList.add('hidden');
  }
}

getTowns();

export { loadTowns, isMatching };
