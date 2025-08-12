// Create a variable to store the reference of the result text and buttons
const displayResult = document.querySelector("#result-text");
const digitBtn = document.querySelectorAll(".digit");
const allClearBtn = document.querySelector(".feature-btn.clear-btn");
const deleteBtn = document.querySelector(".feature-btn.delete-btn");
const operatorBtn = document.querySelectorAll(".operator-btn");
const equalBtn = document.querySelector("#equal-btn");
const dotBtn = document.querySelector("#dot-btn");


// Create an array to store the user input
let userInput = [];


/*
 * Create a function to add event listeners to digit buttons
 * When a digit button clicked, it will stored in an input array
 * Then, the array will be displayed in the result text
*/
function displayDigit() {
    digitBtn.forEach(digit => {
        digit.addEventListener('pointerdown', () => {
            userInput.push(digit.textContent);
            lastInput = userInput[userInput.length - 1];
            displayResult.textContent = userInput.join('');
            isEmpty();
            handleInput(lastInput);
            updateDotBtnStatus();
        })
    })
}

/*
 * Create a function to add event listeners to operator buttons
 * When an operator button clicked, it will stored in an input array
 * Then, the array will be displayed in the result text
*/
function displayOperator() {
    updateOperatorBtnStatus();

    operatorBtn.forEach(operator => {
        operator.addEventListener('pointerdown', () => {
            // Prevent operator input if firstNumber is still empty
            if (firstNumber.trim() === '') {
                return;
            }

            // Prevent repeated operator inputs
            if (userInput.length > 0) {
                const lastChar = userInput[userInput.length - 1];
                if (['+', '-', '*', '/'].includes(lastChar)) {
                    userInput[userInput.length - 1] = operator.textContent;
                    displayResult.textContent = userInput.join('');
                    handleInput(operator.textContent);
                    updateOperatorBtnStatus();
                    updateDotBtnStatus();
                    return;
                }
            }

            userInput.push(operator.textContent);
            lastInput = userInput[userInput.length - 1];
            displayResult.textContent = userInput.join('');
            isEmpty();
            handleInput(lastInput);

            updateOperatorBtnStatus();
            updateDotBtnStatus();
        });
    });
}



/*
 * Create a function to add event listeners to the equal button
 * When the equal button clicked, it will call the operate function
 * Then, display the result
*/
function equalButton() {
    equalBtn.addEventListener('pointerdown', () => {
        resetByEqualButton();
    })
}


// Create a function to enable/disabled operator buttons based on firstNumber value
function updateOperatorBtnStatus() {
      if (firstNumber.trim() === '') {
        operatorBtn.forEach(operator => {
            operator.disabled = true;
        })
    }
    else {
        operatorBtn.forEach(operator => {
            operator.disabled = false;
        })
    }
}


// Create a function to enabled/disabled the equal button
function updateEqualBtnStatus() {
    equalBtn.disabled = !isReadyToOperate(firstNumber, secondNumber, operator);
}


/*
 * Create a function to add event listeners to feature 'AC' button
 * When it clicked, it will clear the array and display text
*/
function allClear() {
    allClearBtn.addEventListener('pointerdown', () => {
        userInput.length = 0;
        firstNumber = '';
        secondNumber = '';
        operator = '';
        displayResult.textContent = userInput.join('');
        enableButtons();
        isEmpty();
        updateOperatorBtnStatus();
        updateEqualBtnStatus();
        updateDotBtnStatus();
    })
}


/*
 * Create a function to add event listeners to feature 'CE' button
 * When it clicked, it will clear the last character in display text
*/
function clearEntry() {
    deleteBtn.addEventListener('pointerdown', () => {
        userInput.pop();
        displayResult.textContent = userInput.join('');
        isEmpty();
        updateVariablesFromUserInput();
        updateOperatorBtnStatus();
        updateEqualBtnStatus();
        updateDotBtnStatus();
    })
}


// Create a function to update the variables by parsing the user input
function updateVariablesFromUserInput() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    let operatorFound = false;

    for (let char of userInput) {
        if (!operatorFound && ['+', '-', '*', '/'].includes(char)) {
            operator = char;
            operatorFound = true;
        } else if (!operatorFound) {
            firstNumber += char;
        } else {
            secondNumber += char;
        }
    }
}



/*
 * Create a function to check if the user input empty or not
 * Disabled or enabled buttons based on the condition
*/
function isEmpty() {
    if (userInput.length == 0){
        allClearBtn.disabled = true;
        deleteBtn.disabled = true;
    }
    else {
        allClearBtn.disabled = false;
        deleteBtn.disabled = false;
    }
}


// Create three variables to store the value of two numbers and an operator
let firstNumber = '';
let secondNumber = '';
let operator = '';


// Create a variable to store the last character of userInput
let lastInput = '';


/*
 * Create a boolean variable as a flag 
 * To check if operate function triggered by an operator or the equal button
*/
let triggeredByOperator = false;


// Create a function to check the character is digit or operator
function isDigit(lastInput) {
    return '0123456789'.includes(lastInput);
}


// Create a function to check the character is a dot or not
function isDot(lastInput) {
    return lastInput === '.';
}


