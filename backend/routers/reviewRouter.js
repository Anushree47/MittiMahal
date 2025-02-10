const express = require('express');
const Model = require('../models/reviewModel');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Product = require('../models/productModel');
const Users = require('../models/userModel');


const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {

            console.log(err);
            // if (err?.code === 11000) { res.status(500).json({ message: 'Email already existed' }); }
            // else {
            //     res.status(500).json({ message: 'Internal server error' })
            // }

        });
});

//getall
router.get('/getall', (req, res) => {
    Model.find()

        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
})

//: denotes url parameter
// router.get('/getbycity/:city', (req, res) => {
//     Model.find({ city: req.params.city })
//         .then((result) => {
//             res.status(200).json(result);
//         }).catch((err) => {
//             res.status(500).json(err);
//         });
// })


//get by id 
router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
})
// delete
router.delete('/delete/:id', (req, res) => {

    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
})

// update
router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

})


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

// const express = require('express');
// const jwt = require('jsonwebtoken');
// const Review = require('../models/reviewModel'); // Correct model import
// const Product = require('../models/productModel');
// const { verifyUser } = require('../middleware/authMiddleware'); // Ensure user is authenticated

// const router = express.Router();


// // router.post('/', verifyUser, async (req, res) => {
// //     try { console.log("Received review Request :",req.body); //debugging log 
// //         console.log("Authenticated User ID:", req.user.id); // ✅ Check if user is correctly extracted
    
// //         const { product, rating, reviewText } = req.body;
// //         const user = req.user.id; // Get user ID from JWT

// //         if (!product || !rating) {
// //             return res.status(400).json({ message: 'Product ID and rating are required.' });
// //         }

// //         // Check if the user already reviewed the product
// //         const existingReview = await Review.findOne({ product, user });
// //         if (existingReview) {
// //             return res.status(400).json({ message: 'You have already reviewed this product.' });
// //         }

// //         // Create a new review
// //         const review = new Review({ product, user, rating, reviewText });
// //         await review.save();

// //         // Update product's average rating
// //         const reviews = await Review.find({ product });
// //         const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
// //         await Product.findByIdAndUpdate(product, { averageRating: avgRating });

// //         res.status(201).json({ message: 'Review added successfully', review });
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // });


// // router.get('/:productId', async (req, res) => {
// //     try {
// //         const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
// //         res.status(200).json(reviews);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // });
// router.get('/:productId', async (req, res) => {
//     try {
//         console.log("Fetching reviews for product:", req.params.productId);

//         const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
//         console.log("Reviews Fetched:", reviews); // ✅ Log fetched reviews

//         res.status(200).json(reviews);
//     } catch (error) {
//         console.error("Error fetching reviews:", error);
//         res.status(500).json({ message: error.message });
//     }
// });

// router.put('/:id', verifyUser, async (req, res) => {
//     try {
//         const review = await Review.findById(req.params.id);
//         if (!review) return res.status(404).json({ message: 'Review not found' });

//         if (review.user.toString() !== req.user.id) {
//             return res.status(403).json({ message: 'Unauthorized' });
//         }

//         const { rating, reviewText } = req.body;
//         review.rating = rating || review.rating;
//         review.reviewText = reviewText || review.reviewText;
//         await review.save();

//         res.status(200).json({ message: 'Review updated successfully', review });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// router.post('/', verifyUser, async (req, res) => {
//     try {
//         console.log("Received Review Request:", req.body); // ✅ Debug request
//         console.log("Authenticated User ID:", req.user.id);

//         const { product, rating, reviewText } = req.body;
//         const user = req.user.id;

//         if (!product || !rating) {
//             return res.status(400).json({ message: 'Product ID and rating are required.' });
//         }

//         const review = new Review({ product, user, rating, reviewText });
//         await review.save();

//         // Fetch updated reviews
//         const reviews = await Review.find({ product }).populate('user', 'name');
//         console.log("Updated Reviews:", reviews); // ✅ Debug new reviews

//         res.status(201).json({ message: 'Review added successfully', reviews });
//     } catch (error) {
//         console.error("Error in Review API:", error);
//         res.status(500).json({ message: error.message });
//     }
// });

// router.delete('/:id', verifyUser, async (req, res) => {
//     try {
//         const review = await Review.findById(req.params.id);
//         if (!review) return res.status(404).json({ message: 'Review not found' });

//         if (review.user.toString() !== req.user.id) {
//             return res.status(403).json({ message: 'Unauthorized' });
//         }

//         await review.deleteOne();
//         res.status(200).json({ message: 'Review deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// module.exports = router;
