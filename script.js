const key = "919f08106f0d9040325bd822c1858189";
const baseUrl = "https://api.openweathermap.org/data/2.5/";
//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

let place = document.getElementById("location");
let date = document.getElementById("date");

let desc = document.getElementById("desc");
const search = document.getElementById("searchBtn");
const button = document.getElementById("locationBtn");
const mobBtn = document.getElementById("locationBtn-mobile");
let current = document.getElementById("temp");
let humidity = document.getElementById("humidity");
let speed = document.getElementById("speed");
let dropdown = document.getElementById("unit-dropdown");
let mobDropdown = document.getElementById("unit-dropdown-mobile");
let unitValue = dropdown.value;
let tempInCelsius = 0;
let locationText = "";
// weatherLocation();
function celcToFahr() {
  return (tempInCelsius * 9.0) / 5.0 + 32.0;
}
function unitChange(event) {
  console.log("value", event.target.value);
  if (event.target.value === "Fahrenheit") {
    unitValue = "Fahrenheit";
    let fahr = celcToFahr();
    current.innerText = `${Math.floor(fahr)} F`;
    place.innerText = `${locationText}, ${Math.floor(fahr)} F`;
    console.log("value", `${fahr} F`);
  } else {
    let cel = tempInCelsius;
    unitValue = "celsius";
    current.innerText = `${Math.floor(cel)} \u2103`;
    place.innerText = `${locationText}, ${Math.floor(cel)} \u2103`;
    console.log("value", tempInCelsius);
  }
}
mobDropdown.addEventListener("change", unitChange);
dropdown.addEventListener("change", unitChange);
search.addEventListener("keypress", setQuery);
button.addEventListener("click", weatherLocation);
mobBtn.addEventListener("click", weatherLocation);
function setQuery(event) {
  if (event.key === "Enter") {
    getWeather(search.value);
    search.value = "";
  }
}
function getWeather(city) {
  fetch(`${baseUrl}weather?q=${city}&units=metric&APPID=${key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeather);
}
function showWeather(weather) {
  tempInCelsius = weather.main.temp;
  console.log("unit", unitValue);
  search.value = "";

  let time = new Date();
  date.innerText = dateBuild(time);
  const temp =
    unitValue === "Fahrenheit"
      ? `${Math.floor(celcToFahr())} F`
      : `${Math.floor(weather.main.temp)}\u2103`;
  current.innerText = temp;

  humidity.innerText = `${weather.main.humidity}`;
  speed.innerText = `${weather.wind.speed}`;
  place.innerText = `${weather.name},${weather.sys.country}, ${temp}`;
  locationText = `${weather.name},${weather.sys.country}`;

  /*
    let id=weather.weather[0].id;
    let bodybg=document.getElementsByTagName('body')[0];
    */
  /*
    if(id == 800){
        icon.innerHTML=`<img src="icons/clear.svg" alt="" id="image"></img>`;
        bodybg.style.backgroundImage="url('background/sunny.jpg')";
    }else if(id >= 200 && id <= 232){
        icon.innerHTML=`<img src="icons/storm.svg" alt="" id="image"></img>`;
        bodybg.style.backgroundImage="url('background/thunderstorm.jpg')";
    }else if(id >= 600 && id <= 622){
        icon.innerHTML=`<img src="icons/snow.svg" alt="" id="image"></img>`;
        bodybg.style.backgroundImage="url('background/snow.jpg')";
    }else if(id >= 701 && id <= 781){
        icon.innerHTML=`<img src="icons/haze.svg" alt="" id="image"></img>`;
        bodybg.style.backgroundImage="url('background/smoke.jpg')";
    }else if(id >= 801 && id <= 804){
        icon.innerHTML=`<img src="icons/cloud.svg" alt="" id="image"></img>`;
        bodybg.style.backgroundImage="url('background/cloud.jpg')";
    }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
        icon.innerHTML=`<img src="icons/rain.svg" alt="" id="image"></img>`;
        bodybg.style.backgroundImage="url('background/rain.jpg')";
    }*/

  desc.innerText = weather.weather[0].description;
}
function dateBuild(d) {
  const months = [
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
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d.getDay()];
  let currentdate = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${currentdate} ${month} ${year}`;
}

function weatherLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser not support geolocation api");
  }
}
function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${key}`;
  fetch(api)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeather);
}
function onError(error) {
  alert(error);
}
