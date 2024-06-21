const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName :{
        type: String,
        required: true,
        unique: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    mobile :{
        type: Number,
        required: true,
    },
    role:{
        type: String,
        default: 'user' // user, admin
    }
})

module.exports = mongoose.model('User',userSchema);