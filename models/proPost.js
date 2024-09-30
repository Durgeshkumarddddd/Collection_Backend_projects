const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    description : String ,
    title : String ,
    image : String ,
    user : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'user'
    }
})
module.exports = mongoose.model('post', postSchema);