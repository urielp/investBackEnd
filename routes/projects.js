var express = require('express');
var router = express.Router();
var projectsController = require('../controller/projects/projects.controller');

router.get('/',projectsController.getProjectsList)
    .post('/addProject',projectsController.addProject);

module.exports = router;
