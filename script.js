// Create a variable to store the reference of the result text and buttons
const displayResult = document.querySelector("#result-text");
const digitBtn = document.querySelectorAll(".digit");
const allClearBtn = document.querySelector(".feature-btn.clear-btn");
const deleteBtn = document.querySelector(".feature-btn.delete-btn");
const operatorBtn = document.querySelectorAll(".operator-btn");
const equalBtn = document.querySelector("#equal-btn");


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
        })
    })
}

/*
 * Create a function to add event listeners to operator buttons
 * When an operator button clicked, it will stored in an input array
 * Then, the array will be displayed in the result text
*/
function displayOperator() {
    operatorBtn.forEach(operator => {
        operator.addEventListener('pointerdown', () => {
            userInput.push(operator.textContent);
            lastInput = userInput[userInput.length - 1];
            displayResult.textContent = userInput.join('');
            isEmpty();
            handleInput(lastInput);
        })
    })
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
        isEmpty();
        updateOperatorBtnStatus();
        updateEqualBtnStatus();
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
    return !isNaN(lastInput);
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
        displayTheResult(result);
        updateEqualBtnStatus();
    }
    else {
        firstNumber = '';
        secondNumber = '';
        operator = '';
        displayTheResult(result);
        updateOperatorBtnStatus();
        updateEqualBtnStatus();
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
            displayTheResult(result);
            updateEqualBtnStatus();
        }
        else {
            firstNumber = '';
            secondNumber = '';
            operator = '';
            displayTheResult(result);
            updateOperatorBtnStatus();
            updateEqualBtnStatus();
        }
    }
}


// Create a function to display the result
function displayTheResult(result) {
    displayResult.textContent = result;
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


/*
 * Create a function to handle the user input
 * Control firstNumber, secondNumber, and operator variable
 * If conditions are met, then operate function will be executed
*/
function handleInput(lastInput) {
    if (isDigit(lastInput)) {
        handleDigit(lastInput);
    }
    else {
        handleOperator(lastInput);
    }
}