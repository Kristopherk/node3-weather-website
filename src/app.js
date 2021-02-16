const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Kristopher Keene"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kristopher Keene'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Congratulations! You have found the Help Page!',
        title: 'help',
        name: 'Kristopher Keene'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide and address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
            
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
                }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
//     res.send({
//         forecast: 'Sunny, 45 degrees F',
//         location: 'Raleigh, NC',
//         address: req.query.address
// })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render("404pages", {
        message: 'Help Article not found!',
        name: 'Kristopher Keene',
        title: '404 Page'
    })
})

app.get('*', (req, res) => {
    res.render('404pages', {
        message: 'Page Not Found!',
        name: 'Kristopher Keene',
        title: '404 Page'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

