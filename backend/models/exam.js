const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({
    collegeId: { type: Schema.Types.ObjectId, ref: 'College', required: true },
    category: { type: String, enum: ['midSem', 'endSem'], required: true },
    academicYear: { type: String, required: true },
    branch: { type: String, required: true },
    course: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileId: { type: String },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

examSchema.index({ collegeId: 1, branch: 1, course: 1, academicYear: 1 });
examSchema.index({ collegeId: 1, category: 1, status: 1 });
examSchema.index({ authorId: 1 });
examSchema.index({ subject: 1 });
examSchema.index({ tags: 1 });

module.exports = mongoose.model('Exam', examSchema);
