const express = require('express');
const Razorpay = require('razorpay');
const dotenv = require('dotenv');


dotenv.config();
const router = express.Router();

//Initalize Razorpay with api key
const razorpay = new Razorpay({
    key_id:  process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    console.log("Razorpay initialized with key ID: ",  process.env.RAZORPAY_KEY_ID);
    console.log("Razorpay key secret:", process.env.RAZORPAY_KEY_SECRET);


    // Create Order API

    router.post('/create-order', async (req, res) => {  
        try {
            const { amount } = req.body;
            console.log("Received amount:", amount);

            const options = {
                amount : amount * 100, // amount in paise
                currency : "INR",
                receipt : `receipt_${Date.now()}`,
                payment_capture : 1, // auto capture
            };

            console.log("Options for Razorpay:", options);

            const order = await razorpay.orders.create(options);
            console.log("Razorpay order created:", order);
            res.status(200).json(order);
            
        } catch (error) {
            console.error("Error creating razorpay order : ", error);
            res.status(500).json({ error: error.message});
            
        }
        });

module.exports = router;
    
    

