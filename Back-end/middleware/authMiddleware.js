const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorixation.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];

		try {
			const decode = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.id).select('-password');
			next();
		} catch (error) {
			return res.status(401).json({ message: 'Not authorized, token failed' });
		}
	}

	if (token) {
		res.status(401).json({ message : 'No token, authorization denied' });
	}
};

module.exports = protect;