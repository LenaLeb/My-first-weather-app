let currentTime = new Date();
let currentTemperature = 22;
let tempNow = null;

function Cels() {
  let tempNow = currentTemperature;
  currentTemp.innerHTML = tempNow;
  return tempNow;
}
function Fahr() {
  let tempNow = Math.round((currentTemperature * 9) / 5 + 32);
  currentTemp.innerHTML = tempNow;
}
function cityTemp(event) {
  event.preventDefault();
  let cityTitle = document.querySelector("#user-city");
  let UserCity = document.querySelector("#city-input");
  cityTitle.innerHTML = UserCity.value;
  currentTemp.innerHTML = currentTemperature;
}

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

//New Code for search engine
function showTemperature(response) {
  console.log(response);
  let city = response.data.name;
  console.log(city);
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let cityTitle = document.querySelector("#user-city");
  cityTitle.innerHTML = city;
  currentTemp.innerHTML = temperature;
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
//----------------------------------
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
  console.log(response);
  let city = response.data.name;
  console.log(city);
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let cityTitle = document.querySelector("#user-city");
  cityTitle.innerHTML = city;
  currentTemp.innerHTML = temperature;
}
let buttonSearch = document.querySelector("#search-button");
buttonSearch.addEventListener("click", stopLoad);

function showTempInCels() {
  let tempValue = document.querySelector("#user-temp");
  let TV = tempValue.textContent;
  let TVC = Math.round(((Number(TV) - 32) / 5) * 9);
  console.log(TVC);
  tempValue.innerHTML = TVC;
}
let Cbutton = document.querySelector("#c-temp");
Cbutton.addEventListener("click", showTempInCels);

function showTempInFahr() {
  let tempValue = document.querySelector("#user-temp");
  let TV = tempValue.textContent;
  let TVF = Math.round((Number(TV) / 9) * 5 + 32);
  console.log(TVF);
  tempValue.innerHTML = TVF;
}
let Fbutton = document.querySelector("#f-temp");
Fbutton.addEventListener("click", showTempInFahr);
