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
 *      HTTP/1.1 201 OK
 */


router.post('/s3', rejectUnauthenticated, async (req, res) => {
    if (!AWS_S3_BUCKET || !AWS_S3_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
        res.status(500).send('Missing environment variables for AWS bucket.');
        return;
    }
    try {
        const imageUserId = req.user.id
        const imageProps = req.query;
        const imageData = req.files.image.data;
        const mediumKey = `photos/medium/${imageUserId}/${imageProps.name}`;
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
        const thumbKey = `photos/thumb/${imageUserId}/${imageProps.name}`;
        params.Key = thumbKey;
        params.Body = thumbFileConent;
        await s3.upload(params).promise();

        // INSERT photo path into the database

        // Send back medium image data.
        res.send(data);
        console.log(data);
    } catch (error) {
        console.log('in s3 catch', error);
        
        res.sendStatus(500);
    }
});




module.exports = router;