let express =require('express');
let router = express.Router();
let User  = require('../model/user');
let Doctor = require('../model/doctor');
let Fcr = require('../model/fcr');
let jwt = require('jsonwebtoken');

router.post('/user',async(req,res)=>{

    let mobileNo = `+91${req.body.mobileNo}`;

    const user = await User.findOne({
        $and:[
            {mobileNo:mobileNo},{password:req.body.password}
        ]
    });

    if(!user){
        return res.status(401).json({
            title:'Not Authenticated',
            error : {message : 'Invalid login credentials'}
        })
    }

    let token = jwt.sign({user : user},'secret',{expiresIn:900});
    res.status(200).json({
       title :"Successfully Loged In",
       token:token,
       userId: user._id, 
   }); 

})

router.post('/doctor',async(req,res)=>{

    const doctor = await Doctor.findOne({
        $and:[
            {uid:req.body.uid},{password:req.body.password}
        ]
    });

    if(!doctor){
        return res.status(401).json({
            title:'Not Authenticated',
            error : {message : 'Invalid login credentials'}
        })
    }

    let token = jwt.sign({doctor : doctor},'secret',{expiresIn:900});
    res.status(200).json({
       title :"Successfully Loged In",
       token:token,
       userId: doctor._id, 
   }); 

})

router.post('/fcr',async(req,res)=>{

    const fcr = await Fcr.findOne({
        $and:[
            {uid:req.body.uid},{password:req.body.password}
        ]
    });

    if(!fcr){
        return res.status(401).json({
            title:'Not Authenticated',
            error : {message : 'Invalid login credentials'}
        })
    }

    let token = jwt.sign({fcr : fcr},'secret',{expiresIn:900});
    res.status(200).json({
       title :"Successfully Loged In",
       token:token,
       userId: fcr._id, 
   }); 

})

router.get('/loggedInUser/:userId',async(req,res)=>{

   const fcr = await Fcr.findById({_id:req.params.userId})
   .select('-password');

   if(!fcr){

       const user = await User.findById({_id:req.params.userId})
       .select('-password');

        if(!user){

            const doctor = await Doctor.findById({_id:req.params.userId})
             .select('-password');

             return res.status(200).json({
                title :'Doctor',
                user : doctor
            })
        }

       return res.status(200).json({
           title :'User',
           user : user
       })
   }

   return res.status(200).json({
    title :'Fcr',
    user : fcr
})

})




module.exports = router;