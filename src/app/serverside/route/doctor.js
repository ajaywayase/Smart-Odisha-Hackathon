let express = require('express');
let router = express.Router();
let Campaign = require('../model/campaigns');
let Hospital = require('../model/hospitals');
let Taluka = require('../model/villeges');
let Patient = require('../model/patient');
let TalukawisePatients = require('../model/talukawisePatients');

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

router.get('/campaignInfo/:id',async(req,res)=>{

    const campaign = await Campaign.findById({_id : req.params.id})
    .select('disease1 disease2 disease3')


    res.status(200).json({
        title : 'Campaign Info',
        campaign : campaign
    })
})

router.get('/getTalukaAndVilleges/:id',async(req,res)=>{

    const campaign = await Campaign.findById({_id : req.params.id})

    const location = campaign.location;

    const taluka = await Hospital.findOne({ hospitals : location })

    const villeges = await Taluka.findOne({taluka : taluka.taluka})
    .select('villeges taluka')

    res.status(200).json({
        title : 'Campaign Info',
        result : villeges
    })


})

router.post('/addPatient/:id',async(req,res)=>{

    const patient = await  Patient.findOne({aadharNo : req.body.aadharNo});

    if(!patient){

        const diseases = [];

        if(req.body.disease1){
            diseases.unshift(req.body.disease1);
        }
        if(req.body.disease2){
            diseases.unshift(req.body.disease2);
        }
        if(req.body.disease3){
            diseases.unshift(req.body.disease3);
        }

        const dates = [];

        dates.unshift(req.body.visitDate);

        const treatments = [];

        treatments.unshift(req.body.treatment);

        const newPatient = new Patient({
            firstName : req.body.firstName,
            middleName : req.body.middleName,
            lastName : req.body.lastName,
            district : req.body.district,
            taluka : req.body.taluka,
            villege : req.body.villege,
            aadharNo : req.body.aadharNo,
            mobileNo :  req.body.mobileNo,
            diseases: diseases,
            cure : req.body.cure,
            visitedDates : dates,
            treatment : treatments
        });

        const result = await newPatient.save();

        const taluka = await TalukawisePatients.findOne({taluka:req.body.taluka});

        taluka.patients.push(result);

        const result1 = await taluka.save();

        const campaign = await Campaign.findById({_id:req.params.id});

        campaign.patients.push(result);

        const result3 = await campaign.save();

        res.status(201).json({
            title:'Patient Added',
            patient  :result
        })

    }

     patient.visitedDates.push(req.body.visitDate);
     patient.treatment.push(req.body.treatment);

     
    let  c = 0;
     if(req.body.disease1){
        patient.diseases.forEach((a)=>{
            if(req.body.disease1 == a){
                c=1;
            }
        })
        if(c==0){
            patient.diseases.push(req.body.disease1);
            
        }
    }
    c=0;
    if(req.body.disease2){
        patient.diseases.forEach((a)=>{
            if(req.body.disease2 == a){
                c=1;
            }
        })
        if(c==0){
            patient.diseases.push(req.body.disease2)
        }
    }
    c=0;
    if(req.body.disease3){
        patient.diseases.forEach((a)=>{
            if(req.body.disease3 == a){
                c=1;
            }
        })
        if(c==0){
            patient.diseases.push(req.body.disease3)
        }
    }
  
   const result = await patient.save();

    res.status(201).json({
        title:'Patient Added',
        patient  :result
    })

})

router.get('/getPatients/:id',async(req,res)=>{

    const campaign = await Campaign.findOne({_id:req.params.id})
    .populate({
        path:'patients',
        select:{'firstName':1,'lastName':1,'villege':1,'mobileNo':1,'diseases':1}
    })
    .select('patients -_id')

    res.status(200).json({
        title:'list of patients',
        patients:campaign
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

router.delete('/deletePatient/:id',async(req,res)=>{

    const result = await Patient.remove({_id:req.params.id});

    res.status(201).json({
        title:'Patient Deleted',
        result : result
    })
})

router.get('/getTalukaPatients/:taluka',async(req,res)=>{

    const patients = await TalukawisePatients.findOne({taluka:req.params.taluka})
    .populate({
        path:'patients',
        select:{'firstName':1,'lastName':1,'villege':1,'mobileNo':1}
    })
    .select('patients')

    res.status(200).json({
        title:'list of patients',
        patients :patients.patients
    })

})

router.get('/patientInfo/:id',async(req,res)=>{

    const patient = await Patient.findById({_id:req.params.id});

    res.status(200).json({
        title:'Patient Info',
        patient :patient
    })

})

router.put('/updatePatient/:id',async(req,res)=>{

    const patient  = await Patient.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            cure : req.body.cure
        }
    },{new:true});

    res.status(201).json({
        title:'Patient updated',
        patient :patient.cure
    })
})

router.get('/count/:taluka',async(req,res)=>{

    const taluka = await TalukawisePatients.findOne({taluka:req.params.taluka})
    .populate({
        path:'patients',
        select:{'cure':1,'diseases':1,'_id':0}
    })
    .select('patients')

    let obj = {
        'asthma' : 0,
        'chronic kidney disease':0,
        'chronic lung disease':0,
        'diabetes':0,
        'heart disease':0,
        'hypertension':0,
        'cancer':0
    }

    for(let i=0;i<taluka.patients.length;i++){

        for(let j=0;j<taluka.patients[i].diseases.length;j++){

            if( taluka.patients[i].cure == false ){

                obj[taluka.patients[i].diseases[j]]= obj[taluka.patients[i].diseases[j]]+1;
            }

        }
    }
    

    res.status(200).json({
        title:'Count of patients',
        count : obj
    })

})

module.exports = router;