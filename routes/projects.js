var express = require('express');
var router = express.Router();
var projectsController = require('../controller/projects/projects.controller');

router.get('/',projectsController.getProjectsList)
    .get('/projectDetails/:id',projectsController.getProjectById)
    .post('/addProject',projectsController.addProject);

  //  .post('/addProject',projectsController.addProject)
   // .get('/getProjectData/:id',projectsController.getProjectData);


module.exports = router;
