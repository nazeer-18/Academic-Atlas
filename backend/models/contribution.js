const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contributionSchema = new Schema({
    userEmail: {
        type: String,
        ref: 'User',
        required: true
    },
    midSem: [{
        type: [Schema.Types.ObjectId],
        ref: 'Exam'
    }],
    endSem: [{
        type: [Schema.Types.ObjectId],
        ref: 'Exam'
    }],
    project: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Capstone'
        }    ],
    research: {
        type: [Schema.Types.ObjectId],
        ref: 'Capstone'
    }
})
module.exports = mongoose.model('Contribution', contributionSchema);