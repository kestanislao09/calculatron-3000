// Applies the selected operation, then...
// Rounds off the number or converts to exponential form based on number size and length.
function operate(a, opr, b) {
    let operatedNum
    switch(opr){
        default:
            console.log('something went wrong..');
            break;
        case('+'):
             operatedNum = a + b;
            break;
        case('-'):
             operatedNum = a - b;
            break;
        case('x'):
             operatedNum = a * b;
            break;
        case('/'):
            if (b === 0) {
                return 'error'  // Cannot divide by zero!!
            }
             operatedNum = a / b;
    };

    let operatedArr = operatedNum.toString().split('');
    
    if (operatedNum > 9999999 || operatedNum < -999999) {
        operatedNum = operatedNum.toExponential(6)
    } else if (operatedNum <= 9999999 && operatedNum >= -9999999 && operatedArr.length > 10) {
        let findDecimal = operatedArr.findIndex((decimal) => decimal === '.');
        let decimalIndex = (10 - findDecimal)
        operatedNum = Math.round(operatedNum * (10 ** decimalIndex)) / (10 ** decimalIndex)
    };

    return operatedNum;
};

// QuerySelectors 
const numButtons = document.querySelectorAll('.num');
const oprButtons = document.querySelectorAll('.opr');
const clButton = document.querySelector('.clear');
const decButton = document.querySelector('.dec');
const bkspButton = document.querySelector('.bksp');
const viewPort = document.querySelector('#viewport');

// Numbers are stored as arrays for the most part(more on that down there)
// to allow digits to be entered in reverse order, while allowing trimming and editing of the number.
let dispNum = [];
let previousNum = [];
let operator = '';
let reUse = 0;
let deciToggle = 0;


function convertFromArray(arr) {
    return Number(arr.join(''))
}


function clearDisplay() {
    dispNum = [];
    viewPort.textContent = '';
    reUse = 0;
    deciToggle = 0;
}

oprButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let buttonContent = e.target.textContent;
        
        // Continues to display the current number if '=' is pressed after the first...
        // number is inputted.
        if (buttonContent === '=' && operator === '') {
            viewPort.textContent = convertFromArray(dispNum);
        } else if (operator === '') { 
            // Normal function of operator buttons after first number is inputted.
            operator = buttonContent;
            previousNum = dispNum;
            clearDisplay();
        } else if (operator !== '') {
            // This 'else if' does a multitude of things... including:
            //      - Normal operation of the equals sign after second number is inputted
            //      - Normal operation of operators if pressed after a second number is inputted
            //      - Allowing for repeat operations to be performed by repeatedly pressing '='
            //      - Catches syntax errors such as pressing another operator before entering 
            //        a second number.

            //Variables for the current and previous number to be used in the operate function
            let previous // This would be our first number
            let current  // This would be our second number
            
            //Sets 'previous' according to whether previousNum is an array or an exponential form number
            Array.isArray(previousNum) ? previous = convertFromArray(previousNum) : previous = previousNum;
            
            // Returns an Error if you press '=' before inputting a second number..
            // otherwise sets 'current' according to what is inputted after the operator
            if (isNaN(convertFromArray(dispNum))) {
                viewPort.textContent = 'error'
                reUse = 1
                return;
            } else {
                current = convertFromArray(dispNum);
            };
            
            // Calls on the operate function then updates **only** the viewport
            // This saves dispNum to be used for repeating the previous operation(pressing '=' multiple times)
            let operatedNum = operate(previous, operator, current);
            if (operatedNum === 'error') {
                viewPort.textContent = operatedNum
                reUse = 1
                return;
            } else {
                viewPort.textContent = operatedNum;
                
                if (buttonContent === '=') { 
                    // Allows using last operation by pressing '=' repeatedly
                    previousNum = operatedNum;
                    reUse = 1;
                }  else if (reUse === 1) { 
                    // Allows the calculator to function normally after pressing '='
                    operator = buttonContent;
                    clearDisplay();
                    reUse = 0;
                } else { 
                    // Normal function for operator after first number is inputted.
                    operator = buttonContent;
                    dispNum = [];
                    previousNum = operatedNum;
                    deciToggle = 0;
                };
            };  
        };
    });
});

numButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let buttonContent = e.target.textContent;
        
        if (reUse === 1) {   // Resets display and operator after repeating operations have been used..
            clearDisplay();  // or if the user triggers an error
            operator = '';
        }
        
        // Pushes each digit into an array that stores the display number..
        // then updates the viewport with the current display number. 
        if (dispNum.length > 11) {
            return;
        } else {
            dispNum.push(buttonContent);
            viewPort.textContent = dispNum.join('');
        }
    });
});

// Allows the user to add in one decimal point to the display number,
// while adding a leading zero if decimal is pressed before any numbers.
decButton.addEventListener('click', (e) => {
    let buttonContent = e.target.textContent;
    if (reUse == 1) {
        clearDisplay();
        operator = '';
        
    };
    
    if (deciToggle === 1 || dispNum.length > 11) {
        return;
    } else if (dispNum == []) {
        dispNum.push(0);
        dispNum.push(buttonContent);
        viewPort.textContent = dispNum.join('');
        deciToggle = 1;
    } else {
        dispNum.push(buttonContent);
        viewPort.textContent = dispNum.join('');
        deciToggle = 1;
    };
});

// Completely resets the calculator.
clButton.addEventListener('click', (e) => {
    clearDisplay();
    operator = '';
    previousNum = [];
});

// Its a backspace button!
bkspButton.addEventListener('click', (e) => {
    if (dispNum == []) {
        return;
    } else {
        dispNum.pop();
        viewPort.textContent = dispNum.join('');
    }
})