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
    console.log(investor);
    let newInvestor = new Investors({
        userName:investor.userName,
        firstName:investor.firstName,
        lastName:investor.lastName,
        cellPhoneNumber:investor.cellPhoneNumber,
        officePhoneNumber:investor.officePhoneNumber,
        address:investor.address,
        city:investor.city,
        email:investor.email,
        birthDate:investor.birthDate,
        company:investor.company,
        role:investor.role,
        joinDate:investor.joinDate,
        rank:investor.rank,
        investorAssociatedProjects:investor.investorAssociatedProjects,
        commentsTest:[],//investor.commentsTest,
        recruiter:investor.recruiter,
        picture:investor.picture,
        //investorFiles:[{name:String}],
        //comments:investor.comment,
    });

    try {
        let savedInvestor = await newInvestor.save();
        return savedInvestor;
    }
    catch (e) {
        throw new Error('Error while trying to save investor information to the data base' + e.message);
    }
};exports.updateInvestor = async function exports(id,data,io){


   let  results = Investors.findById(id,(err,investor) =>{
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
                io.emit('update','בוצע עדכון לנתונים\nייתכן ויידרש רענון לדף');
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
