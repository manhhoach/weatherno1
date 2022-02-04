const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path=require('path')
const express= require('express');
const app = express()
const hbs=require('hbs')
const port=process.env.PORT||2000;
const dotenv=require('dotenv').config();

// template engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/templates/views'));
const partialsPath=path.join(__dirname,'/templates/partials');
hbs.registerPartials(partialsPath)

// static file
app.use(express.static(path.join(__dirname, 'public')));



app.get('/',function(req,res){
    //console.log(req.headers.host)
   res.render('index')
})

app.get('/weather', (req, res)=>{
    if(!req.query.address)
    {
       return res.send({error:'You must provide an address'})
    }
    geocode(req.query.address, (error, location)=>{
        if(error)
        {
         return res.send({error:error})
        }
        forecast(location, (error, data) => {
            if(error)
            {
             return res.send({error:error})
            }
            res.send(data)     
        })
    });
})

app.get('*', function(req,res){
    res.render('404',{
        errorMessage: 'Page not found'
    })
})
app.listen(port, ()=>{
    console.log(`server runing on http://localhost:${port}`)
})




// geocode('Ho Chi Minh', (error, location) => {
//     if (location)
//     {
//         forecast(location, (error, data) => {
//             console.log(data);
//         })
//     }
      
// })


