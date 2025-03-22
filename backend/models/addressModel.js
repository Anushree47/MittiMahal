const { default: mongoose } = require('mongoose');
const {  Schema, model, Types } = require('../connection');


const  mySchema= new Schema({
  userId: { type: Types.ObjectId, required: true, ref: 'users' },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  isSelected: { type: Boolean, default: false },
  isDefault: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = model('Address', mySchema);







