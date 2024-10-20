// Get the elements
const inputText = document.getElementById('inputtext');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let previousInput = '';
let operator = '';
let calculationInProgress = false;

// Play sound on button click
const buttonSound = new Audio('https://www.soundjay.com/button/beep-07.wav');

function playSound() {
    buttonSound.currentTime = 0;
    buttonSound.play();
}

// Update the display
function updateDisplay() {
    inputText.value = currentInput || '0';
}

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        playSound();
        const buttonText = button.textContent.trim();

        if (buttonText === 'C') {
            currentInput = '';
            previousInput = '';
            operator = '';
            calculationInProgress = false;
            updateDisplay();
        } else if (buttonText === 'DEL') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        } else if (buttonText === '=') {
            if (previousInput && currentInput) {
                const result = evaluate(previousInput, currentInput, operator);
                currentInput = result;
                previousInput = '';
                operator = '';
                updateDisplay();
            }
        } else if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/') {
            if (currentInput && !calculationInProgress) {
                previousInput = currentInput;
                currentInput = '';
                operator = buttonText;
                calculationInProgress = true;
            }
        } else if (buttonText === '.') {
            if (!currentInput.includes('.')) {
                currentInput += '.';
                updateDisplay();
            }
        } else {
            currentInput += buttonText;
            updateDisplay();
            calculationInProgress = false;
        }
    });
});

// Evaluate the expression
function evaluate(prev, curr, op) {
    prev = parseFloat(prev);
    curr = parseFloat(curr);

    switch (op) {
        case '+':
            return prev + curr;
        case '-':
            return prev - curr;
        case '*':
            return prev * curr;
        case '/':
            if (curr === 0) {
                return 'Error';
            }
            return prev / curr;
        default:
            return curr;
    }
}

// Keyboard support
document.addEventListener('keydown', function (e) {
    const key = e.key;

    if (key >= '0' && key <= '9') {
        currentInput += key;
        updateDisplay();
    } else if (key === 'Enter') {
        if (previousInput && currentInput) {
            const result = evaluate(previousInput, currentInput, operator);
            currentInput = result;
            previousInput = '';
            operator = '';
            updateDisplay();
        }
    } else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        if (currentInput && !calculationInProgress) {
            previousInput = currentInput;
            currentInput = '';
            operator = key;
            calculationInProgress = true;
        }
    }
});
