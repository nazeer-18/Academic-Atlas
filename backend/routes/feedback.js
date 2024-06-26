const express = require('express');
const feedbackRouter = express.Router();
const User = require('../models/user');
const Feedback = require('../models/feedback');

feedbackRouter.post('/submit', async (req, res) => {
    try {
        const { userId, rating, description } = req.body;

        if (!userId || !rating || !description) {
            return res.json({ message: 'Missing required fields', success: false });
        }

        // Check if user exists
        const user = await User.findById(userId);

        // Check if user has already submitted feedback
        const existingFeedback = await Feedback.findOne({ user: userId });

        if (existingFeedback) {
            // User has already submitted feedback
            return res.json({ message: 'Feedback already submitted. You cannot submit feedback again.',success:false });
        } else {
            // User hasn't submitted feedback before, create new feedback
            const newFeedback = new Feedback({
                user: userId,
                rating,
                description
            });
            await newFeedback.save();
            return res.json({ message: 'Feedback submitted successfully' ,success:true});
        }
    } catch (error) {
        console.error('Error in feedback submission:', error);
        res.status(500).json({ message: 'Error submitting feedback', error: error.message });
    }
});

feedbackRouter.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const feedback = await Feedback.findOne({ user: userId });
        if (feedback) {
            res.json({feedback:feedback,success:true});
        } else {
            res.json({ message: 'No feedback found for this user',success:false });
        }
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ message: 'Error fetching feedback', error: error.message,success:false });
    }
});

module.exports = feedbackRouter;