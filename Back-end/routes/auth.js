const express = require('express');
const { register, login } = require('../controllers/AuthController');
const auth = require('../middleware/auth');
const router = express.Router();
const User = require('../models/User');

// Register and Login routes
router.post('/register', register);
router.post('/login', login);

// Profile route with authentication middleware
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
	// Sends the username and email
        res.json({ username: user.username, email: user.email });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
