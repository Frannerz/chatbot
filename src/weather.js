const { request } = require('undici');
//const weatherResult = await request()
require("dotenv").config();
//const googleKey = process.env.GOOGLE_API;
const weatherAPI = process.env.WEATHERAPI_COM 

function getWeather (message) {
    const messageContent = message.content.toLowerCase(); // Convert to lowercase for case-insensitivity
    const location = messageContent.split(' ').length === 2?
    messageContent.split(' ')[1] : messageContent.split(' ').slice(1).join('%20');
    const messageLocation = messageContent.split(' ').length === 2?
    messageContent.split(' ')[1] : messageContent.split(' ').slice(1).join(' ');
    const weatherURL = `http://api.weatherapi.com/v1/current.json?key=${weatherAPI}&q=${location}`
    fetch(weatherURL)
    .then(response => {
        if(!response.ok){
            message.reply(`Couldn't retrieve weather for ${location}`)
        } 
    return response.json()})
    .then(data => {
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;
        const degreeSymbol = '\u00B0';
        message.reply(`Weather in ${messageLocation}: ${condition}, ${temp+degreeSymbol}C `)
    })
    .catch(error => console.log('Error getting weather:', error))
}

module.exports = { getWeather };