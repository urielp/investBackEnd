var Investors = require ('../model/investor');
var mongoose = require('mongoose');
_this = this;

//get list of all investors
exports.getInvetorsList = async function getInvestorsList(query,page,limit){
    //mongoos paginate settings
    var options = {
        page,
        limit
    };
      try{
        let investors = await Investors.paginate({},options);
        return investors;
    }

    catch(exception){
        throw new Error('Error while trying to get investors list '+ exception.message);
    }
};

//add single investor
exports.addInvestor = async function addInvestor(investor){
    let newInvestor = new Investors({
        firstName:investor.firstName,
        lastName:investor.lastName,
        cellPhoneNumber:investor.cellPhone,
        officePhoneNumber:investor.officePhone,
        address:investor.address,
        email:investor.email,
        birthDate:investor.birthDate,
        picture:investor.picture,
        company:investor.company,
        role:investor.role,
        //investorFiles:[{name:String}],
        joinDate:investor.joinDate,
        rank:investor.rank,
        investorAssociatedProjects:investor.investorAssociatedProjects,
        comments:investor.comment,
        commentsTest:investor.commentsTest,
        recuriter:investor.recruiter
    })

    try {
        let savedInvestor = await newInvestor.save();
        return savedInvestor;
    }
    catch (e) {
        throw new Error('Error while trying to save investor information to the data base' + e.message);
    }
};
exports.updateInvestor = async function exports(data){

     console.log('about to update investor');
   let  results = Investors.findById(data._id,(err,investor) =>{
        if(err){
            console.log(err);
            return {success:false,error:err};
        }
        if(!investor){
            return {success: false,message:'Investor was not found'};
        }

         investor.firstName = data.firstName;

         investor.save(err =>{
            if(err){
                console.log('oh shit');
                return {success:false,error:err};
            }
            else {

                console.log('saved');
                return {success:false,data:investor}
            }
        })
    });
   return results;
};

//get single investor information
exports.getInvestorData = async function getInvestor(id){
    try{
        let investor = await Investors.findById(id);
        return investor;
    }
    catch(error){
        return Error('error while trying to find investor ' + error.message);
    }
};

// adding/updating comments of a user
exports.updateInvestorComments = async function(id,comments) {
    let _id = id;
    try {
        var oldInvestor = await Investors.findById(_id);
    }
    catch(exception){
        throw new Error("Error while trying to find investor in db due to : "+exception.message);
    }
    if(!oldInvestor)
    {
        return false;
    }
    try {

        oldInvestor.commentsTest = comments;
        let savedInvestor = await oldInvestor.save();
        return savedInvestor;
    }
    catch (exception){
        throw new Error("Error : " + exception.message);
    }

};


//TODO : update user(investor) details
exports.updateInvestorData = async function(id,data){

    currentInvestorData = await Investors.findById(id).then()
};
