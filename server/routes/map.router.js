const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
const { default: axios } = require('axios');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');



router.post('/', rejectUnauthenticated, (req, res) => {
    const googleKey = process.env.GOOGLE__MAPS_API_KEY
    axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${googleKey}`)
        .then(results => {
            res.send(results.data);
        }).catch(error => {
            res.sendStatus(500);
        })
})

module.exports = router;