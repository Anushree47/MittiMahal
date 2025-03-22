const express = require('express');
const Contact = require('../models/contactModel');

const router = express.Router();

//route to handle contact form submission
router.post('/submit', async (req, res) => {
    try{ 
        const { name, email, message } = req.body;

        if (!name || !email || !message ) {
            return res.status(400).json({ message: 'All field are required.'});
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();

        res.status(200).json({ message: 'Message submitted sucessfully.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

router.get('/getall', async (req,res) => {
    Contact.find()
    .then((result) =>{
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

router.delete('/delete/:id', (req,res) => {
    Contact.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.status(200).json(result);
    }) .catch((err) => {
        res.status(500).json(err);
    });
});

module.exports = router;