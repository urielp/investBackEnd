var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Project = require('./project.model');

var InvestorSchema =new mongoose.Schema({
    userName: String,
    firstName:String,
    lastName:String,
    cellPhoneNumber:String,
    officePhoneNumber:String,
    address:String,
    email:String,
    city: String,
    birthDate:Date,
    company:String,
    role:String,
    joinDate:Date,
    rank:Number,
    investorAssociatedProjects:[String],
    commentsTest:[{comment:String,name:String,date:Date}],
    recruiter:String,
   // _id: String,
    picture:String,
    //Files:[{name:String}],
    //comments:String,
});

InvestorSchema.plugin(mongoosePaginate);
const Investor = mongoose.model('Investor',InvestorSchema);

module.exports = Investor;