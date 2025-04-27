const express = require('express');
const router = express.Router();
const Address = require('../models/addressModel');
const User = require('../models/userModel');
const verifyToken = require('../middlewares/authMiddleware'); // ✅ Import your verifyToken middleware

// Apply token verification to all routes
router.use(verifyToken);

// Add New Address
router.post('/add', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('name phone email');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newAddress = new Address({
      userId: req.user._id,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      city: req.body.city,
      state: req.body.state,
      postalCode: req.body.postalCode,
      country: req.body.country,
    });

    await newAddress.save();

    const addresses = await Address.find({ userId: req.user._id }).populate('userId', 'name phone email');
    res.status(201).json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// ✅ PROPER API:
router.get('/get', verifyToken, async (req, res) => {
    try {
      const addresses = await Address.find({ userId: req.user._id });
      res.status(200).json(addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
// Get All Addresses for a User
router.get('/get', async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user._id }).populate('userId', 'name phone email');
    res.status(200).json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update an Address
router.patch('/update/:id', async (req, res) => {
  try {
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id }, // ✅ make sure address belongs to user
      req.body,
      { new: true }
    );
    res.status(200).json(updatedAddress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete an Address
router.delete('/delete/:id', async (req, res) => {
  try {
    await Address.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Select a Delivery Address
router.patch('/select/:id', async (req, res) => {
  try {
    // Unselect all addresses for this user first
    await Address.updateMany({ userId: req.user._id }, { $set: { isSelected: false } });

    const selectedAddress = await Address.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id }, // Secure update
      { isSelected: true },
      { new: true }
    );
    res.status(200).json(selectedAddress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch Selected Address of a Particular User
router.get('/selected', async (req, res) => {
  try {
    const selectedAddress = await Address.findOne({ userId: req.user._id, isSelected: true });

    if (!selectedAddress) {
      return res.status(404).json({ message: "No selected address found" });
    }

    res.status(200).json(selectedAddress);
  } catch (error) {
    console.error("Error fetching selected address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
