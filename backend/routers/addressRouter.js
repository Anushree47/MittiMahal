const express = require('express');
const Address = require('../models/addressModel'); // Assuming address model exists
const { verifyUser } = require('../middleware/authMiddleware');
const router = express.Router();

// Add Address
router.post('/add', verifyUser, (req, res) => {
  console.log(req.user);

  const newAddress = new Address({
    ...req.body, // Spread the address data from the request body
    userId: req.user._id, // Make sure the address has the correct userId
  });

  newAddress.save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      
      res.status(500).json({ error: 'Failed to add address', details: err });
    });
});

// Get all addresses of a specific user
router.get('/getbyid/:id', (req, res) => {
  Address.find({ userId: req.params.id }) // Query for addresses specific to the user
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to fetch addresses', details: err });
    });
});

// Update address by ID
router.put('/update/:id', (req, res) => {
  Address.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to update address', details: err });
    });
});

// Delete address by ID
router.delete('/delete/:id', (req, res) => {
  Address.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to delete address', details: err });
    });
});

module.exports = router;

