const http = require('http')
const url = 'http://api.weatherstack.com/current?access_key=2076e5bbd27eec4e84090824b858e6b8&query=45,-75&units=f'

const request = http.request(url, (response) => {
    let data = ''

    // Fires when data is received
    response.on('data', (chunk) => {
        data += chunk.toString()
    })

    // Fires when the response is complete
    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', (error) => {
    console.log('An error', error)
})

request.end()