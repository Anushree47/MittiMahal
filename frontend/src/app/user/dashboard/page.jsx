// 'use client';
// import PrivateRoute from '@/components/PrivateRoute';
// import { useAppContext } from '@/context/AppContext';
// import Spinner from '@/components/Spinner';
// import Link from 'next/link';
// import { FiShoppingCart, FiHeart, FiLogOut, FiUser, FiPackage, FiHome } from 'react-icons/fi';

// const UserDashboard = () => {
//   const { user, logout, loading } = useAppContext(); // get user, logout, loading from AppContext

//   if (loadinfronteg) {
//     return <Spinner />; // Show spinner while loading
//   }

//   return (
//     <PrivateRoute>
//       <div className="min-h-screen bg-gray-100 flex">
//         {/* Sidebar */}
//         <aside className="w-64 bg-white shadow-md p-6">
//           <div className="flex flex-col items-center">
//             {user?.imageUrl ? (
//               <img src={user.imageUrl} alt="User" className="w-20 h-20 rounded-full border-2 border-gray-400" />
//             ) : (
//               <div className="w-20 h-20 bg-gray-300 rounded-full border-2 border-gray-400 flex items-center justify-center">
//                 <FiUser className="text-gray-600 text-3xl" />
//               </div>
//             )}
//             <h2 className="text-lg font-semibold mt-3">{user?.name}</h2>
//             <p className="text-gray-500 text-sm">{user?.email}</p>
//           </div>

//           {/* Navigation Links */}
//           <nav className="mt-6 space-y-4">
//             <Link href="/" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//               <FiHome className="text-xl" /> <span>Home</span>
//             </Link>
//             <Link href="/user/update-user" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//               <FiUser className="text-xl" /> <span>Edit Profile</span>
//             </Link>
//             <Link href="/browse" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//               <FiPackage className="text-xl" /> <span>Browse Products</span>
//             </Link>
//             <Link href="/user/address" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//               <FiPackage className="text-xl" /> <span>Addresses</span>
//             </Link>
//             <Link href="/cart" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//               <FiShoppingCart className="text-xl" /> <span>Cart</span>
//             </Link>
//             <Link href="/user/receipt" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//               <FiPackage className="text-xl" /> <span>Invoices</span>
//             </Link>
//             <Link href="/user/wishlist" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//               <FiHeart className="text-xl" /> <span>Wishlist</span>
//             </Link>
//             <Link href="/user/orderHistory" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//               <FiPackage className="text-xl" /> <span>Order History</span>
//             </Link>
//             <button
//               className="flex items-center space-x-3 text-red-500 hover:text-red-600 w-full"
//               onClick={logout}
//             >
//               <FiLogOut className="text-xl" /> <span>Logout</span>
//             </button>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-8">
//           <h1 className="text-2xl font-semibold text-gray-700">User Dashboard</h1>

//           {/* Orders & Wishlist Section */}
//           <div className="mt-6 grid grid-cols-2 gap-6">
//             {/* Orders */}
//             <div className="bg-white p-6 shadow-md rounded-lg">
//               <h2 className="text-lg font-semibold mb-3">Your Orders</h2>
//               <div className="space-y-4">
//                 <div className="flex items-center space-x-4 border-b pb-3">
//                   {/* Order content goes here */}
//                   <Link href="/user/orderHistory" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//               <FiPackage className="text-xl" />
//             </Link>
//                   <img src="/" alt="Product" className="w-16 h-16 rounded" />
//                   <div></div>
//                 </div>
//               </div>
//             </div>

//             {/* Wishlist */}
//             <div className="bg-white p-6 shadow-md rounded-lg">
//               <h2 className="text-lg font-semibold mb-3">Your Wishlist</h2>
//               <div className="space-y-4">
//                 <div className="flex items-center space-x-4 border-b pb-3">
//                   {/* Wishlist content goes here */}
//                   <Link href="/user/wishlist" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//               <FiHeart className="text-xl" /> 
//             </Link>
//                   <img src="/" alt="Wishlist Product" className="w-16 h-16 rounded" />
//                   <div></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </PrivateRoute>
//   );
// };

// export default UserDashboard;

