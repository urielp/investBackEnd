var Investors = require ('../model/investor');
var mongoose = require('mongoose');
_this = this;


exports.getInvetorsList = async function getInvestorsList(){
    //mongoos paginate settings

    var options = {
        page,
        limit
    }

    try{
        console.log(query);
        let investors = await Investors.paginate(query,options);
        return investors;
    }

    catch(exception){
        throw new Error('Error while trying to get investors list '+ exception.message);
    }
}

exports.addInvestor = async function addInvestor(investor){
    console.log('Add investor service');
    console.log(investor);
    let newInvestor = new Investors({
        investorFirstName:investor.firstName,
        investorLastName:investor.lastName,
        investorCellPhoneNumber:investor.cellPhone,
        investorOfficePhoneNumber:investor.officePhone,
        investorAddress:investor.address,
        investorEmail:investor.email,
        investorBirthDate:investor.birthDate,
        investorPicture:investor.picture,
        investorCompany:investor.company,
        investorRole:investor.role,
        //investorFiles:[{name:String}],
        investorJoinDate:investor.joinDate,
        investorRank:investor.rank,
        //investorAssociatedProjects:[Project],
        investorComments:investor.comment,
        investorRecuriter:investor.recruiter
    })

    try {
        let savedInvestor = await newInvestor.save();
        return savedInvestor;
    }
    catch (e) {
        throw new Error('Error while trying to save investor information to the data base' + e.message);
    }
}