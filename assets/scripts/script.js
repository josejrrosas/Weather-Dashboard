var searchInputEl = document.getElementById('inputSearch');
var searchButtonEl = document.getElementById('searchBtn');
var addCityEl = document.getElementById('addCity');

var currentWeatherEl = document.getElementsByClassName('currentWeather');
var currentTempEl = document.querySelector('#temp');
var currentWindEl = document.querySelector('#wind');
var currentHumidityEl = document.querySelector('#humidity');
var currentUVIndexEl = document.querySelector('#UVIndex');

var forecastCardEl = document.getElementsByClassName('forecastCard');

var myKey = 'e55d093b8b969691fea4b7cda7ecf344';
searchButtonEl.addEventListener('click', function(name){
    console.log(searchInputEl.value);
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+searchInputEl.value+'&appid=e55d093b8b969691fea4b7cda7ecf344')
    .then(response => response.json())
    .then(data => console.log(data))
    
    .catch(err => alert("Wrong city name!"));
    })