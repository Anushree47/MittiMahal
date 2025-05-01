const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel'); 
const User = require('../models/userModel');
const Product = require('../models/productModel'); 
const Order = require('../models/orderModel'); // Assuming you have an Order model to check purchase history
const { protect } = require('../middlewares/authMiddleware');

const route = express.Router();


// // Add Review route
// router.post('/add',  async (req, res) => {
//   const { productId, rating, comment } = req.body;
//   const userId = req.user._id;

//   try {
//     // Check if user has purchased the product
//     const order = await Order.findOne({
//       user: userId,
//       'orderItems.product': productId,
//       isPaid: true, // or delivered — based on your flow
//     });

//     if (!order) {
//       return res.status(400).json({ message: 'You need to purchase this product before reviewing it.' });
//     }

//     // Check if review already exists for this product by the same user
//     const existingReview = await Review.findOne({ product: productId, user: userId });

//     if (existingReview) {
//       return res.status(400).json({ message: 'You have already reviewed this product.' });
//     }

//     // Create review
//     const review = await Review.create({
//       product: productId,
//       user: userId,
//       name: req.user.name,
//       rating,
//       comment,
//     });

//     res.status(201).json({ message: 'Review added successfully.', review });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// POST: Add a review to a product
router.post('/add', async (req, res) => {
  try {
    console.log("Received review data:", req.body);  // <-- debug line

    const { userId, itemId, rating, comment } = req.body;

    if (!userId || !itemId || !rating || !comment) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } 

    const newReview = new Review({
      user: userId,
      product: itemId,
      name: user.name,
      rating,
      comment,
    });

    await newReview.save();

    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    console.error("Error adding review:", error);  // <-- detailed error log
    res.status(500).json({ message: 'Failed to add review', error: error.message });
  }
});


// GET: Get reviews for a specific product
router.get('/product/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ product: productId })
      .populate('user', 'name') // To include user details like name in the response
      .sort({ createdAt: -1 }); // Sort reviews by most recent

    res.json(reviews);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