// 'use client';
// import { useState, useEffect } from 'react';
// import PrivateRoute from '@/components/PrivateRoute';
// import { useAppContext } from '@/context/AppContext';
// import Spinner from '@/components/Spinner';
// import Link from 'next/link';
// import { FiShoppingCart, FiHeart, FiLogOut, FiUser, FiPackage, FiHome, FiMoon, FiSun } from 'react-icons/fi';
// import axios from 'axios';
// import axiosInstance from '@/utils/axiosInstance';
// import { motion } from "framer-motion";


// const UserDashboard = () => {
//   const { user, logout, loading } = useAppContext();

  

//   const [darkMode, setDarkMode] = useState(false);
//     const [totalOrders, setTotalOrders] = useState(0);

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', darkMode);
//   }, [darkMode]);
// useEffect(() => {
//       // Fetch total orders
//       axiosInstance.get("${process.env.NEXT_PUBLIC_API_URI}/order/my-orders")
//         .then((res) => setTotalOrders(res.data.length))
//         .catch((err) => console.error("Error fetching orders:", err));


// }, [])

//   if (loading) return <Spinner />;

//   return (
//     <PrivateRoute>
//       <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} flex flex-col md:flex-row`}>
//         {/* Sidebar */}
//         <aside className={`w-full md:w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md p-6`}>
//           <div className="flex flex-col items-center">
//             {user?.imageUrl ? (
//               <img src={user.imageUrl} alt="User" className="w-20 h-20 rounded-full border-2 border-gray-400" />
//             ) : (
//               <div className="w-20 h-20 bg-gray-300 rounded-full border-2 border-gray-400 flex items-center justify-center">
//                 <FiUser className="text-gray-600 text-3xl" />
//               </div>
//             )}
//             <h2 className="text-lg font-semibold mt-3">{user?.name}</h2>
//             <p className="text-sm">{user?.email}</p>
//           </div>

//           <div className="mt-4 text-center">
//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className="flex items-center gap-2 mx-auto mt-2 text-sm hover:text-blue-500"
//               title="Toggle Dark Mode"
//             >
//               {darkMode ? <FiSun /> : <FiMoon />} {darkMode ? 'Light Mode' : 'Dark Mode'}
//             </button>
//           </div>

//           {/* Navigation */}
//           <nav className="mt-6 space-y-4">
//             <SidebarLink href="/" icon={<FiHome />} label="Home" />
//             <SidebarLink href="/user/update-user" icon={<FiUser />} label="Edit Profile" />
//             <SidebarLink href="/browse" icon={<FiPackage />} label="Browse Products" />
//             <SidebarLink href="/user/address" icon={<FiPackage />} label="Addresses" />
//             <SidebarLink href="/cart" icon={<FiShoppingCart />} label="Cart" />
//             <SidebarLink href="/user/receipt" icon={<FiPackage />} label="Invoices" />
//             <SidebarLink href="/user/wishlist" icon={<FiHeart />} label="Wishlist" />
//             <SidebarLink href="/user/orderHistory" icon={<FiPackage />} label="Order History" />
//             <button
//               className="flex items-center space-x-3 text-red-500 hover:text-red-600 w-full"
//               onClick={logout}
//               title="Logout"
//             >
//               <FiLogOut className="text-xl" /> <span>Logout</span>
//             </button>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6 sm:p-8 space-y-6">
//           <h1 className="text-2xl font-semibold">User Dashboard</h1>

//            {/* Total Orders */}
           
//         <div className="bg-gradient-to-r from-gray-900 to-gray-600 p-6 rounded-lg shadow-md text-center">
//           <h2 className="text-xl text-white font-semibold">Total Orders</h2>
//           <p className="text-3xl font-bold text-green-600">{totalOrders}</p>
//         </div>

//           {/* Orders & Wishlist */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Orders */}
//             <div className={`p-6 shadow-md rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//               <Link href="/user/orderHistory" className="text-lg font-semibold mb-3"> Your Orders</Link>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-4 border-b pb-3">
//                   <FiPackage className="text-xl" title="Order Icon" />
//                 </div>
//               </div>
//             </div>

