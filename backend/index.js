require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());
app.use(express.json());
const connectDB = require('./db');
connectDB.then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(err => {
    console.log('Error connecting to MongoDB:', err.message);
});

const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);

const resourceRoute = require('./routes/resources');
app.use('/api/resources', resourceRoute);

const trackRoute = require('./routes/track');
app.use('/api/track', trackRoute);