var form = document.querySelector('form')
var cityInput = document.getElementById('city')
let lat;
let lon;
let temp;
let cityData;
let forecastData;
const key = "5589fef8dc103aa57522ba5e43e43ac8";
var currentEL = document.getElementById('current');
var forecastEl = document.getElementById('forecast');
// let cityEl = document.getElementById("city");


function searchCity(event) {
    event.preventDefault()
    var cityName = cityInput.value

    fetch('https://api.openweathermap.org/data/2.5/weather/?q=' + cityName + '&units=imperial&appid=' + key)
    .then(function(response) {
        if (response.status === 200) {
            return response.json()
            //set to localstorage           
        } else if (response.status === 404) {

        }
    })
    .then(function(data) {
        lat = data.coord.lat
        lon = data.coord.lon
        console.log(data)
        var h2 = document.createElement('h2')
        var img = document.createElement('img')
        
        h2.textContent = data.name  
        img.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        currentEL.append(h2)
        currentEL.append(img)
    
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&cnt=5&appid=' + key)
    .then(function(response) {
        return response.json()
        })
    .then(function(weather) {
        console.log(weather)
        // var h2 = document.createElement('h2')
        // var img = document.createElement('img')
        // //modify elements
        
    }) 
    })
        
    
    
    


}


// function fetchCityWeather() {
//     fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + key)
//     .then(function(data) {
//         //create elements
//         //modify elements
//         //append to DOM
//     })
// }

form.addEventListener('submit', searchCity)



//set cityEl to localStorage
//get item from localStorage
    // append to pastSearches