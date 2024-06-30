const express = require('express');
const feedbackRouter = express.Router();
const User = require('../models/user');
const Feedback = require('../models/feedback');

feedbackRouter.post('/submit', async (req, res) => {
    try {
        const { email, rating, description } = req.body; 
        const user = await User.findOne({email:email});
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        let existingFeedback = await Feedback.findOne({ email: email });

        if (existingFeedback) {
            existingFeedback.rating = rating;
            existingFeedback.description = description;
            await existingFeedback.save();
            return res.json({ message: 'Feedback updated successfully', success: true });
        } else {
            const newFeedback = new Feedback({
                email: email,
                rating,
                description
            });
            await newFeedback.save(); 
            return res.json({ message: 'Feedback submitted successfully', success: true });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while processing your request', success: false });
    }
});

feedbackRouter.get('/get-feedback/:email', async (req, res) => {
    try {
        const email = req.params.email; 
        const feedback = await Feedback.findOne({ email: email });
        if (feedback) {
            res.json({ feedback: feedback, success: true });
        } else {
            res.status(404).json({ message: 'No feedback found for this user', success: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching feedback', success: false });
    }
});

feedbackRouter.get('/all', async (req, res) => {
    try { 
        const feedbacks = await Feedback.find(); 
        return res.json({ feedbacks: feedbacks, success: true });
    } catch (error) {
        return res.json({ message: 'An error occurred while fetching feedbacks', success: false });
    }
});

module.exports = feedbackRouter;