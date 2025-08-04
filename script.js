// Create a variable to store the reference of the result text and buttons
const displayResult = document.querySelector("#result-text");
const digitBtn = document.querySelectorAll(".digit");
const featureBtn = document.querySelectorAll(".feature-btn");
const operatorBtn = document.querySelectorAll(".operator-btn");
const equalBtn = document.querySelector("#equal-btn");


// Create a string variable to store the user input
let input = "";

/*
 * Create a function to add event listeners to digit buttons
 * When a digit button clicked, it will stored in a string variable
 * Then, the string variable will be displayed in the result text
*/
function displayDigit() {
    digitBtn.forEach(digit => {
     digit.addEventListener('pointerdown', () => {
            input += digit.textContent;
            displayResult.textContent = input;
        })
    })
}