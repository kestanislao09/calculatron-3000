function add(a, b) {
    return a + b;
};

function sub(a, b) {
    return a - b;
};

function mul(a, b) {
    return a * b;
};

function div(a, b) {
    return a / b;
};

function operate(a, opr, b) {
    switch(opr){
        default:
            console.log('something went wrong..');
            break;
        case('+'):
            return add(a, b);
            break;
        case('-'):
            return sub(a, b);
            break;
        case('x'):
            return mul(a, b)
            break;
        case('/'):
            return div(a, b);
    };

}

//querySelectors 
const numButtons = document.querySelectorAll('.num');
const oprButtons = document.querySelectorAll('.opr');
const viewPort = document.querySelector('#viewport');
const clButton = document.querySelector('.clear');

//Array to store current display number on the screen
let dispNum = [];
let prevNumber = [0];
let currentNum
let operator = '';
let reUse = 0;

function convertFromArray(arr) {
    return parseInt(arr.join(''))
}
let dispConverted = convertFromArray(dispNum);

function clearDisplay() {
    dispNum = [];
    viewPort.textContent = '';
    reUse = 0;
}

oprButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let buttonContent = e.target.textContent;
        if (buttonContent === '=' && operator === '') {
            viewPort.textContent = convertFromArray(dispNum);
        } else if (operator === '') {
            operator = buttonContent;
            previousNum = dispNum;
            clearDisplay();
        } else if (operator !== '') {
            let current
            let previous
            
            Array.isArray(previousNum) ? previous = parseInt(previousNum.join('')) : previous = previousNum;
            
            if (isNaN(convertFromArray(dispNum))) {
                viewPort.textContent = 'error'
                reUse = 1
                return;
            } else {
                current = convertFromArray(dispNum);
            };
            
            let operatedNum = operate(previous, operator, current);
            let operatedArr = operatedNum.toString().split('');
            if (operatedNum > 999999) {
                operatedNum = operatedNum.toExponential(4)
            } else if (operatedNum <= 999999 && operatedArr.length > 8) {
                console.log(operatedArr)
                operatedNum = operatedArr.splice(8, operatedArr.length-8).join('')
            }
            
            viewPort.textContent = operatedNum;
            
            if (buttonContent === '=') {
                previousNum = operatedNum;
                reUse = 1;
            }  else if (reUse === 1) {
                operator = buttonContent;
                clearDisplay();
                reUse = 0;
            } else {
                operator = buttonContent;
                dispNum = [];
                previousNum = operatedNum;
            };
        };
    });
});

numButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let buttonContent = e.target.textContent;
        if (reUse === 1) {
            clearDisplay();
            operator = '';
        }
        dispNum.push(buttonContent);
        viewPort.textContent = dispNum.join('');
    });
});

clButton.addEventListener('click', (e) => {
    clearDisplay();
    operator = '';
    prevNumber = [];
});