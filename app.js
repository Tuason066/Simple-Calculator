const numBtn = document.querySelectorAll('button[data-num]');
const operatorBtn = document.querySelectorAll('button[data-operator]');
const clearBtn = document.querySelector('button[data-clear');
const equalBtn = document.querySelector('button[data-equal');

const recentlyDisplay = document.querySelector('.recently');
const currentlyDisplay = document.querySelector('.currently');


// ======= NUMBERS BUTTON ==========
let recentNumbers = '';
let currentNumbers = '';
numBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const num = btn.textContent;
        currentNumbers += num;
        currentlyDisplay.textContent = currentNumbers;
    });
});

// ======= OPERATORS BUTTON ==========
operatorBtn.forEach(btn => {
    btn.addEventListener('click', () => {


        const operator = btn.dataset.id;

        if(!recentlyDisplay.textContent) {
            if(!currentNumbers){
                return false;
            } else {
                recentNumbers = `${currentNumbers}${operator}`
                recentlyDisplay.textContent = recentNumbers;
                currentNumbers = '';
                currentlyDisplay.textContent = currentNumbers;
            };
            
        } else {
            recentNumbers = recentlyDisplay.textContent;
            const recentOperator = recentNumbers.slice(-1);
            const recentNum = parseFloat(recentNumbers.slice(0, recentNumbers.length - 1));
            const currentNum = parseFloat(currentNumbers);

            let calculation = '';
            switch(recentOperator) {
                case ('+'):
                    calculation = recentNum + currentNum;
                    break;
                case ('-'):
                    calculation = recentNum - currentNum;
                    break;
                case ('*'):
                    calculation = recentNum * currentNum;
                    break;
                case ('/'):
                    calculation = recentNum / currentNum;
                    break;
            };

            recentNumbers = `${calculation}${operator}`;
            recentlyDisplay.textContent = recentNumbers;
            currentNumbers = '';
            currentlyDisplay.textContent = currentNumbers;
        };
    });
});


// ======= EQUAL BUTTON ==========
equalBtn.addEventListener('click', () => {

    let recentNumbers = recentlyDisplay.textContent;

    if(!recentNumbers) {
        currentlyDisplay.textContent = currentNumbers;
    } else {

        const recentOperator = recentNumbers.slice(-1);
        const recentNum = parseFloat(recentNumbers.slice(0, recentNumbers.length - 1));
        const currentNum = parseFloat(currentNumbers);

        let calculation = '';
        let error = false;
        switch(recentOperator) {
            case ('+'):
                calculation = recentNum + currentNum;
                break;
            case ('-'):
                calculation = recentNum - currentNum;
                break;
            case ('*'):
                calculation = recentNum * currentNum;
                break;
            case ('/'):
                calculation = recentNum / currentNum;
                break;
            default:
                error = true;
        };

        if(error) {
            currentlyDisplay.textContent = recentNumbers;
            recentNumbers = '';
            recentlyDisplay.textContent = recentNumbers;
        } else {
            currentNumbers = calculation;
            currentlyDisplay.textContent = currentNumbers;
            recentNumbers = '';
            recentlyDisplay.textContent = recentNumbers;
        };
    };
});

// ======= CLEAR BUTTON ==========
clearBtn.addEventListener('click', () => {
    recentNumbers = '';
    recentlyDisplay.textContent = '';
    currentNumbers = '';
    currentlyDisplay.textContent = currentNumbers;
});