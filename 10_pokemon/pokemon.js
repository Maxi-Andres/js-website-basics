// fetch = Function used for making HTTP request to fetch resources. (JSON style data, images, files)
//         Simplifies asynchronous data fetching in JavaScript and used for interacting with APIs to retrieve and send
//         data asynchronously over the web.
//         fetch(url, {options}) el default es get
//         fetch(url, {method: "GET"}) get...
//         fetch(url, {method: "POST"}) send data
//         fetch(url, {method: "PUT"}) replace data
//         fetch(url, {method: "DELETE"}) delete data

//! si el status esta entre 200-299 entonces ok: true, sino ok: false


async function fetchData() {
    try{

        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");

        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";

    } catch(error) {
        console.error(error);
    }
}

// fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
//     .then(response => {

//         if(!response.ok){
//             throw new Error("Could not fetch resource");
//         }
//         return response.json();

//     })
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
