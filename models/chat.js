const mongoose = require(mongoose)

const chatSchema = new mongoose.Schema({
    from : String ,
    msg : String ,
    to : String ,
    created_At : Date.now()

})
 
const chat = mongoose.model('chat', chatSchema);