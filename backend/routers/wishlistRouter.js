// const express = require('express');
// const Model = require('../models/wishlistModel');


// const router = express.Router();
// // Add to wishlist
// router.post("/add", async (req, res) => {
//     const { userId, productId } = req.body;
//     try {
//       const exists = await Model.findOne({ userId, productId });
//       if (exists) return res.status(409).json({ message: "Already in Wishlist" });
  
//       const newItem = new Model({ userId, productId });
//       await newItem.save();
//       res.status(201).json(newItem);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });
  
//   // Get wishlist for a user
//   router.get("/:userId", async (req, res) => {
//     try {
//       const Model = await Model.find({ userId: req.params.userId }).populate("productId");
//       res.status(200).json(Model);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });
  
//   // Remove from wishlist
//   router.delete("/remove", async (req, res) => {
//     const { userId, productId } = req.body;
//     try {
//       await Model.findOneAndDelete({ userId, productId });
//       res.status(200).json({ message: "Removed from Wishlist" });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });
  
// wishlistRouter.js
const express = require('express');
const Wishlist = require('../models/wishlistModel');
const ProductModel = require('../models/productModel');  // Make sure you have this model
const UserModel = require('../models/userModel');         // And this model too
const router = express.Router();

// Add to wishlist
router.post("/add", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const exists = await Wishlist.findOne({ userId, productId });
    if (exists) return res.status(409).json({ message: "Already in Wishlist" });

    const newItem = new Wishlist({ userId, productId });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/add", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const exists = await WishlistModel.findOne({ userId, productId });
    if (exists) {
      console.log(`❌ User [ID: ${userId}] tried to add duplicate product [ID: ${productId}] to wishlist.`);
      return res.status(409).json({ message: "Already in Wishlist" });
    }

    const newItem = new WishlistModel({ userId, productId });
    await newItem.save();

    // 🔥 Fetch user name and product name
    const user = await UserModel.findById(userId).select('name');
    const product = await ProductModel.findById(productId).select('title');

    // 🕒 Get current timestamp
    const timeNow = new Date().toLocaleString();

    console.log(`✅ [${timeNow}] User "${user?.name || 'Unknown User'}" added product "${product?.title || 'Unknown Product'}" to wishlist.`);

    res.status(201).json(newItem);
  } catch (err) {
    console.error("❌ Error adding to wishlist:", err.message);
    res.status(500).json({ error: err.message });
  }
});
// Get wishlist for a user
router.get("/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.params.userId }).populate("productId");
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove from wishlist
router.delete("/remove", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    await Wishlist.findOneAndDelete({ userId, productId });
    res.status(200).json({ message: "Removed from Wishlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 Update full wishlist (bulk save)
router.post("/update", async (req, res) => {
  const { userId, wishlist } = req.body;
  try {
    await Wishlist.deleteMany({ userId });
    const newWishlist = wishlist.map(item => ({ userId, productId: item._id }));
    await Wishlist.insertMany(newWishlist);
    res.status(200).json({ message: "Wishlist updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





  module.exports = router;
  