//             {/* Wishlist */}
//             <div className={`p-6 shadow-md rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//               <Link href="/user/whislist" className="text-lg font-semibold mb-3">Your Wishlist</Link>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-4 border-b pb-3">
//                   <FiHeart className="text-xl" title="Wishlist Icon" />

//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </PrivateRoute>
//   );
// };
// <div>
// <motion.div
//   initial="hidden"
//   animate="visible"
//   variants={{
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { staggerChildren: 0.2 },
//     },
//   }}
//   className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4"
// >
//   {recommendedProducts.map((product) => (
//     <motion.div
//       key={product._id}
//       whileHover={{ scale: 1.05 }}
//       className="border rounded-lg shadow hover:shadow-lg p-2 bg-white"
//     >
//       <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover rounded" />
//       <h4 className="text-sm font-semibold mt-2">{product.name}</h4>
//       <p className="text-xs text-gray-600">{product.category}</p>
//       <p className="text-sm font-bold text-green-600">₹{product.price}</p>
//     </motion.div>
//   ))}
// </motion.div>

// </div>
// // Sidebar Link Component
// const SidebarLink = ({ href, icon, label }) => (
//   <Link href={href} className="flex items-center space-x-3 hover:text-blue-500" title={label}>
//     <span className="text-xl">{icon}</span>
//     <span>{label}</span>
//   </Link>
// );
// <div>
// <motion.div
//   whileHover={{ scale: 1.02 }}
//   className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md mb-4"
// >
//   <h3 className="text-md font-bold">🎁 10% OFF on Kitchenware!</h3>
//   <p className="text-sm text-gray-700">Use Code: <span className="font-mono">KITCHEN10</span></p>
//   <button className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded">Apply Now</button>
// </motion.div>
// </div>


// export default UserDashboard;

// New User Dashboard with dynamic data and interactive graphs
// 'use client';
// import PrivateRoute from '@/components/PrivateRoute';
// import { useAppContext } from '@/context/AppContext';
// import Spinner from '@/components/Spinner';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { FiShoppingCart, FiHeart, FiLogOut, FiUser, FiPackage, FiHome } from 'react-icons/fi';
// // import {
// //   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend
// } from 'recharts';
// import axiosInstance from '@/utils/axiosInstance';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const UserDashboard = () => {
//   const { user, logout, loading } = useAppContext();
//   const [stats, setStats] = useState(null);
//   const [spendingData, setSpendingData] = useState([]);
//   const [categoryData, setCategoryData] = useState([]);
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [wishlistItems, setWishlistItems] = useState([]);

//   useEffect(() => {
//     const fetchStats = async () => {
//       const res = await axiosInstance.get('/users/stats');
//       const data = await res.json();
//       setStats(data);
//     };

//     const fetchSpending = async () => {
//       const res = await axiosInstance.get('/user/spending-summary');
//       const data = await res.json();
//       setSpendingData(data);
//     };

//     const fetchCategories = async () => {
//       const res = await axiosInstance.get('/users/category-summary');
//       const data = await res.json();
//       setCategoryData(data);
//     };

//     const fetchRecent = async () => {
//       const res = await axiosInstance.get('/users/recent-orders');
//       const data = await res.json();
//       setRecentOrders(data);
//     };

//     const fetchWishlist = async () => {
//       const res = await axiosInstance.get('/wishlist');
//       const data = await res.json();
//       setWishlistItems(data);
//     };

//     fetchStats();
//     fetchSpending();
//     fetchCategories();
//     fetchRecent();
//     fetchWishlist();
//   }, []);

//   if (loading || !stats) return <Spinner />;

//   return (
//     <PrivateRoute>
//       <div className="min-h-screen bg-gray-100 flex">
//         <aside className="w-64 bg-white shadow-md p-6">
//           <div className="flex flex-col items-center">
//             {user?.imageUrl ? (
//               <img src={user.imageUrl} alt="User" className="w-20 h-20 rounded-full border-2 border-gray-400" />
//             ) : (
//               <div className="w-20 h-20 bg-gray-300 rounded-full border-2 border-gray-400 flex items-center justify-center">
//                 <FiUser className="text-gray-600 text-3xl" />
//               </div>
//             )}
//             <h2 className="text-lg font-semibold mt-3">{user?.name}</h2>
//             <p className="text-gray-500 text-sm">{user?.email}</p>
//           </div>

