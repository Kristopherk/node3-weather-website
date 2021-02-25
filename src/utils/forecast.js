const request = require('request')


const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=c8384d65acd4721b841846d347450450&query=' + latitude + ',' + longitude +'&units=f'

request({  url, json: true }, (error, { body } = {})=> {
    if (error) {
        callback('Unable to connect to weather service!', undefined)
    } else if (body.error){
        callback('Unable to find location', undefined)
    } else {
        callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees. It feels like " + body.current.feelslike + " degrees, however. The current date and local time are " + body.location.localtime)
                 } })

}

// response.body.current.weather_descriptions[0] + ". It is currently", response.body.current.temperature, "degrees in Raleigh, NC. It feels like", response.body.current.feelslike, "degree, however.")

module.exports = forecast



// {
//             description: response.body.current.weather_descriptions[0],
//             weather: response.body.current.temperature,
//             feels: response.body.current.feelslike
//         }
// + response.body.location.name +