const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode.js')
const weather = require('../src/utils/weather.js')

const app = express()
//defining path for Express config
const pubDirPath = (path.join(__dirname,'../public'))
const viewsPath =  (path.join(__dirname,'../templates/views'))
const partialsPath = (path.join(__dirname,'../templates/partials'))

//setup handlebars engine and views location
app.set("view engine",'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory
app.use(express.static(pubDirPath))


app.get('',(req,res)=>{
    res.render('index',{
        title :'weather',
        name : 'indra'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'about our webiste',
        messages :  'it a website based on old clothes' ,
        name : 'indra'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        message :'this is page is for queries',
        name : 'indra'
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
         error : 'provide address to get data'
        })
    }
    
    geocode(req.query.address,(error,{longitude,latitude,location} = {})=>{
        if(error){ error }
       
        
        weather(longitude,latitude,(error,weather)=>{
             if(error){
                 return res.send({error})
             }
             res.send({
                 weather : weather,
                 location,
                 address : req.query.address
             })
        })
    })
})

app.get("/products",(req,res)=>{
    if(!req.query.search){
        return res.send({
          product : 'you must provide search item'
       })        
    }

    res.send ({
        product : []
    })
})


app.get('/about/*',(req,res)=>{
    res.send('about article not found')
})

app.get('/help/*',(req,res)=>{
    res.send('article not found')
})

    app.get('*',(req,res)=>{
        res.render('404',{
            title :'404',
            name : 'indra sena',
            errormessage : 'page not found'
        })
    })




app.listen(3000,()=>{
    console.log('port:3000 is running')
})
