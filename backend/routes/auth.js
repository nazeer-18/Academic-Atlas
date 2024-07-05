require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
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

//create token for user
const generateToken = (user) => {
    const payload = { email: user.email };
    const secret = process.env.VERIFICATION_SECRET;
    const options = { expiresIn: '7d' };
    return jwt.sign(payload, secret, options);
};


// Middleware to validate token
const authenticateToken = (req, res, next) => {
    const token = req.body.headers.Authorization;
    if (!token) return res.status(401).send('Access denied');
    try {
        const verified = jwt.verify(token, process.env.VERIFICATION_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};

//validate token
authRoute.post('/validate', authenticateToken, (req, res) => {
    return res.json({
        success: true,
        user: req.user
    })
})

//fetch user
authRoute.post('/fetch-user', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
        return res.json({
            user: user,
            success: true
        })
    } else {
        return res.json({
            message: 'user not found',
            success: false
        })
    }
})

//login route
authRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
        return res.json({
            success: false,
            message: 'User not found'
        })
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        return res.json({
            success: false,
            message: 'Incorrect password'
        })
    }
    const token = generateToken(user);
    return res.status(200).json({
        success: true,
        message: 'Login successful',
        user: user,
        token: token
    })
});

//register route
authRoute.post('/register', async (req, res) => {
    const { userName, email, password } = req.body;
    console.log(userName, email, password)
    const user = await User.findOne({ email: email.toLowerCase() })
    try {
        if (user) {
            return res.json({
                success: false,
                message: 'User already exists'
            })
        }
        const newUser = new User({
            userName: userName,
            email: email.toLowerCase(),
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
        const user = await User.findOne({ email: email.toLowerCase() });
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
                message: 'OTP sent to your email'
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
            email: email.toLowerCase()
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
                success: true,
                message: 'OTP sent to your email'
            })
        }
    }
    catch (err) { 
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
            .findOne({ email: email.toLowerCase() })
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

//fetch all users count
authRoute.get('/fetch-all-users-count', async (req, res) => {
    try {
        const users = await User.find();
        return res.json({
            success: true,
            count: users.length
        })
    }
    catch (err) {
        return res.json({
            success: false,
            message: 'Internal server error'
        })
    }
})

module.exports = authRoute;