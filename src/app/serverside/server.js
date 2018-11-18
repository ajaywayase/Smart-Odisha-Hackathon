require('express-async-errors');
let express =require('express');
let bodyparser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors');
let app = express();

/*const twilio = require('twilio')('AC71b131cf19d866871889af07e97ca213','b51891b5ece92bb1718f4b38a3862c9a');

const numbers = [
   '+918208997016','+918830311899'
]
Promise.all(
    numbers.map(number => {
      return twilio.messages.create({
        to: number,
        from:'+12172866559' ,
        body: "Last Trial"
      });
    })
  ) .then(messages => {
      console.log('Messages sent!');
    })
    .catch(err => console.error(err));*/

let signupRoutes = require('./route/signup');
let signinRoutes = require('./route/signin');
let fcrRoutes = require('./route/fcr');
let doctorRoutes = require('./route/doctor');
let userRoutes  = require('./route/user');

mongoose.connect('mongodb://localhost:27017/SmartOdishaHackathon',{
  useMongoClient:true,
});

mongoose.connection.on('connected',()=>{
    console.log('mongodb connected');
})

mongoose.connection.on('error',(err)=>{
    console.log(err);
})

app.use(cors());
app.use(bodyparser.json());
app.use('/signup',signupRoutes);
app.use('/signin',signinRoutes);
app.use('/fcr',fcrRoutes);
app.use('/doctor',doctorRoutes);
app.use('/user',userRoutes);

app.get('/', function (req, res, next) {
    res.render('index');
});

app.use(function(err,req,res,next){
    res.status(500).send(err);
});

const port = process.env.PORT||3000;
app.listen(port,()=>{
    console.log("server started at port "+port);
})
