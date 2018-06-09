var express = require('express');
var router = express.Router();
var investorController = require('../controller/investors/investor.controller');

/* GET investor listing. */
//router.get('/investorsList',);
router.post('/addInvestor',investorController.addInvestor);
module.exports = router;
