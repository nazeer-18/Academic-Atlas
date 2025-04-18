const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collegeSchema = new Schema({
    name: { type: String, required: true, index: true },
    location: { type: String },
    branches: [{
        name: { type: String, required: true },
        courses: [{
            type: String,
            required: true 
        }]
    }],
    studentDomain: { type: String },
    facultyDomain: { type: String },
    createdAt: { type: Date, default: Date.now }
});

collegeSchema.index({ name: 1 });

module.exports = mongoose.model('College', collegeSchema);