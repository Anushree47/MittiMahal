'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login'); // Redirect if not logged in
          return;
        }
        const res = await axios.get('http://localhost:5000/user/getbyid/YOUR_USER_ID', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (updatedData) => {
   
  };

  if (!user) return <h1 className="text-center text-xl text-gray-700 mt-10">Loading...</h1>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">User Dashboard</h1>

        {/* User Profile Section */}
        <div className="flex items-center space-x-4 mt-6">
          <img src={users.imageUrl} alt="User" className="w-20 h-20 rounded-full border-2 border-gray-400" />
          <div>
            <h2 className="text-xl font-semibold">{users.name}</h2>
            <p className="text-gray-500">{users.email}</p>
          </div>
        </div>

        {/* User Details & Edit Form */}
        <div className="mt-6">
          <label className="block text-gray-700">Phone:</label>
          <input type="text" value={user.phone} className="w-full p-2 border rounded-lg"
            onChange={(e) => handleUpdate({ phone: e.target.value })} />

          <label className="block mt-4 text-gray-700">City:</label>
          <input type="text" value={user.city} className="w-full p-2 border rounded-lg"
            onChange={(e) => handleUpdate({ city: e.target.value })} />

          <label className="block mt-4 text-gray-700">State:</label>
          <input type="text" value={user.state} className="w-full p-2 border rounded-lg"
            onChange={(e) => handleUpdate({ state: e.target.value })} />

          <button className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg"
            onClick={() => handleUpdate(user)}>
            Update Profile
          </button>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 flex flex-col space-y-3">
          <button className="w-full bg-green-500 text-white py-2 rounded-lg"
            onClick={() => router.push('/')}>
            Browse Homepage
          </button>
          <button className="w-full bg-yellow-500 text-white py-2 rounded-lg"
            onClick={() => router.push('/browse')}>
            Browse Products
          </button>
          <button className="w-full bg-red-500 text-white py-2 rounded-lg"
            onClick={() => router.push('/')}>
            View Cart
          </button>
          <button className="w-full bg-purple-500 text-white py-2 rounded-lg"
            onClick={() => router.push('/')}>
            View Wishlist
          </button>
          <button className="w-full bg-indigo-500 text-white py-2 rounded-lg"
            onClick={() => router.push('/')}>
            View Order History
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
