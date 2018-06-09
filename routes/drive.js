var express = require('express');
var driveController = require('../controller/drpbxdrive/drpbxdrive.controller');
var router = express.Router();

router.get('/files',driveController.getFileList);
router.post('/upload',driveController.uploadFile);
router.get('/download',driveController.downloadFile);

module.exports = router;