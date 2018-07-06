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
    let page = req.params.page ? req.params.page  : 1;
    let limit = req.params.limit ? req.params.limit  : 12;
    try {
        let expenses = await investorsService.getInvetorsList({},page,limit);

        return res.status(200).json({success:true,data:expenses,message:'Successfully received  list'});
    }
    catch(exception){
        return res.status(400).json({success:false,data:{},message:exception.message});
    }
}