const axios = require('axios');
require('dotenv').config();

const mailApiUrl = process.env.MAIL_API_URL;
const appkey = process.env.MAIL_API_APP_KEY;

const sendOTPEmail = async (emailId, userName, otp, choice) => {
    return new Promise((resolve, reject) => {
        let subject = (choice === "mail")
            ? 'Email verification for Academic Atlas'
            : 'OTP to reset password for Academic Atlas';

        const content = `
        Dear ${userName},
        
        Greetings from Academic Atlas!
        
        ${choice === "mail"
            ? `Thank you for registering with us. Please verify your email address to complete the registration process.`
            : `We have received a request to reset your password. To complete the password reset process, please use the One-Time Password (OTP) provided below:`}
        
        Your OTP: ${otp}
        
        If you did not request this verification, please ignore this email. Your account will remain secure.
        
        Thank you for using our service!
        
        Best regards,
        Academic Atlas
        
        Note:
        1. Do not share your OTP with anyone.
        2. If you encounter any issues, please contact our support team at academicatlas.ase@gmail.com.
                `;

        const payload = {
            userEmail: emailId,
            subject: subject,
            content: content
        };

        axios.post(mailApiUrl, payload, {
            headers: {
                'APP-KEY': appkey
            }
        })
        .then(response => {
            console.log('Email sent successfully:', response.data);
            resolve(true);
        })
        .catch(error => {
            console.error('Error sending email:', error);
            reject(false);
        });
    });
};

module.exports = sendOTPEmail;
