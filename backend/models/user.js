const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, 
    googleId: { type: String }, 
    collegeId: { type: Schema.Types.ObjectId, ref: 'College', required: true },
    rollNo:{type: String , unique: true},
    branch: { type: String, index: true },
    course: { type: String, index: true },
    role: { type: String, enum: ['student','admin'], default: 'student', index: true },
    profilePicture: { type: String },
    bio: { type: String },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

userSchema.index({ collegeId: 1, branch: 1, role: 1 });
userSchema.index({ collegeId: 1, isActive: 1 });

module.exports = mongoose.model('User', userSchema);