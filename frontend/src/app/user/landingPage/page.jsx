'use client';
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import OrderReceipt from '@/components/OrderReceipt'; // adjust path as needed

const LandingPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get('/order/my-orders');
        setOrders(res.data);
        console.log('📦 All Orders:', res.data);
      } catch (err) {
        console.error('❌ Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order._id} className="border p-4 rounded shadow">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Status:</strong> {order.deliveryStatus}</p>
              <button
                className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
                onClick={() => setSelectedOrderId(order._id)}
              >
                View Receipt
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedOrderId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-3xl w-full p-6 rounded shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-red-600 text-sm bg-white border border-red-600 px-2 py-1 rounded hover:bg-red-600 hover:text-white"
              onClick={() => setSelectedOrderId(null)}
            >
              Close
            </button>
            <OrderReceipt orderId={selectedOrderId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
