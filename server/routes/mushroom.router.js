const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();

router.get('/', (req, res) => {
    const queryText = `SELECT "log_id", "date", "latitude", "longitude", "details", "common_name", "scientific_name","mushroom_picture_url" FROM "log_entry"
    JOIN "mushroom_names" ON "mushroom_names"."log_id" = "log_entry"."id" 
    JOIN "mushroom_pictures" ON "mushroom_pictures"."log_entry_id" = "log_entry"."id";`;
    pool.query(queryText)
        .then(results => {
            res.send(results.rows)
        })
        .catch(error => {
            console.log('there was an error getting the logs', error);
            res.sendStatus(500);
        })
})



module.exports = router;