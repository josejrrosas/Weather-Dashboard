var searchInputEl = document.getElementById('inputSearch');
var searchButtonEl = document.getElementById('searchBtn');
var addCityEl = document.getElementById('addCity');
var cityListEl =$("#cityList");


var currentSettingEl = document.querySelector('#currentSetting');
var currentWeatherEl = document.getElementsByClassName('currentWeather');
var currentImgEl = document.getElementById('currentImg');
var currentTempEl = document.querySelector('#temp');
var currentWindEl = document.querySelector('#wind');
var currentHumidityEl = document.querySelector('#humidity');
var currentUVIndexEl = document.querySelector('#UVIndex');

var forecastDateEl = document.getElementsByClassName("forecastDate");
var forecastImgEl = document.getElementsByClassName('forecastImg');
var forecastTempEl = document.getElementsByClassName('forecastTemp');
var forecastWindEl = document.getElementsByClassName('forecastWind');
var forecastHumidityEl = document.getElementsByClassName('forecastHumidity');

var forecastCardEl = document.getElementsByClassName('forecastCard');

var myKey = 'e55d093b8b969691fea4b7cda7ecf344';



searchButtonEl.addEventListener('click', function (event) {
    event.preventDefault()
    $(".weatherDisplay").show();
    $(".forecast").show();
    getWeather();
})

    function getWeather(cityName){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=e55d093b8b969691fea4b7cda7ecf344')
        .then(response => response.json())
        .then(data => {
            var lat = data['coord']['lat'];
            var long = data['coord']['lon']
            
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude=hourly,minutely&appid=e55d093b8b969691fea4b7cda7ecf344')
                .then(response => response.json())
                .then(data => {

                    var today = moment().format('[(]L[)]');
                    var iconValue = data['current']['weather'][0]['icon'];
                    var tempValueConversion = (data['current']['temp'] * (9/5)) - 459.67;
                    var tempValue ='Temperature: ' +  Math.floor(tempValueConversion) + 'F';
                    var windValue ='Wind: ' +  data['current']['wind_speed'] + 'mph';
                    var humidityValue ='Humidity: ' + data['current']['humidity'] + '%';
                    UVIndexValue = data['current']['uvi']
                    var indexValue ='UV Index: ' + UVIndexValue;

                    var imageLink = 'http://openweathermap.org/img/wn/' + iconValue + '@2x.png';
                    currentSettingEl.innerHTML = cityName + ' ' + today;
                    
                    currentImgEl.src = imageLink;

                    currentTempEl.innerHTML = tempValue;
                    currentWindEl.innerHTML = windValue;
                    currentHumidityEl.innerHTML = humidityValue;
                    currentUVIndexEl.innerHTML = indexValue;
                    cityName = "";

                    for(i = 0; i < 5; i ++){
                        var new_date = moment().add(i + 1, 'days').format('MM/DD/YYYY');

                        var iconValueDaily = data['daily'][i+1]['weather'][0]['icon'];
                        var imageLinkDaily = 'http://openweathermap.org/img/wn/' + iconValueDaily + '@2x.png';

                        var tempValueConversionDaily = (data['daily'][i+1]['temp']['day'] * (9/5)) - 459.67;
                        var tempValueDaily ='Temperature: ' +  Math.floor(tempValueConversionDaily) + 'F';
                        var windValueDaily ='Wind: ' +  data['daily'][i+1]['wind_speed'] + 'mph';
                        var humidityValueDaily ='Humidity: ' + data['daily'][i+1]['humidity'] + '%';

                        forecastDateEl.item(i).innerHTML= new_date;
                        forecastImgEl.item(i).src = imageLinkDaily;
                        forecastTempEl.item(i).innerHTML = tempValueDaily;
                        forecastWindEl.item(i).innerHTML = windValueDaily;
                        forecastHumidityEl.item(i).innerHTML = humidityValueDaily;
                        
                    }

                      if(UVIndexValue > 6){
                            currentUVIndexEl.classList.add("bad");
                            currentUVIndexEl.classList.remove("moderate");
                            currentUVIndexEl.classList.remove("good");

                          }
                      
                          else if(UVIndexValue > 3){
  
                            currentUVIndexEl.classList.add("moderate");
                            currentUVIndexEl.classList.remove("bad");
                            currentUVIndexEl.classList.remove("good");

                      
                          }
                      
                          else{
                            currentUVIndexEl.classList.remove("bad");
                            currentUVIndexEl.classList.remove("moderate");
                            currentUVIndexEl.classList.add("good");
                          }
                })
            })
        
        console.log(searchInputEl.value)
}

var cities = [];

// The following function renders items in a todo list as <li> elements
function renderCities() {
  // Clear cityList element
  cityListEl.empty();
  
  // Render a new li for each city
  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];
    
    var li = $("<li>").text(city);
    li.attr("id","listC");
    li.attr("data-city", city);
    li.attr("class", "list-group-item");
    cityListEl.prepend(li);
  }
  //Get Response weather for the first city only
  if (!city){
    return
    } 
    else{
        getWeather(city)
    };

}   


// This function is being called below and will run when the page loads.
function init() {
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  if (storedCities !== null) {
    cities = storedCities;
  }

  renderCities();
}

  // Stringify and set key in localStorage to todos array
function storeCities() {
  localStorage.setItem("cities", JSON.stringify(cities));
}


$("#searchBtn").on("click", function(event){
  event.preventDefault();

// This line will grab the city from the input box
var city = $("#inputSearch").val().trim();

// Return from function early if submitted city is blank
if (city === "") {
    return;
}
//Adding city-input to the city array
cities.push(city);
// Store updated cities in localStorage, re-render the list
storeCities();
renderCities();
});


$(document).on("click", "#listC", function() {
  var thisCity = $(this).attr("data-city");
  getWeather(thisCity);
});

init()