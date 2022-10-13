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
    cityInput.setAttribute('placeholder', "Enter a location");
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
        cityData = data;

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
    
function createCityCard(cityData) {
    const currentCard = document.createElement('div');
    currentCard.classList.add('card', 'p-3', 'text-center');

    let currentName = document.createElement('h3');
    currentName.innerText = cityData.name;

    let currentDate = document.createElement('h4');
    currentDate.innerText = moment.unix(cityData.dt).format('dddd, MMMM DD, YYYY');

    let currentTemp = document.createElement('h4');
    currentTemp.innerText = cityData.main.temp + '° F';

    let currentWind = document.createElement('p');
    currentWind.innerText = 'Wind Speed: ' + cityData.wind.speed + ' mph';

    let currentHumidity = document.createElement('p');
    currentHumidity.innerText = 'Humidity: ' + cityData.main.humidity + '%';

    currentCard.appendChild(currentName);
    currentCard.appendChild(currentDate);
    currentCard.appendChild(currentTemp);
    currentCard.appendChild(currentWind);
    currentCard.appendChild(currentHumidity);
    currentEl.appendChild(currentCard);
};    
    
function createCard(forecastData) {
    for (var i = 5; i < forecastData.list.length; i+=8) {
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('card', 'text-center', 'px-3');

        const forecastDate = document.createElement('h5');
        forecastDate.innerText = moment.unix(forecastData.list[i].dt).format('dddd, MMMMM DD');

        const forecastTemp = document.createElement('p');
        forecastTemp.innerText = forecastData.list[i].main.temp + '° F';

        const forecastWind = document.createElement('p');
        forecastWind.innerText = 'Wind Speed: ' + forecastData.list[i].wind.speed + ' mph';

        const forecastHumidity = document.createElement('p');
        forecastHumidity.innerText = 'Humidty: ' + forecastData.list[i].main.humidty + '%';

        forecastCard.appendChild(forecastDate);
        forecastCard.appendChild(forecastTemp);
        forecastCard.appendChild(forecastWind);
        forecastCard.appendChild(forecastHumidity);
        forecastEl.appendChild(forecastCard);

    }
}






form.addEventListener('submit', searchCity)



//set cityEl to localStorage
//get item from localStorage
    // append to pastSearches