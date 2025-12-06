Weather Dashboard – OpenWeatherMap API Demo

This project is a simple and user-friendly Weather Dashboard built using:

HTML

CSS

JavaScript (fetch())

OpenWeatherMap Current Weather Data API

Users can enter any city name and instantly view real-time weather information, including temperature, humidity, wind speed, sunrise/sunset times, and a live weather icon.

 Live Demo

Hosted using GitHub Pages:
 https://akarsh238.github.io/Assignment-3/

 Repository Link

 https://github.com/Akarsh238/Assignment-3

 API Used

This project uses the OpenWeatherMap Current Weather Data API.

Official documentation:
https://openweathermap.org/current

API key setup instructions followed:
https://openweathermap.org/appid

All weather data, icons, and JSON responses come from OpenWeatherMap.

 Features
 1. Search any city

Users can type the name of a city (e.g., Toronto, Mumbai, Barrie) and retrieve real-time weather data.

 2. Detailed weather information

Displayed information includes:

City + country

Weather description

Temperature (°C)

“Feels like” value

Humidity (%)

Wind speed (m/s)

Sunrise & sunset (converted from Unix timestamps)

Weather icon

 3. Recent Searches

The last 5 searched cities appear as clickable buttons, allowing fast reloading.

 4. Error Handling

Invalid city names or failed API requests show a clear error message to the user.

 5. Mobile-friendly UI

The interface is simple, responsive, and clean, providing an easy demonstration of third-party API usage.

 How It Works

The app uses the JavaScript fetch() method to contact the OpenWeatherMap API:

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)


Once the JSON is returned, the script extracts fields such as:

data.main.temp

data.weather[0].description

data.weather[0].icon

data.main.humidity

data.wind.speed

data.sys.sunrise

data.sys.sunset

data.timezone

The weather icon is loaded using:

https://openweathermap.org/img/wn/${iconCode}@2x.png


Sunrise and sunset are converted using the timezone offset.

 Take-It-Further Enhancements

To meet the "Take It Further" rubric requirement, this project includes:

Extended weather details (sunrise/sunset, feels-like)

Dynamic icons

Recent searches system

Responsive styling

Better error handling

Clean UI with dark theme

These go beyond the basic "getting started" API example.

 Credits

Weather data and icons provided by OpenWeatherMap

JSON field documentation used from the OpenWeatherMap API reference

 Developer

Akarsh Krishna Dinesh
student id= 200624618
Assignment 3 – Third-Party APIs
COMP1073 – Client-Side JavaScript
