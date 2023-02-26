'use strict';

const EVENT_LIST = ['click', 'scroll', 'selectionchange'];
const TIMEOUT = 5 * 60 * 1000; // 5 minutes in millisec
// const TIMEOUT = 3000; // 3 second testing timer

let timer;

const resetTimer = e => {
  clearTimeout(timer);
  timer = setTimeout(showAlert, TIMEOUT);
};

const showAlert = () => {
  // Scripts may not close windows that were not opened by script.
  confirm('Ви ще тут?') ? resetTimer() : window.close();
};

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();

  const resultList = document.querySelector('.result-list');

  const userInput = document.querySelector('input').value;
  const aCounter = userInput.match(/[a]/gi).length;

  userInput.split(' ').forEach((word, i, arr) => {
    if (i === 0) word = word.toUpperCase();
    if (i >= arr.length - 2) word = word[0].toLowerCase() + word.slice(1);

    resultList.innerHTML += `<li>
      ${word}
    </li>`;
  });

  alert(`Загальна кілкість літер а: ${aCounter}`);

  timer = setTimeout(showAlert, TIMEOUT);

  EVENT_LIST.forEach(event => {
    document.addEventListener(event, resetTimer);
  });
});

// TEST STRING

const str = 'Apple Pea Door Pencil SigmaSW JavaScript';
