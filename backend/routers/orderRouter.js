const express = require('express');
const { verifyUser } = require('../middleware/authMiddleware');
const Order = require('../models/orderModel');

const router = express.Router();

// 🛒 Create Order (User selects address & confirms order)
router.post('/place', verifyUser, async (req, res) => {
    try {
        const { addressId, products, totalAmount } = req.body;
        const userId = req.user._id;

        if (!addressId || !products || products.length === 0) {
            return res.status(400).json({ message: "Address and products are required!" });
        }

        const newOrder = new Order({
            userId,
            address: addressId,
            products,
            totalAmount,
            status: "Pending"
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!", order: newOrder });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// 📦 Get All Orders of a User
router.get('/user-orders', verifyUser, async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({ userId }).populate("address").populate("products.productId");
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// 📦 Get Orders by User ID (Admin or Authenticated User)
router.get('/orders-by-user/:userId', verifyUser, async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).populate("address").populate("products.productId");
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// ✏️ Update Order (Only if status is 'Pending')
router.put('/update/:orderId', verifyUser, async (req, res) => {
    try {
        const { orderId } = req.params;
        const { addressId, products, totalAmount } = req.body;
        
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Only allow updates if order is still pending
        if (order.status !== "Pending") {
            return res.status(400).json({ message: "Cannot update an order that is already processed" });
        }

        order.address = addressId || order.address;
        order.products = products || order.products;
        order.totalAmount = totalAmount || order.totalAmount;

        const updatedOrder = await order.save();
        res.status(200).json({ message: "Order updated successfully!", order: updatedOrder });
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// ❌ Cancel Order (Only if status is 'Pending')
router.delete('/cancel/:orderId', verifyUser, async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Allow cancellation only if the order is pending
        if (order.status !== "Pending") {
            return res.status(400).json({ message: "Cannot cancel an order that is already processed" });
        }

        await Order.findByIdAndDelete(orderId);
        res.status(200).json({ message: "Order cancelled successfully!" });
    } catch (error) {
        console.error("Error cancelling order:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports = router;
