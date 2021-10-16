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
    pool.query(queryText, [userId])
        .then(results => {
            res.send(results.rows)
        })
        .catch(error => {
            console.log('there was an error getting the logs', error);
            res.sendStatus(500);
        })
})

router.get('/detail/:id', (req, res) => {
    const selectedId = req.params.id;
    console.log('selected log id in router', selectedId);
    const userId = req.user.id;
    console.log('user id in router', req.user.id)
    queryText = `SELECT "log_id", "date", "latitude", "longitude", "details", "common_name", "scientific_name","mushroom_picture_url" FROM log_entry
    JOIN mushroom_names ON "mushroom_names"."log_id" = "log_entry"."id" 
    JOIN mushroom_pictures ON "mushroom_pictures"."log_entry_id" = "log_entry"."id" WHERE "log_entry"."id" = $1 AND "log_entry"."user_id" = $2;`
    pool.query(queryText, [selectedId, userId])
        .then(results => {
            console.log('sending back id details', results.rows);
            res.send(results.rows)
        })
        .catch(error => {
            console.log('there was an error getting details', error);
            res.sendStatus(500);
        })
})

router.delete('/delete/:id', (req, res) => {
        const logId = req.params.id;
        console.log('id in first query', logId)
        const queryText = `DELETE FROM log_entry WHERE "user_id" = $1 and "id" = $2
        RETURNING "log_entry"."id";`;
        pool.query(queryText, [req.user.id, logId])
            .then(result => {
                const deleteFromNames = `DELETE FROM mushroom_names WHERE "log_id" = $1;`
                pool.query(deleteFromNames, [logId])
                    .then(result => {
                        const deleteFromPictures = `DELETE FROM mushroom_pictures WHERE "log_entry_id" = $1 AND "user_id" = $2;`
                        pool.query(deleteFromPictures, [logId, req.user.id])
                            .then(result => { res.sendStatus(200) })
                            .catch(error => {
                                console.log('there was an error deleting mushroom pictures', error)
                            })
                    })
            })
            .catch(error => {
                console.log('there was an error deleting names', error)
            })
            .catch(error => {
                console.log('there was an error deleting log entry', error)
            })
    })


// .then(results => {
//     if (results.rows.count > 0) {
//         console.log('successfully deleted');
//         res.send({ message: 'Log Entry Deleted' });
//     } else {
//         res.send({ message: 'Nothing was deleted.' })
//     }
// })
// })

router.post('/', (req, res) => {
    const mushroomData = req.body;
    console.log('info in router', mushroomData)
    console.log('mushroom details', mushroomData.details);
    const queryText = `INSERT INTO log_entry ("user_id", "details") VALUES ($1,$2)
    RETURNING "id"`;
    pool.query(queryText, [req.user.id, mushroomData.details])
        .then(result => {
            console.log('New Log ID:', result.rows[0].id);
            const logId = result.rows[0].id;
            const insertIntoNames = `INSERT INTO mushroom_names ("log_id", "common_name", "scientific_name") VALUES ($1,$2,$3) RETURNING "log_id";`
            pool.query(insertIntoNames, [logId, mushroomData.common_name, mushroomData.scientific_name])
                .then(result => {
                    const insertIntoPictures = `INSERT INTO mushroom_pictures ("log_entry_id","user_id","mushroom_picture_url") VALUES ($1,$2,$3);`
                    pool.query(insertIntoPictures, [logId, req.user.id, mushroomData.mushroom_picture_url])
                        .then(result => { res.sendStatus(200) })
                        .catch(error => {
                            console.log('there was an error posting mushroom pictures', error)
                        })
                })
        })
        .catch(error => {
            console.log('there was an error posting the information', error)
        })
        .catch(error => {
            console.log('there was an error posting the information', error)
        })
})

module.exports = router;