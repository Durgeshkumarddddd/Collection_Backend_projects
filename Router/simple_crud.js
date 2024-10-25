const express = require('express')
const app = express();
const path = require('path')
const userModel = require('../models/susers');

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(express.static(path.join(__dirname , 'public')));

app.get('/', (req , res)=>{
    res.render('scrud.ejs');  
})

app.get('/read', async (req, res)=>{
    const user = await userModel.find()
    res.render('Sread',{user});
})
app.post('/create' , async (req, res)=>{
    
 const user = await userModel.create({
     name : req.body.name ,
    email : req.body.email ,
    image : req.body.image ,
 })
  res.redirect('/read')
})
app.get('/edit/:id', async (req, res)=>{
    const user= await userModel.findOne({_id : req.params.id})
    res.render('Sedit',{user})
})
app.post('/update/:id', async (req, res)=>{
    let {name , email, image} = req.body 
    const updatedUser = await userModel.findOneAndUpdate({_id : req.params.id},{name , email,image},{new : true})
    res.redirect('/read');
})
app.get('/delete/:id', async (req, res)=>{
    const deletedUser = await userModel.findOneAndDelete({_id : req.params.id})
    res.redirect('/read');
})
app.listen(3000 , ()=>{
    console.log('server created ')
})