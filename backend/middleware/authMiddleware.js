// const jwt = require('jsonwebtoken');
// require('dotenv').config(); // Ensure your .env file is loaded

// const verifyUser = (req, res, next) => {
//     try {
//         const token = req.header('Authorization');

//         if (!token) {
//             return res.status(401).json({ message: 'Access denied. No token provided.' });
//         }

//         // Remove 'Bearer ' prefix if present
//         const tokenWithoutBearer = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

//         // Verify token
//         const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

//         // Attach user info to request object
//         req.user = decoded; // decoded contains { id, name, email, etc. }

//         next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//         res.status(401).json({ message: 'Invalid or expired token.' });
//     }
// };

// module.exports = { verifyUser };
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const verifyUser = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            return res.status(403).json({ message: 'Access denied. No token provided.' });
        }

        // Check if token is prefixed with "Bearer "
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Invalid token format.' });
        }

        const token = authHeader.split(' ')[1]; // Extract token after "Bearer "

        if (!token) {
            return res.status(401).json({ message: 'Invalid token format.' });
        }

        // Verify JWT
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: err.name === 'TokenExpiredError' ? 'Token expired.' : 'Invalid token.',
                });
            }

            req.user = decoded; // Attach user details to request
            next(); // Proceed to next middleware
        });

    } catch (error) {
        console.error('Auth Middleware Error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { verifyUser };
