const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
const { default: axios } = require('axios');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');



router.post('/', rejectUnauthenticated, (req,res) => {
    console.log('in maps router');
    const googleKey = process.env.GOOGLE__MAPS_API_KEY
    axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA5kx2R22QebhjWgNDJLG5_xuFJAg-gcrM`)
    .then(results => {
        console.log('success in posting to api', results.data);
        res.send(results.data);
    }).catch(error =>{
        console.log('there was an error posting to api', error);
        res.sendStatus(500);
    })
})

module.exports = router;