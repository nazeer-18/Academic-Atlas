const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    userType: { type: String, enum: ['personal', 'institute'], required: true },

    collegeId: { 
        type: Schema.Types.ObjectId, 
        ref: 'College',
        required: function() {
            return this.userType === 'institute';
        }
    },
    rollNo: { 
        type: String, 
        unique: true,
        sparse: true, 
        required: function() {
            return this.userType === 'institute';
        }
    },
    branch: { 
        type: String, 
        index: true,
        required: function() {
            return this.userType === 'institute';
        }
    },
    role: { type: String, enum: ['student','admin'], default: 'student', index: true },
    profilePicture: { type: String },
    bio: { type: String },
    createdAt: { type: Date, default: Date.now }
});

userSchema.index({ collegeId: 1, branch: 1, role: 1 });
userSchema.index({ collegeId: 1 });

module.exports = mongoose.model('User', userSchema);
