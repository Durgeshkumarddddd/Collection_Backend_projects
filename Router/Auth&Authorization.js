const express = require('express');
const app = express();
const path = require('path')
const userModel = require('../models/Auth')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname , 'public')))
app.get('/', function(req , res){
    res.render('Auth&Authorization');
})
app.post('/create', (req, res)=>{
    let {name , email, password} = req.body ;
    bcrypt.genSalt(10 , function(err, salt){
       bcrypt.hash(password , salt , async function(err, hash){
        const createduser = await userModel.create({
            name,
            email,
            password : hash
        })
        res.redirect('/');
       }) 
    })
    var token = jwt.sign({email}, "sddddddddd");
    res.cookie("token",token);
    res.redirect('/');
})
app.get('/logout', (req, res)=>{
    res.cookie('cookie', "");
    res.redirect('/');
})
app.get('/login', async (req, res)=>{
    res.render('AuthLogin');
})
app.post('/login', async (req, res)=>{
    const user = await userModel.findOne({email : req.body.email})
    if(!user) return console.log('User not avaible some thing went wrong')
    bcrypt.compare(req.body.password , user.password , function(err,result){
     if(result) {
        
        var token = jwt.sign({email : user.email}, "sddddddddd");
        res.cookie("token",token);
        res.redirect('/');
     }
     else {
        console.log("login email or password is wrong")
     }
    
    })
})
app.listen(3000)