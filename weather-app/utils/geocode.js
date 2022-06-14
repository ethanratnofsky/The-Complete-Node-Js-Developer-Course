const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZXRoYW5raW5ldGlrIiwiYSI6ImNsNDVwaGI4YzAwdjkzZW13ZXZsZmR1OWgifQ.TW9AevPHIVPX3jkMc1h3xw&limit=1`

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geocoding service!', undefined)
        } else if (body.features == 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode