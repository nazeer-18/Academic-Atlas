const express = require('express');
const User = require('../models/user');
const authRoute = express.Router();
const sendOTPEmail = require('../authenticators/otpsender');

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
//verify email route
authRoute.post('/verify',async(req,res)=>{
    try{
    const {email} = req.body;
    const user = await User .findOne({email: email})
    if(!user){
        return res.status(400).json({
            success: false,
            message: 'User not found, please register'
        })
    }
    else{
        sendOTPEmail(email,user.userName);
        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully'
        })
    }
    }    
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})
//reset password route
authRoute.post('/reset',async(req,res)=>{
    try{
    const {email,password} = req.body;
    const user = await User
    .findOne ({email: email})
    if(!user){
        return res.status(400).json({
            success: false,
            message: 'User not found'
        })
    }
    else{
        user.password = password;
        user.save();
        return res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        })
    }    
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
} )

module.exports = authRoute;