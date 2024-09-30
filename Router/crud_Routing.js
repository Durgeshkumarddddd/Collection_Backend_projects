const express = require('express')
const app = express()
const userModel = require('../models/crudRout')

app.get('/', (req, res)=>{
    res.send('Hello' )
})
app.get('/create', async (req, res)=>{
    const user = await userModel.create({
        fullname : "Nitesh Kumar",
        username : "niteshji",
        email : " durgesh@gmail.com"
    })
    res.send(user);
})
app.get('/update', async (req, res)=>{
    const updateduser = await userModel.findOneAndUpdate({username : 'durgeshji'},{username : "KumarDurgeshji"},{new : true})
    res.send(updateduser);
})
app.get('/read', async (req, res)=>{
    const user = await userModel.find()
    res.send(user)
})
app.get('/delete', async (req, res)=>{
    const deleteduser = await userModel.findOneAndDelete({username :"niteshji"})
    res.send(deleteduser);
})
app.listen(3000 , ()=>{
    console.log("Server created ")
})