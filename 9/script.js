'use strict';

const doesBrickfit = (a, b, c, w, h) => {
  if (a <= 0 || b <= 0 || c <= 0 || w <= 0 || h <= 0)
    throw new Error('invalid data: all inputs should be a positive value');

  if ((a <= w && b <= h) || (a <= h && b <= w)) return true;

  if ((a <= w && c <= h) || (a <= h && c <= w)) return true;

  if ((b <= w && c <= h) || (b <= h && c <= w)) return true;

  return false;
};

document.querySelector('.brick-input-form').addEventListener('submit', e => {
  e.preventDefault();
  const brickHeight = +document.querySelector('#brick-height').value;
  const brickWidth = +document.querySelector('#brick-width').value;
  const brickDepth = +document.querySelector('#brick-depth').value;

  const holeWidth = +document.querySelector('#hole-width').value;
  const holeHeight = +document.querySelector('#hole-height').value;

  console.log(
    doesBrickfit(brickHeight, brickWidth, brickDepth, holeWidth, holeHeight)
  );
});
