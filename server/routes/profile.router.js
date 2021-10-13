const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
import { uploadFile } from 'react-s3';

const config = {
    bucketName: `${process.env.AWS_S3_BUCKET}`,
    region: `${process.env.AWS_S3_REGION}`,
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
}


router.post('/s3', (req,res) => {
    const file = req.body;
    console.log('in router post', file);
    uploadFile(file, config)
        .then((data) => {
            console.log('data.location', data.location);
            console.log('imageUrl', imageUrl);
            res.send(data);
        })
        .catch(err => console.error(err))
})

module.exports = router;