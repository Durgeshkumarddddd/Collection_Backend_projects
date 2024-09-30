const express = require('express')
const app = express() ;
const userModel = require('../models/user')
const postModel = require('../models/post');
const user = require('../models/user');
app.get('/', (req, res)=>{
    res.send("Aggregation function use")
})
app.get('/create', async (req, res)=>{
    const user = await userModel.create({
       name : "Durgesh",
       email : "durgesh@gmail.com",
       age : 20 ,
    })
    res.send(user)
})

app.get('/post/create', async (req, res)=>{
    const post = await postModel.create({
        postText : "This aggreagation function understanding " ,
        users : "6630ef4d8a14d6dbace69efe" ,
    })
    const user = await userModel.findOne({_id : "6630ef4d8a14d6dbace69efe"})
    user.posts.push(post._id);
    await user.save();
    res.send({post , user})
})

app.listen(3000 , ()=>{
    console.log("server created");
})