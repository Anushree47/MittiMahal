"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    // Fetch total products
    axios.get("http://localhost:5000/product/getall")
      .then((res) => setTotalProducts(res.data.length))
      .catch((err) => console.error("Error fetching products:", err));

    // Fetch total orders
    // axios.get("/api/orders")
    //   .then((res) => setTotalOrders(res.data.length))
    //   .catch((err) => console.error("Error fetching orders:", err));

    // Fetch total users
    axios.get("http://localhost:5000/users/getall")
      .then((res) => setTotalUsers(res.data.length))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  //ADMIN LOGIN

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/admin-login'); // Redirect to login if no token
    } else {
      axios.get('http://localhost:5000/admin/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => setLoading(false))
      .catch(() => {
        localStorage.removeItem('adminToken');
        router.push('/admin/admin-login');
      });
    }
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Total Products */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-600 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl  text-white font-semibold">Total Products</h2>
          <p className="text-3xl font-bold text-blue-600">{totalProducts}</p>
        </div>

        {/* Total Orders */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-600 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl text-white font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold text-green-600">{totalOrders}</p>
        </div>

        {/* Total Users */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-600 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl text-white font-semibold">Total Users</h2>
          <p className="text-3xl font-bold text-red-600">{totalUsers}</p>
        </div>

        {/* Add more stats as needed */}
        <div></div>
      </div>
    </div>
  );
}
