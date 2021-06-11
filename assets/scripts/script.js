var searchInputEl = document.getElementById('inputSearch');
var searchButtonEl = document.getElementById('searchBtn');
var addCityEl = document.getElementById('addCity');

var currentSettingEl = document.querySelector('#currentSetting');
var currentWeatherEl = document.getElementsByClassName('currentWeather');
var currentTempEl = document.querySelector('#temp');
var currentWindEl = document.querySelector('#wind');
var currentHumidityEl = document.querySelector('#humidity');
var currentUVIndexEl = document.querySelector('#UVIndex');

var forecastDateEl = document.querySelector('#forecastDate');
var forecastIconEl = document.querySelector('#forecastIcon');
var forecastTempEl = document.querySelector('#forecastTemp');
var forecastWindEl = document.querySelector('#forecastWind');
var forecastHumidityEl = document.querySelector('#forecastHumidity');

var forecastCardEl = document.getElementsByClassName('forecastCard');

var myKey = 'e55d093b8b969691fea4b7cda7ecf344';

searchButtonEl.addEventListener('click', function (event) {
    event.preventDefault()
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchInputEl.value + '&appid=e55d093b8b969691fea4b7cda7ecf344')
        .then(response => response.json())
        .then(data => {
            var lat = data['coord']['lat'];
            var long = data['coord']['lon']
            
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude=hourly,daily&appid=e55d093b8b969691fea4b7cda7ecf344')
                .then(response => response.json())
                .then(data => {

                    var today = moment().format('[(]L[)]');
                    var iconValue = data['current']['weather']['icon'];
                    var tempValueConversion = (data['current']['temp'] * (9/5)) - 459.67;
                    var tempValue ='Temperature: ' +  Math.floor(tempValueConversion) + 'F';
                    var windValue ='Wind: ' +  data['current']['wind_speed'] + 'mph';
                    var humidityValue ='Humidity: ' + data['current']['humidity'] + '%';
                    var indexValue ='UV Index: ' + data['current']['uvi'];

                    console.log(iconValue);
                    currentSettingEl.innerHTML = searchInputEl.value + ' ' + today + iconValue;
                    currentTempEl.innerHTML = tempValue;
                    currentWindEl.innerHTML = windValue;
                    currentHumidityEl.innerHTML = humidityValue;
                    currentUVIndexEl.innerHTML = indexValue;


                })
                fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + searchInputEl.value + '&appid=e55d093b8b969691fea4b7cda7ecf344')
                    .then(response => response.json())
                    .then(data => console.log(data));

            })
        .catch(err => alert("Wrong city name!"));
})

