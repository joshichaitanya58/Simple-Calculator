let result = document.getElementById('result');
const keys = document.querySelector('.keys');
let hidden = document.querySelectorAll('.container .keys .hidden');
let more = document.querySelector('.more-btn button');

let isInverse = false;
let angleMode = 'deg'; // 'deg' or 'rad'

// Initially hide all scientific buttons
function hiddenButtons() {
    for (let i = 0; i < hidden.length; i++) {
        hidden[i].style.display = 'none';
    }
    keys.classList.add('basic-grid');
    keys.classList.remove('sci-grid');
}
hiddenButtons();

// Toggle More / Less scientific operations
more.onclick = () => {
    const isHidden = hidden[0].style.display === 'none';
    more.innerHTML = isHidden ? 'Less' : 'More';

    for (const btn of hidden) {
        btn.style.display = isHidden ? 'flex' : 'none';
    }

    if (isHidden) {
        keys.classList.remove('basic-grid');
        keys.classList.add('sci-grid');
    } else {
        keys.classList.remove('sci-grid');
        keys.classList.add('basic-grid');
    }
};

// Factorial calculation (supports 0! = 1 and positive integers)
function factorial(n) {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) {
        res *= i;
    }
    return res;
}

// Accurate Trigonometric helper functions for Degree & Radian modes
const trigScope = {
    factorial: factorial,
    sin: (x) => {
        const rad = angleMode === 'deg' ? (x * Math.PI) / 180 : x;
        const val = Math.sin(rad);
        return Math.abs(val) < 1e-15 ? 0 : val;
    },
    cos: (x) => {
        const rad = angleMode === 'deg' ? (x * Math.PI) / 180 : x;
        const val = Math.cos(rad);
        return Math.abs(val) < 1e-15 ? 0 : val;
    },
    tan: (x) => {
        if (angleMode === 'deg' && Math.abs(x % 180) === 90) return NaN;
        const rad = angleMode === 'deg' ? (x * Math.PI) / 180 : x;
        const val = Math.tan(rad);
        return Math.abs(val) < 1e-15 ? 0 : val;
    },
    asin: (x) => (angleMode === 'deg' ? (Math.asin(x) * 180) / Math.PI : Math.asin(x)),
    acos: (x) => (angleMode === 'deg' ? (Math.acos(x) * 180) / Math.PI : Math.acos(x)),
    atan: (x) => (angleMode === 'deg' ? (Math.atan(x) * 180) / Math.PI : Math.atan(x)),
    log: (x) => Math.log10(x),
    ln: (x) => Math.log(x),
    sqrt: (x) => Math.sqrt(x)
};

function calculate() {
    try {
        let expression = result.innerHTML.trim();
        if (!expression) return;

        // 1. Auto-close any unclosed parentheses so sin(30 or √(16 works directly
        const openCount = (expression.match(/\(/g) || []).length;
        const closeCount = (expression.match(/\)/g) || []).length;
        if (openCount > closeCount) {
            expression += ')'.repeat(openCount - closeCount);
        }

        // 2. Implicit multiplication support: e.g. 2π -> 2*π, 2(3) -> 2*(3), (2)(3) -> (2)*(3), 2sin(30) -> 2*sin(30)
        expression = expression.replace(/(\d|\)|π|e)(?=(π|e|√|sin|cos|tan|asin|acos|atan|log|ln|\())/g, '$1*');
        expression = expression.replace(/(\)|π|e)(?=\d)/g, '$1*');

        // 3. Handle factorials (including parenthesized expressions like (3+2)!)
        while (/(\d+|\([^()]+\))!/.test(expression)) {
            expression = expression.replace(/(\d+|\([^()]+\))!/g, 'scope.factorial($1)');
        }

        // 4. Handle percentage: e.g., 50% -> (50/100)
        expression = expression.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

        // 5. Replace √( with scope.sqrt( and standalone √number with scope.sqrt(number)
        expression = expression.replace(/√\(/g, 'scope.sqrt(');
        expression = expression.replace(/√(\d+(\.\d+)?)/g, 'scope.sqrt($1)');

        // 6. Replace trig & log functions safely using word boundaries (fixes asin/sin conflict)
        expression = expression.replace(/\b(asin|acos|atan|sin|cos|tan|log|ln)\(/g, 'scope.$1(');

        // 7. Replace constants π and standalone 'e' (without breaking scientific notation like 1e-5)
        expression = expression.replace(/π/g, 'Math.PI');
        expression = expression.replace(/(?<![\d.])e(?![+-]?\d)/g, 'Math.E');

        // 8. Replace power operator ^ with **
        expression = expression.replace(/\^/g, '**');

        // Evaluate expression safely
        const calculatedResult = new Function('scope', `return ${expression}`)(trigScope);

        if (typeof calculatedResult !== 'number' || isNaN(calculatedResult) || !isFinite(calculatedResult)) {
            result.innerHTML = 'Error';
        } else {
            // Clean floating point inaccuracies (like 0.1 + 0.2 = 0.3)
            const rounded = parseFloat(calculatedResult.toPrecision(12));
            result.innerHTML = String(rounded);
        }
    } catch (error) {
        result.innerHTML = 'Error';
        console.error('Calculation Error:', error);
    }
}

function toggleInverse() {
    isInverse = !isInverse;
    const invBtn = document.getElementById('inverse');
    invBtn.classList.toggle('active-toggle', isInverse);

    document.getElementById('sin').innerHTML = isInverse ? 'asin' : 'sin';
    document.getElementById('cos').innerHTML = isInverse ? 'acos' : 'cos';
    document.getElementById('tan').innerHTML = isInverse ? 'atan' : 'tan';
    document.getElementById('log').innerHTML = isInverse ? '10^' : 'log';
    document.getElementById('ln').innerHTML = isInverse ? 'e^' : 'ln';
    document.getElementById('square').innerHTML = isInverse ? 'x²' : '√';
    document.getElementById('power').innerHTML = isInverse ? 'y√x' : '^';
}

function handleButtonAction(id, value) {
    if (result.innerHTML === 'Error' || result.innerHTML === 'NaN') {
        result.innerHTML = '';
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
            document.getElementById('rad').style.color = id === 'rad' ? 'rgb(232, 103, 44)' : '';
            document.getElementById('deg').style.color = id === 'deg' ? 'rgb(232, 103, 44)' : '';
            break;
        case 'sin':
        case 'cos':
        case 'tan':
            result.innerHTML += value + '(';
            break;
        case 'log':
            result.innerHTML += isInverse ? '10^(' : 'log(';
            break;
        case 'ln':
            result.innerHTML += isInverse ? 'e^(' : 'ln(';
            break;
        case 'square':
            result.innerHTML += isInverse ? '^2' : '√(';
            break;
        case 'power':
            result.innerHTML += isInverse ? '^(1/' : '^';
            break;
        case 'factorial':
            result.innerHTML += '!';
            break;
        default:
            result.innerHTML += value;
            break;
    }

    // Auto-scroll display to the right when typing long expressions
    const displayContainer = document.querySelector('.display');
    displayContainer.scrollLeft = displayContainer.scrollWidth;
}

// Mouse / Touch Click Listener
keys.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;
    handleButtonAction(button.id, button.innerText);
});

