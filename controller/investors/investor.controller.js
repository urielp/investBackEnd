var investorsService = require('../../services/investors.service');


_this=this


//add new investor to db(controller
exports.addInvestor = async function addInvestor(req,res,next){
    let newInvestor = req.body;
    try{
        let createdInvestor = await investorsService.addInvestor(newInvestor);
        return res.status(200)
            .json({
                success:true,
                data:createdInvestor,
                message:'Investor was added successfully!'
            })

    }
    catch(error){
        return res
            .status(400)
            .json({
                success:false,
                data:{},
                message:'Somthing went wrong' + error.message
            })
    }
};

exports.updateInvestor = async function updateInvestor(req,res){
try{

    let updatedInvestor = await investorsService.updateInvestor(req.params.id,req.body,req.app.get('io'));

   if(updatedInvestor) {

       return res.status(200)
           .json({
               success: true,
               data: updatedInvestor,
               message: 'Investor was updated'
           })
   }
   else {
       return res.status(200)
           .json({
               success: false,
               data: {},
               message: 'Investor was not found'
           })
   }
}
catch (e) {
    
}
};
//get investor data
exports.findInvestor=async function findInvestor(req,res,next){
    try{
        let investorResult = await investorsService.getInvestorData(req.params.id);
        return res.status(200)
            .json({
                success:true,
                data:investorResult,
                message:'Investor was found'
            })

    }
    catch(error){
        return res
            .status(400)
            .json({
                success:false,
                data:{},
                message:'no such investor!' + error.message
            })
    }

}

//get investors list
exports.getInvestorsList = async function getInvestorsList(req,res,next){
    let page = req.params.page ? req.params.page  : 1;
    let limit = req.params.limit ? req.params.limit  : 13;
    try {
        let investors = await investorsService.getInvetorsList({},page,limit);

        return res.status(200).json({success:true,data:investors,message:'Successfully received  list'});
    }
    catch(exception){
        return res.status(400).json({success:false,data:{},message:exception.message});
    }
}

exports.updateInvestorComments =async function updateInvestorComments(req,res,next) {
    if(!req.params.id){
        return res.status(400).json({status:400,message:'Id must be presented'});
    }
    let id = req.params.id;

    // let investor = {
    //     id:id,
    //     firstName:req.body._firstName,
    //     lastName:req.body._lastName,
    //     cellPhoneNumber:req.body._cellPhoneNumber,
    //     officePhoneNumber:req.body._officePhoneNumber,
    //     address:req.body._address,
    //     email:req.body._email,
    //     birthDate:req.body._birthDate,
    //     picture:req.body._picture,
    //     company:req.body._company,
    //     role:req.body._role,
    //     //Files:[{name:String}],
    //     joinDate:req.body._joinDate,
    //     rank:req.body._rank,
    //     //investorAssociatedProjects:[Project],
    //     //comments:String,
    //     commentsTest:req.body.commentsTest,
    //     recruiter:req.body._recruiter
    //
    // };



    try{
        let updatedInvestor = await investorsService.updateInvestorComments(id,req.body);
        return res.status(200).json({success:true,data:updatedInvestor,message:'Successfully updated'});
    }
    catch (e) {
        console.log(e.message);
    }
}