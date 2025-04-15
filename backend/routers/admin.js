const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyAdmin = require('../middleware/adminAuth');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();


const ADMIN_EMAIL = "riyasharma16602@gmail.com";  // Replace with actual admin email
const ADMIN_PASSWORD_HASH = "$2b$10$Rsb5PO2km9tmwdWYufTm3.J6BJmcRnTpneD3Fsz7z1YC/S64eVBMa"; // Hashed password


//verify admin
router.get('/verify', verifyAdmin, (req, res) => {
    res.json({ message: "Admin verified" });
    
    
  });

// Admin Login API
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Admin Login Attempted", email);//Debugging log

  // Check if email matches the admin email
  if (email !== ADMIN_EMAIL) {
    console.log("Unauthorized: Invalid Email");//Debugging log
    
    return res.status(401).json({ message: "Unauthorized: Invalid Email" });
  }

  // Verify password
  const validPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!validPassword) {
    console.log("Unauthorized: Incorrect Password");//Debugging log
    
    return res.status(401).json({ message: "Unauthorized: Incorrect Password" });
  }

  // Generate JWT token
  const token = jwt.sign({ email: ADMIN_EMAIL, role: "admin" }, process.env.JWT_SECRET, { expiresIn: '1h' });

  console.log("Admin Login Successful, Token Generated");//Debugging log
  

  res.json({ token });
});

module.exports = router;
