'use client' // Required for Next.js App Router

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Next.js router
import axios from "axios";

const OrderSummary = ({ params }) => {
  const router = useRouter();
  const { orderId } = params; // Get order ID from dynamic route
  const [order, setOrder] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    
    if (!orderId) return;

    const addOrder = async () => {
        try {
          const response = await axios.post(`http://localhost:5000/Order/place/${id}`)
          setOrder(response.data);
          console.log(response.data);
    
        } catch (error) {
          console.error('Error fetching ', error);
    
        }
      };
    
      useEffect(() => {
        addOrder();
      }, []);


    }, [])
    

  if (!order) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold">User Details</h3>
        <p><strong>Name:</strong> {order.user.fullName}</p>
        <p><strong>Phone:</strong> {order.user.phone}</p>
        <p><strong>Email:</strong> {order.user.email}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Delivery Address</h3>
        <p>{order.selectedAddress.fullName}</p>
        <p>{order.selectedAddress.address}, {order.selectedAddress.city}, {order.selectedAddress.state}, {order.selectedAddress.zip}</p>
        <p>{order.selectedAddress.country}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Ordered Products</h3>
        {order.products.map((item) => (
          <div key={item.productId._id} className="border-b py-2">
            <p><strong>{item.name}</strong> (x{item.quantity})</p>
            <p>Price: ₹{item.price}</p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Payment Summary</h3>
        <p><strong>Subtotal:</strong> ₹{order.totalAmount}</p>
        <p><strong>Delivery Charges:</strong> ₹{order.deliveryCharges}</p>
        <p className="text-lg font-bold">Final Amount: ₹{order.finalAmount}</p>
      </div>

      <button
        onClick={() => router.push('/')} // Next.js navigation
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default OrderSummary;
