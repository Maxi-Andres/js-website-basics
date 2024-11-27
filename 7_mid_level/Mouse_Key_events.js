// eventListener = Listen for specific events to create interactive web pages
//                 events: click, mouseover, mouseout (hay mas creo)
//                 .addEventListener(event, [callback, anonymous-function, arrow-function]);

const myBox = document.getElementById("myBox");

function changeColor(event){    // event es un objeto que te lo da directamente el browser cuando ocurre un evento, cuando clickeas por ejemplo
    event.target.style.backgroundColor = "tomato";        // entonces no hace falta pasarlo explicitamente
    event.target.textContent = "OUCH 🤕";        
}

myBox.addEventListener("click", changeColor);

myBox.addEventListener("mouseover", event =>{
    event.target.style.backgroundColor = "yellow";
    event.target.textContent = "Don't do it 😢";  
});

myBox.addEventListener("mouseout", event =>{
    event.target.style.backgroundColor = "lightgreen";
    event.target.textContent = "Click Me 😄";  
});
//! esto se puede hacer con las pseudo-classes en css directamente pero esta es otra forma de hacerlo

// eventListener = Listen for specific events to create interactive web pages
//                 events: keydown, keyup, keypress(avoid)
//                 .addEventListener(event, [callback, anonymous-function, arrow-function]);

const moveAmount = 35;
let x = 0;
let y = 0;

document.addEventListener("keydown", event =>{

    if(event.key.startsWith("Arrow")){ // Siempre comienzan asi obviamente

        event.preventDefault(); // esto es para que con las flechas no vayas hacia abajo o el costado ya es que la funcion de las flechas

        switch(event.key){ //! los nombres son asi ya estan predefinidos
            case "ArrowUp":
                y -= moveAmount;
                break;
            case "ArrowDown":
                y += moveAmount;
                break;
            case "ArrowRight":
                x += moveAmount;
                break;
            case "ArrowLeft":
                x -= moveAmount;
                break;
        }

        myBox.style.top = `${y}px`;
        myBox.style.left = `${x}px`;
    }

});

document.addEventListener("keydown", event =>{

    if(event.key === "h"){
        myBox.style.visibility = "hidden";
    } else if(event.key === "s"){
        myBox.style.visibility = "visible";
    }

});