let calcHistory = '';
let calcDisplayValue = '0';
let calcFirstOperand = null;
let calcWaitingForSecondOperand = false;
let calcOperator = null;
let calcMemory = 0;

function refreshDisplay() {
    const display = document.querySelector('#calc-screen');
    display.value = calcDisplayValue;

    const historyElement = document.querySelector('#calc-history');
    historyElement.innerText = calcHistory;
}

function numPressed(digit) {
    if (calcWaitingForSecondOperand) {
        calcDisplayValue = String(digit);
        calcWaitingForSecondOperand = false;
    } else {
        calcDisplayValue = calcDisplayValue === '0' ? String(digit) : calcDisplayValue + digit;
    }
    refreshDisplay();
}

function decimalInput(dot) {
    if (calcWaitingForSecondOperand) {
        calcDisplayValue = '0';
        calcWaitingForSecondOperand = false;
    }
    if (!calcDisplayValue.includes(dot)) {
        calcDisplayValue += dot;
    }
    refreshDisplay();
}

function resetCalc() {
    calcDisplayValue = '0';
    calcFirstOperand = null;
    calcWaitingForSecondOperand = false;
    calcOperator = null;
    calcHistory = '';
    refreshDisplay();
}

function changeSign() {
    calcDisplayValue = calcDisplayValue.charAt(0) === '-' ? calcDisplayValue.slice(1) : '-' + calcDisplayValue;
    refreshDisplay();
}

function operatorHandler(nextOperator) {
    const inputValue = parseFloat(calcDisplayValue);

    if (calcOperator && calcWaitingForSecondOperand) {
        calcOperator = nextOperator;
        return;
    }

    if (calcFirstOperand == null) {
        calcFirstOperand = inputValue;
    } else if (calcOperator) {
        const currentValue = calcFirstOperand;
        const result = performCalc[calcOperator](calcFirstOperand, inputValue);
        calcDisplayValue = String(result);
        calcFirstOperand = result;

        calcHistory = `${currentValue} ${calcOperator} ${inputValue} = ${calcDisplayValue}\n` + calcHistory;

        const operations = calcHistory.split('\n');
        if (operations.length > 4) {
            operations.pop();
            calcHistory = operations.join('\n');
        }
    }

    calcWaitingForSecondOperand = true;
    calcOperator = nextOperator;
    refreshDisplay();
}

const performCalc = {
    '/': (calcFirstOperand, secondOperand) => calcFirstOperand / secondOperand,
    '*': (calcFirstOperand, secondOperand) => calcFirstOperand * secondOperand,
    '+': (calcFirstOperand, secondOperand) => calcFirstOperand + secondOperand,
    '-': (calcFirstOperand, secondOperand) => calcFirstOperand - secondOperand,
    '%': (calcFirstOperand) => calcFirstOperand / 100,
};

function calcResult() {
    if (calcOperator && !calcWaitingForSecondOperand) {
        operatorHandler(calcOperator);
        calcWaitingForSecondOperand = true;
    }
}

function factorialCalc() {
    const inputValue = parseInt(calcDisplayValue);
    if (inputValue < 0) return;
    let result = 1;
    for (let i = 1; i <= inputValue; i++) {
        result *= i;
    }
    calcDisplayValue = String(result);
    refreshDisplay();
}

function squareRootCalc() {
    const inputValue = parseFloat(calcDisplayValue);
    calcDisplayValue = String(Math.sqrt(inputValue));
    refreshDisplay();
}

function exponentiationCalc() {
    const base = parseFloat(calcDisplayValue);
    const exponent = parseFloat(prompt('Enter exponent:', '2'));
    if (isNaN(exponent)) return;
    calcDisplayValue = String(Math.pow(base, exponent));
    refreshDisplay();
}

function memoryRecallFunc() {
    calcDisplayValue = String(calcMemory);
    refreshDisplay();
}

function memoryClearFunc() {
    calcMemory = 0;
}

function memoryAddFunc() {
    calcMemory += parseFloat(calcDisplayValue);
}

function memorySubtractFunc() {
    calcMemory -= parseFloat(calcDisplayValue);
}

function reciprocalCalc() {
    const inputValue = parseFloat(calcDisplayValue);
    if (inputValue === 0) {
        calcDisplayValue = 'Infinity';
    } else {
        calcDisplayValue = String(1 / inputValue);
    }
    refreshDisplay();
}

function deleteLastCharacter() {
    if (calcDisplayValue.length > 1) {
        calcDisplayValue = calcDisplayValue.slice(0, -1);
    } else {
        calcDisplayValue = '0';
    }
    refreshDisplay();
}

window.numPressed = numPressed;
window.decimalInput = decimalInput;
window.resetCalc = resetCalc;
window.changeSign = changeSign;
window.operatorHandler = operatorHandler;
window.calcResult = calcResult;
window.factorialCalc = factorialCalc;
window.squareRootCalc = squareRootCalc;
window.exponentiationCalc = exponentiationCalc;
window.memoryRecallFunc = memoryRecallFunc;
window.memoryClearFunc = memoryClearFunc;
window.memoryAddFunc = memoryAddFunc;
window.memorySubtractFunc = memorySubtractFunc;
window.reciprocalCalc = reciprocalCalc;
window.deleteLastCharacter = deleteLastCharacter;
