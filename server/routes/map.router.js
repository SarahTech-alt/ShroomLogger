const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
const { default: axios } = require('axios');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');



router.post('/', rejectUnauthenticated, (req, res) => {
    axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDi3wwLRkmy8M8sxWmqjy87KmVUdTzLGjg`)
        .then(results => {
            res.send(results.data);
        }).catch(error => {
            res.sendStatus(500);
        })
})

module.exports = router;