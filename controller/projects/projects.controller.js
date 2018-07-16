var projectsService = require('../../services/projects.service');


_this=this;

//TODO : get projects list - controller
exports.getProjectsList = async function getProjectsList(req,res,next){

    console.log('projects');
    let page = req.params.page ? req.params.page  : 1;
    let limit = req.params.limit ? req.params.limit  : 13;

   await projectsService.projectsList(page,limit).then((result) => {
        console.log(result);
        return res.status(200).json({success:true,data:result,message:'Successfully received  list'});
        //return res;

    }).catch((err) => {
        res.status(500).json({success:false,data:{},message:err.message});
    });


};


exports.addProject = async function addProject(req,res,next) {
        await projectsService.addNewProject(req.body).then((results) =>{
            return res.status(200).json({success:true,data:results,message:'Yay!'});
        }).catch((error) =>{
            return  res.status(500).json({success:false,data:{},message:error.message});
        });
}

exports.getProjectById = async function getProjectById(req,res,next) {
    console.log('get project by id');
    await projectsService.getProjectById(req.params.id).then((results) => {
        return res.status(200).json({success:true,data:results,message:'project was found'});
    }).catch((error) =>{
        return  res.status(500).json({success:false,data:{},message:error.message});
    })
};


// get a list of projects that are associated
exports.getAssociateddProjects = async function getAssociatedProjects(req,res,next){
    await projectsService.getAssociateddProjects(req.query.projects).then((results) =>{
        console.log(results);
        if(results.error){
            return res.status(500).json({success:false,data:{},message:'Error'});
        }
        else{
            return res.status(200).json({success:true,data:results.data,message:'Found Data'});
        }

    });
};
