
const { Schema, model, Types } = require('../connection');

const mySchema = new Schema({
    product: { type: Types.ObjectId, required: true, ref: 'product' },
    user: { type: Types.ObjectId, required: true, ref: 'users' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
});

module.exports = model('review', mySchema);