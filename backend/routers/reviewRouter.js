// const express = require('express');
// const Model = require('../models/reviewModel');
// const jwt = require('jsonwebtoken')
// require('dotenv').config()
// const Product = require('../models/productModel');
// const Users = require('../models/userModel');


// const router = express.Router();

// router.post('/add', (req, res) => {
//     console.log(req.body);

//     new Model(req.body).save()
//         .then((result) => {
//             res.status(200).json(result);
//         }).catch((err) => {

//             console.log(err);
//             // if (err?.code === 11000) { res.status(500).json({ message: 'Email already existed' }); }
//             // else {
//             //     res.status(500).json({ message: 'Internal server error' })
//             // }

//         });
// });

// //getall
// router.get('/getall', (req, res) => {
//     Model.find()

//         .then((result) => {
//             res.status(200).json(result);
//         }).catch((err) => {
//             res.status(500).json(err);
//         });
// })

// //: denotes url parameter
// // router.get('/getbycity/:city', (req, res) => {
// //     Model.find({ city: req.params.city })
// //         .then((result) => {
// //             res.status(200).json(result);
// //         }).catch((err) => {
// //             res.status(500).json(err);
// //         });
// // })


// //get by id 
// router.get('/getbyid/:id', (req, res) => {
//     Model.findById(req.params.id)
//         .then((result) => {
//             res.status(200).json(result);
//         }).catch((err) => {
//             res.status(500).json(err);
//         });
// })
// // delete
// router.delete('/delete/:id', (req, res) => {

//     Model.findByIdAndDelete(req.params.id)
//         .then((result) => {
//             res.status(200).json(result);
//         }).catch((err) => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// })

// // update
// router.put('/update/:id', (req, res) => {
//     Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
//         .then((result) => {
//             res.status(200).json(result);
//         }).catch((err) => {
//             console.log(err);
//             res.status(500).json(err);
//         });

// })

// module.exports = router;

const express = require('express');
const router = express.Router();
const Model = require('../models/reviewModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');

// Create a review
router.post('/add', async (req, res) => {
  try {
    const Model = new Model(req.body);
    const saved = await Model.save();
    const populated = await saved.populate('users', 'name');
    res.status(200).json({ Model: populated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add Review', error });
  }
});

// Get all Models
router.get('/getall', async (req, res) => {
  try {
    const Models = await Model.find().populate('users', 'name').populate('product', 'name');
    res.status(200).json(Models);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch review', error });
  }
});

// Get Models by product ID
router.get('/product/:id', async (req, res) => {
  try {
    const Models = await Model.find({ product: req.params.id }).populate('users', 'name');
    res.status(200).json(Models);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product Models', error });
  }
});

// Get Model by Model ID
router.get('/getbyid/:id', async (req, res) => {
  try {
    const Model = await Model.findById(req.params.id).populate('users', 'name');
    res.status(200).json(Model);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Review', error });
  }
});

// Update Model
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update Review', error });
  }
});

// Delete Model
router.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await Model.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete Review', error });
  }
});

module.exports = router;
