const express = require('express')
const multer = require('multer');
const path = require('path');
const FILE_SIZE = 1024 * 1024 * 2;


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(_dirname, '../public/images/'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage, limit: { fileSize: FILE_SIZE} });
module.exports = upload;