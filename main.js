let result = document.getElementById('result');
const keys = document.querySelector('.keys');
let hidden = document.querySelectorAll('.container .keys .hidden');
let more = document.querySelector('.more-btn button');

let isInverse = false;
let angleMode = 'deg'; // 'deg' or 'rad'

let hiddenButtons = function hiddenButtons() {
    for (let i = 0; i < hidden.length; i++) {
        hidden[i].style.display = 'none';
    }
}
hiddenButtons();

more.onclick = () => {
    const isHidden = hidden[0].style.display === 'none';
    more.innerHTML = isHidden ? 'Less' : 'More';
    for (const btn of hidden) {
        btn.style.display = isHidden ? 'inline-block' : 'none';
    }
}

function factorial(n) {
    if (n < 0) return NaN; // Factorial is not defined for negative numbers
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function calculate() {
    try {
        let expression = result.innerHTML;

        // Replace special characters with their JS equivalents
        expression = expression.replace(/π/g, 'Math.PI');
        expression = expression.replace(/e/g, 'Math.E');
        expression = expression.replace(/\^/g, '**');
        expression = expression.replace(/√\(/g, 'Math.sqrt(');
        expression = expression.replace(/log\(/g, 'Math.log10(');
        expression = expression.replace(/ln\(/g, 'Math.log(');

        // Handle trigonometry with angle mode
        const trigFunctions = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'];
        trigFunctions.forEach(func => {
            const regex = new RegExp(`${func}\\(`, 'g');
            if (angleMode === 'deg' && !func.startsWith('a')) { // sin, cos, tan
                expression = expression.replace(regex, `Math.${func}((Math.PI/180)*`);
            } else if (angleMode === 'deg' && func.startsWith('a')) { // asin, acos, atan
                expression = expression.replace(regex, `(180/Math.PI)*Math.${func}(`);
            } else { // rad mode
                expression = expression.replace(regex, `Math.${func}(`);
            }
        });

        // Handle factorial
        expression = expression.replace(/(\d+)!/g, (match, n) => `factorial(${n})`);

        // Handle percentage
        expression = expression.replace(/(\d+(\.\d+)?)%/g, (match, n) => `(${n}/100)`);

        // Using Function constructor for safer evaluation than eval()
        const calculatedResult = new Function('factorial', `return ${expression}`)(factorial);

        if (isNaN(calculatedResult) || !isFinite(calculatedResult)) {
            result.innerHTML = "Error";
        } else {
            result.innerHTML = calculatedResult;
        }
    } catch (error) {
        result.innerHTML = "Error";
        console.error("Calculation Error:", error);
    }
}

function toggleInverse() {
    isInverse = !isInverse;
    document.getElementById('sin').innerHTML = isInverse ? 'asin' : 'sin';
    document.getElementById('cos').innerHTML = isInverse ? 'acos' : 'cos';
    document.getElementById('tan').innerHTML = isInverse ? 'atan' : 'tan';
    document.getElementById('log').innerHTML = isInverse ? '10^' : 'log';
    document.getElementById('ln').innerHTML = isInverse ? 'e^' : 'ln';
    document.getElementById('square').innerHTML = isInverse ? 'x²' : '√';
    document.getElementById('power').innerHTML = isInverse ? 'y√x' : '^';

}

keys.addEventListener('click', e => {
    if (e.target.tagName !== 'BUTTON') return;

    const button = e.target;
    const id = button.id;
    const value = button.innerText;

    if (result.innerHTML === "Error") {
        result.innerHTML = "";
    }

    switch (id) {
        case 'clear':
            result.innerHTML = '';
            break;
        case 'del':
            result.innerHTML = result.innerHTML.slice(0, -1);
            break;
        case 'equal':
            calculate();
            break;
        case 'inverse':
            toggleInverse();
            break;
        case 'rad':
        case 'deg':
            angleMode = id;
            document.getElementById('rad').style.color = (id === 'rad') ? 'rgb(232, 103, 44)' : '';
            document.getElementById('deg').style.color = (id === 'deg') ? 'rgb(232, 103, 44)' : '';
            break;
        case 'sin':
        case 'cos':
        case 'tan':
        case 'log':
        case 'ln':
            result.innerHTML += value + '(';
            break;
        case 'square':
            result.innerHTML += isInverse ? '^2' : '√(';
            break;
        case 'power':
            result.innerHTML += isInverse ? '**(1/' : '^';
            break;
        default:
            result.innerHTML += value;
            break;
    }
});