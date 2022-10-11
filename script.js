var form = document.querySelector('form')
var cityInput = document.getElementById('city')
let lat;
let lon;
const key = "5589fef8dc103aa57522ba5e43e43ac8";
// let cityEl = document.getElementById("city");


function searchCity(event) {
    event.preventDefault()
    var cityName = cityInput.value

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + key)
    .then(function(response) {
        if (response.status === 200) {
            return response.json()           
        } else if (response.status === 404) {

        }
    })
    .then(function(data) {
        lat = data.coord.lat
        lon = data.coord.lon
        console.log(data)
    
    // fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + key)
    // .then(function(response) {
    //     console.log(response)
    //     })
    // })
// })        
    // })
    
    


})



// function fetchCityWeather() {
//     fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + key)
//     .then(function(data) {
//         //create elements
//         //modify elements
//         //append to DOM
//     })
// }

form.addEventListener('submit', searchCity)

// document.querySelector('button').addEventListener("click", function(e) {
//     let cityValue = cityEl.value
//     e.preventDefault();

//     fetchCityData(cityValue);
// })



//set cityEl to localStorage
//get item from localStorage
    // append to pastSearches