const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");

// 🟢 Place a New Order
router.post("/add", async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        console.log("newOrder:", newOrder);
        
        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!", order: newOrder });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// 🔵 Get All Orders of a User
router.get("/user/:userId", async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// 🟡 Update Order Status (Admin)
router.patch("/update-status/:orderId", async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, { deliveryStatus: req.body.status }, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// 🔴 Cancel an Order
router.patch("/cancel/:orderId", async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });
        
        if (order.deliveryStatus === "Shipped" || order.deliveryStatus === "Delivered") {
            return res.status(400).json({ message: "Order cannot be canceled after it is shipped or delivered" });
        }
        
        order.deliveryStatus = "Canceled";
        await order.save();
        res.status(200).json({ message: "Order canceled successfully", order });
    } catch (error) {
        console.error("Error canceling order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
