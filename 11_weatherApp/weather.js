// Weather app

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "3fd5c9664da1066eb96ac56d2a3a26db";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault(); // Esto lo tenes que sacar si o si porque sino se refresca la pagina
    const city = cityInput.value;

    if(city){

        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch(error){
            console.error(error);
            displayError(error);
        }

    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    
    //const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},AR&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data){

    const {name: city, 
        main: {temp, humidity}, 
        weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    const Warning = document.createElement("p");
    Warning.textContent = "(This is not accurate)";
    Warning.classList.add("warning");

    // Get information
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(2)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    // Give style
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    // Append to card
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
    card.appendChild(Warning);
}

function getWeatherEmoji(weatherId) {
    //Categories based on OpenWeatherMap weatherId

    switch (true) {
        case (weatherId >= 200 && weatherId < 300):  // Thunderstorms
            return "⚡";
        case (weatherId >= 300 && weatherId < 400):  // Drizzle
            return "🌦";
        case (weatherId >= 500 && weatherId < 600):  // Rain
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):  // Snow
            return "❄";
        case (weatherId >= 700 && weatherId < 800):  // Mist, dust, fog, etc.
            return "🌫";
        case (weatherId === 800):  // Clear sky
            return "☀";
        case (weatherId >= 801 && weatherId <= 804):  // Clouds
            return "☁";
        default:  // Unknown condition
            return "⁉";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}