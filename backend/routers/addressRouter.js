 const express = require('express');
const router = express.Router();
const Address = require('../models/addressModel');
const User = require('../models/userModel');

// 🟢 Add New Address
router.post('/add', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId).select('name phone email');
        if (!user) return res.status(404).json({ message: 'User not found' });

        const newAddress = new Address({
            userId: req.body.userId,
            addressLine1: req.body.addressLine1,
            addressLine2: req.body.addressLine2,
            city: req.body.city,
            state: req.body.state,
            postalCode: req.body.postalCode,
            country: req.body.country,
        });

        await newAddress.save();

        const addresses = await Address.find({ userId: req.body.userId }).populate('userId', 'name phone email');
        res.status(201).json(addresses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// 🔵 Get All Addresses for a User
router.get('/get/:userId', async (req, res) => {
    try {
        const addresses = await Address.find({ userId: req.params.userId }).populate('userId', 'name phone email');
        res.status(200).json(addresses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// 🟡 Update an Address
router.patch('/update/:id', async (req, res) => {
    try {
        const updatedAddress = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedAddress);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// 🔴 Delete an Address
router.delete('/delete/:id', async (req, res) => {
    try {
        await Address.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// 🟣 Select a Delivery Address
router.patch('/select/:id', async (req, res) => {
    try {
        await Address.updateMany({ userId: req.body.userId }, { $set: { isSelected: false } });
        
        const selectedAddress = await Address.findByIdAndUpdate(req.params.id, { isSelected: true }, { new: true });
        res.status(200).json(selectedAddress);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// 🟠 Fetch Selected Address of a Particular User
// 🟢 Get Selected Address for a User
router.get('/selected/:userId', async (req, res) => {
    try {
        const selectedAddress = await Address.findOne({ userId: req.params.userId, isSelected: true });

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
