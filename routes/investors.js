var express = require('express');
var router = express.Router();
var investorController = require('../controller/investors/investor.controller');

/* GET investor listing. */
//router.get('/investorsList',);
router.post('/addInvestor',investorController.addInvestor)
    .get('/investor/:id',investorController.findInvestor)
    .get('/investors',investorController.getInvestorsList);

module.exports = router;
