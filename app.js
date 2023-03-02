// create a function for the date
function formatDate(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let day = days[date.getDay()];

  if (minutes < 10){
    minutes = `0${minutes}`;
  }

  if (hours < 10){
    hours = `0${hours}`;
  }

  return `Last updated: ${day} ${hours}:${minutes}` ;
}

// weather forecast 
function displayForecast(){
  let forecastElement = document.querySelector('#forecast');

  let forecastHTML = `<div class="cards">`;
  let days = ['Thur', 'Fri', 'Sat', 'Sun', 'Mon'];

  days.forEach(function (day){
    forecastHTML = 
    forecastHTML +  
    `
      <div class="card">
        <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="weather-icon" />
        <div class="weather-day">${day}</div>
        <div class="weather-temp">21℃</div>
      </div>
  
    `;
  })

  
 

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// create a function that encloses all the html api integration response of temperature, city, wind, humidity, icon and weather description

function showTemperature(response){
  celsiusTemperature = response.data.main.temp;

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


// create a function for the input field
function handleSubmit(event){
  event.preventDefault();
 
  let cityInputElement = document.querySelector('#city-input');
 Search(cityInputElement.value);
}

// create a city function for the city
function Search(city){
  let apiKey = "62231151ce343c4d68652e1617efc22f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(showTemperature);
}

// for the temperature conversion into fahrenheit

function displayFahrenheitTemperature(event){
  event.preventDefault();

  let temperatureElement = document.querySelector('#temperature');
  celsiusLink.classList.remove('active');
  fahrenheitLink.classList.add('active');
  let fahrenheitTemperature = (celsiusTemperature*9)/5+32;
 
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

// for the temperature conversion into celsius

function displaycelsiusTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector('#temperature');
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add('active');
  fahrenheitLink.classList.remove('active');
}

celsiusTemperature = null;

let form = document.querySelector('#search-form');
form.addEventListener('submit', handleSubmit);



let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener('click', displayFahrenheitTemperature);

let celsiusLink = document.querySelector('#celsius-link');
celsiusLink.addEventListener('click', displaycelsiusTemperature);

Search('New York');
displayForecast();