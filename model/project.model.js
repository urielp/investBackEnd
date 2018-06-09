var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var ProjectSchema =new mongoose.Schema({
    projectName:String,
    address:String,
    projectPicture:String,
    units:Number,
    loan:Number,
    files:[{name:String}],
    size:Number,
    status:String,
    estimatedYield:Number,
});

ProjectSchema.plugin(mongoosePaginate);
const Project = mongoose.model('Expense',ProjectSchema);

module.exports = Project;