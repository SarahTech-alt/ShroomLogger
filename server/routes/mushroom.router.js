const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
const aws = require('aws-sdk');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const { default: axios } = require('axios');

const { AWS_S3_REGION, AWS_S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;
aws.config.region = AWS_S3_REGION;

/**
 * @api {post} /s3 Upload Photo
 * @apiPermission user
 * @apiName PostPhoto
 * @apiGroup Photo
 * @apiDescription This route uploads a photo.
 *
 * @apiParam {String} name              Mandatory image file name.
 * @apiParam {String} type              Mandatory image file type.
 * @apiParam {String} size              Mandatory image file size.
 * @apiParam {File}   image             Mandatory image
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 */

/**
 * @api {get} /api/mushroom Get All Mushroom Data
 * @apiName GetMushrooms
 * @apiGroup Mushrooms
 * @apiPermission authenticated user
 * 
 * @apiSuccess {String} user_id The user id
 * @apiSuccess {String} log_id The log entry id
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "id": "3",
 * "mushroom_name": "morel"
 * }
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 500
 * {
 * "error": "there was an error getting the logs Internal Service Error" 
 * }
 */

router.get('/detail/:id', rejectUnauthenticated, (req, res) => {
    const selectedId = Number(req.params.id);
    console.log('selected log id in router', selectedId);
    const userId = req.user.id;
    console.log('user id in router', req.user.id)
    queryText = `SELECT "log_entry"."id","user_id","date","latitude","longitude","details","common_name","scientific_name", "mushroom_picture_thumb", "mushroom_picture_medium" FROM "log_entry" LEFT JOIN
    "mushroom_junction" ON "mushroom_junction"."log_id" = "log_entry"."id"
     JOIN "mushroom_pictures" ON "mushroom_junction"."mushroom_picture_id" = "mushroom_pictures"."id"
     JOIN "mushroom_names" ON "mushroom_junction"."mushroom_names_id" = "mushroom_names"."id" WHERE "log_entry"
    ."id"=$1 AND "user_id" =$2;`
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

router.delete('/delete/:id', rejectUnauthenticated, async (req, res) => {
    // GETS THE LOG ID OF SELECTED ENTRY
    const logId = req.params.id;
    try {
        // FIRST QUERY GETS ALL THE IDs FROM THE 
        // JUNCTION TABLE WITH CORRESPONDING LOG ID
        const getIdsQuery = 'SELECT * FROM "mushroom_junction" where "log_id"=$1'
        const getAllIds = await pool.query(getIdsQuery, [logId])
        // OBJECT WITH ALL IDs
        const fetchedIds = getAllIds.rows[0];
        // SET ALL FETCHED IDs TO CONSTs FOR READABILITY
        const mushroomNamesId = fetchedIds.mushroom_names_id;
        const mushroomPictureId = fetchedIds.mushroom_picture_id;
        // SECOND QUERY DELETES ENTRY FROM THE JUNCTION TABLE
        // SO NO FOREIGN KEY CONFLICTS OCCUR
        const deleteFromJunction = `DELETE FROM "mushroom_junction" WHERE "log_id"=$1;`
        await pool.query(deleteFromJunction, [logId])
        // THIRD QUERY DELETES FROM LOG ENTRY TABLE
        const queryText = `DELETE FROM log_entry WHERE "id" = $1;`;
        await pool.query(queryText, [logId])
        // FOURTH QUERY DELETES ENTRY FROM MUSHROOM NAMES TABLE
        const deleteFromNames = `DELETE FROM mushroom_names WHERE "id" = $1;`
        await pool.query(deleteFromNames, [mushroomNamesId])
        // FIFTH QUERY DELETES ENTRY FROM MUSHROOM PICTURES TABLE
        const deleteFromPictures = `DELETE FROM mushroom_pictures WHERE "id" = $1;`
        await pool.query(deleteFromPictures, [mushroomPictureId])
    } catch (error) {
        console.log('ROLLBACK', error);
        await pool.query('ROLLBACK');
        throw error;
    }
})

router.post('/', rejectUnauthenticated, async (req, res) => {
    try {
        console.log('req.body in post', req.body);
        const mushroomData = req.body;
        const fileName = req.body.selectedFile;
        // RETURNING "id" will give us back the id of the created log
        const insertLogInfo = `
        INSERT INTO "log_entry" ("date", "latitude", "longitude", "details")
         VALUES ($1, $2, $3, $4)
        RETURNING "id";`
        // FIRST QUERY MAKES LOG ENTRY
        const getLogIds = await pool.query(insertLogInfo, [mushroomData.date, mushroomData.latitude, mushroomData.longitude, mushroomData.details])
        // GETS THE LOG ENTRY ID
        const createdLogId = getLogIds.rows[0].id
        // SECOND QUERY MAKES MUSHROOM NAMES ENTRY
        const insertMushroomNames = `INSERT INTO "mushroom_names" ("common_name", "scientific_name")
        VALUES  ($1, $2)
        RETURNING "id";`
        const mushroomLogId = await pool.query(insertMushroomNames, [mushroomData.common_name, mushroomData.scientific_name])
        // GETS THE NAME ENTRY ID
        const createMushroomNameId = mushroomLogId.rows[0].id;
        const mediumUrl = `https://${AWS_S3_BUCKET}.s3.${AWS_S3_REGION}.amazonaws.com/photos/medium/${fileName}`;
        const thumbUrl = `https://${AWS_S3_BUCKET}.s3.${AWS_S3_REGION}.amazonaws.com/photos/thumb/${fileName}`;
        // THIRD QUERY MAKES MUSHROOM PICTURES ENTRY
        const insertPicture = `INSERT INTO "mushroom_pictures" 
         ("mushroom_picture_thumb","mushroom_picture_medium") VALUES ($1,$2) 
         RETURNING "id";`
        const pictureLogId = await pool.query(insertPicture, [thumbUrl, mediumUrl])
        // GETS THE PHOTO ENTRY ID
        const createPhotoId = pictureLogId.rows[0].id;
        // FOURTH QUERY ADDS ALL IDs TO JUNCTION TABLE
        const insertIntoJunction = `INSERT INTO "mushroom_junction" 
        ("log_id","mushroom_names_id", "user_id", "mushroom_picture_id") 
         VALUES ($1,$2,$3,$4);`;
        await pool.query(insertIntoJunction, [createdLogId, createMushroomNameId, req.user.id, createPhotoId])
    } catch (error) {
        console.log('ROLLBACK', error);
        await pool.query('ROLLBACK');
        throw error;
    }
})

router.get('/', rejectUnauthenticated, (req, res) => {
    // GET USER ID OF LOGGED IN USER
    const userId = req.user.id;
    // GET INFORMATION FROM JOINING TABLES ON JUNCTION TABLE
    const queryText = `SELECT "log_id", "user_id","date","details", "latitude","longitude", "common_name", "scientific_name","details", "mushroom_picture_thumb", "mushroom_picture_medium" FROM "log_entry" 
    JOIN "mushroom_junction" ON  "mushroom_junction"."log_id"="log_entry"."id"
    JOIN "mushroom_names" ON "mushroom_junction"."mushroom_names_id"="mushroom_names"."id" 
    JOIN "mushroom_pictures" ON "mushroom_junction"."mushroom_picture_id"="mushroom_pictures"."id"
    WHERE "user_id"=$1 ORDER BY "date" ASC;`;
    pool.query(queryText, [userId])
        .then(results => {
            // SEND RESULTS BACK TO CLIENT
            console.log('results.rows in get router', results.rows)
            res.send(results.rows)
        })
        .catch(error => {
            // IF FAILED LOG ERROR AND SEND ERROR STATUS CODE
            console.log('there was an error getting the logs', error);
            res.sendStatus(500);
        })
})


router.put('/editInfo/:id', rejectUnauthenticated, async (req, res) => {
    console.log('req.params in update log', req.params);
    console.log('req.body in update router', req.body);
    let mushroomInfo = req.body;
    const userId = req.user.id;
    // GETS THE LOG ID OF SELECTED ENTRY
    const logId = req.params.id;
    try {
        // FIRST QUERY GETS ALL THE IDs FROM THE 
        // JUNCTION TABLE WITH CORRESPONDING LOG ID
        const getIdsQuery = 'SELECT * FROM "mushroom_junction" where "log_id"=$1'
        const idResults = await pool.query(getIdsQuery, [logId])
        const fetchedIds = idResults.rows[0];
        console.log('all the ids from query', fetchedIds);
        // SET ALL FETCHED IDs TO CONSTs FOR READABILITY
        const mushroomNamesId = fetchedIds.mushroom_names_id;
        const mushroomPictureId = fetchedIds.mushroom_picture_id;
        // SECOND QUERY UPDATES ENTRY IN NAMES TABLE
        const updateNames = `UPDATE "mushroom_names" SET "common_name" = $1, "scientific_name"=$2 WHERE "id"=$3;`
        await pool.query(updateNames, [mushroomInfo.common_name, mushroomInfo.scientific_name, mushroomNamesId])
        // FOURTH QUERY UPDATES ENTRY IN LOG ENTRY TABLE
        const updateDetails = `UPDATE "log_entry" SET "date" = $1, "latitude" = $2, "longitude" = $3, "details" = $4 WHERE "id"= $5;`
        await pool.query(updateDetails, [mushroomInfo.date, mushroomInfo.latitude, mushroomInfo.longitude, mushroomInfo.details, logId])
        // FIFTH QUERY UPDATES ENTRY IN MUSHROOM PICTURES TABLE
        const updatePicture = `UPDATE "mushroom_pictures" SET "mushroom_picture_thumb" = $1, "mushroom_picture_medium" = $2 WHERE "id" = $3;`
        await pool.query(updatePicture, [mushroomInfo.mushroom_picture_thumb, mushroomInfo.mushroom_picture_medium, mushroomPictureId])
    } catch
    (error) {
        console.log('ROLLBACK', error);
        await pool.query('ROLLBACK');
        throw error;
    }
});




module.exports = router;