// TIC TAC TOE

let counter = 0;
let X_puntaje = 0;
let O_puntaje = 0;

const X = document.getElementById("X");
const O = document.getElementById("O");
const h1 = document.getElementById("winner");

let battleField =  [0, 0, 0,
                    0, 0, 0,
                    0, 0, 0]

function visibility(cell, img, num){

    counter++;

    const player = counter % 2 ? "X" : "O" ; // Con esto me saco la necesidad de el otro switch y el if
    const playerTurn = counter % 2 ? 1 : 2 ;

    switch(num){
        case 1: battleField[0] = playerTurn; break; // se puede poner asi el switch para que sea mas rapido de ver
        case 2: battleField[1] = playerTurn; break;
        case 3: battleField[2] = playerTurn; break;
        case 4: battleField[3] = playerTurn; break;
        case 5: battleField[4] = playerTurn; break;
        case 6: battleField[5] = playerTurn; break;
        case 7: battleField[6] = playerTurn; break;
        case 8: battleField[7] = playerTurn; break;
        case 9: battleField[8] = playerTurn; break;
    }

    cell.innerHTML = `<img class="choiceVisible" id="${img}" src="${player}.jpg">`;

    if(checkWinner(playerTurn)){ // Con esto le saque el if horrible y me ahorre otro else igual
        h1.textContent = `Player ${player} Wins!`;
        updateScore(player);
        resetBoardAfterDelay();
    } else if (battleField.every( cell => cell != 0)) { // Comprobación de empate
        h1.textContent = "It's a Draw!";
        resetBoardAfterDelay();
    }

}

function checkWinner(playerValue) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]];           // Diagonales

    return winningCombos.some(combo => 
        combo.every(index => battleField[index] === playerValue)
    );
}

function updateScore(player) {
    if (player === "X") {
        X_puntaje++;
        X.textContent = `Player X: ${X_puntaje}`;
    } else {
        O_puntaje++;
        O.textContent = `Player O: ${O_puntaje}`;
    }
}

function resetBoardAfterDelay() {

    setTimeout(() => {

        battleField.fill(0);
        for (let i = 1; i <= 9; i++) { 
            const cell = document.getElementById(`cell_${i}`);
            cell.innerHTML = `<img class="choice" id="img_${i}" onclick="visibility(cell_${i}, 'img_${i}', ${i})">`;
        }
        h1.textContent = "";

    }, 1000);
}

//!==========================================================================


    // if(battleField[0] === 2 && battleField[1] === 2 && battleField[2] === 2 ||
    //     battleField[3] === 2 && battleField[4] === 2 && battleField[5] === 2 ||
    //     battleField[6] === 2 && battleField[7] === 2 && battleField[8] === 2 ||

    //     battleField[0] === 2 && battleField[3] === 2 && battleField[6] === 2 ||
    //     battleField[1] === 2 && battleField[4] === 2 && battleField[7] === 2 ||
    //     battleField[2] === 2 && battleField[5] === 2 && battleField[8] === 2 ||

    //     battleField[0] === 2 && battleField[4] === 2 && battleField[8] === 2 ||
    //     battleField[2] === 2 && battleField[4] === 2 && battleField[6] === 2 

    // ){
    //     h1.textContent = "Player O Wins!";        

    //     setTimeout( () => {
    //         O_puntaje++;
    //         O.textContent = `Player O: ${O_puntaje}`;
    
    //         cell_1.innerHTML = `<img class="choice" id="img_1" onclick="visibility(cell_1, img_1, 1)">`;
    //         cell_2.innerHTML = `<img class="choice" id="img_2" onclick="visibility(cell_2, img_2, 2)">`;
    //         cell_3.innerHTML = `<img class="choice" id="img_3" onclick="visibility(cell_3, img_3, 3)">`;
    //         cell_4.innerHTML = `<img class="choice" id="img_4" onclick="visibility(cell_4, img_4, 4)">`;
    //         cell_5.innerHTML = `<img class="choice" id="img_5" onclick="visibility(cell_5, img_5, 5)">`;
    //         cell_6.innerHTML = `<img class="choice" id="img_6" onclick="visibility(cell_6, img_6, 6)">`;
    //         cell_7.innerHTML = `<img class="choice" id="img_7" onclick="visibility(cell_7, img_7, 7)">`;
    //         cell_8.innerHTML = `<img class="choice" id="img_8" onclick="visibility(cell_8, img_8, 8)">`;
    //         cell_9.innerHTML = `<img class="choice" id="img_9" onclick="visibility(cell_9, img_9, 9)">`;
    
    //         battleField = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    //         h1.textContent = "";
    //     }, 1000);
    // } 
    // else if (battleField[0] === 1 && battleField[1] === 1 && battleField[2] === 1 ||
    //     battleField[3] === 1 && battleField[4] === 1 && battleField[5] === 1 ||
    //     battleField[6] === 1 && battleField[7] === 1 && battleField[8] === 1 ||
        
    //     battleField[0] === 1 && battleField[3] === 1 && battleField[6] === 1 ||
    //     battleField[1] === 1 && battleField[4] === 1 && battleField[7] === 1 ||
    //     battleField[2] === 1 && battleField[5] === 1 && battleField[8] === 1 ||
        
    //     battleField[0] === 1 && battleField[4] === 1 && battleField[8] === 1 ||
    //     battleField[2] === 1 && battleField[4] === 1 && battleField[6] === 1 
    // ){
    //     h1.textContent = "Player X Wins!";

    //     setTimeout( () => {
    //         X_puntaje++;
    //         X.textContent = `Player X: ${X_puntaje}`;
            
    //         cell_1.innerHTML = `<img class="choice" id="img_1" onclick="visibility(cell_1, img_1, 1)">`;
    //         cell_2.innerHTML = `<img class="choice" id="img_2" onclick="visibility(cell_2, img_2, 2)">`;
    //         cell_3.innerHTML = `<img class="choice" id="img_3" onclick="visibility(cell_3, img_3, 3)">`;
    //         cell_4.innerHTML = `<img class="choice" id="img_4" onclick="visibility(cell_4, img_4, 4)">`;
    //         cell_5.innerHTML = `<img class="choice" id="img_5" onclick="visibility(cell_5, img_5, 5)">`;
    //         cell_6.innerHTML = `<img class="choice" id="img_6" onclick="visibility(cell_6, img_6, 6)">`;
    //         cell_7.innerHTML = `<img class="choice" id="img_7" onclick="visibility(cell_7, img_7, 7)">`;
    //         cell_8.innerHTML = `<img class="choice" id="img_8" onclick="visibility(cell_8, img_8, 8)">`;
    //         cell_9.innerHTML = `<img class="choice" id="img_9" onclick="visibility(cell_9, img_9, 9)">`;
            
    //         battleField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            
    //         h1.textContent = "";
    //     }, 1000);
    // }


