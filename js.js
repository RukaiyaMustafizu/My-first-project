// Select the theme toggle button
let themeButton = document.querySelector(".darkTheme");

// Function to toggle dark mode
function changeTheme() {
  let body = document.querySelector("body");
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    themeButton.textContent = "Light Theme";
  } else {
    themeButton.textContent = "Dark Theme";
  }
}

// Add event listener to theme button
themeButton.addEventListener("click", changeTheme);

// Function to update the weather details on the page
function refreshWeather(response) {
  let cityElement = document.querySelector(".city");
  let descriptionElement = document.querySelector("p.weather-description");
  let humidityElement = document.querySelector(".imp.humidity");
  let windSpeedElement = document.querySelector(".imp.wind-speed");
  let temperatureElement = document.querySelector(".temp");
  let timeElement = document.querySelector("p.weather-time");
  let iconElement = document.querySelector("#icon");

  // Extract data from API response
  let temperature = response.data.temperature.current;
  let date = new Date(response.data.time * 1000);

  // Update the HTML with new data
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML =
    formatDate(date) + `, ${response.data.condition.description}`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  temperatureElement.innerHTML = `${Math.round(temperature)}°C`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  getForecast(response.data.city);
}

// Function to format date and time
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

// Function to fetch weather data for a city
function searchCity(city) {
  let apiKey = "tf315a00255a026o44c386706557b731";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

// Function to handle form submission
function handleSearchSubmit(event) {
  event.preventDefault(); // Stop form from reloading the page

  let searchInput = document.querySelector("#currentLocation");

  if (searchInput.value.trim() !== "") {
    searchCity(searchInput.value); // Call API to fetch weather data
  }
}
function getForecast(forecast) {
  let apiKey = "tf315a00255a026o44c386706557b731";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather).then(displayForecast);
}
function displayForecast(response) {
  let forecastHtml = "";
}
function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

// Add event listener to the search form
let searchFormElement = document.querySelector(".searchForm form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Default city search on page load
searchCity("Tilburg");
