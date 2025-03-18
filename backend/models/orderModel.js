const { default: mongoose } = require('mongoose');
 const { Schema, model } = require('../connection');





const mySchema = new Schema({
//      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     products: [
//       {
//         productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//         name: String,
//         quantity: { type: Number, required: true },
//         price: { type: Number, required: true },
//         image: String,
//       },
//     ],
//     totalAmount: { type: Number, required: true },
//     selectedAddress: {
//       fullName: String,
//       phone: String,
//       email: String,
//       address: String,
//       city: String,
//       state: String,
//       zip: String,
//       country: String,
//     },
//     paymentMethod: { type: String, required: true },
//     status: { type: String, enum: ["Pending", "Confirmed", "Shipped", "Delivered"], default: "Pending" },
//   },
//   { timestamps: true }
// );



    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: String,
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: String,
      },
    ],
    totalAmount: { type: Number, required: true },
    deliveryCharges: { type: Number, required: true }, // Added for delivery cost
    finalAmount: { type: Number, required: true }, // Total including delivery
    selectedAddress: {
      fullName: String,
      phone: String,
      email: String,
      address: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    paymentMethod: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Confirmed", "Shipped", "Delivered"], default: "Pending" },
  },
  { timestamps: true }
);




module.exports = mongoose.model("Order", mySchema);
