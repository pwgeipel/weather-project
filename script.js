// const kelvin = 273;
// const key = "5589fef8dc103aa57522ba5e43e43ac8";

// function getWeather(latitude, longitude) {
//     let api = `https://api.openweathermap.org/data/2.5/forecast?lat={latitude}&lon={longitude}&appid={key}`;

//     fetch(api)
//         .then(function(response) {
//             console.log(response)
//         })}

fetch(`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={5589fef8dc103aa57522ba5e43e43ac8}`)
    .then(function(response) {
        console.log(response)
    })