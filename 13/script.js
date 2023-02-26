'use strict';

const checkEmail = str => {
  // Deffinetly not my own regex for email (thx stackOverflow)
  return str.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? true : false;
};

const checkLink = str => {
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
};

const checkNumber = str => str.length > 3 && !isNaN(+str);

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  const inputStr = document.querySelector('input').value;

  const resStr = inputStr
    .split(' ')
    .map((word, i) => {
      if (checkEmail(word)) return '[контакти заборонені]';
      if (checkLink(word)) return '[посилання заборонено]';
      if (checkNumber(word)) return;

      if (i === 0) return word[0].toUpperCase() + word.slice(1).toLowerCase();

      return word.toLowerCase();
    })
    .join(' ');

  console.log(resStr);
  document.querySelector('.result-paragraph').innerHTML += resStr;

  if (resStr.length < inputStr.length) {
    setInterval(() => {
      alert('Вам потрібна допомога?');
    }, 5000);
  }
});

// TEST STRING

const testUserString = `sOME basIc TeeeXXXt 1488 alex.really.cool.dev@example.com https://stackoverflow.com http://somelink.ua 12 1234`;
