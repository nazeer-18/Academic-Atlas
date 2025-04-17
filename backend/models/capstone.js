const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const capstoneSchema = new Schema({
    collegeId: { type: Schema.Types.ObjectId, ref: 'College', required: true },
    title: { type: String, required: true },
    summary: { type: String },
    category: { type: String, enum: ['project', 'research'], required: true },
    academicYear: { type: String, required: true },
    branch: { type: String, required: true },
    course: { type: String, required: true },
    url: { type: String, required: true }, 
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [String],
    status: { type: String, enum: ['active', 'archived'], default: 'active' },
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

capstoneSchema.index({ collegeId: 1, branch: 1, course: 1, academicYear: 1 });
capstoneSchema.index({ collegeId: 1, category: 1, status: 1 });
capstoneSchema.index({ authorId: 1 });
capstoneSchema.index({ tags: 1 });

module.exports = mongoose.model('Capstone', capstoneSchema);