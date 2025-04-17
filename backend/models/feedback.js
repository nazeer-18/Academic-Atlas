const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    resourceId: { type: Schema.Types.ObjectId, required: true }, 
    resourceType: { type: String, enum: ['exam', 'capstone'], required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    description: { type: String, maxlength: 100 },
    createdAt: { type: Date, default: Date.now }
});

feedbackSchema.index({ userId: 1 });
feedbackSchema.index({ resourceId: 1, resourceType: 1 });

module.exports = mongoose.model('Feedback', feedbackSchema);