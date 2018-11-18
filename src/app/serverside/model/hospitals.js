let mongoose = require('mongoose');
let Schema = mongoose.Schema;


module.exports = mongoose.model("Hospital",new Schema({

    taluka:{type:String,required:true},
    hospitals: {type:[String],required:true}
},
{
    collection:'hospitals'
}))