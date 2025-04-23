const { Schema, model, Types } = require('../connection');

const mySchema = new Schema({
        userId: { type: Types.ObjectId, ref: "users", required: true },
        productId: { type: Types.ObjectId, required: true, ref: 'product' },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
});

module.exports = model('wishlist', mySchema);