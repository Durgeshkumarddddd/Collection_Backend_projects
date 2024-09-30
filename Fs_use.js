/* 1. npm init
   2. npm i express
 */ 
// const { dir } = require('console');
const express = require('express')
const app = express();
const fs = require('fs')

const path = require('path')

 app.use(express.json());
 app.use(express.urlencoded({ extended : true }));

 app.set("view engine","ejs")
 app.use(express.static(path.join(__dirname,"public")));

app.get('/', function(req, res){
  fs.readdir(`./files`,function(err , files){
    res.render('index', {files :files});
  }) 
}) ;  
app.get('/:username', function(req, res){
  fs.readFile(`./files/${req.params.username}.txt`, function(err, userdata){
    console.log(userdata);
    res.render('show',`${req.params.username}`)
  })
})
app.post('/createpost', function(req , res ){
  fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.details, (err)=>{
    res.redirect('/')
  })
});
app.listen(3000)