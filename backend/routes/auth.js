const express = require('express');
const bcrypt = require('bcrypt')
const User = require('../models/user');
const authRoute = express.Router();
const sendOTPEmail = require('../authenticators/otpsender');

async function hashPassword(password) {
    const saltRounds = 10; // The cost factor for hashing
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

async function comparePassword(password, hashedPassword) {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error('Error comparing password:', error);
        throw error;
    }
}

//login route
authRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.json({
            success: false,
            message: 'User not found'
        })
    }
    const isMatch = (user.password === password)
    if (!isMatch) {
        return res.json({
            success: false,
            message: 'Invalid password'
        })
    }
    return res.status(200).json({
        success: true,
        message: 'Login successful',
        user: user
    })
});

//register route
authRoute.post('/register', async (req, res) => {
    const { userName, email, password } = req.body;
    console.log(userName, email, password)
    const user = await User.findOne({ email: email })
    try {
        if (user) {
            return res.json({
                success: false,
                message: 'User already exists'
            })
        }
        const newUser = new User({
            userName: userName,
            email: email,
            password: await hashPassword(password)
        })
        await newUser.save()
        return res.json({
            success: true,
            message: 'User registered successfully, Please login to continue'
        })
    }
    catch (err) {
        console.log(err)
        return res.json({
            success: false,
            message: 'User not registered, please try again later'
        })
    }
})

//verify email route
authRoute.post('/verify-mail', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            return res.json({
                success: false,
            })
        }
        else {
            const userName = email;
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            sendOTPEmail(email, userName, otp, "mail");
            return res.json({
                success: true,
                otp: otp
            })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

//verify forgot email route
authRoute.post('/verify-forgot-mail', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({
            email: email
        });
        if (!user) {
            return res.json({
                success: false,
                message: 'User not found, please register first'
            })
        }
        else {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            sendOTPEmail(email, user.userName, otp, "forgot");
            return res.json({
                message: "Otp sent successfully",
                success: true,
                otp: otp
            })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

//reset password route
authRoute.post('/reset-password', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User
            .findOne({ email: email })
        if (!user) {
            return res.json({
                success: false,
                message: 'User not found'
            })
        }
        else {
            user.password = await hashPassword(password);
            await user.save();
            return res.json({
                success: true,
                message: 'Password reset successfully'
            })
        }
    }
    catch (err) {
        return res.json({
            success: false,
            message: 'Internal server error'
        })
    }
})

//change name
authRoute.post('/change-name', async (req, res) => {
    try {
        const { email, userName } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({
                success: false,
                message: 'User not found'
            })
        }
        else {
            user.userName = userName;
            await user.save();
            return res.json({
                success: true,
                message: 'Name changed successfully',
                user: user
            })
        }
    }
    catch (err) {
        return res.json({
            success: false,
            message: 'Internal server error'
        })
    }
})

module.exports = authRoute;