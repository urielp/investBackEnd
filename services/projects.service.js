var Projects = require('../model/project.model');
var mongoose = require('mongoose');


// gets the full projects list from DB
exports.projectsList = async function projectsList(page,limit){
    //mongoos paginate settings
    var options = {
        page,
        limit
    };
    try{
        console.log('to DB');
      let projects = await Projects.paginate({},options).then((res) =>{
          console.log(res);
          return res;
      });
        console.log(projects);
        return projects;
    }

    catch(exception){
        throw new Error('Error while trying to get projects list '+ exception.message);
    }
};

// TODO : add new project to DB
exports.addNewProject = async function addNewProject(newProject){

    let project = new Projects({
        projectName:newProject.projectName,
        address:newProject.address,
        projectPicture:newProject.projectPicture,
        units:newProject.units,
        loan:newProject.loan,
        //files:[{name:String}],
        size:newProject.size,
        status:newProject.status,
        estimatedYield:newProject.estimatedYield
    });

    let createdProject  = await project.save().then((result) => {
        return result;
    }).catch((error) =>{
        return error;
    });
    return createdProject;
};


// TODO : add ability to get projects list by investor
//TODO : get project details by ID
exports.getProjectById = async function getProjectById(id) {
    console.log('get project by id - service');
    let requestedProject = await Projects.findById(id).then((results) => {
        return results;
    }).catch((error) => {
        return error;
    });
    return requestedProject;
};
// TODO : update existing project
// TODO :delete existing project
