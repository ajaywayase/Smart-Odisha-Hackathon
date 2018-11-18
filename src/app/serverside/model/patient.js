let mongoose = require('mongoose');
let Schema =  mongoose.Schema;

module.exports = mongoose.model("Patient",new Schema({

    firstName : {type :String,required:true},
    middleName : {type :String,required:true},
    lastName : {type :String,required:true},
    district : {type:String,required : true},
    taluka : {type:String,required : true},
    villege : {type:String,required : true},
     aadharNo : {type :String,required:true,maxlength:12},
     mobileNo : {type :String},
    diseases : {type :[String]},
    cure : { type:Boolean ,required:true},
    visitedDates :[{type :Object,required:true}] ,
    treatment : {type :[String],required:true},

},
{
    collection:'patients'
}))