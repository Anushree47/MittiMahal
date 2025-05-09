const { Schema, model } = require('../connection');

const mySchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: true },
    city: { type: String, default: 'unknown' },
     state: { type: String, default: 'unknown' },
     pincode: { type: String, default: 'unknown' },
    phone: { type: String, default: 'unknown' },
    userType: { type: String, default: 'unknown' },
    imageUrl:  { type: String, required: true }
   //// createdAt: { type: Date, default: Date.now }
});

module.exports = model('users', mySchema);