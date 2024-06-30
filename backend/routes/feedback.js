const express = require('express');
const feedbackRouter = express.Router();
const User = require('../models/user');
const Feedback = require('../models/feedback');

feedbackRouter.post('/submit', async (req, res) => {
    try {
        const { userId, rating, description } = req.body;
        console.log(req.body)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        let existingFeedback = await Feedback.findOne({ user: userId });

        if (existingFeedback) {
            existingFeedback.rating = rating;
            existingFeedback.description = description;
            await existingFeedback.save();
            return res.json({ message: 'Feedback updated successfully', success: true });
        } else {
            const newFeedback = new Feedback({
                user: userId,
                rating,
                description
            });
            await newFeedback.save();
            console.log("feedback submitted sucesfully");
            return res.json({ message: 'Feedback submitted successfully', success: true });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while processing your request', success: false });
    }
});

feedbackRouter.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const feedback = await Feedback.findOne({ user: userId });
        if (feedback) {
            res.json({ feedback: feedback, success: true });
        } else {
            res.status(404).json({ message: 'No feedback found for this user', success: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching feedback', success: false });
    }
});

module.exports = feedbackRouter;