// const express = require('express');
// const Address = require('../models/addressModel'); // Assuming address model exists

// const router = express.Router();

// const { verifyUser } = require('../middleware/authMiddleware');

// router.get('/user/address', verifyUser, async (req, res) => {
//     try {
//         console.log("Authenticated User:", req.user); // Debugging
//         const userId = req.user._id;
//         if (!userId) {
//             return res.status(401).json({ message: 'User ID is missing.' });
//         }

//         // Fetch user addresses (example)
//         const addresses = await Address.find({ user: userId });
//         res.json(addresses);
//     } catch (error) {
//         console.error('Error fetching addresses:', error);
//         res.status(500).json({ message: 'Internal server error.' });
//     }
// });

// module.exports = router;

// // Add Address
// router.post('/add', verifyUser, (req, res) => {
//   console.log(req.user);

//   const newAddress = new Address({
//     ...req.body, // Spread the address data from the request body
//     userId: req.user._id, // Make sure the address has the correct userId
//   });

//   newAddress.save()
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       console.log(err);
      
//       res.status(500).json({ error: 'Failed to add address', details: err });
//     });
// });

// // Get all addresses of a specific user
// router.get('/getbyid/:id', (req, res) => {
//   Address.find({ userId: req.params.id }) // Query for addresses specific to the user
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: 'Failed to fetch addresses', details: err });
//     });
// });

// // Update address by ID
// router.put('/update/:id', (req, res) => {
//   Address.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: 'Failed to update address', details: err });
//     });
// });

// // Delete address by ID
// router.delete('/delete/:id', (req, res) => {
//   Address.findByIdAndDelete(req.params.id)
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: 'Failed to delete address', details: err });
//     });
// });

// module.exports = router;

const express = require('express');
const Address = require('../models/addressModel'); 
const { verifyUser } = require('../middleware/authMiddleware');

const router = express.Router();

// Get addresses (Protected)
router.get('/user/address', verifyUser, async (req, res) => {
    try {
        console.log("Authenticated User:", req.user);
        const userId = req.user._id;

        if (!userId) {
            return res.status(401).json({ message: 'User ID is missing.' });
        }

        const addresses = await Address.find({ user: userId });
        res.json(addresses);
    } catch (error) {
        console.error('Error fetching addresses:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Add Address (Protected)
router.post('/add', verifyUser, async (req, res) => {
    console.log(req.user);

    const newAddress = new Address({
        ...req.body,
        userId: req.user._id,
    });

    try {
        const result = await newAddress.save();
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add address', details: err });
    }
});

// Get address by ID (Public)
router.get('/getbyid/:id', async (req, res) => {
    try {
        const result = await Address.find({ userId: req.params.id });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch addresses', details: err });
    }
});

// Update address by ID (Protected)
router.put('/update/:id', verifyUser, async (req, res) => {
    try {
        const result = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update address', details: err });
    }
});

// Delete address by ID (Protected)
router.delete('/delete/:id', verifyUser, async (req, res) => {
    try {
        const result = await Address.findByIdAndDelete(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete address', details: err });
    }
});

module.exports = router;
