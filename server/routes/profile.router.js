const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();

const config = {
    bucket: `${process.env.AWS_S3_BUCKET}`,                           // required
    region: `${process.env.AWS_S3_REGION}`,                           // optional
    headers: {'Access-Control-Allow-Origin': '*'},  		    // optional
    ACL: 'public-read',  ,
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
}