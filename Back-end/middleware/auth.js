// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Retrieve token from headers
    const token = req.header('Authorization').replace('Bearer ', '');

    // Check if no token is provided
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token and get user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
	console.log("Decoded User:", req.user); Logs the decoded user 
        next();
    } catch (err) {
	console.log("Token Verification Falied:", err);
        res.status(401).json({ message: 'Token is not valid' });
    }
};
