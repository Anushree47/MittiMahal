const express = require("express");
const router = express.Router();
const { verifyUser } = require("../middleware/authMiddleware");
const Address = require("../models/addressModel");

// GET - Fetch user's addresses
router.get("/get", verifyUser, async (req, res) => {
    try {
        const addresses = await Address.find({ userId: req.user._id });

        if (!addresses.length) {
            return res.status(404).json({ message: "No addresses found." });
        }

        res.status(200).json(addresses);
    } catch (error) {
        console.error("Error fetching addresses:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// POST - Add a new address
router.post("/add", verifyUser, async (req, res) => {
    try {
        const newAddress = new Address({ userId: req.user.id, ...req.body });
        await newAddress.save();
        res.status(201).json({ message: "Address added successfully.", address: newAddress });
    } catch (error) {
        console.error("Error adding address:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// PUT - Update an address
router.put("/:id", verifyUser, async (req, res) => {
    try {
        const updatedAddress = await Address.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({ message: "Address not found." });
        }

        res.status(200).json({ message: "Address updated successfully.", address: updatedAddress });
    } catch (error) {
        console.error("Error updating address:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// DELETE - Remove an address
router.delete("/:id", verifyUser, async (req, res) => {
    try {
        const deletedAddress = await Address.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

        if (!deletedAddress) {
            return res.status(404).json({ message: "Address not found." });
        }

        res.status(200).json({ message: "Address deleted successfully." });
    } catch (error) {
        console.error("Error deleting address:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;
