//// Que te deje poner los numeros incluso si estan mal pero que te los ponga en rojo
// que cuando pongas todos los 1 por ejemplo desaparesca la opcion esa
// ver como hacer un generador de sudoku y tenga dificultaddes (y que te haga un juego nuevo)
// que cuando lo temines te ponga que ganaste o algo asi
// que con otro boton te de una pista
// que con un boton se pueda resolver (mejorar lo de los colores y que si alguien toca solve y despues pone numeros y toca solve otravez no se resuelve)
//// que tenga un contador de tiempo 

var numSelected = null;
var tileSelected = null;

var errors = 0;

// Los que son 0 son espacios en blanco 
// x es horizontal, y es vertical en matematica es (x,y), en este caso abajo utilizo board[y][x]
var board = [
    [0, 0, 7, 4, 9, 1, 6, 0, 5],
    [2, 0, 0, 0, 6, 0, 3, 0, 9],
    [0, 0, 0, 0, 0, 7, 0, 1, 0],
    [0, 5, 8, 6, 0, 0, 0, 0, 4],
    [0, 0, 3, 0, 0, 0, 0, 9, 0],
    [0, 0, 6, 2, 0, 0, 1, 8, 7],
    [9, 0, 4, 0, 7, 0, 0, 0, 2],
    [6, 7, 0, 8, 3, 0, 0, 0, 0],
    [8, 1, 0, 0, 4, 5, 0, 0, 0]
];

var playableBoard = [
    [0, 0, 7, 4, 9, 1, 6, 0, 5],
    [2, 0, 0, 0, 6, 0, 3, 0, 9],
    [0, 0, 0, 0, 0, 7, 0, 1, 0],
    [0, 5, 8, 6, 0, 0, 0, 0, 4],
    [0, 0, 3, 0, 0, 0, 0, 9, 0],
    [0, 0, 6, 2, 0, 0, 1, 8, 7],
    [9, 0, 4, 0, 7, 0, 0, 0, 2],
    [6, 7, 0, 8, 3, 0, 0, 0, 0],
    [8, 1, 0, 0, 4, 5, 0, 0, 0]
];

let tiempo = 0;
let temporizador;

window.onload = function(){
    setGame();
    iniciarTemporizador();
}

function iniciarTemporizador() {
    temporizador = setInterval(() => {
        tiempo++;
        const minutos = Math.floor(tiempo / 60); //floor para que sea entero si o si
        const segundos = tiempo % 60; // asi segundos esta entre 0-59
        document.getElementById("timer").innerText = `Time: ${minutos}:${segundos.toString().padStart(2, "0")}`;
    }, 1000);
}

