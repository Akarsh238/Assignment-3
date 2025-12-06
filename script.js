
// Assignment 3
// Weather Dashboard using OpenWeatherMap

// it is the api key
const OPENWEATHER_API_KEY = "49bd324e47d5ad58e791ba49935de254";

// The Base URL for the Current Weather Data endpoint (city name)
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Input + button
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const errorMessage = document.getElementById("errorMessage");

// Weather display card
const weatherCard = document.getElementById("weatherCard");
const cityNameEl = document.getElementById("cityName");
const weatherDescriptionEl = document.getElementById("weatherDescription");
const temperatureEl = document.getElementById("temperature");
const feelsLikeEl = document.getElementById("feelsLike");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("windSpeed");
const sunriseEl = document.getElementById("sunrise");
const sunsetEl = document.getElementById("sunset");
const weatherIconEl = document.getElementById("weatherIcon");

// Recent searches elements 
const recentSearchesContainer = document.getElementById("recentSearches");
const recentList = document.getElementById("recentList");

// this  will be storing a small history of the last few city searches
const recentCities = []; // e.g. ["Barrie", "Toronto", "Mumbai"]

//  EVENT LISTENERS 

// Click on the "Get Weather" button
searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name.");
    return;
  }
  fetchWeather(city);
});

// Press Enter inside the input to trigger search
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchButton.click();
  }
});

//  MAIN API CALL 

/**
it will be grabbing current weather data for a given city name using OpenWeatherMap.
   This  will be demonstrating the API usage with a server-side JSON response.
 **/
async function fetchWeather(city) {
  clearError();

  // Build the request URL
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // If the API responds with an error code,  this is display message to user
    if (!response.ok || data.cod !== 200) {
      showError(data.message || "Unable to get weather for that city.");
      hideWeatherCard();
      return;
    }

    // Valid data: display results and update recent searches
    displayWeather(data);
    updateRecentSearches(data.name);
  } catch (error) {
    console.error(error);
    showError("Something went wrong while contacting the weather service.");
    hideWeatherCard();
  }
}
/**
 * Converts a Unix timestamp plus timezone offset
 * into a human-readable local time string for the city.
 */
function formatTimeFromUnix(unixTime, timezoneOffsetSeconds) {
  const localTimeMs = (unixTime + timezoneOffsetSeconds) * 1000;
  const date = new Date(localTimeMs);
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function displayWeather(data) {
  // Example of JSON fields being used:
  // name, sys.country, main.temp, main.feels_like, weather[0].description,
  // weather[0].icon, main.humidity, wind.speed, sys.sunrise, sys.sunset, timezone

  const cityName = `${data.name}, ${data.sys.country}`;
  const description = data.weather[0].description;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const sunriseUnix = data.sys.sunrise;
  const sunsetUnix = data.sys.sunset;
  const timezoneOffset = data.timezone; // in seconds

  // Set text values
  cityNameEl.textContent = cityName;
  weatherDescriptionEl.textContent = description;

  temperatureEl.textContent = `${temp}°C`;
  feelsLikeEl.textContent = `Feels like: ${feelsLike}°C`;

  humidityEl.textContent = `${humidity}%`;
  windSpeedEl.textContent = `${windSpeed} m/s`;

  sunriseEl.textContent = formatTimeFromUnix(sunriseUnix, timezoneOffset);
  sunsetEl.textContent = formatTimeFromUnix(sunsetUnix, timezoneOffset);

  // --- Set weather icon image (no duplicate consts) ---
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://imgs.search.brave.com/LYTL7BlN0NwH4FQS9zyAPold-VpmMBD8qxRkX_wsoMA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjQv/ODI1LzE4MC9zbWFs/bC8zZC13ZWF0aGVy/LWljb24tZGF5LWZy/ZWUtcG5nLnBuZw`;

  console.log("Icon code:", iconCode);
  console.log("Icon URL:", iconUrl);

  weatherIconEl.src = iconUrl;
  weatherIconEl.alt = description;

  // Finally, show the card
  weatherCard.classList.remove("hidden");
}

// RECENT SEARCHES 

/**
 * Keeps track of recent city names and renders them as buttons.
 * Clicking a recent search button will re-run the API request.
 */
function updateRecentSearches(cityName) {
  const normalized = cityName.trim();

  if (!normalized) return;

  // Prevent duplicates: remove if already in the list
  const existingIndex = recentCities.indexOf(normalized);
  if (existingIndex !== -1) {
    recentCities.splice(existingIndex, 1);
  }

  // Add to the front of the array
  recentCities.unshift(normalized);

  // Limit history to 5 cities
  if (recentCities.length > 5) {
    recentCities.pop();
  }

  renderRecentSearches();
}

/**
 * Renders the recentCities array as buttons in the UI.
 */
function renderRecentSearches() {
  recentList.innerHTML = "";

  if (recentCities.length === 0) {
    recentSearchesContainer.classList.add("hidden");
    return;
  }

  recentSearchesContainer.classList.remove("hidden");

  recentCities.forEach((city) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = city;

    // When clicked, re-run the search for that city
    button.addEventListener("click", () => {
      cityInput.value = city;
      fetchWeather(city);
    });

    li.appendChild(button);
    recentList.appendChild(li);
  });
}

// ERROR HANDLING HELPERS

function showError(message) {
  errorMessage.textContent = message;
}

function clearError() {
  errorMessage.textContent = "";
}

function hideWeatherCard() {
  weatherCard.classList.add("hidden");
}
