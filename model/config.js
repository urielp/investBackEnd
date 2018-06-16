var mongoose = require('mongoose');

var ConfigSchema =new mongoose.Schema({
token:String
});

const Config = mongoose.model('Config',ConfigSchema);

module.exports = Config;