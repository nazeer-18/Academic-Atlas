const express = require('express');
const User = require('../models/user');
const authRoute = express.Router();

//login route
authRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User not found'
        })
    }
    if (user.password !== password) {
        return res.status(400).json({
            success: false,
            message: 'Invalid password'
        })
    }
    return res.status(200).json({
        success: true,
        message: 'Login successful'
    })
});

//register route
authRoute.post('/register', async (req, res) => {
    const { userName, email, password, mobile } = req.body;
    console.log(userName, email, password, mobile)
    const user = await User.findOne({ email: email })
    if (user) {
        return res.status(400).json({
            success: false,
            message: 'User already exists'
        })
    }
    const newUser = new User({
        userName: userName,
        email: email,
        password: password,
        mobile: mobile
    })
    try {
        newUser.save()
        return res.status(200).json({
            success: true,
            message: 'User registered successfully'
        })
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: 'User not registered'
        })
    }
})

module.exports = authRoute;