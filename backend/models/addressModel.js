const { default: mongoose } = require('mongoose');
const { Schema, model } = require('../connection');


const  mySchema= new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
 fullName: { type: String, required: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = model('Address', mySchema);



