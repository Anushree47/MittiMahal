
// 'use client';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { FiShoppingCart, FiHeart, FiLogOut, FiUser, FiPackage, FiHome } from 'react-icons/fi';

// const UserDashboard = () => {
//   const { id } = useParams();
//   const router = useRouter();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           router.push('/login');
//           return;
//         }
//         const res = await axios.get(`http://localhost:5000/users/getbyid/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (!user) return <h1 className="text-center text-xl text-gray-700 mt-10">Loading...</h1>;

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-md p-6">
//         <div className="flex flex-col items-center">
//           <img src={user.imageUrl} alt="User" className="w-20 h-20 rounded-full border-2 border-gray-400" />
//           <h2 className="text-lg font-semibold mt-3">{user.name}</h2>
//           <p className="text-gray-500 text-sm">{user.email}</p>
//         </div>
//         <nav className="mt-6 space-y-4">
//           <Link href="/" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//             <FiHome className="text-xl" /> <span>Home</span>
//           </Link>
//           <Link href= {`/user/update-user/${id}`} className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//             <FiUser className="text-xl" /> <span>Edit Profile</span>
//           </Link>
//           <Link href="/browse" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//             <FiPackage className="text-xl" /> <span>Browse Products</span>
//           </Link>
//           <Link href="/user/address" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//             <FiPackage className="text-xl" /> <span>Addresses</span>
//           </Link>
//           <Link href="/cart" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//             <FiShoppingCart className="text-xl" /> <span>Cart</span>
//           </Link>
//           <Link href="/wishlist" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//             <FiHeart className="text-xl" /> <span>Wishlist</span>
//           </Link>
//           <Link href="/orders" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//             <FiPackage className="text-xl" /> <span>Order History</span>
//           </Link>
//           <button className="flex items-center space-x-3 text-red-500 hover:text-red-600 w-full" onClick={() => router.push('/logout')}>
//             <FiLogOut className="text-xl" /> <span>Logout</span>
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         <h1 className="text-2xl font-semibold text-gray-700">User Dashboard</h1>

//         {/* Orders & Wishlist Section */}
//         <div className="mt-6 grid grid-cols-2 gap-6">
//           {/* Orders */}
//           <div className="bg-white p-6 shadow-md rounded-lg">
//             <h2 className="text-lg font-semibold mb-3">Your Orders</h2>
//             <div className="space-y-4">
//               <div className="flex items-center space-x-4 border-b pb-3">
//                 <img src="/placeholder.jpg" alt="Product" className="w-16 h-16 rounded" />
//                 <div>
                 
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Wishlist */}
//           <div className="bg-white p-6 shadow-md rounded-lg">
//             <h2 className="text-lg font-semibold mb-3">Your Wishlist</h2>
//             <div className="space-y-4">
//               <div className="flex items-center space-x-4 border-b pb-3">
//                 <img src="/placeholder.jpg" alt="Wishlist Product" className="w-16 h-16 rounded" />
//                 <div>
                  
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default UserDashboard;

'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiShoppingCart, FiHeart, FiLogOut, FiUser, FiPackage, FiHome } from 'react-icons/fi';
//import { useAuth } from '@/context/AuthContext'; // ✅ Import Auth Context

const UserDashboard = () => {
 const { user, logout } = useState(); // ✅ Get user & logout from AuthContext
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <h1 className="text-center text-xl text-gray-700 mt-10">Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <div className="flex flex-col items-center">
          {/* Check if user has an image */}
          {user.imageUrl ? (
            <img src={user.imageUrl} alt="User" className="w-20 h-20 rounded-full border-2 border-gray-400" />
          ) : (
            <div className="w-20 h-20 bg-gray-300 rounded-full border-2 border-gray-400 flex items-center justify-center">
              <FiUser className="text-gray-600 text-3xl" />
            </div>
          )}

          <h2 className="text-lg font-semibold mt-3">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 space-y-4">
          <Link href="/" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
            <FiHome className="text-xl" /> <span>Home</span>
          </Link>
          <Link href="/user/update-user" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
            <FiUser className="text-xl" /> <span>Edit Profile</span>
          </Link>
          <Link href="/browse" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
            <FiPackage className="text-xl" /> <span>Browse Products</span>
          </Link>
          <Link href="/user/address" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
            <FiPackage className="text-xl" /> <span>Addresses</span>
          </Link>
          <Link href="/cart" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
            <FiShoppingCart className="text-xl" /> <span>Cart</span>
          </Link>
          <Link href="/wishlist" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
            <FiHeart className="text-xl" /> <span>Wishlist</span>
          </Link>
          <Link href="/orders" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
            <FiPackage className="text-xl" /> <span>Order History</span>
          </Link>
          <button
            className="flex items-center space-x-3 text-red-500 hover:text-red-600 w-full"
            onClick={logout} // ✅ Uses AuthContext logout function
          >
            <FiLogOut className="text-xl" /> <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold text-gray-700">User Dashboard</h1>

        {/* Orders & Wishlist Section */}
        <div className="mt-6 grid grid-cols-2 gap-6">
          {/* Orders */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Your Orders</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 border-b pb-3">
                <img src="/" alt="Product" className="w-16 h-16 rounded" />
                <div></div>
              </div>
            </div>
          </div>

          {/* Wishlist */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Your Wishlist</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 border-b pb-3">
                <img src="/" alt="Wishlist Product" className="w-16 h-16 rounded" />
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
