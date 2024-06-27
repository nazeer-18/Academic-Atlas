const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({
    category: {
        type: String, //midSem, endSem
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
    course: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String, //url of the file on google drive
        required: true,
    },
    fileId: {
        type: String, //id of the file on google drive
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Exam', examSchema);