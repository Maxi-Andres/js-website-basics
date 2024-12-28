//// Que te deje poner los numeros incluso si estan mal pero que te los ponga en rojo
//// que con un boton se pueda resolver (mejorar lo de los colores)
//// que cuando lo temines te ponga que ganaste o algo asi
//// que tenga un contador de tiempo 
// que cuando pongas todos los 1 por ejemplo desaparesca la opcion esa
// ver como hacer un generador de sudoku y tenga dificultaddes (y que te haga un juego nuevo)
// que con otro boton te de una pista, Y QUE SEA RANDOM
// que comprube bien si ganaste o no para que te salte la ventana
// hay un error cuando pone los numeros en rojos porque los comprueba de manera logica y algunos se pueden poner ahi como en este ejemplo: (image.png)
// que se pueda seleccionar los numeros con los numeros del teclado
// que tengas vidas???
// el problema es que cuando tocas solve se modifica la board y se llena, la funcion solveSudoku se fija las celdas que tienen un 0 por eso cuando tocas solve no te deja mas, nose si se podria usar dos tablas una para llenar el tablero al inicio, y para comprobar como resolverlo y otra en la que se resuelva y en la que pueda jugar el jugador

//! EL PROBLEMA CON SOLVE Y HINT ES QUE ACTUALIZAN LA BOARD Y CUANDO JUEGA EL JUGADOR NO, esto igual tiene queser asi porque si el jugador actualiza la tabla y pone algo mal despues solve no va a funcionar por eso se necesitan 2 tablas si o si

//! Quiza lo que se puede hacer es que apenas se inicia el juego se resuelve el sudoku y se guarda en un tablay de ahi se toman las pistas ademas de si esta mal colocado el numero para que se ponga en rojo SI HACE ESTO

//tenes que hacer una funcion que lo solucione apenas empieza y otra que al tocar el boton SOLAMENTE cambien el inner html

var numSelected = null;
var tileSelected = null;

var errors = 0;

// Los que son 0 son espacios en blanco 
// x es horizontal, y es vertical en matematica es (x,y), en este caso abajo utilizo board[y][x]
// Esta no se modifica
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

// Esta se resuelve apenas empieza el juego, se usa para las pistas, verificar si el jugador puso mal un numero y para cambiar el inner html cualdo se toca solve
var solveBoard = [
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

// Aca es donde se juega
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

// var solution = [
//     "387491625",
//     "241568379",
//     "569327418",
//     "758619234",
//     "123784596",
//     "496253187",
//     "934176852",
//     "675832941",
//     "812945763",
// ];

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
            playableBoard[y][x] = parseInt(numSelected.id);
            document.getElementById("errors").innerText = "Mistakes: " + errors;
        } else {
            this.style.color = "#333";
            playableBoard[y][x] = parseInt(numSelected.id);
            checkWin();
        }
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

function hint() { //! ESTO NO ANDA BIEN, ademas da las pista de la izquiera arriba hacia abajo a la derecha hace que sea random
    for (let Y = 0; Y < 9; Y++) {
        for (let X = 0; X < 9; X++) {
            if (board[Y][X] == 0) { // Buscar una celda vacía
                for (let n = 1; n <= 9; n++) {
                    if (isValidMove(n, Y, X)) {
                        board[Y][X] = n; // Poner el número sugerido en el tablero
                        document.getElementById(Y + "-" + X).innerText = n;
                        document.getElementById(Y + "-" + X).style.color = "#3079da"; // Resaltar la pista en azul
                        document.getElementById(Y + "-" + X).classList.add("tile-start"); // esto para que el jugador no pueda cambiar la pista
                        return; // Solo dar una pista
                    }
                }
            }
        }
    }
    alert("No hay más pistas disponibles.");
}

function newGame(){}


//===========================================================================================================================
// VENTANA EMERGENTE AL GANAR

function checkWin() {
    let isSolved = false; //! Suponemos que el Sudoku esta resuelto....

    if (isSolved) {
        showWinMessage();
    }
}

function showWinMessage() {
    const winMessage = document.getElementById('winMessage');
    winMessage.style.visibility = 'visible';  // Muestra la ventana emergente
}

function closeWinMessage() {
    const winMessage = document.getElementById('winMessage');
    winMessage.style.visibility = 'hidden';  // Oculta la ventana emergente
}

//===========================================================================================================================

