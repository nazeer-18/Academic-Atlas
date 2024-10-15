const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const capstoneSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    academicYear: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    course: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    url: {
        type: String, //github for projects and papaer link for research papers
        required: true,
    },
    category:{
        type: String, //project, research
        required: true,
    },
    summary:{
        type:String,
        required:false,
    }
});

module.exports = mongoose.model('Capstone', capstoneSchema);