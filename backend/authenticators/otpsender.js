const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
// Generate a random 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
const sendOTPEmail = async (userEmail, userName) => {
    const otp = generateOTP();
    // Create a transporter object using your email service credentials
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Replace with your email service
        auth: {
        user: process.env.ADMIN_MAIL,
        pass: process.env.MAIL_PASSWORD
    },
    });

    // Set up email data
    let mailOptions = {
        from: '"Academic atlas" <your-email@gmail.com>', // Sender address
        to: userEmail, // List of receivers
        subject: 'Your OTP for Verification', // Subject line
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
                <li>If you encounter any issues, please contact our support team at support@example.com.</li>
            </ol>
        `
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};

// Call the function with the user's email and name
module.exports = sendOTPEmail;
