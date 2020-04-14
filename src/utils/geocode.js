const request = require('request')


const geocode = (address,callback)=>{
 
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiaW5kcmFzZW5hIiwiYSI6ImNrOGVjODA1bDA1eGczbHF0ZXh4MnZxOXAifQ.csagcLVI_QaLZUgOfnAoeA&limit=1"
    
    request({url : url,json : true},(error,response)=>{
       if(error){
         callback("unable to connect",undefined)
       }else if(response.body.features.length ===0){
         callback("unable to fetch details.search another location",undefined)
       }else {
         callback(undefined,{
          longitude : response.body.features[0].center[0],
          latitude :+response.body.features[0].center[1],
          location :response.body.features[0].place_name
         })
       }
    })
    }

    module.exports = geocode