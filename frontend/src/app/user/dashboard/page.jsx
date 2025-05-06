

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
    axiosInstance.get('order/my-orders')
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
