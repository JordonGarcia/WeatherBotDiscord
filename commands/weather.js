import axios from 'axios';
import fs from 'fs';
import { KToF, KToC, metersToKPH, metersToMPH } from '../functions/conversions.js';

async function sendWeather(client, message, args, APIAuth) {
    // Fetch API weather data
    let getWeatherData = async () => {
        let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args.join(' ')}&appid=${APIAuth}`);
        let weather = response.data;
        return weather;
    };

    let weatherData = await getWeatherData();

    // Simple UI embed to display weather data: Usage ".weather exampleCity"
    const weatherEmbedCity = {
        color: 0x0099ff,
        author: {
            name: `Weather for ${weatherData.name}, ${weatherData.sys.country}`,
        },
        description: 'Current Conditions:',
        thumbnail: {
            url: 'https://i.ibb.co/nP4nbR6/Weather-Icon5.png',
        },
        fields: [
            {
                name: '`Current Temperature:`',
                value: `${Math.round(KToF(weatherData.main.temp))}\xB0 Fahrenheit \n ${Math.round(KToC(weatherData.main.temp))}\xB0 Celsius`,
            },
            {
                name: '`Current Wind Speed`',
                value: `${Math.round(metersToKPH(weatherData.wind.speed))} KPH \n ${Math.round(metersToMPH(weatherData.wind.speed))} MPH`,
            },
            {
                name: '`Current Conditions`',
                value: `${weatherData.weather[0].description}`,
            },
        ],
        timestamp: new Date(),
        footer: {
            text: 'Weather Live',
        },
    };

    // Log discord command API requests to logs.txt
    message.channel.send({ embed: weatherEmbedCity });
    fs.appendFileSync('logs.txt', `[Weather City Request] ${message.member.user.tag} Requested Weather data from "${args.join(' ')}" - Discord ID [${message.member.id}]` + '\n');

}

export default sendWeather;