// Physical Keyboard Listener (Laptop / Desktop / External Keyboards)
document.addEventListener('keydown', (e) => {
    // Ignore shortcuts like Ctrl+C, Ctrl+R, Alt, Meta
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    const key = e.key;
    let matchedBtn = null;

    if (key >= '0' && key <= '9') {
        matchedBtn = key === '0' ? document.getElementById('zero') : document.getElementById(key);
        handleButtonAction(matchedBtn ? matchedBtn.id : key, key);
    } else if (key === '.') {
        matchedBtn = document.getElementById('point');
        handleButtonAction('point', '.');
    } else if (key === '+') {
        matchedBtn = document.getElementById('add');
        handleButtonAction('add', '+');
    } else if (key === '-') {
        matchedBtn = document.getElementById('subtract');
        handleButtonAction('subtract', '-');
    } else if (key === '*') {
        matchedBtn = document.getElementById('multiply');
        handleButtonAction('multiply', '*');
    } else if (key === '/') {
        e.preventDefault(); // Stop browser quick-search
        matchedBtn = document.getElementById('divide');
        handleButtonAction('divide', '/');
    } else if (key === '%') {
        matchedBtn = document.getElementById('percent');
        handleButtonAction('percent', '%');
    } else if (key === '^') {
        matchedBtn = document.getElementById('power');
        handleButtonAction('power', '^');
    } else if (key === '!') {
        matchedBtn = document.getElementById('factorial');
        handleButtonAction('factorial', '!');
    } else if (key === '(') {
        matchedBtn = document.getElementById('openbracket');
        handleButtonAction('openbracket', '(');
    } else if (key === ')') {
        matchedBtn = document.getElementById('closebracket');
        handleButtonAction('closebracket', ')');
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault(); // Prevent accidental form/button click on Enter
        matchedBtn = document.getElementById('equal');
        handleButtonAction('equal', '=');
    } else if (key === 'Backspace') {
        matchedBtn = document.getElementById('del');
        handleButtonAction('del', '⌫');
    } else if (key === 'Delete' || key === 'Escape' || key.toLowerCase() === 'c') {
        matchedBtn = document.getElementById('clear');
        handleButtonAction('clear', 'Ac');
    } else if (key.toLowerCase() === 'p') {
        matchedBtn = document.getElementById('pi');
        handleButtonAction('pi', 'π');
    } else if (key === 'e') {
        matchedBtn = document.getElementById('e');
        handleButtonAction('e', 'e');
    }

    // Visual button press animation when typing from keyboard
    if (matchedBtn) {
        matchedBtn.classList.add('key-pressed');
        setTimeout(() => matchedBtn.classList.remove('key-pressed'), 120);
    }
});