// function to handle a digit input
function handleDigit(lastInput) {
    if (operator == '') {
        firstNumber += lastInput;
        updateOperatorBtnStatus();
    }
    else {
        secondNumber += lastInput;
    }

    updateEqualBtnStatus();
    updateDotBtnStatus();
}


// function to handle an operator input
function handleOperator(lastInput) {
    if ( firstNumber != '' && secondNumber == '') {
        operator = lastInput;
    }    

    if (secondNumber != '') {
        triggeredByOperator = true;
        
        if (isReadyToOperate(firstNumber, secondNumber, operator)) {
            resetByOperator(lastInput);
        }
    }

    updateEqualBtnStatus();
    updateDotBtnStatus();

}


/*
 * Create a function to reset firstNumber, secondNumber, and operator
 * if the operate function triggered by an operator
*/
function resetByOperator(newOperator) {
    const result = operate(firstNumber, secondNumber, operator).toString();
    if (result !== "ERROR") {
        firstNumber = result;
        secondNumber = '';
        operator = newOperator;
        userInput = [result, newOperator];
        displayResult.textContent = userInput.join('')
        updateEqualBtnStatus();
        updateDotBtnStatus();
    }
    else {
        firstNumber = '';
        secondNumber = '';
        operator = '';
        displayResult.textContent = result;
        userInput = [];
        disableButtons();
        updateOperatorBtnStatus();
        updateEqualBtnStatus();
        updateDotBtnStatus();
    }
}


/*
 * Create a function to reset firstNumber, secondNumber, and operator
 * if the operate function triggered by the equal button
*/
function resetByEqualButton() {
    triggeredByOperator = false;
    if (isReadyToOperate(firstNumber, secondNumber, operator)) {
        const result = operate(firstNumber, secondNumber, operator).toString();
        if (result !== "ERROR"){
            firstNumber = result;
            secondNumber = '';
            operator = '';
            userInput = [result];
            displayResult.textContent = userInput.join('')
            updateEqualBtnStatus();
            updateDotBtnStatus();
        }
        else {
            firstNumber = '';
            secondNumber = '';
            operator = '';
            displayResult.textContent = result;
            userInput = [];
            disableButtons();
            updateOperatorBtnStatus();
            updateEqualBtnStatus();
            updateDotBtnStatus();
        }
    }
}


/* 
 * Create a function to check if 
 * firstNumber, secondNumber, and an operator ready to be operated 
*/
function isReadyToOperate(firstNumber, secondNumber, operator) {
    if ((firstNumber != '') && (secondNumber != '') && (operator != '')) {
        return true;
    }

    return false;

}


// Create a function to calculate two numbers by one operator
function operate(firstNum, secondNum, operator) {
    switch (operator) {
        case '+':
            return Number(firstNum) + Number(secondNum);
        case '-':
            return Number(firstNum) - Number(secondNum);
        case '*':
            return Number(firstNum) * Number(secondNum);
        case '/':
            if (secondNum == 0) {
                return "ERROR";                 // if divided by 0
            }
            return Number(firstNum) /  Number(secondNum);
    }
}


// Create a function to disable buttons except allClear button
function disableButtons() {
    operatorBtn.forEach(operator => {
        operator.disabled = true;
    })

    digitBtn.forEach(digit => {
        digit.disabled = true;
    })

    deleteBtn.disabled = true;

    equalBtn.disabled = true;
}


// Create a function to enable buttons
function enableButtons() {
    operatorBtn.forEach(operator => {
        operator.disabled = false;
    })

    digitBtn.forEach(digit => {
        digit.disabled = false;
    })

    deleteBtn.disabled = false;

    equalBtn.disabled = false;
}


/*
 * Create a function to handle the user input
 * Control firstNumber, secondNumber, and operator variable
 * If conditions are met, then operate function will be executed
*/
function handleInput(lastInput) {
    if (isDigit(lastInput)) {
        handleDigit(lastInput);
    }
    else if (isDot(lastInput)) {
        handleDecimal(lastInput);
    }
    else {
        handleOperator(lastInput);
    }
}


/*
 * Create a function to check a decimal in a number
 * Enable and disable the dot button based on a condition
*/
function checkDecimal(firstNum, secondNum, operator) {
    if (operator == '') {
        if (firstNum.includes('.')) {
            dotBtn.disabled = true;
        }
        else {
            dotBtn.disabled = false;
        }
    }
    else {
        if (secondNum.includes('.')) {
            dotBtn.disabled = true;
        }
        else {
            dotBtn.disabled = false;
        }
    }
}


// Create a function to update the status of the dot button
function updateDotBtnStatus() {
    checkDecimal(firstNumber, secondNumber, operator);
}


/*
 * Create a function to handle a decimal input
 * Validate to check which number is not decimal yet
 * Enable and disable dot button to avoid double decimal or more in a number
 * Display the decimal number
*/
function handleDecimal(lastInput) {
    if (operator == '') {
        firstNumber += lastInput;
    }
    else {
        secondNumber += lastInput;
    }

    updateEqualBtnStatus();
    updateDotBtnStatus();
}


// Test the calculator
displayDigit();
displayOperator();
allClear();
clearEntry();
equalButton();

updateOperatorBtnStatus();
updateEqualBtnStatus();
updateDotBtnStatus();