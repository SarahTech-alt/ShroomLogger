const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "log_entry"`;
    pool.query(queryText)
        .then(results => {
            res.send(results.rows)})
        .catch(error => {
            console.log('there was an error getting the logs', error);
            res.sendStatus(500);
        })
})
  
  module.exports = router;