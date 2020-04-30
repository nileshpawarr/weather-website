const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/forecast?access_key=2f0c5353a4ff1e7a9bbf10ea385c22ef&query=' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degress out. It feels like '+response.body.current.feelslike+ ' degrees out. The humidity is ' + response.body.current.humidity + '%.')
        }
    })
}

module.exports = forecast