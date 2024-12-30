//// Que te deje poner los numeros incluso si estan mal pero que te los ponga en rojo
//// que con un boton se pueda resolver (mejorar lo de los colores)
//// que cuando lo temines te ponga que ganaste o algo asi
//// que tenga un contador de tiempo 
//// que con otro boton te de una pista, Y QUE SEA RANDOM
//// hay un error cuando pone los numeros en rojos porque los comprueba de manera logica y algunos se pueden poner ahi como en este ejemplo: (image.png)
//// que comprube bien si ganaste o no para que te salte la ventana
// que cuando pongas todos los 1 por ejemplo desaparesca la opcion esa
// ver como hacer un generador de sudoku y tenga dificultaddes (y que te haga un juego nuevo) y que tenga cache??
// que se pueda seleccionar los numeros con los numeros del teclado
// que tengas vidas???
//// el problema es que cuando tocas solve se modifica la board y se llena, la funcion solveSudoku se fija las celdas que tienen un 0 por eso cuando tocas solve no te deja mas, nose si se podria usar dos tablas una para llenar el tablero al inicio, y para comprobar como resolverlo y otra en la que se resuelva y en la que pueda jugar el jugador
//// EL PROBLEMA CON SOLVE Y HINT ES QUE ACTUALIZAN LA BOARD Y CUANDO JUEGA EL JUGADOR NO, esto igual tiene queser asi porque si el jugador actualiza la tabla y pone algo mal despues solve no va a funcionar por eso se necesitan 2 tablas si o si
//// Quiza lo que se puede hacer es que apenas se inicia el juego se resuelve el sudoku y se guarda en un tablay de ahi se toman las pistas ademas de si esta mal colocado el numero para que se ponga en rojo SI HACE ESTO
//// tenes que hacer una funcion que lo solucione apenas empieza y otra que al tocar el boton SOLAMENTE cambien el inner html

var numSelected = null;
var tileSelected = null;

var errors = 0;
var emptyTiles = 0;

// Los que son 0 son espacios en blanco 
// x es horizontal, y es vertical en matematica es (x,y), en este caso abajo utilizo board[y][x]
// Esta no se modifica y se usa para cargar los elementos al principio del juego
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

// Esta se resuelve apenas empieza el juego, se usa para las pistas, verificar si el jugador puso mal un numero y para cambiar el inner html cualdo se toca solve, tiene que ser igual que board
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

