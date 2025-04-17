const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statsSchema = new Schema({
    collegeId: { type: Schema.Types.ObjectId, ref: 'College', required: true },
    branch: { type: String },
    course: { type: String },
    resourceType: { type: String, enum: ['exam', 'project', 'research'] },
    totalItems: { type: Number, default: 0 },
    totalViews: { type: Number, default: 0 },
    totalDownloads: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
});

statsSchema.index({ collegeId: 1, branch: 1, course: 1 });

module.exports = mongoose.model('Stats', statsSchema);