const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_MAIL,
        pass: process.env.MAIL_PASSWORD
    },
});

const serverUrl = process.env.SERVER_URL;

const sendOTPEmail = async (emailId, userName, otp) => {
    const mailContent = {
        from: process.env.ADMIN_MAIL,
        to: emailId,
        subject: 'Otp to reset your password',
        html: `
            <p>Dear ${userName},</p>
            <p>We have received a request to verify your email address. To complete the verification process, please use the One-Time Password (OTP) provided below:</p>
            <h2>Your OTP: ${otp}</h2>
            <p>Please enter this OTP in the verification screen to confirm your email address. This OTP is valid for the next 10 minutes.</p>
            <p>If you did not request this verification, please ignore this email. Your account will remain secure.</p>
            <p>Thank you for using our service!</p>
            <p>Best regards,</p>
            <p>Academic atlas<br>
            <hr>
            <p>Note:</p>
            <ol>
                <li>Do not share your OTP with anyone.</li>
                <li>If you encounter any issues, please contact our support team at academicatlas.ase@gmail.com.</li>
            </ol>
        `
    };

    transporter.sendMail(mailContent, (error, info) => {
        if (error) {
            console.log('Error occurred while sending mail');
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendOTPEmail;
