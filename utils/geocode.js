
const request = require('request')

module.exports = (address, callback) => {
    const urlMap = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.KEY_GEOCODE}`;
    request({ url: urlMap, json: true }, (err, response) => {
        if (err) {
            callback('Unable to connect to location service!', undefined)
        }
        else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search!', undefined)
        }
        else {
           callback(undefined, {
            lng: response.body.features[0].center[0],
            lat: response.body.features[0].center[1],
            location: response.body.features[0].place_name
           })
        }
    })
}