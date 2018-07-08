var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Project = require('./project.model');

var InvestorSchema =new mongoose.Schema({
    firstName:String,
    lastName:String,
    cellPhoneNumber:String,
    officePhoneNumber:String,
    address:String,
    email:String,
    birthDate:Date,
    picture:String,
    company:String,
    role:String,
    //Files:[{name:String}],
    joinDate:Date,
    rank:Number,
    //investorAssociatedProjects:[Project],
    //comments:String,
    commentsTest:[{comment:String,name:String,date:Date}],
    recruiter:String


});

InvestorSchema.plugin(mongoosePaginate);
const Investor = mongoose.model('Investor',InvestorSchema);

module.exports = Investor;