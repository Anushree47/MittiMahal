
const { Schema, model, Types } = require('../connection');
const mySchema = new Schema({
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
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviewText: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = model('review', mySchema);
