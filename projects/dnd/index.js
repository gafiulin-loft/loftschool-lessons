/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

export function createDiv() {
  const elem = document.createElement('div');
  const height = randomInteger(100, 300);
  const width = randomInteger(100, 300);
  elem.style.height = `${height}px`;
  elem.style.width = `${width}px`;
  elem.style.background = 'red';
  elem.style.top = `${randomInteger(
    100,
    document.documentElement.clientHeight - height
  )}px`;
  elem.style.left = `${randomInteger(
    100,
    document.documentElement.clientHeight - width
  )}px`;
  elem.classList.add('draggable-div');
  elem.draggable = true;
  return elem;
}

function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  homeworkContainer.append(createDiv());
});

let currentElem;

document.addEventListener('dragstart', (e) => {
  currentElem = e.target;

  e.dataTransfer.setData('text/html', 'dragstart');
});

document.addEventListener('dragover', (e) => {
  e.preventDefault();
});

document.addEventListener('drop', (e) => {
  currentElem.style.top = `${e.pageY - currentElem.offsetHeight / 2}px`;
  currentElem.style.left = `${e.pageX - currentElem.offsetWidth / 2}px`;
});
