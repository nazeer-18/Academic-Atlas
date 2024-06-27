const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trackSchema = new Schema({
    branch:{
        type: String, 
    },
    course:{
        type: String, 
    },
})

module.exports = mongoose.model('Track', trackSchema)