function setGame(){
    // Digits 1-9
    for(let i = 1; i <= 9 ; i++){
        // <div id="1" class="number">1</div> esto es lo que hace hasta el 9 asi no lo hago manualmente, serviria para el Tic Tac Toe
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;

        number.addEventListener("click", selectNumber); // no es selectNumber() porque asi llamas a la funcion directamente y genera errores, tenes que usar solo selectNumber asi SOLO se llama cuando hay un click
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for(let j = 0; j < 9 ; j++){
        for(let t = 0; t < 9 ; t++){
            // <div id="0-0" class="tile"></div>
            // <div id="0-1" class="tile"> (Esta parte puede ser un numero del 1 al 9) </div>
            let tile = document.createElement("div");
            tile.id = j.toString() + "-" + t.toString(); // las id son "0-0", "0-1" ... 
            if (board[j][t] != 0) {
                tile.innerText = board[j][t];
                tile.classList.add("tile-start");
            }
            // tile.innerText = board[j][t] != "-" ? (tile.classList.add("tile-start"), board[j][t]) : ""; // esto es como lo de arriba pero mas pro
            if(j == 2 || j == 5){
                tile.classList.add("horizontal-line");
            }
            if(t == 2 || t == 5){
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber(){
    if(numSelected != null){
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile(){
    if(numSelected && !this.classList.contains("tile-start")){ // && this.innerText == "" asi solo se puede poner una vez sola un numero en un tile

        let cords = this.id.split("-");
        let x = parseInt(cords[0]); // fila 
        let y = parseInt(cords[1]); // columnda

        this.innerText = numSelected.id;

        // Verifica segun las reglas de Sudoku (fila, columna, y cuadrante) 
        if(!isValidMove(numSelected.id, x, y)){
            this.style.color = "#ff6b6b" // Marca el error en rojo
            errors++;
            document.getElementById("errors").innerText = "Mistakes: " + errors;
        } else {
            this.style.color = "#333";
        }

        // //! Esto es lo que se fija si pone el numero rojo o no
        // if(solution[x][y] != numSelected.id){
        //     this.style.color = "#ff6b6b" // Marca el error en rojo
        //     errors++;
        //     document.getElementById("errors").innerText = "Mistakes: " + errors;
        // } else {
        //     this.style.color = "#333"; // Esto tiene que estar aca, asi cuando corrije el error cambia de color
        //     checkCompletedNumber();
        // }
    }
}

function isValidMove(value, row, col){
    // board[y][x]
    for(let c = 0; c < 9 ; c++){
        if (board[row][c] == value){ // recorro las columnas
            return false;
        }
    }
    for(let r = 0; r < 9 ; r++){
        if (board[r][col] == value){ // recorro las filas
            return false;
        }
    }
    // Asi se encuentra la esquina superior izquierda de el cuadrante
    const startRow = (Math.floor(row / 3)) * 3;
    const startCol = (Math.floor(col / 3)) * 3;

    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            if (board[r][c] == value) {
                return false; // Número ya presente en el cuadrante
            }
        }
    }

    return true;
}

function solveSudoku(){
    for(let Y = 0; Y < 9; Y++){
        for(let X = 0; X < 9; X++){
            if(board[Y][X] == 0){ // Buscar una celda vacía
                for (let n = 1; n <= 9; n++){
                    if(isValidMove(n, Y, X)){
                        board[Y][X] = n; // Probar un número
                        document.getElementById(Y + "-" + X).innerText = n; // Mostrar el cambio en el DOM
                        document.getElementById(Y + "-" + X).style.color = "#333"; // Esto es para que si la persona lo puso mal y esta en rojo lo ponga a negro ademas de poner la solucion bien

                        if(solveSudoku()){
                            return true;
                        }

                        // Backtracking: deshacer el movimiento
                        board[Y][X] = 0;
                        document.getElementById(Y + "-" + X).innerText = 0;
                    }
                }
                return false; // No hay solución para esta configuración
            }
        }
    }
    return true; // Todas las celdas están llenas y válidas
}

function hint() { //! ESTO NO ANDA
    for (let Y = 0; Y < 9; Y++) {
        for (let X = 0; X < 9; X++) {
            if (board[Y][X] == 0) { // Buscar una celda vacía
                for (let n = 1; n <= 9; n++) {
                    if (isValidMove(n, Y, X)) {
                        board[Y][X] = n; // Poner el número sugerido en el tablero
                        document.getElementById(Y + "-" + X).innerText = n;
                        document.getElementById(Y + "-" + X).style.color = "#42f57b"; // Resaltar la pista en verde
                        return; // Solo dar una pista
                    }
                }
            }
        }
    }
    alert("No hay más pistas disponibles.");
}

function newGame(){}

//! Esta pija no anda, fijate cuando hagaas un generador de sudoku si asi podes revisar las posiciones de otra manera
// function checkCompletedNumber() {
//     for (let num = 1; num <= 9; num++) { // Itera sobre los números del 1 al 9
//         let count = 0; // Contador para el número actual
//         for (let fila = 0; fila < 9; fila++) {
//             for (let col = 0; col < 9; col++) {
//                 const tile = document.getElementById(`${fila}-${col}`);
//                 if (tile.innerText === num.toString() && tile.style.color != "#ff6b6b") {
//                     count++; // Cuenta cuántas veces aparece el número en el tablero
//                 }
//             }
//         }

//         // Si se encuentra 9 veces en el tablero, considera el número completado
//         if (count === 9) {
//             const number = document.getElementById(num.toString());
//             if (!number.classList.contains("number-completed")) {
//                 number.classList.add("number-completed"); // Marca como completado
//                 number.removeEventListener("click", selectNumber); // Desactiva selección
//                 availableNums--; // Reduce el número de disponibles
//             }
//         }
//     }
// }
