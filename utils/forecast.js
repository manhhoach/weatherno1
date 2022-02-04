
const request = require('request')

module.exports = (geo, callback) => {

    const urlWeather = `http://api.weatherstack.com/forecast?access_key=${process.env.KEY_FORECAST}&query=${geo.lat},${geo.lng}`;
    request({ url: urlWeather, json: true }, (err, response) => {
        if (err) {
            callback('Unable to connect to weather service', undefined)
        }
        else if (response.body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, {weather: response.body.current, location: geo.location})
        }
    });
}