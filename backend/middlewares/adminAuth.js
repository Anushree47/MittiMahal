const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized: No Token" });
  console.log("Token Received:", token); // Debugging log


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging log
    
    if (decoded.role !== "admin") throw new Error();
    next();
  } catch {
    return res.status(403).json({ message: "Access Denied" });
  }
};

module.exports = verifyAdmin;
