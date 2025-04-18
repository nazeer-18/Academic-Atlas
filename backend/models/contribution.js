const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contributionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    collegeId: { type: Schema.Types.ObjectId, ref: 'College', required: true }, 
    branch: { type: String }, 
    midSem: [{ type: Schema.Types.ObjectId, ref: 'Exam' }],
    endSem: [{ type: Schema.Types.ObjectId, ref: 'Exam' }],
    projects: [{ type: Schema.Types.ObjectId, ref: 'Capstone' }],
    research: [{ type: Schema.Types.ObjectId, ref: 'Capstone' }],
    totalContributions: { type: Number, default: 0 }, 
    createdAt: { type: Date, default: Date.now },
});

contributionSchema.index({ userId: 1 });
contributionSchema.index({ collegeId: 1, branch: 1 });

module.exports = mongoose.model('Contribution', contributionSchema);
