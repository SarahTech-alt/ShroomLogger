const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
import { uploadFile } from 'react-s3';
require('dotenv').config();

const config = {
    bucket: `${process.env.AWS_S3_BUCKET}`,                           // required
    region: `${process.env.AWS_S3_REGION}`,                           // optional
    headers: {'Access-Control-Allow-Origin': '*'},  		    // optional
    ACL: 'public-read',  ,
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
}

router.post('/', (req,res) => {
    const file = req.body;
    console.log('in router post', file);
    uploadFile(file, config)
        .then((data) => {
            console.log('data.location', data.location);
            console.log('imageUrl', imageUrl);
            res.send(data);
        })
        .catch(err => console.error(err))
}