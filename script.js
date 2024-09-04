// Variables para mantener el estado actual de la entrada, operación y memoria
let currentInput = ""; // Guarda el valor del número que se está ingresando
let operationString = ""; // Guarda toda la operación en una cadena de texto
let memory = null; // Almacena un valor en memoria, si es necesario

// Referencias a los elementos del display
const resultDisplay = document.getElementById("result"); // Display principal para mostrar el número actual o resultado
const historyDisplay = document.getElementById("history"); // Display secundario para mostrar la operación completa

// Agrega un evento a cada botón de número
document.querySelectorAll(".number").forEach(button => {
    button.addEventListener("click", () => {
        currentInput += button.textContent; // Añade el número presionado a la entrada actual
        operationString += button.textContent; // Añade el número a la cadena de la operación
        updateDisplay(); // Actualiza el display para mostrar la entrada actual
    });
});

// Agrega un evento a cada botón de operador
document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener("click", () => {
        if (currentInput === "") return; // Evita agregar un operador si no hay entrada actual

        // Al presionar el botón de % para el residuo
        if (button.textContent === "%") {
            operationString += ` % `; // Añade el operador de residuo a la cadena de la operación
        } else {
            operationString += ` ${button.textContent} `; // Añade otros operadores con espacio a la operación
        }

        currentInput = ""; // Resetea la entrada actual para el siguiente número
        updateDisplay(); // Actualiza el display
    });
});

// Maneja el cálculo cuando se presiona el botón de igual
document.getElementById("equals").addEventListener("click", () => {
    try {
        // Evalúa la expresión completa incluyendo el operador de residuo
        let result = eval(operationString.replace(/%/g, '%'));
        operationString += ` = ${result}`; // Muestra el resultado junto a la operación
        currentInput = result.toString(); // Almacena el resultado como la nueva entrada actual
        updateDisplay(); // Actualiza el display con el resultado
    } catch (error) {
        alert("Operación no válida"); // Muestra una alerta si la evaluación falla (por ejemplo, en caso de división por 0)
    }
});

// Limpia el display y las variables al presionar "C"
document.getElementById("clear").addEventListener("click", () => {
    currentInput = ""; // Resetea la entrada actual
    operationString = ""; // Resetea la cadena de operación
    updateDisplay(); // Actualiza el display a su estado inicial
});

// Elimina el último carácter de la operación al presionar "←"
document.getElementById("backspace").addEventListener("click", () => {
    operationString = operationString.slice(0, -1); // Elimina el último carácter de la cadena de operación
    updateDisplay(); // Actualiza el display
});

// Maneja la entrada del punto decimal
document.getElementById("decimal").addEventListener("click", () => {
    if (!currentInput.includes(".")) {
        currentInput += "."; // Añade un punto decimal si no está presente
        operationString += "."; // Añade el punto decimal a la operación
        updateDisplay(); // Actualiza el display
    }
});

// Almacena o recupera el valor de la memoria
document.getElementById("memory").addEventListener("click", () => {
    if (memory === null) {
        memory = currentInput; // Almacena el valor actual en memoria
    } else {
        currentInput = memory; // Recupera el valor de la memoria
        memory = null;         // Limpia la memoria después de usarla
    }
    updateDisplay(); // Actualiza el display
});

// Calcula el porcentaje al presionar el botón de porcentaje
document.getElementById("percentage").addEventListener("click", () => {
    if (currentInput !== "") {
        let percentageValue = parseFloat(currentInput) / 100;
        operationString += `${percentageValue}`;
        currentInput = percentageValue.toString(); // Actualiza la entrada actual con el valor del porcentaje
        updateDisplay(); // Actualiza el display
    }
});

// Función para actualizar el display principal y el historial
function updateDisplay() {
    resultDisplay.textContent = currentInput; // Muestra la entrada actual en el display principal
    historyDisplay.textContent = operationString; // Muestra la operación completa en el historial
}