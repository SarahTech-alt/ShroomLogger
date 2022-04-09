const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
const aws = require('aws-sdk');
const sharp = require('sharp');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

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

router.get('/', rejectUnauthenticated, (req, res) => {
    // what is the value of req.user????
    // gets username and profile picture url from the database
    // sends response back to saga get function
    pool
        .query(`SELECT "username", "profile_picture_medium","profile_picture_thumb" FROM "user" WHERE "id" = $1 ;`, [req.user.id])
        .then((results) => res.send(results.rows))
        .catch((error) => {
            res.sendStatus(500);
        });
});

router.put('/', rejectUnauthenticated, (req, res) => {
    // updates profile picture in user table in database
    // url is aws bucket location and filename 
    // which is generated by AWS S3
    const fileName = req.body.selectedFile;
    const mediumUrl = `https://${AWS_S3_BUCKET}.s3.${AWS_S3_REGION}.amazonaws.com/photos/medium/${fileName}`;
    const thumbUrl = `https://${AWS_S3_BUCKET}.s3.${AWS_S3_REGION}.amazonaws.com/photos/thumb/${fileName}`;
    const userId = req.user.id;
    queryText = `UPDATE "user" SET ("profile_picture_medium", "profile_picture_thumb") = ($1,$2) WHERE "id" = $3;`;
    pool.query(queryText, [mediumUrl, thumbUrl, userId])
        .then(result => {
            // sends success status on completion
            res.sendStatus(200)
        }).catch(error => {
            // sends error status on error
            res.sendStatus(500);
        })
})


router.post('/s3', rejectUnauthenticated, async (req, res) => {
    if (!AWS_S3_BUCKET || !AWS_S3_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
        res.status(500).send('Missing environment variables for AWS bucket.');
        return;
    }
    try {
        const imageUserId = req.user.id
        const imageProps = req.query;
        const imageData = req.files.image.data;
        const mediumKey = `photos/medium/${imageProps.name}`;
        // Optionally, resize the image
        const mediumFileConent = await sharp(imageData).resize(300, 300).toBuffer();

        // Setting up S3 upload parameters
        const params = {
            Bucket: AWS_S3_BUCKET,
            Key: mediumKey,
            Body: mediumFileConent,
            ACL: 'public-read',
        };
        const s3 = new aws.S3();
        // Uploading files to the bucket
        const data = await s3.upload(params).promise();

        // Optionally, create a thumbnail
        const thumbFileConent = await sharp(imageData).resize(100, 100).toBuffer();
        const thumbKey = `photos/thumb/${imageProps.name}`;
        params.Key = thumbKey;
        params.Body = thumbFileConent;
        await s3.upload(params).promise();

        // INSERT photo path into the database

        // Send back medium image data.
        res.send(data);
    } catch (error) {

        res.sendStatus(500);
    }
});




module.exports = router;