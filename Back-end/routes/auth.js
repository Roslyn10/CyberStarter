const express = require('express');
const { register, login } = require('../controllers/AuthController');
const router = express.Router();
const User = require('../models/User');

router.post('/register', register);
router.post('/login', login);

router.get('/profile', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
