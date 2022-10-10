var form = document.querySelector('form')
var city = document.querySelector('#city')
let lat;
let lon;
const key = "5589fef8dc103aa57522ba5e43e43ac8";
let cityEl = document.getElementById("city");

function fetchCityData(city) {
    fetch('https://api.openweather.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + key)
    .then((response) => console.log(response))
//     .then((data) => {
//         console.log(data);
//         lon = data.coord.lon;
//         lat = data.coord.lat
// })        
}

function fetchCityWeather() {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + key)
    .then(function(data) {
        //create elements
        //modify elements
        //append to DOM
    })
}


document.querySelector('button').addEventListener("click", function(e) {
    let cityValue = cityEl.value
    e.preventDefault();

    fetchCityData(cityValue);
})



//set cityEl to localStorage
//get item from localStorage
    //append to pastSearches