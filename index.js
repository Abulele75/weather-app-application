function UpdateWeather(response){
    let temperature = document.querySelector("#weather-temperature");
    
    let temperatureElement=response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#Humidity");
    let windSpeedElement = document.querySelector("#windSpeed");
    let timeElement = document.querySelector("#time");
    let date = new Date ( response.data.time * 1000)
    let weatherApp=document.querySelector("#weatherApp");

    weatherApp.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" />`;


    
    
    cityElement.innerHTML= response.data.city;
    timeElement.innerHTML= formatDate(date);
   descriptionElement.innerHTML = response.data.condition.description;

   humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
   windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
   temperature.innerHTML = Math.round(temperatureElement);

   getForecast(response.data.city);
}


function formatDate (date){
    
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    if (minutes <10){
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}





function SearchCity (city) {
let apiKey = "4f430cb68t0bf0b27o781c38a281438d"
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units+metric`;
axios.get(apiUrl).then(UpdateWeather);
}

function Search(event){
    event.preventDefault();

    let searchInput = document.querySelector("#input-city");

SearchCity(searchInput.value);
}

function formatDay(timestamp){
    let date = new Date (timestamp * 1000);
    let days = ["Sun", "Mon","Tue", "Wed", "Thu","Fri","Sat"];

    return days[date.getDay()];
}

function getForecast(city){
    let apiKey = "4f430cb68t0bf0b27o781c38a281438d"
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units+metric`;
axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response){
    console.log(response.data);
    

    

    let forecastHtml = "";
    response.data.daily.forEach(function(day) {
        forecastHtml=  forecastHtml +
         `<div class="weather-forecast-day"> 
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <div >
        <img src="${day.condition.icon_url}" class="weather-forecast-icon"/> </div>
        <div class="weather-forecast-temperature">
            <div class="temperatures"> <strong>${Math.round(day.temperature.minimum)}°</strong> </div>
            <div class="temperatures"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
        </div>
    </div> `;

    });

    let forecastElement = document.querySelector("#forecast");

    forecastElement.innerHTML= forecastHtml;

 
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit" , Search);

SearchCity("Durban");

