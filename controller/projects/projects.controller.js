var projectsService = require('../../services/projects.service');


_this=this;


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
        console.log('add new project');
      //  let newProject = req.body;
        await projectsService.addNewProject(req.body).then((results) =>{
            return res.status(200).json({success:true,data:results,message:'Yay!'});
           // return results;
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