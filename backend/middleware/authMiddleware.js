const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure your .env file is loaded

const verifyUser = (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        // Remove 'Bearer ' prefix if present
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

        // Verify token
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

        // Attach user info to request object
        req.user = decoded; // decoded contains { id, name, email, etc. }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = { verifyUser };
