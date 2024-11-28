// image slider

const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img'); // NodeList (coleccion de nodos en este caso imagenes)
let currentIndex = 0;

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
});

document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
});

function updateSlider() {
    slides.style.transform = `translateX(-${currentIndex * 600}px)`; //600px porque es el ancho de cada imagen
}

// La propiedad transform de CSS permite aplicar transformaciones visuales a un elemento HTML, como rotar, escalar, inclinar o mover 
// (trasladar) un elemento en el espacio 2D o 3D.
// translateX mueve el elemento horizontalmente.

//* Valor positivo (translateX(100px)): mueve el elemento hacia la derecha.
//* Valor negativo (translateX(-100px)): mueve el elemento hacia la izquierda.

// Inicio (currentIndex = 0): translateX(0px)
// Siguiente (currentIndex = 1): translateX(-600px)
// Siguiente (currentIndex = 2): translateX(-1200px)
// Siguiente (currentIndex = 0): regresa al inicio (translateX(0px)).
