// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const verifyUser = (req, res, next) => {
//     try {
//         const authHeader = req.header('Authorization');
//         console.log("Auth Header:", authHeader); // Debugging
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             console.log("No valid token found");
//             return res.status(401).json({ message: 'Unauthorized. Please log in.' });
//         }

//         const token = authHeader.split(' ')[1];
//         console.log("Extracted Token:", token);

//         jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//             if (err) {
//                 console.log("Token Verification Error:", err);
//                 return res.status(401).json({
//                     message: err.name === 'TokenExpiredError' ? 'Session expired. Please log in again.' : 'Invalid token.',
//                 });
//             }

//             console.log("Token Verified, User:", decoded)
//             req.user = decoded; // Attach user details to request
//             next(); // Proceed to next middleware
//         });

//     } catch (error) {
//         console.error('Auth Middleware Error:', error);
//         res.status(500).json({ message: 'Internal server error.' });
//     }
// };

// module.exports = { verifyUser };
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyUser = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        console.log("Auth Header:", authHeader); // Debugging

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log("No valid token found");
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }

        const token = authHeader.split(' ')[1];
        console.log("Extracted Token:", token);

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log("Token Verification Error:", err);
                return res.status(401).json({
                    message: err.name === 'TokenExpiredError' ? 'Session expired. Please log in again.' : 'Invalid token.',
                });
            }

            console.log("Token Verified, User:", decoded);
            req.user = decoded; // Attach user details to request
            next(); // Proceed to next middleware
        });

    } catch (error) {
        console.error('Auth Middleware Error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { verifyUser };