// Aca es donde se juega y donde se actualiza el html "lo que se ve"
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
    solveSudoku();
    tilesToPlace();
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
    for(let r = 0; r < 9 ; r++){
        for(let c = 0; c < 9 ; c++){
            // <div id="0-0" class="tile"></div>
            // <div id="0-1" class="tile"> (Esta parte puede ser un numero del 1 al 9) </div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString(); // las id son "0-0", "0-1" ... 
            if (board[r][c] != 0) {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            // tile.innerText = board[r][c] != "-" ? (tile.classList.add("tile-start"), board[r][c]) : ""; // esto es como lo de arriba pero mas pro
            if(r == 2 || r == 5){
                tile.classList.add("horizontal-line");
            }
            if(c == 2 || c == 5){
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
    if(numSelected && !this.classList.contains("tile-start") && !this.classList.contains("tile-hint")){

        let cords = this.id.split("-");
        let y = parseInt(cords[0]); // fila 
        let x = parseInt(cords[1]); // columnda

        this.innerText = numSelected.id;
        playableBoard[y][x] = parseInt(numSelected.id);

        if(playableBoard[y][x] !== solveBoard[y][x]){ // siempre da 0
            this.style.color = "#ff6b6b" // Marca el error en rojo
            errors++;
            document.getElementById("errors").innerText = "Mistakes: " + errors;
        } else {
            this.style.color = "#333";
            emptyTiles--;
            if(emptyTiles == 0){
                checkWin();
            }
        }
    }
}

function isValidMove(value, row, col){
    // board[y][x]
    for(let c = 0; c < 9 ; c++){
        if (solveBoard[row][c] == value){ // recorro las columnas
            return false;
        }
    }
    for(let r = 0; r < 9 ; r++){
        if (solveBoard[r][col] == value){ // recorro las filas
            return false;
        }
    }
    // Asi se encuentra la esquina superior izquierda de el cuadrante
    const startRow = (Math.floor(row / 3)) * 3;
    const startCol = (Math.floor(col / 3)) * 3;

    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            if (solveBoard[r][c] == value) {
                return false; // Número ya presente en el cuadrante
            }
        }
    }

    return true;
}

function solveSudoku(){
    for(let Y = 0; Y < 9; Y++){
        for(let X = 0; X < 9; X++){
            if(solveBoard[Y][X] == 0){ // Buscar una celda vacía
                for (let n = 1; n <= 9; n++){
                    if(isValidMove(n, Y, X)){
                        solveBoard[Y][X] = n; // Probar un número

                        if(solveSudoku()){
                            return true;
                        }

                        // Backtracking: deshacer el movimiento
                        solveBoard[Y][X] = 0;
                    }
                }
                return false; // No hay solución para esta configuración
            }
        }
    }
    return true; // Todas las celdas están llenas y válidas
}

function solveSudokuButton(){
    for(let Y = 0; Y < 9; Y++){
        for(let X = 0; X < 9; X++){
            if(board[Y][X] == 0){ // Buscar una celda vacía
                playableBoard[Y][X] = solveBoard[Y][X];
                document.getElementById(Y + "-" + X).innerText = solveBoard[Y][X]; // Mostrar el cambio en el DOM
                document.getElementById(Y + "-" + X).style.color = "#333"; // Esto es para que si la persona lo puso mal y esta en rojo lo ponga a negro ademas de poner la solucion bien
            }
        }
    }
}

function hint() { 
    // Número aleatorio entre dos valores (Min y Max, inclusive)
    // let min = 0;
    // let max = 9;
    // const randomRow = Math.floor(Math.random() * (max - min + 1)) + min;
    // const randomCol = Math.floor(Math.random() * (max - min + 1)) + min;

    // Recopilar todas las posiciones disponibles donde haya un 0
    let availablePositions = [];
    for (let row = 0; row < playableBoard.length; row++) { //! si queres que las pistas sobreescriban lo que pone el jugador lo que se puede hacer es que no compare con playableBoard sino con board tambien tendiras que ver si lo puso mal porque no vas a sobreescribir algo si lo puso bien
        for (let col = 0; col < playableBoard[row].length; col++) {
            if (playableBoard[row][col] === 0) {
                availablePositions.push([row, col]);
            }
        }
    }

    // console.log("Available Positions:", availablePositions); // como no es una variable clobal no la podes ver si tocas F12, pero availablePositions es en cada index la posicion por ejemplo [0, 0], [0, 1], [0, 7], [1, 1], [1, 2]

    // Si no hay posiciones disponibles, mostrar alerta y salir
    if (availablePositions.length === 0) {
        alert("No hay más pistas disponibles.");
        return;
    }

    // Elegir una posición aleatoria de las disponibles
    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    const [randomRow, randomCol] = availablePositions[randomIndex];

    // Asignar la pista al tablero y actualizar la interfaz
    playableBoard[randomRow][randomCol] = solveBoard[randomRow][randomCol];
    const cell = document.getElementById(randomRow + "-" + randomCol);
    cell.innerText = solveBoard[randomRow][randomCol];
    cell.classList.add("tile-hint"); // Evitar que el jugador cambie la pista
    emptyTiles--;
}

function tilesToPlace(){
    for(let Y = 0; Y < 9; Y++){
        for(let X = 0; X < 9; X++){
            if(board[Y][X] == 0){ // Buscar una celda vacía
                emptyTiles++;
            }
        }
    }
}

function newGame(){}


//===========================================================================================================================
// VENTANA EMERGENTE AL GANAR

function checkWin() {
    let isSolved = true; //! Suponemos que el Sudoku esta resuelto....

    if(isSolved){
        showWinMessage();
    }
}

function showWinMessage(){
    const winMessage = document.getElementById('winMessage');
    winMessage.style.visibility = 'visible';  // Muestra la ventana emergente
}

function closeWinMessage(){
    const winMessage = document.getElementById('winMessage');
    winMessage.style.visibility = 'hidden';  // Oculta la ventana emergente
}

//===========================================================================================================================

