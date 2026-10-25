# Simple Calculator 🧮

A responsive browser-based calculator built with **HTML, CSS, and vanilla JavaScript**. It supports standard arithmetic operations as well as scientific functions, keyboard input, degree/radian modes, and inverse operations.

## ✨ Features

### Basic Calculator
- Addition, subtraction, multiplication, and division
- Percentage calculations
- Decimal numbers and double-zero input
- Clear all (`Ac`) and delete last character (`⌫`)
- Keyboard support for numbers and common operators
- Error handling for invalid or non-finite calculations

### Scientific Calculator
Select **More** to show additional operations:
- Trigonometric functions: `sin`, `cos`, and `tan`
- Inverse trigonometric functions: `asin`, `acos`, and `atan`
- Degree (`deg`) and radian (`rad`) angle modes
- Logarithms: base-10 `log` and natural logarithm `ln`
- Square root and square operations
- Exponents and powers
- Factorial (`!`)
- Constants: π and Euler's number (`e`)
- Parentheses and implicit multiplication for expressions such as `2π` and `2(3)`

### User Experience
- Responsive layout for desktop and mobile screens
- Toggle between basic and scientific layouts
- Scrollable display for long expressions
- Button hover, click, and keyboard-press effects
- Results rounded to reduce common floating-point display inaccuracies

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| HTML5 | Calculator structure and keypad |
| CSS3 | Responsive styling, grid layout, and interactions |
| JavaScript (Vanilla) | Arithmetic, scientific functions, and keyboard events |

No frameworks, package managers, or build tools are required.

## 🚀 Getting Started

### Run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/joshichaitanya58/Simple-Calculator.git
   ```

2. Open the project folder:

   ```bash
   cd Simple-Calculator
   ```

3. Open `index.html` in your browser.

You can also open the folder in Visual Studio Code and use the **Live Server** extension.

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `0`–`9` | Enter digits |
| `.` | Decimal point |
| `+`, `-`, `*`, `/` | Arithmetic operators |
| `%` | Percentage |
| `^` | Power |
| `!` | Factorial |
| `(`, `)` | Parentheses |
| `Enter` or `=` | Calculate |
| `Backspace` | Delete the last character |
| `Delete`, `Escape`, or `C` | Clear display |
| `P` | Insert π |
| `E` | Insert Euler's number |

## 📁 Project Structure

```text
Simple-Calculator/
├── index.html   # Calculator interface and buttons
├── style.css    # Layout, colors, responsive styling, and effects
├── main.js      # Calculation engine and keyboard support
└── README.md    # Project documentation
```

## 🌐 Live Demo

If GitHub Pages is enabled for the repository, try the calculator here:

**https://joshichaitanya58.github.io/Simple-Calculator/**

## ⚠️ Notes

- Trigonometric functions use the selected degree or radian mode.
- Factorial is defined for non-negative integers.
- Invalid expressions and results such as division by zero display `Error`.
- This is a client-side learning project and does not send calculations to a server.

## 🔮 Possible Improvements

- Add calculation history and memory functions.
- Improve expression validation with a dedicated math parser.
- Add themes and a dark mode.
- Add unit conversion and more advanced scientific functions.
- Improve accessibility with descriptive labels and focus states.

## 👨‍💻 Author

**Chaitanya Joshi**

- GitHub: [@joshichaitanya58](https://github.com/joshichaitanya58)
- Portfolio: [my-portfolio-delta-virid-82.vercel.app](https://my-portfolio-delta-virid-82.vercel.app/)
- LinkedIn: [Chaitanya Joshi](https://www.linkedin.com/in/chaitanya-joshi-644b39298/)

---

<p align="center">Built with HTML, CSS, and JavaScript.</p>
