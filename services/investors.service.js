var Investors = require ('../model/investor');
var mongoose = require('mongoose');
_this = this;

//get list of all investors
exports.getInvetorsList = async function getInvestorsList(query,page,limit){
    //mongoos paginate settings

    var options = {
        page,
        limit
    }
    console.log(options);
    try{

        let investors = await Investors.paginate({},options);
        return investors;
    }

    catch(exception){
        throw new Error('Error while trying to get investors list '+ exception.message);
    }
}

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
        //investorAssociatedProjects:[Project],
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
}


//get single investor information
exports.getInvestorData = async function getInvestor(id){

    try{
        console.log("finding single investor by id : " + id);
        let investor = await Investors.findById(id);
        return investor;
    }
    catch(error){
        return Error('error while trying to find investor ' + error.message);
    }
};

exports.updateInvestorData = async function(investor) {
    let id = investor.id;

    try {
        var oldInvestor = await Investors.findById(id);
    }
    catch(exception){
        throw new Error("Error while trying to find investor in db due to : "+exception.message);
    }

    if(!oldInvestor)
    {
        return false;
    }
     //oldInvestor.firstName=investor._firstName;
     //oldInvestor.lastName=investor._firstName;
     //oldInvestor.address=investor._address;
     //oldInvestor.amount=expense.amount;
    // oldExpense.status=expense.status;

    try {
        console.log(oldInvestor);
        //let savedoldInvestor = await oldInvestor.save();
        //return savedoldInvestor;
    }
    catch (exception){
        throw new Error("Error : " + exception.message);
    }
}