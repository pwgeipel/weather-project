// var form = document.querySelector('form')
var cityInput = document.getElementById('cityInput')
let lat;
let lon;
let temp;
let cityData;
let forecastData;
let cityArray = [];

const key = "5589fef8dc103aa57522ba5e43e43ac8";
var currentEl = document.getElementById('current');
var forecastEl = document.getElementById('forecast');
const buttonDiv = document.getElementById('pastSearches');
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

function setLocalStorage(city, cityArray) {
    if (city != null) {
        cityArray.includes(city) ? null : cityArray.push(city);
    }
    localStorage.setItem('city', JSON.stringify(cityArray));
    console.log(city)
}

function fetchLocalHistory() {
    cityArray = localStorage.getItem('city');
    cityArray = cityArray ? JSON.parse(cityArray) : [];
    // return cityArray;

    for (i = 0; i < cityArray.length; i++) {
        var create = $("<button>")
        create.attr("class", "btn btn-outline-secondary")
        create.attr("type", "button")
        create.text(cityArray[i])
        buttonDiv.prepend(create[0])
        console.log(create);
}
}
function fetchCityData(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather/?q=' + city + '&units=imperial&appid=' + key)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        cityData = data;
        
        lat = cityData.coord.lat
        lon = cityData.coord.lon
        createCityCard(cityData);
        fetchCityLocation(lon, lat);
        return cityData;    
      
        
    })
    

}

function displayErrorMessage() {
    const errorCard = document.createElement('div');
    errorCard.classList.add('card', 'text-center', 'py-4');
    const errorMessage = document.createElement('h5');
    errorMessage.innerText = "Please try again.";
    errorCard.appendChild(errorMessage);
    currentEl.appendChild(errorCard);
};

function fetchCityLocation(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + key + '&units=imperial')
    .then(function(response) {
        return response.json()
        })
    .then(function(data) {
        if (data.cod == 200) {
            forecastData = data;
            createCard(forecastData);
            console.log(forecastData);
        } else {
            displayErrorMessage();
        }        
    })     
}        
    
function createCityCard(cityData) {
    const currentCard = document.createElement('div');
    currentCard.classList.add('card', 'p-3', 'text-center');

    let currentName = document.createElement('h3');
    currentName.innerText = cityData.name;

    let currentDate = document.createElement('h4');
    currentDate.innerText = moment.unix(cityData.dt).format('dddd, MMMM DD');

    let currentTemp = document.createElement('h4');
    currentTemp.innerText = cityData.main.temp + '?? F';

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
    for (var i = 5; i < forecastData.list.length; i+= 8) {
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('card', 'text-center', 'px-3');

        const forecastDate = document.createElement('h5');
        forecastDate.innerText = moment.unix(forecastData.list[i].dt).format('dddd, MMMM DD');

        const forecastTemp = document.createElement('p');
        forecastTemp.innerText = (forecastData.list[i].main.temp + 100) + '?? F';

        const forecastWind = document.createElement('p');
        forecastWind.innerText = 'Wind Speed: ' + forecastData.list[i].wind.speed + ' mph';

        const forecastHumidity = document.createElement('p');
        forecastHumidity.innerText = 'Humidty: ' + forecastData.list[i].main.humidity + '%';

        forecastCard.appendChild(forecastDate);
        forecastCard.appendChild(forecastTemp);
        forecastCard.appendChild(forecastWind);
        forecastCard.appendChild(forecastHumidity);
        forecastEl.appendChild(forecastCard);

    }
};

document.querySelector('button').addEventListener('click', function(event) {
    event.preventDefault();
    cityName = cityInput.value.trim();
    removeCards();
    resetInput();
    fetchCityData(cityName);
    setLocalStorage(cityName, cityArray);
    fetchLocalHistory()
});