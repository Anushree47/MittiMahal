const { default: mongoose } = require('mongoose');
const {Schema, model, Types } = require('../connection');

const mySchema = new Schema({
    userId: {type: Types.ObjectId, required: true, ref: 'users'} ,
  items: [
    {
      productId: { type: Types.ObjectId, required: true, ref: 'product' },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true },
    }
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },

    
  });
  
  module.exports = model('cart', mySchema);