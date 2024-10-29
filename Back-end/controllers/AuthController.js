const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Function to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// User Registration
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ username, email, password });
        await user.save();

        const token = generateToken(user._id);  // Generate the token here
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Ensure the user is found
        }

        // Check if the password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);  // Generate the token here
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

