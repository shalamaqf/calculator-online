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
            displayResult.textContent = userInput.join('');
            isEmpty();
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
            displayResult.textContent = userInput.join('');
            isEmpty();
        })
    })
}


/*
 * Create a function to add event listeners to feature 'AC' button
 * When it clicked, it will clear the array and display text
*/
function allClear() {
    allClearBtn.addEventListener('pointerdown', () => {
        userInput.length = 0;
        displayResult.textContent = userInput.join('');
        isEmpty();
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
    })
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
let firstNumber = null;
let secondNumber = null;
let operator = null;


// Create a function to calculate two numbers by one operator
function calculate(firstNum, secondNum, operator) {
    switch (operator) {
        case '+':
            return Number(firstNum) + Number(secondNum);
        case '-':
            return Number(firstNum) - Number(secondNum);
        case '*':
            return Number(firstNum) * Number(secondNum);
        case '/':
            return Number(firstNum) /  Number(secondNum);
    }
}