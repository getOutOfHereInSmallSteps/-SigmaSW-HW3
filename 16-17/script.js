'use strict';

import _ from 'lodash';

// 16 =========================================================================

const generatePassword = () => {
  const BASE_PATTERN =
    'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'; // can be changed to include more various symbols
  const UNDERSCORE_QUANTITY = 1;
  const MIN_CAPITAL_LETTERS = 2;
  const MAX_NUMBERS = 5;

  const MIN_LENGTH = 6;
  const MAX_LENGTH = 20;

  // Generating password's length
  const passwordLength = Math.floor(
    Math.random() * (MAX_LENGTH - MIN_LENGTH + 1) + MIN_LENGTH
  );

  let res = '';
  let numberCounter = 0;

  // Parsing password's base
  for (let i = 0; i < passwordLength - 1; i++) {
    const randomSymbol =
      BASE_PATTERN[Math.floor(Math.random() * BASE_PATTERN.length)];

    if (+randomSymbol && numberCounter <= MAX_NUMBERS) ++numberCounter;
    if (+randomSymbol && numberCounter > MAX_NUMBERS) continue;
    if (+!randomSymbol && +!res[i - 1]) continue;
    // if (+randomSymbol && +res[i - 1]) continue; SHOULD WORK THIS WAY WTF

    res += randomSymbol;
  }

  // Pasring _ into the password
  for (let i = 0; i < UNDERSCORE_QUANTITY; i++) {
    const underlineIndex = Math.floor(Math.random() * res.length);
    res = res.slice(0, underlineIndex) + '_' + res.slice(underlineIndex);
  }

  // Check if password contains at least MIN_CAPITAL_LETTERS

  while (
    !res.match(/[A-Z]/g) ||
    res.match(/[A-Z]/g).length < MIN_CAPITAL_LETTERS
  ) {
    res = res.replace(/[a-z]/, 'A');
  }

  return res;
};

// TEST 16

// console.log(generatePassword());

// 17 =========================================================================

const reorderArr = arr => {
  const arrLength = arr.length;

  if (!arr.length || !Array.isArray(arr))
    throw new Error(
      'invalid data input (data must be array with length greater than 0)'
    );

  const res = new Array(arrLength);

  const sortedArr = arr.sort((a, b) => a - b);

  for (let i = 0, j = arrLength - 1; i < arrLength; i++) {
    if (i % 2 === 0) {
      res[i / 2] = sortedArr[i];
    }
    if (i % 2 !== 0) {
      res[j--] = sortedArr[i];
    }
  }

  return res;
};

// =========================================================================

const reorderArrLodash = arr =>
  _(arr)
    .sort((a, b) => a - b)
    .chunk(2)
    .reduce(
      (acc, cur) => [
        ...acc.slice(0, acc.length / 2),
        ...cur,
        ...acc.slice(acc.length / 2),
      ],
      []
    );

// TEST 17

// NATIVE :

// console.table(reorderArr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
// console.table(reorderArr([1, 3, 4, 8, 7, 6, 2, 9, 5]));

// LODASH :

// console.table(reorderArrLodash([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
// console.table(reorderArrLodash([1, 3, 4, 8, 7, 6, 2, 9, 5]));
