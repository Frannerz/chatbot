const { request } = require('undici');
const weatherResult = await request()
require("dotenv").config();
const googleKey = process.env.GOOGLE_API;
const weatherAPI = process.env.WEATHERAPI_COM 

// function getCoordinates(location) {
//     const coordinateURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleKey}`;
//     return fetch(coordinateURL) 
//       .then(response => response.json())
//       .then(data => {
//         const lat = data.results[0].geometry.location.lat; 
//         const lng = data.results[0].geometry.location.lng;
//         return [lat, lng];
//       });
//  }
    
// function getWeather() {
//     const [lat, lng] = getCoordinates(location);
//     const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,precipitation_probability&forecast_days=1`;

//     fetch(weatherURL)
//     .then(response=> response.json())
//     .then(data=>{

//     })
// }

function getWeather (location) {
    const weatherURL = `http://api.weatherapi.com/v1/current.json?key=${weatherAPI}&q=${location}`
    fetch(weatherURL)
    .then(response => response.json())
    .then(data => {
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;
        const time = data.location.localtime;
    })
}