//           <nav className="mt-6 space-y-4">
//             <Link href="/" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//               <FiHome className="text-xl" /> <span>Home</span>
//             </Link>
//             <Link href="/user/update-user" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//               <FiUser className="text-xl" /> <span>Edit Profile</span>
//             </Link>
//             <Link href="/browse" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//               <FiPackage className="text-xl" /> <span>Browse Products</span>
//             </Link>
//             <Link href="/user/address" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//               <FiPackage className="text-xl" /> <span>Addresses</span>
//             </Link>
//             <Link href="/cart" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//               <FiShoppingCart className="text-xl" /> <span>Cart</span>
//             </Link>
//             <Link href="/user/receipt" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//               <FiPackage className="text-xl" /> <span>Invoices</span>
//             </Link>
//             <Link href="/user/wishlist" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//               <FiHeart className="text-xl" /> <span>Wishlist</span>
//             </Link>
//             <Link href="/user/orderHistory" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500">
//               <FiPackage className="text-xl" /> <span>Order History</span>
//             </Link>
//             <button
//               className="flex items-center space-x-3 text-red-500 hover:text-red-600 w-full"
//               onClick={logout}
//             >
//               <FiLogOut className="text-xl" /> <span>Logout</span>
//             </button>
//           </nav>
//         </aside>

//         <main className="flex-1 p-8 space-y-8">
//           <h1 className="text-2xl font-semibold text-gray-700">User Dashboard</h1>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="bg-white p-4 rounded shadow text-center">
//               <p className="text-gray-500">Total Orders</p>
//               <p className="text-2xl font-bold">{stats.totalOrders}</p>
//             </div>
//             <div className="bg-white p-4 rounded shadow text-center">
//               <p className="text-gray-500">Total Spent</p>
//               <p className="text-2xl font-bold">₹{stats.totalSpent}</p>
//             </div>
//             <div className="bg-white p-4 rounded shadow text-center">
//               <p className="text-gray-500">Wishlist Items</p>
//               <p className="text-2xl font-bold">{wishlistItems.length}</p>
//             </div>
//             <div className="bg-white p-4 rounded shadow text-center">
//               <p className="text-gray-500">Recent Orders</p>
//               <p className="text-2xl font-bold">{recentOrders.length}</p>
//             </div>
//           </div>

//           {/* Charts */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Spending Over Time */}
//             <div className="bg-white p-6 rounded shadow">
//               <h2 className="text-lg font-semibold mb-4">Spending Over Time</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={spendingData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="amount" stroke="#8884d8" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Category Wise */}
//             <div className="bg-white p-6 rounded shadow">
//               <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie data={categoryData} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={100}>
//                     {categoryData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </main>
//       </div>
//     </PrivateRoute>
//   );
// };

// export default UserDashboard;





'use client';
import PrivateRoute from '@/components/PrivateRoute';
import Spinner from '@/components/Spinner';
import { useAppContext } from '@/context/AppContext';
import axiosInstance from '@/utils/axiosInstance';
import { motion } from "framer-motion";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiHeart, FiHome, FiLogOut, FiMoon, FiPackage, FiShoppingCart, FiSun, FiUser } from 'react-icons/fi';

