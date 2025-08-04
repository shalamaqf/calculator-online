// Create a variable to store the reference of the result text and buttons
const displayResult = document.querySelector("#result-text");
const digitBtn = document.querySelectorAll(".digit");
const featureBtn = document.querySelectorAll(".feature-btn");
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
            userInput.push(digit.textContent)
            displayResult.textContent = userInput.join('');
        })
    })
}