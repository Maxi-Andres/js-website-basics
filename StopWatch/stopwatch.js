
let stopWatchText = document.getElementById("stopWatch"); // Esta hace falta
// estas no
let startBtn = document.getElementById("startBtn");
let stopBtn = document.getElementById("stopBtn");
let resetBtn = document.getElementById("resetBtn");

let timer = null; // la id la creas fuera asi la podes llamar desde cualquier funcion y la creas NULL
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start(){
    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10); // 
        isRunning = true;
    }
} 

function stop(){
    if(isRunning){
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function reset(){
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    stopWatchText.textContent = `00:00:00:00`;
}

function update(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let miliseconds = Math.floor(elapsedTime % 1000 / 10); // dividido 10 porque solo se usan 2 dijitos de milisegundos

    hours = String(hours).padStart(2, "0"); // esto se lo agrego para que siempre se le agregue al comienzo un 0
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    miliseconds = String(miliseconds).padStart(2, "0");

    stopWatchText.textContent = `${hours}:${minutes}:${seconds}:${miliseconds}`;
}    

