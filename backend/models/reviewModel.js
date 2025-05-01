
const { Schema, model, Types } = require('../connection');

const reviewSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'users',
    required: true
  },
  product: {
    type: Types.ObjectId,
    ref: 'product',
    required: true
  },
  name: { 
    type: String, 
    required: true 
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}); 


module.exports = model('review', reviewSchema);