const UserDashboard = () => {
  const { user, logout, loading } = useAppContext();
  const [darkMode, setDarkMode] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URI}/order/my-orders`)
      .then((res) => setTotalOrders(res.data.length))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  useEffect(() => {
    // ✅ Secure fetch of recommendations without userId in URL
    axiosInstance.get("/UserActivity/recommendations")
      .then((res) => setRecommendedProducts(res.data.recommendations || []))
      .catch((err) => console.error("Error fetching recommendations:", err));
  }, []);

  if (loading) return <Spinner />;

  return (
    <PrivateRoute>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} flex flex-col md:flex-row`}>
        {/* Sidebar */}
        <aside className={`w-full md:w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md p-6`}>
          <div className="flex flex-col items-center">
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt="User" className="w-20 h-20 rounded-full border-2 border-gray-400" />
            ) : (
              <div className="w-20 h-20 bg-gray-300 rounded-full border-2 border-gray-400 flex items-center justify-center">
                <FiUser className="text-gray-600 text-3xl" />
              </div>
            )}
            <h2 className="text-lg font-semibold mt-3">{user?.name}</h2>
            <p className="text-sm">{user?.email}</p>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 mx-auto mt-2 text-sm hover:text-blue-500"
              title="Toggle Dark Mode"
            >
              {darkMode ? <FiSun /> : <FiMoon />} {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-6 space-y-4">
            <SidebarLink href="/" icon={<FiHome />} label="Home" />
            {/* <SidebarLink href=`/user/update-user/${id}` icon={<FiUser />} label="Edit Profile" /> */}
            <SidebarLink href={`/user/update-user/${user?._id}`} icon={<FiUser />} label="Edit Profile" />

            <SidebarLink href="/browse" icon={<FiPackage />} label="Browse Products" />
            <SidebarLink href="/user/address" icon={<FiPackage />} label="Addresses" />
            <SidebarLink href="/cart" icon={<FiShoppingCart />} label="Cart" />
            <SidebarLink href="/user/receipt" icon={<FiPackage />} label="Invoices" />
            <SidebarLink href="/user/wishlist" icon={<FiHeart />} label="Wishlist" />
            <SidebarLink href="/user/orderHistory" icon={<FiPackage />} label="Order History" />
            <button
              className="flex items-center space-x-3 text-red-500 hover:text-red-600 w-full"
              onClick={logout}
              title="Logout"
            >
              <FiLogOut className="text-xl" /> <span>Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 sm:p-8 space-y-6">
          <h1 className="text-2xl font-semibold">User Dashboard</h1>

          {/* Total Orders */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-600 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl text-white font-semibold">Total Orders</h2>
            <p className="text-3xl font-bold text-green-600">{totalOrders}</p>
          </div>

          {/* Orders & Wishlist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 shadow-md rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <Link href="/user/orderHistory" className="text-lg font-semibold mb-3">Your Orders</Link>
              <div className="flex items-center gap-4 border-b pb-3">
                <FiPackage className="text-xl" title="Order Icon" />
              </div>
            </div>

            <div className={`p-6 shadow-md rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <Link href="/user/wishlist" className="text-lg font-semibold mb-3">Your Wishlist</Link>
              <div className="flex items-center gap-4 border-b pb-3">
                <FiHeart className="text-xl" title="Wishlist Icon" />
              </div>
            </div>
          </div>
          <div className={`p-6 shadow-md rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <Link href="/user/changePassword" className="text-lg font-semibold mb-3">Change Password</Link>
              <div className="flex items-center gap-4 border-b pb-3">
                <FiUser className="text-xl" title="Wishlist Icon" />
              </div>
            </div>
          {/* Promo Banner */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md mb-4"
          >
            <h3 className="text-md font-bold">🎁 10% OFF on Kitchenware!</h3>
            <p className="text-sm text-gray-700">
              Use Code: <span className="font-mono">KITCHEN10</span>
            </p>
            <button className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded">Apply Now</button>
          </motion.div>

          {/* Recommended Products */}
          {recommendedProducts.length > 0 && (
            <>
              <h2 className="text-xl font-semibold">Recommended For You</h2>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.2 },
                  },
                }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4"
              >
                {recommendedProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    whileHover={{ scale: 1.05 }}
                    className="border rounded-lg shadow hover:shadow-lg p-2 bg-white"
                  >
                    <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover rounded" />
                    <h4 className="text-sm font-semibold mt-2">{product.name}</h4>
                    <p className="text-xs text-gray-600">{product.category}</p>
                    <p className="text-sm font-bold text-green-600">₹{product.price}</p>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
          
        </main>
      </div>
    </PrivateRoute>
  );
};

// Sidebar Link Component
const SidebarLink = ({ href, icon, label }) => (
  <Link href={href} className="flex items-center space-x-3 hover:text-blue-500" title={label}>
    <span className="text-xl">{icon}</span>
    <span>{label}</span>
  </Link>
);

export default UserDashboard;
