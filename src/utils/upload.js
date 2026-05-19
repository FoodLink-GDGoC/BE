const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const s3 = require('../config/s3Config');

const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_S3_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `foodlink/${uniqueSuffix}${path.extname(file.originalname)}`);
        },
    }),
});

module.exports = upload;