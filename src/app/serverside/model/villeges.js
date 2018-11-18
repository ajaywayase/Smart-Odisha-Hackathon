let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let User = require('../model/user');

module.exports = mongoose.model("Taluka",new Schema({
    taluka:{type:String,required:true},
    villeges:{type:[String],required:true},
    people:[{type:Schema.Types.ObjectId,ref:'User'}]
},
{
    collection:"villeges"
}));