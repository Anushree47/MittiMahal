const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyUser = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; // Extract the token

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find user by decoded ID (Ensure user exists in DB)
            const user = await User.findById(decoded.id).select("-password");

            if (!user) {
                return res.status(401).json({ message: "User not found, unauthorized access" });
            }

            req.user = user; // Attach user object to the request
            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

module.exports = { verifyUser };
