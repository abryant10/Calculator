function add(a, b) {
    let c = a + b;
    return c;
}

function subtract(a, b) {
    let c = a - b;
    return c;
}

function multiply(a, b) {
    let c = a * b;
    return c;
}

function divide(a, b) {
    let c = a / b;
    return c;
}

function math(operator, numberOne, numberTwo) {
    switch(operator) {
        case 'add':
            add(numberOne, numberTwo);
            break;
        case 'subtract':
            subtract(numberOne, numberTwo);
            break;
        case 'multiply':
            multiply(numberOne, numberTwo);
            break;
        case 'divide':
            divide(numberOne, numberTwo);
            break;
    }
}


