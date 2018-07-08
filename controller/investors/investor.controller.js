var investorsService = require('../../services/investors.service');


_this=this


//add new investor to db(controller
exports.addInvestor = async function addInvestor(req,res,next){
    console.log('Add investor controller');
    console.log(req.body);
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
}


//get investor data
exports.findInvestor=async function findInvestor(req,res,next){
    try{
        console.log("Parameters from request : " + req.params.id)
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

    console.log(req.params);
    let page = req.params.page ? req.params.page : 1;
    let limit = req.query.limit ? req.query.limit :15;
    try {
        let expenses = await investorsService.getInvetorsList({},page,limit);

        return res.status(200).json({success:true,data:expenses,message:'Successfully received  list'});
    }
    catch(exception){
        return res.status(400).json({success:false,data:{},message:exception.message});
    }
}

exports.updateInvestorData =async function updateInvestorData(req,res,next) {
    if(!req.params.id){
        return res.status(400).json({status:400,message:'Id must be presented'});
    }

    console.log(req.body);
    //return res.status(200).json({status:200,message:req.params.id});
    let id = req.params.id;

    let investor = {
        id:id,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        cellPhoneNumber:req.body.cellPhoneNumber,
        officePhoneNumber:req.body.officePhoneNumber,
        address:req.body.address,
        email:req.body.email,
        birthDate:req.body.birthDate,
        picture:req.body.picture,
        company:req.body.company,
        role:req.body.role,
        //Files:[{name:String}],
        joinDate:req.body.joinDate,
        rank:req.body.rank,
        //investorAssociatedProjects:[Project],
        //comments:String,
        commentsTest:req.body.commentsTest,
        recruiter:req.body.recruiter

    };
    try{
        let updatedInvestor = await investorsService.updateInvestorData(investor);
    }
    catch (e) {
        console.log(e.message);
    }
}