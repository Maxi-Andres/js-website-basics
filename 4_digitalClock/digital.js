
let timeDisplay = document.getElementById("clock");

function updateClock(){
    let currentDate = new Date();

    const hours = currentDate.getHours().toString().padStart(2, 0);
    const minutes = currentDate.getMinutes().toString().padStart(2, 0);
    const seconds = currentDate.getSeconds().toString().padStart(2, 0);
    
    const timeString = `${hours}:${minutes}:${seconds}`;
    timeDisplay.textContent = timeString;
}

setInterval(updateClock, 1000);