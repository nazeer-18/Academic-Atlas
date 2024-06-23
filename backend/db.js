require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const connectDB = mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB:', err.message);
});
module.exports = connectDB;