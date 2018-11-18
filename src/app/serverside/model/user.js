let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model("User",new Schema({

    firstName:{type:String,required:true},
    middleName:{type:String,required:true},
    lastName:{type:String,required:true},
    district:{type:String,required:true},
    taluka:{type:String,required:true},
    villege:{type:String,required:true},
    aadharNo:{type:String,required:true,maxlength:12},
    mobileNo:{type:String,required:true,maxlength:13},
    password:{type:String,required:true},

},{
    collection:'users'
}))