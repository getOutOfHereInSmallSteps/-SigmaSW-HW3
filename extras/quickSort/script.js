function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr[pivotIndex];
  let leftArray = [];
  let rightArray = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) {
      // оригінально в іф було порівняння індексу і з pivot, а не pivotIndex
      continue; // а тут був break
    }
    if (arr[i] < pivot) {
      leftArray.push(arr[i]);
    } else {
      rightArray.push(arr[i]);
    }
  }

  return [...quickSort(leftArray), pivot, ...quickSort(rightArray)];
}

console.log(quickSort([123, 4523, 64, 33, 123, 7]));
