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
                    var tempValue = data['current']['temp'];
                    var windValue = data['current']['wind_speed'];
                    var humidityValue = data['current']['humidity'];
                    var indexValue = data['current']['uvi'];

                    currentTempEl.innerHTML = tempValue;
                    currentWindEl.innerHTML = windValue;
                    currentHumidityEl.innerHTML = humidityValue;
                    currentUVIndexEl.innerHTML = indexValue;
                })
        })
        .catch(err => alert("Wrong city name!"));
})

