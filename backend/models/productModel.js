const { default: mongoose } = require('mongoose');
const { Schema, model } = require('../connection');

const mySchema = new Schema({
   
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    images: { type: Array, required: true }

});

module.exports = model('product', mySchema);