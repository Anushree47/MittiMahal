const { default: mongoose } = require('mongoose');
const {Schema, model, Types } = require('../connection');

const mySchema = new Schema({
    userId: {type: Types.ObjectId, required: true, ref: 'users'} ,
  items: [
    {
      productId: { type: Types.ObjectId, required: true, ref: 'product' },
     
      quantity: { type: Number, required: true, default: 1 },
//
    }
  ],

  createdAt: { type: Date, default: Date.now },

    
  });
  
  module.exports = model('cart', mySchema);

  