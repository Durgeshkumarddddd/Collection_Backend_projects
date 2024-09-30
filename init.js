const mongoose = require('mongoose')
const Chat = require("./models/chat");


main().then((res)=>{ console.log("Connection of db is successfull")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsApp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

let Allchats =  [
    {
        from : " Durgesh ",
        to : "Nitesh" ,
        msg : "tomorrow is the exam of the ",
        created_At : new Date() ,
    },
    {
        from : " alisa",
        to : "Nitesh" ,
        msg : "This is your mobile phone",
        created_At : new Date() ,
    } ,
    {
        from : " kajal ",
        to : "Durgesh" ,
        msg : "Are you like me  ",
        created_At : new Date() ,
    },    {
        from : " Durgesh ",
        to : "Shradha " ,
        msg : "I like you because you teach every topic very easy way ",
        created_At : new Date() ,
    }
]

Chat.InsertMany(Allchats);