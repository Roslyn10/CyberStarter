const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express
const app = express();

app.use(cors({
    origin: 'process.env.FRONTEND_URL',
    methods: ['GET', 'POST', 'PUT'],
    credentials: true
}));



// Parse JSON requests
app.use(express.json());

// Use authentication routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));