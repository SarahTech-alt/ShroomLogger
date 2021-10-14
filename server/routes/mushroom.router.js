const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
    const userId = req.user.id;
    const queryText = `SELECT "log_id", "date", "latitude", "longitude", "details", "common_name", "scientific_name","mushroom_picture_url" FROM log_entry
    JOIN mushroom_names ON "mushroom_names"."log_id" = "log_entry"."id" 
    JOIN mushroom_pictures ON "mushroom_pictures"."log_entry_id" = "log_entry"."id" WHERE "log_entry"."user_id" = $1;`;
    pool.query(queryText , [userId])
        .then(results => {
            res.send(results.rows)
        })
        .catch(error => {
            console.log('there was an error getting the logs', error);
            res.sendStatus(500);
        })
})

router.get('/:id', (req, res) => {
    const selectedId = req.params.id;
    console.log('selected log id in router', selectedId)
    const userId = req.user.id;
    console.log('user id in router', req.params.id)
    queryText = `SELECT * FROM log_entry WHERE "id" = $1 AND "log_entry"."user_id" = $2;`
    pool.query(queryText, [selectedId, userId])
    .then(results => {
        res.send(results.rows)
    })
    .catch(error => {
        console.log('there was an error getting details', error);
        res.sendStatus(500);
    })
})

module.exports = router;