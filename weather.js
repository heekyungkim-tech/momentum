const weather = document.querySelector(".js-weather");

const API_KEY = "020592a840591369c2b969638835e920";
const COORDS = 'coords';

function getWeather(lat, lng) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ).then(function(response) {
    return response.json();
  })
  .then(function(json) {
    const temparature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temparature} @ ${place}`;
  });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// access to latitude and longitude
function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude: latitude,
    longitude: longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude,longitude);
}

function handleGeoError() {
  console.log("Cant access geo location");
}

// get location info
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null) {
    askForCoords();
  } else {
    // getWeather
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();
