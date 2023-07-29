const numerals = document.querySelector('.numerals');
const clear = document.querySelector('.clear');
let display = document.querySelector('.display');
let beginMode = 1;
let beginOperation = 1;
let operation = '';
let operand;
let currentResult = 0;

function clickEvent(e) {
    if (Array.from(e.target.classList).includes('numeric-keys')) {
        if ((e.target.textContent != 0) && beginMode == 1) {
            beginMode = 0;
            display.textContent = '';
        }
        if (display.textContent.length == 9) {
            alert("Maximum length reached!");
        }
        console.log(e.target.textContent);
        if (!beginMode && display.textContent.length < 9) {
            if (e.target.textContent == '.' && !Array.from(display.textContent.split('')).includes('.'))
                if (display.textContent == '') {
                    display.textContent = '0.';
                } else {
                    display.textContent += '.';
                }
            if (e.target.textContent != '.') {
                display.textContent += `${e.target.textContent}`;
            }
        }
    } else if (e.target.classList[0] == 'operation-keys') {
        beginMode = 1;
        if (beginOperation == 1) {
            beginOperation = 0;
            currentResult = display.textContent;
            display.textContent = '0';
            operation = e.target.textContent
        } else {
            currentResult = operator(currentResult, display.textContent, operation);
            display.textContent = currentResult;
            operation = e.target.textContent
        }
    } else if (e.target.classList[0] == 'operate') {
        currentResult = operator(currentResult, display.textContent, operation);
        display.textContent = currentResult;
        operation = '';
        beginOperation=1;
    }
    else if (Array.from(e.target.classList).includes('delete-btn')) {
        let tempArr = display.textContent.split('');
        tempArr.splice(tempArr.length - 1, 1);
        display.textContent = tempArr.join('');
    }
}

const operator = function operator(operandA, operandB, operation) {
    let result;
    if (operation == '+') {
        result = `${parseFloat(operandA) + parseFloat(operandB)}`;
    } else if (operation == '-') {
        result = `${parseFloat(operandA) - parseFloat(operandB)}`;
    } else if (operation == 'X') {
        result = `${parseFloat(operandA) * parseFloat(operandB)}`;
    } else {
        result = `${parseFloat(operandA) / parseFloat(operandB)}`;
    }
    return Math.round(result * 10000) / 10000;
}

for (let i = 1; i <= 9; i++) {
    numerals.style.display = 'grid';
    numerals.style.gridTemplateColumns = 'repeat(3, 1fr)';
    numerals.style.gridTemplateRows = 'repeat(3, 1fr)';
    const key = document.createElement('button');
    key.textContent = `${i}`;
    key.classList.add('numeric-keys');
    numerals.appendChild(key);
}
const keys = Array.from(document.querySelectorAll('button'));
keys.forEach(key => key.addEventListener('click', clickEvent));

let reset = function () {
    beginMode = 1;
    display.textContent = '0';
}

clear.addEventListener('click', reset);

