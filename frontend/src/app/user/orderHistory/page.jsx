'use client';

import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Spinner from "@/components/Spinner";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/order/my-orders");
      setOrders(res.data);
      console.log("✅ Fetched Orders:", res.data); // 🟢 Display details on console
    } catch (error) {
      console.error("🔴 Error fetching orders:", error.response?.data || error.message);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-center text-red-600 mt-10">{error}</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center text-gray-600 mt-10">No orders found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-6 shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-2">Order ID: {order._id}</h2>
            <p className="mb-2"><strong>Status:</strong> {order.deliveryStatus}</p>
            <p className="mb-2"><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}</p>

            <h3 className="font-semibold mt-4 mb-2">Delivery Address:</h3>
            {order.address ? (
              <p className="text-sm">
                {order.address.addressLine1}, {order.address.addressLine2}, {order.address.city}, {order.address.state} - {order.address.postalCode}, {order.address.country}
              </p>
            ) : (
              <p>No address available</p>
            )}

            <h3 className="font-semibold mt-4 mb-2">Items:</h3>
            <ul className="list-disc list-inside space-y-1">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} × {item.quantity} — ₹{item.price}
                </li>
              ))}
            </ul>

            <div className="mt-4 font-semibold">
              <p>Total Amount: ₹{order.totalAmount?.toFixed(2)}</p>
              <p>GST: ₹{order.gstAmount?.toFixed(2)}</p>
              <p>Delivery Charges: ₹{order.deliveryCharge?.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
