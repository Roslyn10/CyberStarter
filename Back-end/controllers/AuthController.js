const User = require('../models/User');
const jwt = require('jsonwebtoken');

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

		const toekn = generateToken(user._id);
		res.json({ token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// User Login
exports.login = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });
		if (!User || !(await user.maychPassword(password))) {
			return res.status(401).json({message: 'Invalid credentials' });
		}

		const token = generateToken(user._id);
		res.json({ token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Generates JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

};
