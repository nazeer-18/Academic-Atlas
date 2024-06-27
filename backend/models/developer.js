const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const developerSchema = new Schema({
    developerName :{
        type: String,
        required: true
    },
    imageurl:{
        type: String,
        required: true,
    },
    instaId:{
        type: String,
        required: true,
    }, 
    linkedInId:{
        type: String,
        required: true,
    },
    mailId:{
        type: String,
        required: true,
    }

})

module.exports = mongoose.model('Developer',developerSchema);