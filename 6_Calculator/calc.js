// Calculator program

const calculatorDisplay = document.getElementById("calculatorDisplay");

function appendToDisplay(input){
    calculatorDisplay.value += input;
}

function clearDisplay(){
    calculatorDisplay.value = "";
}

function calculate(){
    try{
        calculatorDisplay.value = eval(calculatorDisplay.value);
    } catch (error){
        calculatorDisplay.value = "Error";
    }
    // eval() ejecuta una cadena de texto como codigo, 
}

// ejemplos: 

// eval("let x = 10; let y = 20;");
// console.log(x + y); // 30

// let expression = "3 * (4 + 5)";
// console.log(eval(expression)); // 27
