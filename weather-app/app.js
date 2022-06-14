const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//
// Goal: Use both destructuring and property shorthand in weather app
//
// 1. Use destructuring in app.js, forecast.js, and geocode.js
// 2. Use property shorthand in forecast.js and geocode.js
// 3. Test your work and ensure app still works

if (process.argv.length < 3) {
    console.log('Please provide a location!')
} else {
    const address = process.argv.slice(2).join(' ')

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return console.log(error)
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            
            console.log(location)
            console.log(forecastData)
        })
    })
}