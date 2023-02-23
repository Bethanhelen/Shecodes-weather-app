// create a function that encloses all the html api integration response of temperature, city, wind, humidity and weather description

function showTemperature(response){
  let temperatureElement = document.querySelector('#temperature');
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector('#city');
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector('#description');
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector('#humidity');
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector('#wind');
  windElement.innerHTML = Math.round(response.data.wind.speed);
}



let apiKey = "62231151ce343c4d68652e1617efc22f";
let city = 'New York';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);