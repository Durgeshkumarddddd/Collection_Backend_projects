const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/crudRout')
const userSchema = mongoose.Schema({
    fullname : String,
    username : String ,
    email : String ,

})
module.exports = mongoose.model('user',userSchema) ;