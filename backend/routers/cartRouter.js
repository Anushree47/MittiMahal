const express = require('express');
const Model = require('../models/cartModel');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const router = express.Router();
router.post('/authenticate', (req,res)=>
{
    Model.findOne(req.body)
    .then((result) => {
        if(result) {
            //email and passward matched
            //generate token
const {_id, email, passward} = result;
            const payload = {_id, email, passward}
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