// ==========================================================

// Nose porque funciona sin esto
// const cell_1 = document.getElementById("cell_1");
// const img_1 = document.getElementById("img_1");

// const cell_2 = document.getElementById("cell_2");
// const img_2 = document.getElementById("img_2");

// const cell_3 = document.getElementById("cell_3");
// const img_3 = document.getElementById("img_3");

// const cell_4 = document.getElementById("cell_4");
// const img_4 = document.getElementById("img_4");


// img_1.addEventListener("click", visibility(cell_1, img_1));




// img_1.addEventListener("click", () => {
//     // img_1.classList.add("choiceVisible");
//     counter++;
//     if(!(counter % 2)){
//         cell_1.innerHTML = `<img class="choiceVisible" id="img_1" src="X.jpg">`;
//     } else {
//         cell_1.innerHTML = `<img class="choiceVisible" id="img_1" src="O.jpg">`;
//     }
// });

// img_2.addEventListener("click", () => {
//     // img_1.classList.add("choiceVisible");
//     counter++;
//     if(!(counter % 2)){
//         cell_2.innerHTML = `<img class="choiceVisible" id="img_2" src="X.jpg">`;
//     } else {
//         cell_2.innerHTML = `<img class="choiceVisible" id="img_2" src="O.jpg">`;
//     }
// });

// img_3.addEventListener("click", () => {
//     // img_1.classList.add("choiceVisible");
//     counter++;
//     if(!(counter % 2)){
//         cell_3.innerHTML = `<img class="choiceVisible" id="img_3" src="X.jpg">`;
//     } else {
//         cell_3.innerHTML = `<img class="choiceVisible" id="img_3" src="O.jpg">`;
//     }
// });

// img_4.addEventListener("click", () => {
//     // img_1.classList.add("choiceVisible");
//     counter++;
//     if(!(counter % 2)){
//         cell_4.innerHTML = `<img class="choiceVisible" id="img_4" src="X.jpg">`;
//     } else {
//         cell_4.innerHTML = `<img class="choiceVisible" id="img_4" src="O.jpg">`;
//     }
// });

// img_5.addEventListener("click", () => {
//     // img_1.classList.add("choiceVisible");
//     counter++;
//     if(!(counter % 2)){
//         cell_5.innerHTML = `<img class="choiceVisible" id="img_5" src="X.jpg">`;
//     } else {
//         cell_5.innerHTML = `<img class="choiceVisible" id="img_5" src="O.jpg">`;
//     }
// });

// img_6.addEventListener("click", () => {
//     // img_1.classList.add("choiceVisible");
//     counter++;
//     if(!(counter % 2)){
//         cell_6.innerHTML = `<img class="choiceVisible" id="img_6" src="X.jpg">`;
//     } else {
//         cell_6.innerHTML = `<img class="choiceVisible" id="img_6" src="O.jpg">`;
//     }
// });






// img_2.addEventListener("click", () => {img_2.classList.add("choiceVisible");});
// img_3.addEventListener("click", () => {img_3.classList.add("choiceVisible");});


// img_2.addEventListener("click", changeVisibility);

// function changeVisibility(img){
//     img.classList.add("choiceVisible");
// }





