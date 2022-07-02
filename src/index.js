let currentTime = new Date();
let tempNow = null;

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentDay = days[date.getDay()];
  let currentMonth = date.getMonth() + 1;
  if (currentMonth < 10) {
    currentMonth = `0${currentMonth}`;
  }
  let currentDate = date.getDate();
  if (currentDate < 10) {
    currentDate = `0${currentDate}`;
  }
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formattedDate = `${currentDay} ${currentDate}.${currentMonth}/${hours}:${minutes}`;
  return formattedDate;
}
let head = document.querySelector("h1");
head.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector(".Cityname");
searchForm.addEventListener("submit", stopLoad);

let currentTemp = document.querySelector("#user-temp");
currentTemp.innerHTML = tempNow;

function showTemperature(response) {
  console.log(response);
  let city = response.data.name;
  let cityTitle = document.querySelector("#user-city");
  cityTitle.innerHTML = city;
  tempNow = Math.round(response.data.main.temp);
  currentTemp.innerHTML = tempNow;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `Wind speed: ${response.data.wind.speed} m/s`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  let wDescription = document.querySelector("#weather-description");
  wDescription.innerHTML = `Weather now is: ${response.data.weather[0].main}`;
  let wIcon = document.querySelector("#WI");
  let wIconSrc = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  wIcon.src = wIconSrc;
}
function getCurrentWeather() {
  navigator.geolocation.getCurrentPosition(LongLat);
}
function LongLat(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b98b992438f00474232a60ace28c6068";
  let urlAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(urlAPI).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(LongLat);
let buttonCurrent = document.querySelector("#current-button");
buttonCurrent.addEventListener("click", getCurrentWeather);

function SearchedCity() {
  let userCity = document.querySelector("#city-input").value;
  let apiKey = "b98b992438f00474232a60ace28c6068";
  let urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=metric`;
  axios.get(urlAPI).then(ShowSearchedWeather).catch(noSuchCity);
}
function noSuchCity() {
  let errorCity = document.querySelector("#city-input");
  let city = errorCity.value;
  if (city === "") {
    alert("City name is empty");
  } else {
    alert(`There is no such city like "${city}". Please check your city name`);
  }
}
function stopLoad(event) {
  event.preventDefault();
  SearchedCity();
}
function ShowSearchedWeather(response) {
  let city = response.data.name;
  tempNow = Math.round(response.data.main.temp);
  let cityTitle = document.querySelector("#user-city");
  cityTitle.innerHTML = city;
  currentTemp.innerHTML = tempNow;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `Wind speed: ${response.data.wind.speed} m/s`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  let wDescription = document.querySelector("#weather-description");
  wDescription.innerHTML = `Weather now is: ${response.data.weather[0].main}`;
  let wIcon = document.querySelector("#WI");
  let wIconSrc = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  wIcon.src = wIconSrc;
}
let buttonSearch = document.querySelector("#search-button");
buttonSearch.addEventListener("click", stopLoad);

function showTempInCels() {
  let tempValue = document.querySelector("#user-temp");
  tempValue.innerHTML = tempNow;
}
let Cbutton = document.querySelector("#c-temp");
Cbutton.addEventListener("click", showTempInCels);

function showTempInFahr() {
  let tempValue = document.querySelector("#user-temp");
  tempValue.innerHTML = Math.round((Number(tempNow) / 9) * 5 + 32);
}
let Fbutton = document.querySelector("#f-temp");
Fbutton.addEventListener("click", showTempInFahr);
