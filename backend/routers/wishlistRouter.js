const express = require('express');
const Model = require('../models/wishlistModel');


const router = express.Router();
// Add to wishlist
router.post("/add", async (req, res) => {
    const { userId, productId } = req.body;
    try {
      const exists = await Model.findOne({ userId, productId });
      if (exists) return res.status(409).json({ message: "Already in Wishlist" });
  
      const newItem = new Model({ userId, productId });
      await newItem.save();
      res.status(201).json(newItem);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get wishlist for a user
  router.get("/:userId", async (req, res) => {
    try {
      const Model = await Model.find({ userId: req.params.userId }).populate("productId");
      res.status(200).json(Model);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Remove from wishlist
  router.delete("/remove", async (req, res) => {
    const { userId, productId } = req.body;
    try {
      await Model.findOneAndDelete({ userId, productId });
      res.status(200).json({ message: "Removed from Wishlist" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  module.exports = router;
  