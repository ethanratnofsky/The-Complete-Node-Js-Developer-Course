const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2076e5bbd27eec4e84090824b858e6b8&query=${latitude},${longitude}&units=f`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const {temperature, feelslike, weather_descriptions} = body.current
            const weather_desc = weather_descriptions[0]

            callback(undefined, `${weather_desc}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`)
        }
    })
}

module.exports = forecast