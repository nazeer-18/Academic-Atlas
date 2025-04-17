const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statsSchema = new Schema({
    collegeId: { type: Schema.Types.ObjectId, ref: 'College', required: true },
    midSem: {
        totalItems: { type: Number, default: 0 },
        views: { type: Number, default: 0 },
        downloads: { type: Number, default: 0 }
    },
    endSem: {
        totalItems: { type: Number, default: 0 },
        views: { type: Number, default: 0 },
        downloads: { type: Number, default: 0 }
    },
    projects: {
        totalItems: { type: Number, default: 0 },
        views: { type: Number, default: 0 },
        downloads: { type: Number, default: 0 }
    },
    research: {
        totalItems: { type: Number, default: 0 },
        views: { type: Number, default: 0 },
        downloads: { type: Number, default: 0 }
    },

    updatedAt: { type: Date, default: Date.now }
});

statsSchema.index({ collegeId: 1, branch: 1 });

module.exports = mongoose.model('Stats', statsSchema);
