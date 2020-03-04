function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const operatorsPriority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    }
    let numbers = [];
    let symbols = [];
    let openBracket = 0;
    let closeBracket = 0;
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '(') {
            openBracket++;
        }
        else if (expr[i] === ')') {
            closeBracket++;
        }
    }
    if (openBracket != closeBracket) {
        throw "ExpressionError: Brackets must be paired";
    }
    let exprAsArray = expr.replace(/\s/gm, '').replace(/\)/gm, ' )').replace(/\(/gm, '( ').replace(/\+/gm, ' + ').replace(/\-/gm, ' - ').replace(/\*/gm, ' * ').replace(/\//gm, ' / ').split(' ');
    function mathOperation(operator) {
        let result;
        if (operator === '+') {
            result = Number(numbers[numbers.length - 2]) + Number(numbers[numbers.length - 1]);
        }
        else if (operator === '-') {
            result = numbers[numbers.length - 2] - numbers[numbers.length - 1];
        }
        else if (operator === '*') {
            result = numbers[numbers.length - 2] * numbers[numbers.length - 1];
        }
        else if (operator === '/') {
            if (numbers[numbers.length - 1] === '0') {
                throw "TypeError: Division by zero.";
            }
            result = numbers[numbers.length - 2] / numbers[numbers.length - 1];
        }
        numbers.pop();
        numbers.pop();
        symbols.pop();
        return result;
    }
    for (let i = 0; i < exprAsArray.length; i++) {
        if (!isNaN(exprAsArray[i])) {
            numbers.push(exprAsArray[i]);
        }
        else if (operatorsPriority[exprAsArray[i]] > operatorsPriority[symbols[symbols.length - 1]]
            || !symbols.length
            || exprAsArray[i] === '('
            || symbols[symbols.length - 1] == '(' && exprAsArray[i] !== ')') {
            symbols.push(exprAsArray[i]);
        }
        else if (operatorsPriority[exprAsArray[i]] < operatorsPriority[symbols[symbols.length - 1]]
            || operatorsPriority[exprAsArray[i]] === operatorsPriority[symbols[symbols.length - 1]]) {
            numbers.push(mathOperation(symbols[symbols.length - 1]));
            if (operatorsPriority[exprAsArray[i]] === operatorsPriority[symbols[symbols.length - 1]]) {
                numbers.push(mathOperation(symbols[symbols.length - 1]));
                symbols.push(exprAsArray[i]);
            }
            else{
            symbols.push(exprAsArray[i]);
            }
        }
        else if (operatorsPriority[exprAsArray[i]] === operatorsPriority[symbols[symbols.length - 1]]) {
            numbers.push(mathOperation(symbols[symbols.length - 1]));
            symbols.push(exprAsArray[i]);
        }
        else if (exprAsArray[i] === ')') {
            while (symbols[symbols.length - 1] != '(') {
                numbers.push(mathOperation(symbols[symbols.length - 1]));
            }
            symbols.pop();
        }
    }
    while (symbols.length != 0) {
        numbers.push(mathOperation(symbols[symbols.length - 1]));
    }
    return numbers[0];
}

module.exports = {
    expressionCalculator
}