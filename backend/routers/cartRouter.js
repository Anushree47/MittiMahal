const express = require('express');
const Cart = require('../models/cartModel');
const ProductModel = require('../models/productModel');
const UserModel = require('../models/userModel');
const router = express.Router();

// Get cart details for a user
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
    res.status(200).json(cart || { userId: req.params.userId, items: [] });
  } catch (err) {
    console.error("❌ Error fetching cart:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Add to cart
router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    const user = await UserModel.findById(userId).select('name');
    const product = await ProductModel.findById(productId).select('title');
    const timeNow = new Date().toLocaleString();

    console.log(`✅ [${timeNow}] User "${user?.name || 'Unknown'}" added "${product?.title || 'Unknown Product'}" (Qty: ${quantity}) to cart.`);
    res.status(200).json({ message: "Added to cart" });
  } catch (err) {
    console.error("❌ Error adding to cart:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Update cart item quantity
router.put("/update", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item.productId.toString() === productId);
    if (item) item.quantity = quantity;

    await cart.save();
    res.status(200).json({ message: "Cart updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove item from cart
router.delete("/remove", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Clear full cart
router.delete("/clear", async (req, res) => {
  const { userId } = req.body;
  try {
    await Cart.findOneAndUpdate({ userId }, { items: [] });
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Merge guest cart into user cart
router.post("/merge", async (req, res) => {
  const { userId, guestCart } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    guestCart.forEach(guestItem => {
      const existing = cart.items.find(item => item.productId.toString() === guestItem.productId);
      if (existing) {
        existing.quantity += guestItem.quantity;
      } else {
        cart.items.push({ productId: guestItem.productId, quantity: guestItem.quantity });
      }
    });

    await cart.save();
    res.status(200).json({ message: "Guest cart merged successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
