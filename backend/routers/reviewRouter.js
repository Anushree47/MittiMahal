const express = require('express');
const Model = require('../models/cartModel');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Product = require('../models/productModel');


const router = express.Router();


router.post('/:userid',  async (req, res) => {
    try {
        const { productId, rating, reviewText } = req.body;
        const userId = req.user.id;

        // Check if the user already reviewed the product
        const existingReview = await Review.findOne({ productId, userId });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this product.' });
        }

        const review = new Review({ productId, userId, rating, reviewText });
        await review.save();

        // Update product average rating
        const reviews = await Review.find({ productId });
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

        await Product.findByIdAndUpdate(productId, { averageRating: avgRating });

        res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//getall
router.get('/:productId', async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId }).populate('userId', 'name');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//update review
router.put('/:userid',  async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        if (review.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const { rating, reviewText } = req.body;
        review.rating = rating || review.rating;
        review.reviewText = reviewText || review.reviewText;
        review.save();

        res.status(200).json({ message: 'Review updated successfully', review });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete review
router.delete('/:userid',  async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        if (review.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await review.deleteOne();
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.post('/authenticate', (req,res)=>
{
    Model.findOne(req.body)
    .then((result) => {
        if(result) {
            //email and passward matched
            //generate token
const {_id, email, password} = result;
            const payload = {_id, email, password}
            const secretKey = process.env.JWT_SECRET || 'fallback_secret_key';
            jwt.sign(
                payload,
                secretKey,
                { expiresIn: '20min' },
                (err,token) => {
                    if(err){
                        console.log(err);
                        res.status(500).json({message: 'Error generating token'});
                    }else{
                        res.status(200).json({ token });
                    }
                }
            )
        }else{
            res.status(401).json({ message: 'Invalid credentials'});
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({message: ' Internal server error'});
        
    });
})

module.exports = router;