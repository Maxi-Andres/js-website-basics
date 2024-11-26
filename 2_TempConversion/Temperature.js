
const textBox = document.getElementById("textBox");
const toFahrenheit = document.getElementById("toFahrenheit");
const toCelsius = document.getElementById("toCelsius");
const resultOfConversion = document.getElementById("resultOfConversion");

let temp;

function convert() {

    if(toFahrenheit.checked){
        temp = Number(textBox.value);
        temp = temp * 9 / 5 + 32;
        resultOfConversion.textContent = temp.toFixed(2) + " Fahrenheit"
    } else if(toCelsius.checked){
        temp = Number(textBox.value);
        temp = (temp - 32) * (5 / 9);
        resultOfConversion.textContent = temp.toFixed(2) + " Celsius"
    } else {
        resultOfConversion.textContent = "Select a unit";
    }

}