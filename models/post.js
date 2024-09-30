const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    postText : String ,
    users : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'user'
    }],
    createdAt : {
        type : Date ,
        default : Date.now
    }
})

module.exports = mongoose.model('post', postSchema)