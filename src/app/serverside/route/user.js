let express = require('express');
let router = express.Router();
let Campaign = require('../model/campaigns');


router.get('/campaigns',async(req,res)=>{

    const campaigns = await Campaign.find().exec();

    let arr = [];

    for(let i=0;i <campaigns.length;i++){

        if(campaigns[i].showCampaign == true){
            arr.push(campaigns[i]);
        }
    }

    res.status(200).json({
        title:'List of Campaigns',
        campaigns : arr
    })

})

module.exports = router;