'use client';

import { useEffect, useState } from "react"; 
import { FiShoppingCart, FiHeart, FiUser } from "react-icons/fi"; 
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { useCartContext } from "@/context/CartContext"; 
import { useWishlistContext } from "@/context/WishlistContext"; 
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

const Navbar = () => { 
  const [menuOpen, setMenuOpen] = useState(false); 
  const { cart } = useCartContext(); 
  const [cartCount, setCartCount] = useState(0);
  const { wishlist } = useWishlistContext(); 
  const { user, logout } = useAppContext();
  const router = useRouter();
  useEffect(() => {
    // Calculate total quantity of items in cart
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
    console.log("Cart Items:", totalItems);
  }, [cart]);

  const handleLogout = () => {
    logout();
    router.push('/loginForm');
  };

  const handleUserIconClick = () => {
    if (user) {
      router.push("/user/dashboard");
    } else {
      router.push('/loginForm');
    }
  };
  return ( 
    <nav className="bg-transparent backdrop-blur-md fixed w-full top-0 left-0 z-50 shadow-md"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */} 
          <a
            className="flex-none rounded-xl text-xl inline-block font-bold focus:outline-none focus:opacity-80"
            href="/"
            aria-label="Preline"
          >
            <img src="/logo2.png" alt="logo" className='w-28 h-auto' />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-black text-lg hover:text-yellow-600">Home</Link>
            <Link href="/browse" className="text-black text-lg hover:text-yellow-600">Product</Link>
            <Link href="/about" className="text-black text-lg hover:text-yellow-600">About Us</Link>
            <Link href="/contactForm" className="text-black text-lg hover:text-yellow-600">Contact</Link>
          </div>

          {/* Right Side (Buttons & Icons) */}
          <div className="flex items-center space-x-4">
            
            <div>
  {user ? (
    <button 
      onClick={handleLogout}
      className="bg-white border border-yellow-600 text-yellow-900 hover:bg-yellow-100 font-medium px-4 py-2 rounded transition duration-300"
    >
      Logout
    </button>
  ) : (
    <Link 
      href="/loginForm"
      className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-4 py-2 rounded transition duration-300"
    >
      Login
    </Link>
  )}
</div>


            {/* User Icon */}
            <button
              onClick={handleUserIconClick}
              title={user ? "Dashboard" : "Login"}
              className="focus:outline-none"
            >
              <FiUser className="text-black text-2xl cursor-pointer hover:text-yellow-600" />
            </button>

            {/* Wishlist Icon */}
            <Link href="/user/wishlist" className="relative">
              <FiHeart className="text-black text-2xl cursor-pointer" />
              {wishlist && wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            
            {/* Cart Icon */}
          <Link href="/user/cart" className="relative">
            <FiShoppingCart className="w-6 h-6 text-gray-700 hover:text-orange-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <AiOutlineClose className="text-black text-2xl" />
              ) : (
                <AiOutlineMenu className="text-black text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* 🔥 Mobile Dropdown Menu — Added this part */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-b-lg px-6 pt-4 pb-6 space-y-4">
            <Link 
              href="/" 
              className="block text-black text-lg hover:text-yellow-600"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/browse" 
              className="block text-black text-lg hover:text-yellow-600"
              onClick={() => setMenuOpen(false)}
            >
              Product
            </Link>
            <Link 
              href="/about" 
              className="block text-black text-lg hover:text-yellow-600"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              href="/contactForm" 
              className="block text-black text-lg hover:text-yellow-600"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
        {/* 🔥 Mobile Dropdown Ends */}
      </div>
    </nav>
  );
};

export default Navbar;
