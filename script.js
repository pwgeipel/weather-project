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

function removeCards() {
    const weatherCards = document.querySelectorAll('.card');
    weatherCards.forEach((card) => {
        card.remove();
    })
};

function resetInput() {
    cityInput.value = '';
    cityInput.setAttribute('placeholder', "Enter a location")
}

function searchCity(event) {
    event.preventDefault()
    var cityName = cityInput.value.trim();
    removeCards();
    resetInput();
}    
function fetchCityData(cityName) {
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

        fetchCityLocation(lon, lat);
        return cityData;

        // var h2 = document.createElement('h2')
        // var img = document.createElement('img')
        
        // h2.textContent = data.name  
        // img.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        // currentEL.append(h2)
        // currentEL.append(img)
})
}
function fetchCityLocation(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&cnt=5&appid=' + key)
    .then(function(response) {
        return response.json()
        })
    .then(function(weather) {
        if (response.status === 200) {
            forecastData = data;
            createCard(forecastData);
        } else {
            // errormessage
        }
        
        
    }) 
    
}        
    
    
    







form.addEventListener('submit', searchCity)



//set cityEl to localStorage
//get item from localStorage
    // append to pastSearches