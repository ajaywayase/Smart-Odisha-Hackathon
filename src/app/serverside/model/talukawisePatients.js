let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Patient = require('../model/patient');

module.exports = mongoose.model("TalukawisePatients",new Schema({

    taluka : {type : String,required :true},
    patients : [{type:Schema.Types.ObjectId,ref :'Patient'}]
},
{
    collection : 'talukawisePatients'
}))