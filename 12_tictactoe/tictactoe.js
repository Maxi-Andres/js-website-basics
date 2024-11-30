
let counter = 0;

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

function visibility(cell, img){
        counter++;
    if(!(counter % 2)){
        cell.innerHTML = `<img class="choiceVisible" id="${img}" src="X.jpg">`;
    } else {
        cell.innerHTML = `<img class="choiceVisible" id="${img}" src="O.jpg">`;
    }
}





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





