'use strict';

import _ from 'lodash';

// Most of the functions could be done as oneliners, but input hadling was the criteria, i suppose

// 1 =========================================================================

const arr = array => {
  if (!Array.isArray(array))
    throw new Error('invalid data input (data must be an array)');
  if (array.length <= 1) return 0;

  const diff = Math.max(...array) - Math.min(...array);

  return diff;
};

// =========================================================================

const arrLodash = array => {
  if (!Array.isArray(array))
    throw new Error('invalid data input (data must be an array)');
  if (array.length <= 1) return 0;

  const diff = _.max(array) - _.min(array);
  return diff;
};

// TEST 1

// NATIVE :

// console.log(arr([1, 2, 3, 4])); // 4 - 1 === 3
// console.log(arr([0, -3, 10, 1])); // 10 - (-3) === 13
// console.log(arr([])); // 0
// console.log(arr([1])); // 0

// LODASH :

// console.log(arrLodash([1, 2, 3, 4])); // 4 - 1 === 3
// console.log(arrLodash([0, -3, 10, 1])); // 10 - (-3) === 13
// console.log(arrLodash([])); // 0
// console.log(arrLodash([1])); // 0

// 2 =========================================================================

const filterWordsLength = (str, length) => {
  if (typeof str !== 'string' || typeof length !== 'number')
    throw new Error('invalid data input (data must be string and a number)');

  const filteredWords = str.split(' ').filter(word => word.length > length);

  return filteredWords;
};

// =========================================================================

const filterWordsLengthLodash = (str, length) => {
  if (typeof str !== 'string' || typeof length !== 'number')
    throw new Error('invalid data input (data must be string and a number)');

  const filteredWords = _(str)
    .words()
    .filter(word => word.length > length)
    .value();

  return filteredWords;
};

// TEST 2

// NATIVE :

// console.log(
//   filterWordsLength(
//     'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore',
//     4
//   )
// );

// LODASH :

// console.log(
//   filterWordsLengthLodash(
//     'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore',
//     4
//   )
// );

// 3 =========================================================================

const solution = (str, endingStr) => {
  if (typeof str !== 'string' || typeof endingStr !== 'string')
    throw new Error('invalid data input (data must be two strings)');

  return str.endsWith(endingStr);
};

// =========================================================================

const solutionLodash = (str, endingStr) => {
  if (typeof str !== 'string' || typeof endingStr !== 'string')
    throw new Error('invalid data input (data must be two strings)');

  // why ? it is really simple as that
  return _.endsWith(str, endingStr);
};

// TEST 3

// NATIVE :

// console.log(solution('abc', 'bc')); // true
// console.log(solution('abc', 'd')); // false
// console.log(solution('Cats are the best!', 'best!')); // true

// LODASH :

// console.log(solutionLodash('abc', 'bc')); // true
// console.log(solutionLodash('abc', 'd')); // false
// console.log(solutionLodash('Cats are the best!', 'best!')); // true

// 4 =========================================================================

const averages = arr => {
  if (!Array.isArray(arr) || !arr.length)
    throw new Error(
      'invalid data input (data must be an array with length greater than zero)'
    );

  if (arr.length < 2) return [arr[0]];

  const averagesVal = arr.reduce((acc, cur, curIndex, arr) => {
    if (arr[curIndex + 1] !== undefined) {
      acc.push((cur + arr[++curIndex]) / 2);
    }
    return acc;
  }, []);

  return averagesVal;
};

// =========================================================================

const averagesLodash = arr => {
  if (!Array.isArray(arr) || !arr.length)
    throw new Error(
      'invalid data input (data must be an array with length greater than zero)'
    );

  if (arr.length < 2) return [arr[0]];

  const avgValues = _(arr)
    .zipWith(_.tail(arr), (a, b) => [a, b])
    .initial()
    .map(pair => _.mean(pair))
    .value();

  return avgValues;
};

// TEST 4

// NATIVE :

// console.log(averages([2, -2, 2, -2, 2])); // [0, 0, 0, 0]
// console.log(averages([1, 3, 5, 1, -10])); // [2, 4, 3, -4.5]
// console.log(averages([1])); // [1]

// LODASH :

// console.log(averagesLodash([2, -2, 2, -2, 2])); // [0, 0, 0, 0]
// console.log(averagesLodash([1, 3, 5, 1, -10])); // [2, 4, 3, -4.5]
// console.log(averagesLodash([1])); // [1]

// 5 =========================================================================

// i just find this oneliner 2 cool 2 be type checked
const countVowels = str => str.match(/[eyuioa]/gi).length;

// TEST 5

// console.log(countVowels('Celebration'));

// 5 (extra) =========================================================================

const removeABC = str => {
  if (typeof str !== 'string')
    throw new Error('invalid data input (data must be a string)');

  const filteredStr = str.replace(/[abc]/gi, '');

  return filteredStr.length === str.length ? null : filteredStr;
};

// TEST 5 (extra)

// console.log(removeABC('This might be a bit hard'));
// console.log(removeABC('hello world!'));

// 6 =========================================================================

const difference = (firstArr, secondArr) => [
  ...new Set([...firstArr, ...secondArr]),
];

// =========================================================================

const differenceLodash = (firstArr, secondArr) => _.union(firstArr, secondArr);

// TEST 6

// NATIVE :

// console.log(difference([1, 2, 3], [100, 2, 1, 10])); // [ 1, 2, 3, 100, 10 ]

// LODASH :

// console.log(differenceLodash([1, 2, 3], [100, 2, 1, 10])); // [ 1, 2, 3, 100, 10 ]

// 7 =========================================================================

const flipObj = obj =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));

// TEST 7

// console.log(flipObj({ red: '#FF0000', green: '#00FF00', white: '#FFFFFF' }));

// 8 =========================================================================

const calculateDifference = (stolenItems, limit) =>
  Object.values(stolenItems).reduce((acc, cur) => acc + cur, 0) - limit;

// TEST 8

// console.log(calculateDifference({ 'baseball bat': 20 }, 5)); // 15
// console.log(calculateDifference({ skate: 10, painting: 20 }, 19)); // 11
// console.log(calculateDifference({ skate: 200, painting: 200, shoes: 1 }, 400)); // 1
