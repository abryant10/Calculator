const display = document.querySelector(".display");
const numberButton = document.querySelectorAll("[data-number]");
const pointButton = document.querySelector("[data-point]");
const operatorButton = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector("[data-equal]");
const clearButton = document.querySelector("[data-clear]");
const percentButton = document.querySelector('[data-percent]');
const plusNegative = document.querySelector('[data-plusNegative]');
let firstMathNumber = "";
let secondMathNumber = "";
let currentOperator = "";
let equalWasLast = false; // this variable fixes the issue of an operator doing math 
                          // prematurly when using a decimal after doing other math first.


let numberReel = []; // this array keeps a chronological log of calculator input to let 
                     // the operators and equal sign act diffently depending 
                     // what what the last thing to happen was.

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
            return roundResult(add(a, b));
        case '-':
            return roundResult(subtract(a, b));
        case 'x':
            return roundResult(multiply(a, b));
        case '÷':
            return roundResult(divide(a, b));
    }
}

function roundResult(number) {
    return Math.round(number * 1000000) / 1000000;
}
  
function appendNumber (number) {
    var i = (numberReel.length -1);
    if (display.innerHTML == '0' 
        || numberReel[i] == "+" 
        || numberReel[i] == "-" 
        || numberReel[i] == "x" 
        || numberReel[i] == "÷" 
        || numberReel[i] == "%"){
            display.textContent = number;
            numberReel.push(number);
    }else if (numberReel[i] == "=") { //for new math
        display.textContent = number;
        currentOperator = "";
        numberReel.push(number);
    }else{
        display.textContent += number; //for multi-digit numbers
        numberReel.push(number);
    }
}

function appendPoint () {
    var i = (numberReel.length -1);
    if (display.textContent.includes(".")) {
        if (numberReel[i] == "+" 
            || numberReel[i] == "-" 
            || numberReel[i] == "x" 
            || numberReel[i] == "÷" 
            || numberReel[i] == "%" 
            || numberReel[i] == "=") {
                display.textContent = "0.";
                numberReel.push("0.")
        } else {
            return;
        }
    }
    if (numberReel[i] == "+" 
        || numberReel[i] == "-" 
        || numberReel[i] == "x" 
        || numberReel[i] == "÷" 
        || numberReel[i] == "%" 
        || numberReel[i] == "=") {
            display.textContent = "0.";
            numberReel.push("0.")
    } else {
        display.textContent += ".";
        numberReel.push(".");
    }
}

function appendOperator (operator) {
    var i = (numberReel.length -1)
    if (currentOperator !== "") {
        if (numberReel[i] == "=" //allows you to do math on the result of the last equation 
            || numberReel[i] == operator 
            || numberReel[i] == "%" 
            || equalWasLast == true) {
                firstMathNumber = display.textContent;
                currentOperator = operator;
                equalWasLast = false;
                numberReel.push(operator);
        } else if (currentOperator !== operator //allows you to switch operators without clearing
            && (numberReel[i] == "+"            // between the first and second number
                || numberReel[i] == "-" 
                || numberReel[i] == "x" 
                || numberReel[i] == "÷" 
                || numberReel[i] == "%")){
                    currentOperator = operator;
                    numberReel.push(currentOperator);
                    return; 
        } else { // allows you to do math without the equal sign 5+5+5=15
            secondMathNumber = display.textContent;
            display.textContent = doMath(currentOperator, firstMathNumber, secondMathNumber);
            currentOperator = operator;
            firstMathNumber = display.textContent;
            numberReel.push(operator);
        }
    } else { //for 'normal' math situations
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
        if (numberReel[i] === "=") { //hitting equal twice does the same math again to the result
            firstMathNumber = display.textContent;
            display.textContent = doMath(currentOperator, firstMathNumber, secondMathNumber);
            numberReel.push("=");
        } else { // normal equal sign function
            secondMathNumber = display.textContent;
            display.textContent = doMath(currentOperator, firstMathNumber, secondMathNumber);
            equalWasLast = true;
            numberReel.push("=");
        }
    }
}

function percentClicked () {
    if (!currentOperator) {
        firstMathNumber = display.textContent;
        display.textContent = (firstMathNumber / 100);
        numberReel.push(display.textContent);
        numberReel.push("%")
    }else if (currentOperator === "x" || currentOperator === "÷"){
        secondMathNumber = display.textContent;
        display.textContent = ((firstMathNumber * secondMathNumber)/ 100);
        numberReel.push(display.textContent);
        numberReel.push("%");
    }else if (currentOperator === "+") {
        secondMathNumber = display.textContent;
        display.textContent = (Number(firstMathNumber) + Number((firstMathNumber * (secondMathNumber/100))))
        numberReel.push(display.textContent);
        numberReel.push("%");
    } else if (currentOperator === "-") {
        secondMathNumber = display.textContent;
        display.textContent = (firstMathNumber - (firstMathNumber * (secondMathNumber/100)))
        numberReel.push(display.textContent);
        numberReel.push('%')
    }
}

function clears () {
    firstMathNumber = "";
    secondMathNumber = "";
    currentOperator = "";
    numberReel = [];
    display.textContent = "0";
}
 
function keyMaping (e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === ".") appendPoint();
    if (e.key === "Escape") clears ();
    if (e.key === "=" || e.key == "Enter") equalClicked();
    if (e.key === "%") percentClicked();
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") 
        appendOperator(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === "/") return "÷";
    if (keyboardOperator === "*") return "x";
    if (keyboardOperator === "-") return "-";
    if (keyboardOperator === "+") return "+";
}

function doPlusNegative () {
    display.textContent  = (-(display.textContent));
}

numberButton.forEach((button) => button.addEventListener("click", () => appendNumber(button.textContent)));
pointButton.addEventListener("click", appendPoint);
equalButton.addEventListener("click", equalClicked);
operatorButton.forEach((button) => button.addEventListener("click", () => appendOperator(button.textContent)));
clearButton.addEventListener("click", clears);
percentButton.addEventListener("click", percentClicked);
plusNegative.addEventListener("click", doPlusNegative);
window.addEventListener("keydown", keyMaping);
window.addEventListener("click", console.log(numberReel));
