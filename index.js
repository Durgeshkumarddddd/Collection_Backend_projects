const express = require('express')
const app = express()
const path = require('path')
 

app.set("view engine", "ejs")
app.set("views",path.join(__dirname, '/views'))
app.set("public", path.join(__dirname, '/public'))

app.get('/chat',(req,res)=>{
  res.render('chat')
})

app.get('/',(req,res)=>{
  res.send("successfull server created");
})

app.listen(8080 , ()=>{
  console.log("Server started")
})
