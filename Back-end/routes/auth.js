const express = require('express');
const { register, login } = require('../controllers/AuthController');
const auth = require('../middleware/auth');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

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
    // Send the username and email
    res.json({ username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Profile route with authentication middleware
router.put('/profile', auth, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields only if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    // Return the updated profile
    res.json({ username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
