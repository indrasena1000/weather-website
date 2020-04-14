c

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch('http://api.openweathermap.org/data/2.5/weather?&lon=77.46&lat=17.36&units=metric&appid=7cdb50cd2fef332cb91b24575c220977').then((response)=>{
//     response.json().then((weather)=>{
//         console.log(weather)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#fullLoc')
const messageTwo = document.querySelector('#weatherDetails') 


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
  messageOne.textContent = '..loading'
  messageTwo.textContent = ' '
    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
               messageOne.textContent=data.error
               
            }else {
                messageOne.textContent=data.location
                messageTwo.textContent=data.weather
                //console.log(data.weather)
            }
        })
    }) 
})