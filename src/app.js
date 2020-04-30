const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../templates/views');
const partialsDirPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialsDirPath);

app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        footer: 'Nilesh Pawar'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather',
        helpText: 'Some helpful text',
        footer: 'Nilesh Pawar'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather',
        footer: 'Nilesh Pawar'
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        footer: 'Nilesh Pawar',
        errorMessage: '404 Article Not Found'
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecastData,
                location,
                address
            })
        });
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        });
    }

    res.send({
        products: []
    });

});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        footer: 'Nilesh Pawar',
        errorMessage: '404 Page Not Found'
    });
});


app.listen(3000, () => {
    console.log('server started');
});
