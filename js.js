let themeButton = document.querySelector(".darkTheme");

function changeTheme() {
  let body = document.querySelector("body");
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    themeButton.textContent = "Light Theme";
  } else {
    themeButton.textContent = "Dark Theme";
  }
}

themeButton.addEventListener("click", changeTheme);

function refreshWeather(response) {
  let cityElement = document.querySelector(".city");
  let descriptionElement = document.querySelector("p.weather-description");
  let humidityElement = document.querySelector(".imp.humidity");
  let windSpeedElement = document.querySelector(".imp.wind-speed");
  let temperatureElement = document.querySelector(".temp");
  let timeElement = document.querySelector("p.weather-time");
  let iconElement = document.querySelector("#icon");

  let temperature = response.data.temperature.current;
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML =
    formatDate(date) + `, ${response.data.condition.description}`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  temperatureElement.innerHTML = `${Math.round(temperature)}°C`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}

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

function searchCity(city) {
  let apiKey = "tf315a00255a026o44c386706557b731";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#currentLocation");

  if (searchInput.value.trim() !== "") {
    searchCity(searchInput.value);
  }
}

let searchFormElement = document.querySelector(".searchForm form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Default search for Tilburg when the page loads
searchCity("Tilburg");
