// create a function for the date
function formatDate(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let day = days[date.getDay()];

  if (minutes < 10){
    minutes = `0 ${minutes}`;
  }

  if (hours < 10){
    minutes = `0 ${hours}`;
  }

  return `${day} ${hours}:${minutes}` ;
}


// create a function that encloses all the html api integration response of temperature, city, wind, humidity, icon and weather description

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

  let dateElement = document.querySelector('#date');
  dateElement.innerHTML = formatDate(response.data.dt*1000);

  let iconElement = document.querySelector('#icon');
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}



let apiKey = "62231151ce343c4d68652e1617efc22f";
let city = 'New York';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);