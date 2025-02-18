const express = require('express');
const Order = require('../models/orderModel');  // Assuming you have an order model
const router = express.Router();

// Create a new order
router.post('/add', (req, res) => {
    console.log(req.body);

    new Order(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            if (err?.code === 11000) {
                res.status(500).json({ message: 'Order already exists' });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        });
});

// Get all orders
router.get('/getall', (req, res) => {
    Order.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
});

// Get orders by user ID
router.get('/getbyuserid/:userId', (req, res) => {
    Order.find({ userId: req.params.userId })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
});

// Get order by ID
router.get('/getbyid/:id', (req, res) => {
    Order.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
});

// Cancel order (update order status to 'Cancelled')
router.put('/cancel/:id', (req, res) => {
    Order.findByIdAndUpdate(req.params.id, { status: 'Cancelled' }, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Update order (update order details such as shipping address or payment status)
router.put('/update/:id', (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete order (delete order by ID)
router.delete('/delete/:id', (req, res) => {
    Order.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
