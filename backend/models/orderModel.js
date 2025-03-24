const { default: mongoose } = require('mongoose');
 const { Schema, model , Types} = require('../connection');
const mySchema = new Schema({
userId: { type: Types.ObjectId, ref: "users", required: true },
    address: {
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
    items: [
        {
            id: { type: Types.ObjectId, ref: "product", required: true },
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    totalAmount: { type: Number, required: true },
    gstAmount: { type: Number, required: true },
    deliveryCharge: { type: Number, required: true },
    deliveryStatus: { 
        type: String, 
        enum: ["Processing", "Shipped", "Delivered"], 
        default: "Processing" 
    }
}, { timestamps: true });



module.exports = mongoose.model("Order", mySchema);
