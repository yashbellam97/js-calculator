const container = document.querySelector(".container");

const buttons = Array.from(container.querySelectorAll(".key"));
buttons.forEach((button) => button.addEventListener("click", buttonPress));

let displayText = document.querySelector("#display-text");
displayText.classList.add("initial");

let firstArg = 0;
let secondArg = 0;
let startSecond = false;
let operator;
let expression = "";

function buttonPress(event) {
    targetText = event.target.textContent;
    if (targetText == "C") {
        clearScreen();
        return;
    }
    if (targetText == "⌫") {
        if (!displayText.classList.contains("initial")) {
            console.log("It ocntaine");
            expression = expression.substring(0, expression.length - 1);
            setDisplayContent(expression);
            if (isNaN(expression.charAt(expression.length - 1))) {
                operator = "";
            }
            if (expression.length == 0) clearScreen();
        } else clearScreen();
        return;
    }
    if (event.target.textContent == "=") {
        if (/.+[+\-x\/].+/.test(expression)) {
            createCalc(expression);
            displayText.classList.add("initial");
        }
        return;
    }
    if (event.target.classList.contains("operator") && targetText != ".") {
        if (expression.length == 0) return;
        if (isNaN(expression.charAt(expression.length - 1))) {
            setDisplayContent(expression.substring(0, expression.length - 1) + targetText);
            operator = targetText;
            return;
        }

        createCalc(expression);

        operator = targetText;
        startSecond = true;
    }
    if (targetText === "0" && displayText.textContent - 0 === 0 && displayText.classList.contains("initial")) {
        return;
    } else if (targetText === "0" && displayText.textContent - 0 !== 0 && displayText.classList.contains("initial")) {
        displayText.textContent = "0";
        return;
    } else if (displayText.classList.contains("initial")) {
        setDisplayContent("");
    }
    setDisplayContent(displayText.textContent + targetText);
    expression = displayText.textContent;
}

function createCalc(expression) {
    if (/.+[+\-x\/].+/.test(expression)) {
        let array = expression.split(/[+\-x\/]/);
        if (array.length > 2) {
            setDisplay(operate(-array[1] - 0, array[2] - 0, operator))
        } else setDisplay(operate(array[0] - 0, array[1] - 0, operator));
    }
}

function clearScreen() {
    displayText.style.fontSize = "70px"
    setDisplayContent("0");
    expression = "";
    displayText.classList.add("initial");
}

function setDisplayContent(str) {
    displayText.classList.remove("initial");
    if (str.length > 10) {
        alert("Um... That's a little too big");
        return;
    }
    displayText.style.fontSize = "70px"
    if (str.length > 7) {
        let font = "60px";
        if (str.length > 8) {
            font = "50px";
        }
        displayText.style.fontSize = font;
    }
    displayText.textContent = str;
    if (displayText.textContent == "Error") {
        displayText.classList.add("initial");
    }
}

function setDisplay(str) {
    if (!isNaN(str)) str = Math.round(str * 100) / 100;
    setDisplayContent(str + "");
}

function checkLength(event) {
    let text = event.target.textContent;
    if (text.length > 8) {
    }
}

function operate(a, b, op) {
    switch (op) {
        case "+":
            return add(a, b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "x":
            return multiply(a, b);
            break;
        case "/":
            return divide(a, b);
            break;
        default:
            return 0;
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) {
        return "Error";
    }
    return a / b;
}