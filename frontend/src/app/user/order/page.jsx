'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve token and decode user ID
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      setUserId(decoded._id);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/orders/user-orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/address/getbyid/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAddresses(res.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchOrders();
    fetchAddresses();
  }, [userId]);

  const handleConfirmOrder = async () => {
    if (!selectedAddress || cartItems.length === 0) {
      alert("Please select an address and add items to the cart.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const orderData = {
        addressId: selectedAddress._id,
        products: cartItems,
        totalAmount
      };

      const res = await axios.post("http://localhost:5000/orders/place", orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Order placed successfully!");
      router.push("/order-success");
    } catch (error) {
      console.error("Failed to place order:", error.response?.data || error.message);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/orders/cancel/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Order cancelled successfully!");
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Failed to cancel order:", error);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto mt-12">
      <h1 className="text-3xl font-bold text-center text-gray-900">Manage Your Orders</h1>

      {/* Select Address */}
      <h2 className="text-2xl font-semibold text-gray-800">Select Delivery Address</h2>
      <div className="space-y-4">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div
              key={address._id}
              className={`p-4 bg-white shadow-lg rounded-lg cursor-pointer ${
                selectedAddress?._id === address._id ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => setSelectedAddress(address)}
            >
              <p className="font-semibold">{address.street}</p>
              <p>{address.city}, {address.state} {address.zipCode}</p>
              <p>{address.country}</p>
            </div>
          ))
        ) : (
          <p>No addresses found.</p>
        )}
      </div>

      {/* Confirm Order Button */}
      <button
        onClick={handleConfirmOrder}
        className="w-full mt-4 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700"
      >
        Order Confirm
      </button>

      {/* User Orders */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">Your Orders</h2>
      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="p-4 bg-white shadow-lg rounded-lg">
              <p className="font-semibold text-gray-800">Order ID: {order._id}</p>
              <p>Status: <span className="text-green-600">{order.status}</span></p>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <p>Delivery Address: {order.address.street}, {order.address.city}</p>

              {order.status === "Pending" && (
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No orders placed yet.</p>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
