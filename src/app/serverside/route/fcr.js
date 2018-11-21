let express =require('express');
let router = express.Router();
let Fcr = require('../model/fcr');
let Hospital = require('../model/hospitals');
let Campaign = require('../model/campaigns');
let TalukawisePatients = require('../model/talukawisePatients');
let User = require('../model/user');

router.get('/hospitalList/:taluka',async(req,res)=>{

    const taluka = await Hospital.findOne({taluka:req.params.taluka});

    res.status(200).json({
        title:"list of hospitals",
        hospitals:taluka.hospitals
    })
})

router.post('/addCampaign',async(req,res)=>{

    const campaign = new Campaign({
        nameOfCampaign : req.body.nameOfCampaign,
        startDate : req.body.startDate,
        endDate : req.body.endDate,
        time : req.body.time,
        disease1 : req.body.disease1,
        disease2 : req.body.disease2,
        disease3 : req.body.disease3,
        location : req.body.location,
        description : req.body.description,
        showCampaign : req.body.showCampaign
    })

    const result = await campaign.save();

    if(!result){
        return res.status(500).json({
            title : 'Error',
            error : {message : 'Campaign not added'}
        })
    }

    res.status(201).json({
        title:'Campaign added successfully',
        campaign : result
    })

})

router.put('/updateCampaign/:id',async(req,res)=>{

    const campaign = await Campaign.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            nameOfCampaign : req.body.nameOfCampaign,
            startDate : req.body.startDate,
            endDate : req.body.endDate,
            time : req.body.time,
            disease1 : req.body.disease1,
            disease2 : req.body.disease2,
            disease3 : req.body.disease3,
            location : req.body.location,
            description : req.body.description,
            showCampaign : req.body.showCampaign
        }
    },{new:true})

    res.status(201).json({
        title:'campaign updated successfully',
        campaign : campaign
    })

})

router.get('/campaignList/:taluka',async(req,res)=>{

    const campaigns = await Campaign.find().exec();

    const taluka = await Hospital.findOne({taluka:req.params.taluka});

    let arr = [];

    for(let i=0;i<campaigns.length;i++){
        for(let j=0;j<taluka.hospitals.length;j++){
            if(campaigns[i].location == taluka.hospitals[j]){
                arr.push(campaigns[i]);
            }
        }
    }

    if(campaigns){
        res.status(200).json({
            title : 'List of Campaigns',
            campaigns :arr,
        })
    }

})

router.delete('/deleteCampaign/:id',async(req,res)=>{

    const result = await Campaign.remove({_id:req.params.id});

    res.status(201).json({
        title : 'Campaign deleted',
        result : result
    })
})

router.put('/updateShowCampaign/:id',async(req,res)=>{

    const result = await Campaign.findByIdAndUpdate({_id:req.params.id},{
        $set :{
            showCampaign : req.body.showCampaign
        }
    },{new:true})
    
    res.status(201).json({
        title : " Status updated",
        campaign : result
    })
})

router.post('/countOfPatients',async(req,res)=>{


    const taluka = await TalukawisePatients.findOne({taluka:req.body.taluka})
    .populate({
        path:'patients',
        select:{'cure':1,'diseases':1,'_id':0}
    })
    .select('patients')

    let arr = [];

    for(let i=0;i<taluka.patients.length;i++){
        for(let j=0;j<taluka.patients[i].diseases.length;j++){
            if(taluka.patients[i].diseases[j]== req.body.disease && taluka.patients[i].cure == false){
                arr.push(taluka.patients[i]);
            }
        }
    }

    res.status(200).json({
        title:'Count of patients',
        count : arr.length
    })
})

router.get('/getUsers/:taluka',async(req,res)=>{

    const users = await User.find({taluka:req.params.taluka})
    .select('-password -district -taluka -aadharNo -_id')

    const mobileNo = await User.find({taluka:req.params.taluka})
    .select('mobileNo -_id')

    res.status(200).json({
        title:"List of Users",
        users:users,
        mobileNo : mobileNo
    })

})

router.post('/sendMessages',async(req,res)=>{

    const twilio = require('twilio')(account sid, auth token );

   
    let numbers = [];
    for(let i=0;i<req.body.numbers.length;i++){
        numbers.push(req.body.numbers[i].mobileNo);
    }
   
    Promise.all(
        numbers.map(number => {
        return twilio.messages.create({
            to: number,
            from: phoneNo ,
            body: req.body.msg
        });
        })
    ) 
    .then(messages => {
        console.log('Messages sent!')
        res.status(200).json({
            title:'Messages Sent'
        });
     })
     .catch(err => console.error(err));


})



module.exports = router;
