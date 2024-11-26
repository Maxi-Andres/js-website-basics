// console.log(`Hello`);
// console.log(`I like pizza!`);

// window.alert(`This is an alert!`)
// window.alert(`I like pizza!`)

//document.getElementById("myH1").textContent = `Hello` ;
// document.getElementById("myP").textContent = `I like pizza!` ;

// FullName = "Bro Code"

// document.getElementById("p1").textContent = `My name is ${FullName}` ;

// Esta es la forma facil de tomar un nombre
// let username;
// username = window.prompt("What's your username?");
// console.log(username);

let username_1;
document.getElementById("mySubmit").onclick = function(){
    username_1 = document.getElementById("myText").value;
    console.log(username_1);
    document.getElementById("myH1").textContent = `Hello ${username_1}`;
}

const PI = 3.142592;
let radius;
let circunference;
document.getElementById("calcRadius").onclick = function(){
    radius = document.getElementById("radius").value;
    radius = Number(radius)
    circunference = 2 * PI * radius;
    document.getElementById("resulCircunferende").textContent = circunference;
}

// Counter program ====================================================================

const decreaseBtn = document.getElementById("decreaseBtn");
const resetBtn = document.getElementById("resetBtn");
const increaseBtn = document.getElementById("increaseBtn");
const countLabel = document.getElementById("countLabel");
let counter = 0;

increaseBtn.onclick = function(){
    counter++;
    countLabel.textContent = counter
}

decreaseBtn.onclick = function(){
    counter--;
    countLabel.textContent = counter
}

resetBtn.onclick = function(){
    counter = 0;
    countLabel.textContent = counter
}

// randomNum generator ====================================================================

const randomNumBtn = document.getElementById("randomNumBtn");
const randomNum = document.getElementById("randomNum");
const min = 1;
const max = 6;
let random

randomNumBtn.onclick = function(){
    random = Math.round((Math.random() * (max - min)) + min );
    randomNum.textContent = random;
}

// cheked property ====================================================================

const checkboxProperty = document.getElementById("checkboxProperty");
const visaBtn = document.getElementById("visaBtn");
const mastedCardBtn = document.getElementById("mastedCardBtn");
const payPalBtn = document.getElementById("payPalBtn");
const cardSubmit = document.getElementById("cardSubmit");
const subCardResult = document.getElementById("subCardResult");
const paymentResult = document.getElementById("paymentResult");

cardSubmit.onclick = function(){

    if(checkboxProperty.checked){
        subCardResult.textContent = "You are subscribe!";
    } else {
        subCardResult.textContent = "You are NOT subscribe!";
    }

    if(visaBtn.checked){
        paymentResult.textContent = "you are paying with Visa";
    } else if(mastedCardBtn.checked){
        paymentResult.textContent = "you are paying with MasterCard";
    } else if(payPalBtn.checked){
        paymentResult.textContent = "you are paying with Paypal";
    } else {
        paymentResult.textContent = "you must select a payment type";        
    }
}

// CHAINING ====================================================================

// No method chaining

let username_2 = ""
//* lo saque para que no salte la venta let username_2 = window.prompt("Enter your username: ");

// username_2 = username_2.trim();
// let letter_2 = username_2.charAt(0);
// letter_2 = letter_2.toUpperCase();

// let extraChars = username_2.slice(1);
// extraChars = extraChars.toLowerCase();
// username_2 = letter_2 + extraChars;

// console.log(username_2);

// method chaining

username_2 = username_2.trim().charAt(0).toUpperCase() + username_2.trim().slice(1).toLowerCase();

console.log(username_2);

// NUMBER GUEDDING GAME ====================================================================

const minNUMGuess = 1;
const maxNUMGuess = 100;
const answer_guess = Math.trunc(Math.random() * (maxNUMGuess - minNUMGuess + 1) + minNUMGuess);

console.log(answer_guess);

let guess_attempts = 0;
let my_guess;
let number_not_guessed = true;

while(number_not_guessed){

    my_guess = window.prompt(`Guess a number between ${minNUMGuess} and ${maxNUMGuess}`)
    my_guess = Number(my_guess)

    if(isNaN(my_guess) && !"a"){
        window.alert("Please enter a valid number");
    } else if (my_guess < minNUMGuess || my_guess > maxNUMGuess){
        window.alert("Please enter a valid number");
    } else {
        guess_attempts++;
        if(my_guess < answer_guess){
            window.alert("The number is bigger");
        } else if(my_guess > answer_guess){
            window.alert("The number is smaller");
        } else if (my_guess == "exit") {
            number_not_guessed = false;
        } else {
            window.alert(`Correct the answer was ${answer_guess} and it took you ${guess_attempts} attempts`);
            number_not_guessed = false;
        }
    }

}


// Rest and spread para meters ====================================================================

function openFridge(...foods){
    console.log(...foods)
}

const food1 = "pizza";
const food2 = "hambuerguer";
const food3 = "hotdog";
const food4 = "sushi";
const food5 = "ramen";

openFridge(food1, food2, food3, food4, food5);