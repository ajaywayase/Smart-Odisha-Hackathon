let express =require('express');
let router = express.Router();
let District = require('../model/talukas');
let Taluka = require('../model/villeges');
let User  = require('../model/user');
let Doctor = require('../model/doctor');
let Fcr = require('../model/fcr');

router.get('/getTalukas/:district',async(req,res)=>{

    const district = await District.findOne({district:req.params.district});

    if(!district){
        res.status(500).json({
            title:"No district found"
        })
    }

    res.status(200).json({
        title:"List of talukas",
        talukas:district.talukas
    })
})

router.get('/getVilleges/:taluka',async(req,res)=>{

    const taluka = await Taluka.findOne({taluka:req.params.taluka});

    if(!taluka){
        res.status(500).json({
            title:"No taluka found"
        })
    }

    res.status(200).json({
        title:"List of villeges",
        villeges:taluka.villeges
    })
})

router.post('/user',async(req,res)=>{

    const searchUser = await User.findOne({aadharNo : req.body.aadharNo});

    if(searchUser){
       return res.status(500).json({
            title:'Not Allowed',
            error : {message:'User already exists'}

        })
    }

    const user = new User({
        firstName : req.body.firstName,
        middleName : req.body.middleName,
        lastName : req.body.lastName,
        district : req.body.district,
        taluka : req.body.taluka,
        villege : req.body.villege,
        aadharNo : req.body.aadharNo,
        mobileNo : req.body.mobileNo,
        password : req.body.password
    });

    const result = await user.save();

    const taluka= await Taluka.findOne({taluka:req.body.taluka});

    taluka.people.push(result);

    const result1 = await taluka.save();

    if(!result){
        res.status(500).json({
            title:"Error Occured",
            error : {message:'User not added'}
        })
    }

    if(!result1){
        res.status(500).json({
            title:"Error Occured",
            error : {message:'User not added'}
        })
    }
    
    res.status(201).json({
        title:'User added successfully'
    })

})

router.post('/doctor',async(req,res)=>{

    const doctor = await Doctor.findOne({
        $and:[
            {firstName:req.body.firstName},{lastName:req.body.lastName},
            {uid:req.body.uid}
        ]
    })

    if(!doctor){
        return res.status(500).json({
            title:'Error',
            error : {message:'something went wrong'}
        })
    }

    doctor.password = req.body.password;

    const result = await doctor.save();

    res.status(201).json({
        title:'password set successfully'
    })

})

router.post('/fcr',async(req,res)=>{

    const fcr = await Fcr.findOne({
        $and:[
            {firstName:req.body.firstName},{lastName:req.body.lastName},
            {uid:req.body.uid}
        ]
    })

    if(!fcr){
        return res.status(500).json({
            title:'Error',
            error : {message:'something went wrong'}
        })
    }

    fcr.password = req.body.password;

    const result = await fcr.save();

    res.status(201).json({
        title:'password set successfully'
    })

})

module.exports = router;