// Rock paper scissors

const choices = ["rock", "paper", "scissors"];
// let playerChoice = null;
// let randomChoice = null;
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");

const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
let playerScore = 0;
let computerScore = 0;


function playGame(playerChoice){

    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = "";

    if(playerChoice === randomChoice){
        result = "It's a tie!";
    } else {
        switch(playerChoice){
            case "rock":
                result = (randomChoice === "scissors") ? "You win!" : "You lose!";
                break;
            case "paper":
                result = (randomChoice === "rock") ? "You win!" : "You lose!";
                break;
            case "scissors":
                result = (randomChoice === "paper") ? "You win!" : "You lose!";
                break;
        }
    }

    playerDisplay.textContent = `Player: ${playerChoice}`;
    computerDisplay.textContent = `Computer: ${randomChoice}`;
    resultDisplay.textContent = result;

    resultDisplay.classList.remove("greenText", "redText");

    switch(result){
        case "You win!":
            resultDisplay.classList.add("greenText");
            playerScore++;
            playerScoreDisplay.textContent = playerScore;
            break;
        case "You lose!":
            resultDisplay.classList.add("redText");
            computerScore++;
            computerScoreDisplay.textContent = computerScore;
            break;
    }
}


// function playGame(playerChoice){

//     playerDisplay.textContent = "Player: ";
//     computerDisplay.textContent = "Computer: ";

//     const randomChoice = choices[Math.floor(Math.random() * choices.length)];
//     //Math.floor(Math.random() * 3);

//     playerDisplay.textContent += playerChoice;
//     computerDisplay.textContent += randomChoice;

//     switch(playerChoice){
//         case "rock":
//             if(randomChoice === "rock"){
//                 resultDisplay.textContent = "It's a tie!";
//             } else if (randomChoice === "paper") {
//                 resultDisplay.textContent = "Player Looses!";
//             } else {
//                 resultDisplay.textContent = "Player Wins!";
//             }
//         break;
//         case "paper":
//             if(randomChoice === "paper"){
//                 resultDisplay.textContent = "It's a tie!";
//             } else if (randomChoice === "scissors") {
//                 resultDisplay.textContent = "Player Looses!";
//             } else {
//                 resultDisplay.textContent = "Player Wins!";
//             }
//         break;
//         case "scissors":
//             if(randomChoice === "scissors"){
//                 resultDisplay.textContent = "It's a tie!";
//             } else if (randomChoice === "rock") {
//                 resultDisplay.textContent = "Player Looses!";
//             } else {
//                 resultDisplay.textContent = "Player Wins!";
//             }
//         break;
//     }
// }