let mongoose = require("mongoose");
let Schema = mongoose.Schema;

module.exports = mongoose.model("District",new Schema({
    district:{type:String,required:true},
    talukas:{type:[String],required:true}
},
{
    collection:"talukas"
}));