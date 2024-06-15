const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({ 
    category:{
        type: String, //mid,end
        required: true,
    },
    academicYear :{
        type: String,
        required: true,
    },
    branch : {
        type: String,
        required: true,
    },
    course : {
        type: String,
        required: true,
    },
    pdfFile :{
        type: Buffer,
        required: true,
    },
    date : {
        type: Date,
        default: Date.now,
    },
    author : {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Exam',examSchema);