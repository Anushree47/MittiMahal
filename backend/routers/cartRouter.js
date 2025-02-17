<<<<<<< HEAD
=======
const express = require('express');
const Model = require('../models/cartModel');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Product = require('../models/productModel');
const Users = require('../models/userModel');


const router = express.Router();

// update
router.put('/update/:id',(req, res) => {
    Model.findByIdAndUpdate(req.params.id,req.body , {new : true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

});
router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
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
});


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
router.delete('/delete/:id',(req, res) =>  {

    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    });
module.exports = router;





>>>>>>> 98d84764adc487bf5c7d85b2faec29970d26b6cb
