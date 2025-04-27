// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// const verifyUser = async (req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//         try {
//             token = req.headers.authorization.split(" ")[1]; // Extract the token

//             // Verify token
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);

//             // Find user by decoded ID (Ensure user exists in DB)
//             const user = await User.findById(decoded.id).select("-password");

//             if (!user) {
//                 return res.status(401).json({ message: "User not found, unauthorized access" });
//             }

//             req.user = user; // Attach user object to the request
//             next();
//         } catch (error) {
//             console.error("Token verification failed:", error);
//             return res.status(401).json({ message: "Not authorized, token failed" });
//         }
//     } else {
//         return res.status(401).json({ message: "Not authorized, no token provided" });
//     }
// };

// module.exports = { verifyUser };
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
  try {
    let token;

    // Check if Authorization header is present
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');

      // Find the user by ID decoded from token
      const user = await UserModel.findById(decoded._id).select('-password'); // don't return password

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Attach user to the request object
      req.user = user;

      // Go to the next middleware / controller
      next();
    } else {
      return res.status(401).json({ message: 'Not authorized, token missing' });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};

module.exports = verifyToken;
