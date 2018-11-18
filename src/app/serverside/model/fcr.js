let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model("Fcr",new Schema({

    uid:{type:String,required:true},
    firstName:{type:String,required:true},
    middleName:{type:String,required:true},
    lastName:{type:String,required:true},
    mobile:{type:String,required:true,maxlength:13},
    taluka:{type:String,required:true},
    password:{type:String,required:true},

},{
    collection:'fcr'
}))