'use strict';

import _ from 'lodash';

// 10 =========================================================================

const testFilePath = `c:\\WebServers\\home\\testsite\\www\\myfile.txt`;

const getFileName = filePath => {
  // That regular expression was created through a lot of pain and suffering (and googling)
  return filePath.match(/[^\\]*(?=\.)/)[0];
};

// TEST 10

// console.log(getFileName(testFilePath));

// 11 =========================================================================

const testStr1 = 'hello world';
const testStr2 = 'o worldhell';

// could be done easier with (str2 + str2).includes(str1)
// but string cycling was the task, right?

const checkCycledString = (str1, str2) => {
  if (str1.length !== str2.length) return false;

  let cycledStr = str2;

  const strLength = str1.length;

  for (let i = 0; i < strLength - 1; i++) {
    cycledStr = cycledStr.slice(1) + cycledStr[0];
    // console.log(cycledStr); // to check string cycling
    if (cycledStr === str1) return true;
  }

  return false;
};

// =========================================================================

const checkCycledStringLodash = (str1, str2) => {
  if (str1.length !== str2.length) return false;

  let cycledStr = str2;

  const strLength = str1.length;

  for (let i = 0; i < strLength - 1; i++) {
    cycledStr = _(cycledStr).tail().join('') + _.head(cycledStr);
    if (cycledStr === str1) return true;
  }

  return false;
};

// TEST 11

// NATIVE :

// console.log(checkCycledString(testStr1, testStr2));

// LODASH :

// console.log(checkCycledStringLodash(testStr1, testStr2));

// 12 =========================================================================

const decomposeArr = (
  arr,
  resArrays = {
    b: [],
    c: [],
  }
) => {
  if (arr.length === 0) return resArrays; // recursion exit condition

  arr.sort((a, b) => a - b);

  const differences = arr.reduce((acc, cur, curIndex, arr) => {
    if (arr[curIndex + 1] !== undefined) {
      acc.push(Math.abs(cur - arr[++curIndex]));
    }
    return acc;
  }, []); // getting the differences of the closest array's elements

  const smallestDiffIndex = differences.indexOf(Math.min(...differences)); // getting the index of the elements with minimal value difference

  if (arr[smallestDiffIndex] > arr[smallestDiffIndex + 1]) {
    resArrays.b.push(arr[smallestDiffIndex + 1]);
    resArrays.c.push(arr[smallestDiffIndex]);
  } else {
    resArrays.b.push(arr[smallestDiffIndex]);
    resArrays.c.push(arr[smallestDiffIndex + 1]);
  } // checking, where to put the elements (b has the smaller elements, c - bigger)

  arr.splice(smallestDiffIndex, 2); // splice is much easier to use due to the method's contract in this case + we're not doing anything with the array afterwards rather than moving it further in recursion (although original data mutation is not good overall)

  return decomposeArr(arr, resArrays);
};

//=========================================================================

const decomposeArrLodash = (
  arr,
  resArrays = {
    b: [],
    c: [],
  }
) => {
  if (arr.length === 0) return resArrays;

  const smallestDiffIndex = _(arr)
    .sort()
    .zipWith(_.tail(arr), (a, b) => Math.abs(a - b))
    .initial()
    .thru(diffs => [_.min(diffs), diffs])
    .thru(([minDiff, diffs]) => _.indexOf(diffs, minDiff))
    .value();

  _(arr)
    .slice(smallestDiffIndex, smallestDiffIndex + 2)
    .thru(arr => {
      resArrays.c.push(_.max(arr));
      resArrays.b.push(_.min(arr));
    })
    .value();

  arr.splice(smallestDiffIndex, 2);
  return decomposeArrLodash(arr, resArrays);
};

// TEST 12

// NATIVE :

// console.log(decomposeArr([1, 0, 5, 3, 7, 8]));
// console.log(decomposeArr([0, 3, 4, 6]));

// LODASH :

// console.log(decomposeArrLodash([1, 0, 5, 3, 7, 8]));
// console.log(decomposeArrLodash([0, 3, 4, 6]));
