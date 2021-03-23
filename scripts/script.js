const display = document.querySelector(".display");
const numberButton = document.querySelectorAll("[data-number]");
const pointButton = document.querySelector("[data-point]");
const operatorButton = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector("[data-equal]");
const clearButton = document.querySelector("[data-clear]");
const percentButton = document.querySelector('[data-percent]');
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
    if (b === 0) {
        return "hmm... try again";
    } else {return a / b;
    }
}

function doMath(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
    }
}

function appendNumber (number) {
    var i = (numberReel.length -1);
    if (display.innerHTML === '0') {
        display.textContent = number;
        numberReel.push(number);
    } else if (numberReel[i] == "+" || numberReel[i] == "-" || numberReel[i] == "x" || numberReel[i] == "÷" || numberReel[i] == "%"){
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
}

function appendPoint () {
    if (display.textContent.includes(".")) return;
    display.textContent += ".";
    numberReel.push(".");
}

function appendOperator (operator) {
    var i = (numberReel.length -1)
    if (currentOperator !== "") {
        if (numberReel[i] === "=" || numberReel[i] === operator) {
            firstMathNumber = display.textContent;
            currentOperator = operator;
            numberReel.push(operator);
        } else if (currentOperator !== operator && (numberReel[i] == "+" || numberReel[i] == "-" || numberReel[i] == "x" || numberReel[i] == "÷" || numberReel[i] == "%")){
            currentOperator = operator;
            numberReel.push(currentOperator);
            return; 
        }else {
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
    if (!currentOperator){
        return;
    }else {
        if (numberReel[i] === "=") {
            firstMathNumber = display.textContent;
            display.textContent = doMath(currentOperator, firstMathNumber, secondMathNumber);
            numberReel.push("=");
        } else {
            secondMathNumber = display.textContent;
            display.textContent = doMath(currentOperator, firstMathNumber, secondMathNumber);
            numberReel.push("=");
        }
    }
}

function percentClicked () {
    if (!currentOperator) {
        firstMathNumber = display.textContent;
        display.textContent = (firstMathNumber / 100);
        numberReel.push(display.textContent);
        //numberReel.push('%')
    }else if (currentOperator === "x" || currentOperator === "÷"){
        secondMathNumber = display.textContent;
        display.textContent = ((firstMathNumber * secondMathNumber)/ 100);
        //numberReel.push("%");
    }
}

function clears () {
firstMathNumber = "";
secondMathNumber = "";
currentOperator = "";
numberReel = [];
display.textContent = "0";
}

numberButton.forEach((button) => button.addEventListener("click", () => appendNumber(button.textContent)));
pointButton.addEventListener("click", appendPoint);
equalButton.addEventListener("click", equalClicked);
operatorButton.forEach((button) => button.addEventListener("click", () => appendOperator(button.textContent)));
clearButton.addEventListener("click", clears);
percentButton.addEventListener("click", percentClicked);



// partyBtn.onclick = function(){
//     if (firstOperandSpan.textContent != '' && operatorSpan.textContent != '' && secondOperandSpan.textContent != ''){
//         if (operatorSpan.textContent == '+' || operatorSpan.textContent == '-'){
//         let alc  = parseFloat(firstOperandSpan.textContent) * parseFloat(secondOperandSpan.textContent);
//         secondOperandSpan.textContent = `${alc / 100}`;
//         eqlBtn.click();
//     } else {