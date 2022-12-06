const request = require('request')

const geocode = (location, callback) => {
    const access_token = 'pk.eyJ1IjoiZGl3YWthci1wYW5jaGFsMzA2IiwiYSI6ImNsMXhwZG4wZDA0dHczam1rcms0c2w1cDEifQ.S14pl70pXEkD8jJbzs3DsA'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(location) +'.json?access_token='+access_token
    // API request
    request({url, json:true}, (error, {body} = {}) => {
        if(error){
            callback('There is some error while calling the API.', undefined)
        } else if(body.features === undefined){
            callback('Please enter a valid location.', undefined)
        } else {
            const lat = body.features[0].center[1]
            const long = body.features[0].center[0]
            const location = body.features[0].place_name
            callback(undefined, {
                latitude : lat,
                longitude : long,
                location
            })
        }
    })
}

module.exports = geocode