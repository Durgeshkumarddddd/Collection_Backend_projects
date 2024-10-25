const express = require('express')
const app = express();
const userModel = require('../models/miniProject')
const postModel = require('../models/proPost');
const path = require('path');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const { title } = require('process');

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname , 'public')))
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.render('mIndex');
})
app.get('/register', (req, res)=>{
    res.render('mIndex');
})
app.post('/register',  (req, res)=>{
    let { name , email , username , age ,password} = req.body
    const User = userModel.findOne({email})
    if(!User) return res.status(500).send("User is not found")

    bcrypt.genSalt(10 , function(err, salt){
        bcrypt.hash(password , salt , async function(err, hash){
            const userdata = await userModel.create({
                name ,
                username ,
                email ,
                age  ,
                password : hash ,
            })
            var token = jwt.sign({email : userdata}, 'shhhhh');
                res.cookie("token",token);
                res.redirect('/profile')
        })
    })
})
app.get('/login', (req, res)=>{
   res.render('mlogin');
})
app.post('/login', async (req, res)=>{
    let { email,password} = req.body
    const user = await userModel.findOne({email})
    if(!user) return res.status(500).send("User is not found")
  bcrypt.compare(password, user.password, function(req , result){
   if(result) {
    var token = jwt.sign({email : userdata}, 'shhhhh');
    res.cookie("token",token);
    res.status(200).redirect('/profile');
      }
   else res.redirect('/mlogin');
  })  
})
app.get('/logout', (req, res)=>{
    res.cookie("token","")
    res.redirect('/login')
})
app.get('/profile', async (req , res)=>{
    const user = await userModel.findOne({email : req.params.email})
    res.render('Projectprofile',{user})
})
app.get('/post' , function(req, res){
    res.redirect('/Projectprofile');
})
app.post('/post',isLoggedIn, async function(req, res){
    const user  = await postModel.findOne({email : req.body.email}) 
     const post =  await postModel.create({
      image : req.body.image ,
      title: req.body.title ,
      description : req.body.description ,
    })
    user.posts.push(post._id)
    await user.save();
    res.send({post , user});
    
})
function isLoggedIn(req, res ,next){
    if(req.cookies.token === "") res.send("you must be logged in")
    else{
          let data = jwt.verify(req.cookies.token , "shhhhh");
          req.user = data ;
        }
    next();
}

app.listen(3000 , ()=>{
    console.log("Server created");
})