import "./styles.css"

const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const API_KEY = process.env.ID;

function getLocation(e) {
    e.preventDefault();
    control(document.querySelector("#location").value);
}

async function getWeatherData(location) {
    const response = await fetch(BASE_URL + location + `?key=${API_KEY}`);
    const jsonResponse = await response.json();
    return jsonResponse;
}

function handleResponse(response) {
    const conditions = response.currentConditions.conditions;
    const description = response.description;
    const city = response.resolvedAddress;
    const temperature = response.currentConditions.temp;
    const humidity = response.currentConditions.humidity;
    return { conditions, description, city, temperature, humidity };
}

async function control(location) {
    const rawres = await getWeatherData(location);
    const res = handleResponse(rawres);
    console.log(res);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#submitbtn").addEventListener("click", getLocation);
});