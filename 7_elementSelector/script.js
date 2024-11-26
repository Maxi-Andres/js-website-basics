// element selectors = Methods used to target an manipulate HTML elements
//                      They allow you to select one or multiple HTML elements
//                      from the DOM

// 1. document.getElementById()         // element or null
// 2. document.getElementsByClassName() // html collection
// 3. document.getElementsByTagName()   // html collection
// 4. document.querySelector()          // element or null
// 5. document.querySelectorAll()       // nodelist

const myHeading = document.getElementById("my-heading");
myHeading.style.backgroundColor = "yellow";
myHeading.style.textAlign = "center";

console.log(myHeading);

const fruits = document.getElementsByClassName("fruits");

fruits[1].style.backgroundColor = "red";
console.log(fruits);

for(let fruit of fruits){
    fruit.style.backgroundColor = "blue";
}

const h4Elements = document.getElementsByTagName("h4");

for(let h4Element of h4Elements){
    h4Element.style.backgroundColor = "pink";
}

const element = document.querySelector(".fruits");
element.style.backgroundColor = "green";

const cosa = document.querySelectorAll(".peep");
cosa[1].style.backgroundColor = "orange"; //! se tiene que usar indice si o si

// DOM Navigation = The process of navigating through the structure of an HTML document using JavaScript

// .firstElementChild
// .lastElementChild
// .nextElementSibling
// .parentElementSibling
// .parentElement
// .children





