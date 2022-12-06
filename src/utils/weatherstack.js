const request = require('request')

const weatherstack = (lat, long, location, units, callback) => {
    if(units === undefined) {
        units = 'm'
    }
    const url = 'http://api.weatherstack.com/current?access_key=58de01a9cfc3b748348c51e1ecf7e03e&query='+lat+','+long+'&units='+units

    request({url, json:true}, (error, {body} = {}) => {
        if(error){
            callback('There is some error while calling the API.', undefined)
        } else if(body.success === false){
            callback(body.error.info, undefined)
        } else {
            const weather = body.current.weather_descriptions[0]
            const temperature = body.current.temperature
            const feelsLike = body.current.feelslike
            const precip = body.current.precip
            callback(undefined, weather+ ' weather in '+ location +'.Temperature is '+temperature+ ' degrees and feels like '+feelsLike+' degrees.\n '+precip+'% chances of raining.')
        }
    })
}

module.exports = weatherstack