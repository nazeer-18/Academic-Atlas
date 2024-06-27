const express = require('express');
const feedbackRouter = express.Router();
const User = require('../models/user');
const Feedback = require('../models/feedback');

feedbackRouter.post('/submit', async (req, res) => {
    console.log('Received feedback submission request:', req.body);
    try {
        const { userId, rating, description } = req.body;

        if (!userId || !rating || !description) {
            console.log('Missing required fields');
            return res.json({ message: 'Missing required fields', success: false });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found:', userId);
            return res.status(404).json({ message: 'User not found', success: false });
        }

        // Check if user has already submitted feedback
        let existingFeedback = await Feedback.findOne({ user: userId });

        if (existingFeedback) {
            console.log('Updating existing feedback for user:', userId);
            // Update existing feedback
            existingFeedback.rating = rating;
            existingFeedback.description = description;
            await existingFeedback.save();
            return res.json({ message: 'Feedback updated successfully', success: true });
        } else {
            console.log('Creating new feedback for user:', userId);
            // User hasn't submitted feedback before, create new feedback
            const newFeedback = new Feedback({
                user: userId,
                rating,
                description
            });
            await newFeedback.save();
            return res.json({ message: 'Feedback submitted successfully', success: true });
        }
    } catch (error) {
        console.error('Error in feedback submission:', error);
        res.status(500).json({ message: 'Error submitting feedback', error: error.message, success: false });
    }
});

feedbackRouter.get('/:userId', async (req, res) => {
    console.log('Received request for feedback:', req.params.userId);
    try {
        const userId = req.params.userId;
        const feedback = await Feedback.findOne({ user: userId });
        if (feedback) {
            console.log('Found feedback for user:', userId);
            res.json({ feedback: feedback, success: true });
        } else {
            console.log('No feedback found for user:', userId);
            res.json({ message: 'No feedback found for this user', success: false });
        }
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ message: 'Error fetching feedback', error: error.message, success: false });
    }
});

module.exports = feedbackRouter;