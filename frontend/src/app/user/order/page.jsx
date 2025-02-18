'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

const PlaceOrderPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [orderTotal, setOrderTotal] = useState(0);
  const { id} = useParams(); // Assuming user ID is part of the URL
  const router = useRouter();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/cart/get/${id}`); // Replace with actual cart API
        setCartItems(res.data);
        const total = res.data.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setOrderTotal(total);
      } catch (error) {
        console.error('Failed to fetch cart items', error);
      }
    };

    const fetchAddresses = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/address/getbyid/${id}`);
        setAddresses(res.data);
      } catch (error) {
        console.error('Failed to fetch addresses', error);
      }
    };

    fetchCartItems();
    fetchAddresses();
  }, [id]);

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId,
        addressId: selectedAddress._id,
        cartItems,
        totalAmount: orderTotal,
        paymentDetails,
      };

      const { data } = await axios.post('http://localhost:5000/order/place', orderData);
      console.log('Order placed successfully:', data);
      router.push('/order-success'); // Redirect to success page after order placement
    } catch (error) {
      console.error('Failed to place order', error);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto mt-12">
      <h1 className="text-3xl font-bold text-center text-gray-900">Place Your Order</h1>

      <div className="space-y-6">
        {/* Cart Summary */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Cart Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between">
                <div className="text-gray-800">{item.name} x {item.quantity}</div>
                <div className="text-gray-600">${item.price * item.quantity}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Shipping Address</h2>
          <select
            onChange={(e) => setSelectedAddress(JSON.parse(e.target.value))}
            className="mt-2 p-2 w-full border rounded-md"
          >
            <option value="">Select Address</option>
            {addresses.map((address) => (
              <option key={address._id} value={JSON.stringify(address)}>
                {address.street}, {address.city}, {address.state} {address.zipCode}
              </option>
            ))}
          </select>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Item Total</span>
              <span>${orderTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${orderTotal + 10}</span> {/* Add shipping fee */}
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Payment Information</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              value={paymentDetails.cardNumber}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Expiry Date"
              value={paymentDetails.expiry}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="CVV"
              value={paymentDetails.cvv}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Place Order Button */}
        <div className="flex justify-center">
          <button
            onClick={handlePlaceOrder}
            className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
