const path = require('path')
const express = require('express')
const app = express()

const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const weatherstack = require('./utils/weatherstack.js')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')
// const helpPageFilePath = path.join(__dirname, '../public/help.html')
// const aboutPageFilePath = path.join(__dirname, '../public/about.html')
hbs.registerPartials(partialsDirectoryPath)

// setting handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)

// setup static directory path
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title : "Weather App",
        heading : "Weather App",
        content : "This is the index page with some content, using hbs template",
        name : "Diwakar Panchal"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : "About",
        heading : "About Me",
        content : "Hi, I am Diwakar Panchal and this is my photograph.",
        image_src : "/img/my-pic.jpg",
        name : "Diwakar Panchal"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : "Help",
        heading : "Help",
        content : "Hi, please contact admin for any help related to this web server.",
        name : "Diwakar Panchal"
    })
})


// app.use('/help',express.static(helpPageFilePath))
// app.use('/about', express.static(aboutPageFilePath))
//  app.get('', (req, res) => {
//     res.send('<h2><i>HELLO WORLD!!!</i></h2>');
//  })

 /* app.get('/help', (req, res) => {
    res.send([
        {
            "Helper 1" : "Diwakar"
        },
        {
            "Helper 2" : "Shubham"
        }

    ]);
 })

 app.get('/about', (req, res) => {
    res.send("About Page");
 }) */

 app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : "You must provide an address to get weather information"
        })
    }

    const address = req.query.address
    const units = 'm'
    geocode(address, (error, {latitude, longitude, location}) => {
        if(error){
          return res.send({ error})
        } else {
            weatherstack(latitude, longitude, location, units, (err, result) => {
                if(err){
                   return res.send({ "Weather Stack Error" : err})
                } else {
                   return res.send({
                        'forcast' : result,
                        location,
                        address
                   })
                }
            })
        }
       
    })

    // res.send({
    //     'location' : req.query.address,
    //     'forcast' : "Rainy"
    // });
 })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Help : 404 Page",
        heading: "Help - 404 Page",
        error: "Help article not found"
    })
}) 
 
app.get('*', (req, res) => {
    res.render('404', {
        title: "404 Page",
        heading: "404 Page",
        error: "Page not found"
    })
})

 app.listen(3000, () => {
    console.log("Server is up and running on port 3000.");
 })