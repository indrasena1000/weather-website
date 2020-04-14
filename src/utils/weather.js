const request =  require('request')

const weather = (longitude,latitude,callback)=>{
    const url = "http://api.openweathermap.org/data/2.5/weather?"+"&lon="+longitude+"&lat="+latitude +"&units=metric&appid=7cdb50cd2fef332cb91b24575c220977"
    request({url:url,json:true},(error,response)=>{
      if(error){
        callback("unable to connect",undefined)
      }else if(response.body.error){
        callback('unable to find details.try another location',undefined)
      }else {
      callback(undefined,
     "it is currently " + response.body.main.temp + " degree celsius")
      }
    })
  }
module.exports = weather  
  