var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Project = require('./project.model');

var InvestorSchema =new mongoose.Schema({
    investorFirstName:String,
    investorLastName:String,
    investorCellPhoneNumber:String,
    investorOfficePhoneNumber:String,
    investorAddress:String,
    investorEmail:String,
    investorBirthDate:Date,
    investorPicture:String,
    investorCompany:String,
    investorRole:String,
    investorFiles:[{name:String}],
    investorJoinDate:Date,
    investorRank:Number,
    //investorAssociatedProjects:[Project],
    investorComments:String,
    investorRecuriter:String


});

InvestorSchema.plugin(mongoosePaginate);
const Investor = mongoose.model('Investor',InvestorSchema);

module.exports = Investor;