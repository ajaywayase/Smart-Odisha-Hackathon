let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Patient = require('../model/patient');

module.exports = mongoose.model("Campaign",new Schema({

    nameOfCampaign :{type : String, required : true},
    startDate : {type:Object, required:true},
    endDate : {type:Object, required:true},
    time : {type : String, required : true},
    disease1 :  {type : String, required : true},
    disease2 :  {type : String},
    disease3 :  {type : String},
    location :  {type : String, required : true},
    description : {type : String, required : true},
    showCampaign : {type:Boolean,required:true},
    patients : [{type:Schema.Types.ObjectId,ref:'Patient'}]
},
{
    collection : 'campaigns'
}))