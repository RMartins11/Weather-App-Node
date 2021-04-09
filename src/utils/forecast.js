const request = require("request")


const forecast = (latitude, longitude, callback) => {
  const url = "http://api.weatherstack.com/current?access_key=60504a4e7e6adaa5b8f26e9232eee5d5&query=" + latitude + "," + longitude



  request({ url: url, json: true}, (error, { body }) => {
    if(error){
      callback("Unable to connect to weather service", undefined)
    } else if (body.error) {
      callback("Unable to find location", undefined)
    } else {
      callback(undefined,body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + "ºC. It feels like " + body.current.feelslike + "ºC")
    }
  })
}



module.exports = forecast