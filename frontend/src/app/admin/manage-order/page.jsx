"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/order/all");
      setOrders(res.data);
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
    setLoading(false);
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/order/update-status/${orderId}`, {
        status: newStatus,
      });
      toast.success("Order status updated!");
      fetchOrders();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const cancelOrder = async (orderId) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.patch(`http://localhost:5000/order/cancel/${orderId}`);
      toast.success("Order canceled!");
      fetchOrders();
    } catch (err) {
      toast.error("Cancel failed: Already Shipped/Delivered");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Manage Orders</h1>
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-4">
        {loading ? (
          <p className="text-center text-gray-500 text-2xl font-bold">Loading... Please Wait</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="p-3 border">Order ID</th>
                  <th className="p-3 border">User</th>
                  <th className="p-3 border">Total</th>
                  <th className="p-3 border">Items</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Placed On</th>
                  <th className="p-3 border">Update</th>
                  <th className="p-3 border">Cancel</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50">
                {orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-100">
                    <td className="p-3 border">{order._id.slice(-6)}</td>
                    <td className="p-3 border">{order.userId}</td>
                    <td className="p-3 border font-semibold">₹{order.totalAmount}</td>
                    <td className="p-3 border">
                      <ul className="list-disc ml-4 text-sm">
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.name} x{item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-3 border">{order.deliveryStatus}</td>
                    <td className="p-3 border">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 border text-center">
                      <select
                        value={order.deliveryStatus}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className="border p-1 rounded"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="p-3 border text-center">
                      <button
                        onClick={() => cancelOrder(order._id)}
                        disabled={
                          order.deliveryStatus === "Shipped" || order.deliveryStatus === "Delivered"
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No orders found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
