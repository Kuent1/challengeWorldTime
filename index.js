//Imports
const express = require('express');
const path = require('path');
const capitalCities = require('./myModules/capitalCities');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const localeFr = require('dayjs/locale/fr');

//Initialisation plugin DayJS
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale(localeFr); // Pour afficher les dates en français


//Initialisation serveur Express
const app = express();
const port = 9000;

const getLocalTime = (timezone) => {
    const localTimeZone = dayjs().tz(timezone).format('HH:mm:ss');
    return localTimeZone;
}

const getLocalDate = (timezone) => {
    const localTimeZone = dayjs().tz(timezone).format('DD MMMM YYYY ');
    return localTimeZone;
}


//Initialise Pug pour le template HTML
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
})

app.get('/cities/:city', (req, res) => {
    const city = req.params.city; //Récupère le nom de la ville
    let foundCity = capitalCities.find((arrayElm) => { return arrayElm.key === city }); //Retrouve la ville dans le tableau d'objets

    //Si la ville est trouvée, génère le HTML
    if (foundCity) {
        res.render('capitals', { title: `${city}`, date: `${getLocalDate(foundCity.value)}`, time: `${getLocalTime(foundCity.value)}`})
    } else { //Sinon, génère le 404
        res.status(404).send('City not found')
    }
})

app.listen(port, () => {
    console.log(`Worldtime listening on port ${port}`);
})