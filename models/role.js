const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const roleSchema = new Schema({
    "role" : {type : String},
	"resource" : {type : String},
	"action" : {type : String},
	"attributes" : {type : String},
	'extend': [ {type : String} ]
});
 
const Role = mongoose.model('Role', roleSchema);
 
module.exports = Role;