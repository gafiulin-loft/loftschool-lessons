/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';
/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function isMatching(full, chunk) {
  if (full.toUpperCase().indexOf(chunk.toUpperCase()) !== -1) return true;

  return false;
}

function getCookies() {
  return document.cookie
    .split('; ')
    .filter(Boolean)
    .map((cookie) => cookie.match(/^([^=]+)=(.+)/))
    .reduce((obj, [, name, value]) => {
      obj[name] = value;

      return obj;
    }, {});
}

filterNameInput.addEventListener('input', function () {
  changeCookies();
});

addButton.addEventListener('click', () => {
  document.cookie = `${addNameInput.value}=${addValueInput.value}`;

  // addNameInput.value = '';
  // addValueInput.value = '';

  getCookieTable(getCookies());
  changeCookies();
});

listTable.addEventListener('click', (e) => {});

function getCookieTable(cookies) {
  listTable.innerHTML = '';

  if (document.cookie) {
    for (const cookie in cookies) {
      const name = cookie;
      const value = cookies[cookie];

      const tr = document.createElement('tr');
      const tdName = document.createElement('td');
      const tdValue = document.createElement('td');
      const tdButton = document.createElement('td');

      tdName.textContent = name;
      tdValue.textContent = value;

      const button = document.createElement('button');

      button.textContent = 'Удалить';

      tdButton.append(button);

      tr.append(tdName);
      tr.append(tdValue);
      tr.append(tdButton);

      listTable.append(tr);

      button.addEventListener('click', () => {
        deleteCookie(name);
      });
    }
  }
}

function changeCookies() {
  const cookies = getCookies();

  const newCookie = {};

  for (const cookieName in cookies) {
    if (
      isMatching(cookieName, filterNameInput.value) ||
      isMatching(cookies[cookieName], filterNameInput.value)
    ) {
      newCookie[cookieName] = cookies[cookieName];
    }
  }

  getCookieTable(newCookie);
}

function deleteCookie(name) {
  let date = new Date(Date.now());
  date = date.toUTCString();

  document.cookie = `${name}=''; expires=${date}`;

  getCookieTable(getCookies());
}

getCookieTable(getCookies());