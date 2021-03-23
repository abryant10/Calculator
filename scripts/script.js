const display = document.querySelector(".display");
const numberButton = document.querySelectorAll("[data-number]");
const pointButton = document.querySelector("[data-point]");
const operatorButton = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector("[data-equal]");
const clearButton = document.querySelector("[data-clear]");
let firstMathNumber = "";
let secondMathNumber = "";
let currentOperator = "";

let numberReel = [];

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b; 
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function doMath(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch(operator) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case 'x':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
    }
}

function appendNumber (number) {
    var i = (numberReel.length -1);
    if (display.innerHTML === '0') {
        display.textContent = number;
        numberReel.push(number);
    } else if (numberReel[i] == "+" || numberReel[i] == "-" || numberReel[i] == "x" || numberReel[i] == "/" || numberReel[i] == "%"){
        display.textContent = number;
        numberReel.push(number);
    }else if (numberReel[i] == "=") {
        display.textContent = number;
        currentOperator = "";
        numberReel.push(number);
    }else{
        display.textContent += number;
        numberReel.push(number);
    }
    console.log(numberReel);
}

function appendPoint () {
    if (display.textContent.includes(".")) return;
    display.textContent += ".";
    numberReel.push(".");
    console.log(numberReel);
}

function appendOperator (operator) {
    var i = (numberReel.length -1)
    if (currentOperator !== "") {
        if (numberReel[i] === "=" || numberReel[i] === operator) {
            firstMathNumber = display.textContent;
            currentOperator = operator;
            numberReel.push(operator);
        } else {
        secondMathNumber = display.textContent;
        display.textContent = doMath(currentOperator, firstMathNumber, secondMathNumber);
        currentOperator = operator;
        firstMathNumber = display.textContent;
        numberReel.push(operator);
        }
    }else {
    firstMathNumber = display.textContent;
    currentOperator = operator;
    numberReel.push(operator);
    }
}

function equalClicked () {
    var i = (numberReel.length -1)
    if (currentOperator = ""){
        console.log('hello1')
        return;
    }else {
    if (numberReel[i] === "=") {
        firstMathNumber = display.textContent;
        display.textContent = doMath(currentOperator, firstMathNumber, secondMathNumber);
        numberReel.push("=");
        console.log(numberReel);
        console.log('hello2');
    } else {
        secondMathNumber = display.textContent;
        display.textContent = doMath(currentOperator, firstMathNumber, secondMathNumber);
        numberReel.push("=");
        console.log(numberReel);
        console.log('hello3')
        }
    }
}

function clears () {

}

numberButton.forEach((button) => button.addEventListener("click", () => appendNumber(button.textContent)));
pointButton.addEventListener("click", appendPoint);
equalButton.addEventListener("click", equalClicked);
operatorButton.forEach((button) => button.addEventListener("click", () => appendOperator(button.textContent)));
clearButton.addEventListener("click", clears);



// // not working
// function equalClicked () {
//     //console.log(numberReel);
//     // if (numberReel[(numberReel.length -1)] == "=") {
//     //     firstMathNumber = secondMathNumber;
//     //     secondMathNumber = display.textContent;
//     //     display.textContent = doMath(currentOperator, firstMathNumber, secondMathNumber);
//     //     numberReel.push("=");
//     // } else {
//     display.textContent = doMath(currentOperator, firstMathNumber, secondMathNumber);
//     //numberReel.push("=");
//     currentOperator = "";
//     console.log(numberReel);
//     //}
// }