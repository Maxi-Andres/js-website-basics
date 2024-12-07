//// Que te deje poner los numeros incluso si estan mal pero que te los ponga en rojo
// ver como hacer un generador de sudoku y tenga dificultaddes
// que con un boton se pueda rsolver
// que con otro boton te de una pista
// que cuando pongas todos los 1 por ejemplo desaparesca la opcion esa
// que tenga un contador de tiempo 
// que cuando lo temines te ponga que ganaste o algo asi

var numSelected = null;
var tileSelected = null;

var errors = 0;

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---",
];

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763",
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
            let tile = document.createElement("div");
            tile.id = j.toString() + "-" + t.toString(); // las id son "0-0", "0-1" ... 
            if (board[j][t] != "-") {
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
        let x = parseInt(cords[0]);
        let y = parseInt(cords[1]);

        this.innerText = numSelected.id;

        if(solution[x][y] != numSelected.id){
            this.style.color = "#ff6b6b" // Marca el error en rojo
            errors++;
            document.getElementById("errors").innerText = "Mistakes: " + errors;
        } else {
            this.style.color = "#333"; // Esto tiene que estar aca, asi cuando corrije el error cambia de color
            checkCompletedNumber();
        }
    }
}

//! Esta pija no anda

function checkCompletedNumber() {
    for (let num = 1; num <= 9; num++) { // Itera sobre los números del 1 al 9
        let count = 0; // Contador para el número actual
        for (let fila = 0; fila < 9; fila++) {
            for (let col = 0; col < 9; col++) {
                const tile = document.getElementById(`${fila}-${col}`);
                if (tile.innerText === num.toString() && tile.style.color != "#ff6b6b") {
                    count++; // Cuenta cuántas veces aparece el número en el tablero
                }
            }
        }

        // Si se encuentra 9 veces en el tablero, considera el número completado
        if (count === 9) {
            const number = document.getElementById(num.toString());
            if (!number.classList.contains("number-completed")) {
                number.classList.add("number-completed"); // Marca como completado
                number.removeEventListener("click", selectNumber); // Desactiva selección
                availableNums--; // Reduce el número de disponibles
            }
        }
    }
}
