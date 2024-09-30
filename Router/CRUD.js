const express = require('express')
const app = express();
const userModel = require("../models/users")
const path = require('path')

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(express.static(path.join(__dirname , 'public')));

app.get('/', (req , res, next)=>{
 res.render('crud');
})
app.get('/read', async function(req, res ){
  const users = await userModel.find()
  res.render('read',{users})
})
app.post('/createpost' , async (req , res)=>{
    let {name , email , image} = req.body
    
 const userdata= await userModel.create({
     name,                 //name : name
     email,                // email : email,
     image,               // image : image           
  })
  res.redirect('/read')
})
app.get('/edit/:userid', async function(req, res){
  const user = await userModel.findOne({_id : req.params.userid })
  res.render('edit',{user})
})
app.post('/update/:id',async function(req, res){
  let {name ,email, image } = req.body 
  const user = await userModel.findOneAndUpdate({_id : req.params.id},{name, email, image},{new : true})
  res.redirect('/read')
})
app.get('/delete/:id', async function(req, res){
  const user = await userModel.findOneAndDelete({_id : req.params.id})
  res.redirect('/read')
})

app.listen(3000 , ()=>{
    console.log("Server created successfull")
})