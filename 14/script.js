'use strict';

const checkParentheses = text => {
  if (!text.match(/[\(\)]/gi)) return false;

  const parenthesesStack = [];

  for (const letter of text) {
    if (letter === '(') parenthesesStack.push('(');
    else if (letter === ')' && !parenthesesStack.pop()) return false;
  }

  return parenthesesStack.length === 0;
};

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  const userInput = document.querySelector('input').value;
  const isUserInputValid = checkParentheses(userInput);
  console.log(isUserInputValid);

  if (isUserInputValid) {
    const outputParagraph = document.querySelector('.output');
    outputParagraph.innerHTML += `Parenthesis balance is valid`;
    outputParagraph.addEventListener('copy', e => {
      e.preventDefault();
    });
    window.oncontextmenu = () => false;
  }
});

// TEST

// console.log(checkParentheses('Some text (with) parentheses'));
// console.log(checkParentheses('Some text )(with) parentheses'));
// console.log(checkParentheses('(()()()()(())()()())'));
