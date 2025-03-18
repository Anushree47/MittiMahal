const express = require('express');
const Model = require('../models/userModel');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {

            console.log(err);
            if (err?.code === 11000) { res.status(500).json({ message: 'Email already existed' }); }
            else {
                res.status(500).json({ message: 'Internal server error' })
            }

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
router.get('/getbycity/:city', (req, res) => {
    Model.find({ city: req.params.city })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
})


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

//update
router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

})
router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
        .then((result) => {
            if (result) {
                //email and passward matched
                //generate token
                const { _id, email, password } = result;
                const payload = { _id, email, password }
                const secretKey = process.env.JWT_SECRET || 'fallback_secret_key';
                jwt.sign(
                    payload,
                    secretKey,
                    { expiresIn: '20min' },
                    (err, token) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ message: 'Error generating token' });
                        } else {
                            res.status(200).json({ token });
                        }
                    }
                )
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ message: ' Internal server error' });

        });
})

module.exports = router;

// const express = require('express');
// const Model = require('../models/userModel');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs'); // Secure password hashing
// require('dotenv').config();

// const router = express.Router();

// // ✅ User Registration (Signup)
// router.post('/register', async (req, res) => {
//     try {
//         const { name, email, password, city } = req.body;

//         // Check if the user already exists
//         const existingUser = await Model.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Email already exists' });
//         }

//         // Hash password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Save user to database
//         const newUser = new Model({ name, email, password: hashedPassword, city });
//         await newUser.save();

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (err) {
//         console.error('Signup Error:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // ✅ User Login (Authenticate & Generate Token)
// // router.post('/login', async (req, res) => {
// //     try {
// //         const { email, password } = req.body;

// //         // Check if user exists
// //         const user = await Model.findOne({ email });
// //         if (!user) {
// //             return res.status(401).json({ message: 'Invalid credentials' });
// //         }

// //         // Compare passwords
// //         const isMatch = await bcrypt.compare(password, user.password);
// //         if (!isMatch) {
// //             return res.status(401).json({ message: 'Invalid credentials' });
// //         }

// //         // Generate JWT Token
// //         const payload = { id: user._id, email: user.email, name: user.name };
// //         const secretKey = process.env.JWT_SECRET || 'fallback_secret_key';
// //         const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

// //         res.status(200).json({ token, user: payload });
// //     } catch (err) {
// //         console.error('Login Error:', err);
// //         res.status(500).json({ message: 'Internal server error' });
// //     }
// // });
// // router.post('/login', async (req, res) => {
// //     try {
// //         const { email, password } = req.body;

// //         // Check if user exists
// //         const user = await Model.findOne({ email });
// //         if (!user) {
// //             return res.status(401).json({ message: 'Invalid credentials' });
// //         }

// //         // Compare passwords
// //         const isMatch = await bcrypt.compare(password, user.password);
// //         if (!isMatch) {
// //             return res.status(401).json({ message: 'Invalid credentials' });
// //         }

// //         // Generate JWT Token
// //         const payload = { id: user._id, email: user.email, name: user.name };
// //         const secretKey = process.env.JWT_SECRET || 'fallback_secret_key';
// //         const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

// //         res.status(200).json({ token, user: payload });
// //     } catch (err) {
// //         console.error('Login Error:', err);
// //         res.status(500).json({ message: 'Internal server error' });
// //     }
// // });
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check if user exists
//         const user = await Model.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         // Generate JWT Token
//         const payload = { id: user._id, email: user.email, name: user.name };
//         const secretKey = process.env.JWT_SECRET || 'fallback_secret_key';
//         const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

//         res.status(200).json({ token, user: payload });
//     } catch (err) {
//         console.error('Login Error:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });



// // ✅ Get All Users
// router.get('/getall', async (req, res) => {
//     try {
//         const users = await Model.find().select('-password'); // Exclude password field
//         res.status(200).json(users);
//     } catch (err) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // ✅ Get User by City
// router.get('/getbycity/:city', async (req, res) => {
//     try {
//         const users = await Model.find({ city: req.params.city }).select('-password');
//         res.status(200).json(users);
//     } catch (err) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // ✅ Get User by ID
// router.get('/getbyid/:id', async (req, res) => {
//     try {
//         const user = await Model.findById(req.params.id).select('-password');
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // ✅ Delete User
// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const deletedUser = await Model.findByIdAndDelete(req.params.id);
//         if (!deletedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json({ message: 'User deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // ✅ Update User
// router.put('/update/:id', async (req, res) => {
//     try {
//         const { password, ...updateData } = req.body;

//         // If password is being updated, hash it before saving
//         if (password) {
//             updateData.password = await bcrypt.hash(password, 10);
//         }

//         const updatedUser = await Model.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json(updatedUser);
//     } catch (err) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // // ✅ Middleware Protected Route (Verify User)
// // const verifyUser = (req, res, next) => {
// //     try {
// //         const authHeader = req.header('Authorization');

// //         if (!authHeader || !authHeader.startsWith('Bearer ')) {
// //             return res.status(401).json({ message: 'Unauthorized. Please log in.' });
// //         }

// //         const token = authHeader.split(' ')[1];

// //         jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
// //             if (err) {
// //                 return res.status(401).json({
// //                     message: err.name === 'TokenExpiredError' ? 'Session expired. Please log in again.' : 'Invalid token.',
// //                 });
// //             }

// //             req.user = decoded; 
// //             next(); 
// //         });

// //     } catch (error) {
// //         console.error('Auth Middleware Error:', error);
// //         res.status(500).json({ message: 'Internal server error.' });
// //     }
// // };

// // ✅ Get User Profile (Protected Route)
// // router.get('/profile', verifyUser, async (req, res) => {
// //     try {
// //         const user = await Model.findById(req.user.id).select('-password');
// //         if (!user) {
// //             return res.status(404).json({ message: 'User not found' });
// //         }
// //         res.status(200).json(user);
// //     } catch (err) {
// //         res.status(500).json({ message: 'Internal server error' });
// //     }
// // });
// // router.get('/profile', require('../middleware/authMiddleware').verifyUser, async (req, res) => {
// //     try {
// //         const user = await Model.findById(req.user.id).select('-password');
// //         if (!user) {
// //             return res.status(404).json({ message: 'User not found' });
// //         }
// //         res.status(200).json(user);
// //     } catch (err) {
// //         res.status(500).json({ message: 'Internal server error' });
// //     }
// // });

// module.exports = router;
