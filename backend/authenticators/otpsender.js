const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_MAIL,
        pass: process.env.MAIL_PASSWORD,
    },
});

const serverUrl = process.env.SERVER_URL;

const sendOTPEmail = async (emailId, userName, otp, choice) => {
    return new Promise((resolve, reject) => {
        let subject = '';
        const mailContent = {
            from: process.env.ADMIN_MAIL,
            to: emailId,
            subject: (choice === "mail") ? 'Email verification for Academic Atlas' : "Otp to reset password for Academic Atlas",
            html: `
            <p>Dear ${userName},</p>
            <p>Greetings from Academic Atlas!</p>
            ${choice === "mail" ? `<p>Thank you for registering with us. Please verify your email address to complete the registration process.</p>` : `<p>We have received a request to reset your password. To complete the password reset process, please use the One-Time Password (OTP) provided below:</p>`}
            <hr>
            <h2>Your OTP: ${otp}</h2>
            <hr>
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

        transporter.sendMail(mailContent, async (error, info) => {
            if (error) {
                console.log('Error occurred while sending mail');
                console.log(error);
                reject(false);
            } else {
                console.log('Email sent: ' + info.response);
                resolve(true);
            }
        });
    });
};

module.exports = sendOTPEmail;
