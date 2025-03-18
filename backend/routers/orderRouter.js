const express = require("express");
const { verifyUser } = require("../middleware/authMiddleware");
const Order = require("../models/orderModel");

const router = express.Router();

// 🛒 Place Order (Proceed to Order Summary)
router.post("/place", verifyUser, async (req, res) => {
  try {
    const { selectedAddress, products, totalAmount, paymentMethod } = req.body;
    const userId = req.user._id;

    if (!selectedAddress || !products || products.length === 0 || !paymentMethod) {
      return res.status(400).json({ message: "Address, products, and payment method are required!" });
    }

    // Calculate delivery charges
    let deliveryCharges = totalAmount < 99 ? 49 : 0;
    let finalAmount = totalAmount + deliveryCharges;

    const newOrder = new Order({
      user: userId,
      selectedAddress,
      products,
      totalAmount,
      deliveryCharges,
      finalAmount,
      paymentMethod,
      status: "Pending",
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// 📦 Get All Orders of a User
router.get("/user-orders", verifyUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId }).populate("products.productId");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// 📦 Get Order by ID
router.get("/:orderId", verifyUser, async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
      .populate("user", "fullName email phone")
      .populate("products.productId");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// 📦 Get Order Summary (Before Payment)
router.get("/summary/:orderId", verifyUser, async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
      .populate("user", "fullName email phone")
      .populate("products.productId");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order summary:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// ✏️ Update Order (Only if status is 'Pending')
router.put("/update/:orderId", verifyUser, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { selectedAddress, products, totalAmount, paymentMethod } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.status !== "Pending") return res.status(400).json({ message: "Cannot update an order that is already processed" });

    // Calculate new delivery charges if totalAmount changes
    let deliveryCharges = totalAmount < 99 ? 49 : 0;
    let finalAmount = totalAmount + deliveryCharges;

    order.selectedAddress = selectedAddress || order.selectedAddress;
    order.products = products || order.products;
    order.totalAmount = totalAmount || order.totalAmount;
    order.deliveryCharges = deliveryCharges;
    order.finalAmount = finalAmount;
    order.paymentMethod = paymentMethod || order.paymentMethod;

    const updatedOrder = await order.save();
    res.status(200).json({ message: "Order updated successfully!", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// ❌ Cancel Order (Only if status is 'Pending')
router.delete("/cancel/:orderId", verifyUser, async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.status !== "Pending") return res.status(400).json({ message: "Cannot cancel an order that is already processed" });

    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ message: "Order cancelled successfully!" });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
