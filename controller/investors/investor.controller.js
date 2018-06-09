var investorsService = require('../../services/investors.service');


_this=this


//add new investor to db(controller
exports.addInvestor = async function addInvestor(req,res,next){
    console.log('Add investor controller');
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