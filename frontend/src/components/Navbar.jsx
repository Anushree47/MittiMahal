'use client';
import { useEffect, useState } from "react"; 
import { FiShoppingCart } from "react-icons/fi"; 
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import useCartContext from "@/context/CartContext";
import Link from "next/link";

const Navbar = () => { const [menuOpen, setMenuOpen] = useState(false); 
  const { cart } = useCartContext(); // Replace this with your cart state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token in localStorage:", token); // Debugging
    if (!token) {
       // Show popup if token doesn't exist
      console.log("Popup should be visible now");
    } else {
      console.log("Token exists. Popup will not be shown.");
    }
  }, []);

  // Function to handle login action
  const handleLogin = () => {
    console.log("Login button clicked");
    localStorage.setItem("token", "yourGeneratedTokenHere");
    console.log("Token exits....logined"); // Close popup after login
  };

  // Function to handle logout action
  const handleLogout = () => {
    console.log("Logout button clicked");
    localStorage.removeItem("token"); // Remove token from localStorage
    console.log("Token removed");; //  after logout
  };

return ( 

<nav className="bg-transparent backdrop-blur-md fixed w-full top-0 left-0 z-50 shadow-md"> 
  
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
    
    <div className="flex justify-between items-center h-16">
       {/* Logo */} 
        <h1 className="text-black font-bold text-3xl">Mitti Mahal</h1>

{/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <Link href="/" className="text-black text-lg hover:text-yellow-600">Home</Link>
        <Link href="/browse" className="text-black text-lg hover:text-yellow-600">Product</Link>
        <a href="/about" className="text-black text-lg hover:text-yellow-600">About Us</a>
        <a href="/contactForm" className="text-black text-lg hover:text-yellow-600">Contact</a>
        
          {/* Conditional Login/Logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/loginForm"
              className="text-blue-500 hover:underline"
            >
              Login
            </Link>
          )}
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full mt-8 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
          >
            Logout
          </button>
      </div>

      {/* Right Side (Buttons & Cart) */}
      <div className="flex items-center space-x-4">
        <a href="/loginForm" className="bg-yellow-900 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">Sign In</a>
        <a href="/signupForm" className="border border-yellow-600 text-yellow-900 hover:bg-yellow-900 hover:text-white px-4 py-2 rounded-lg">Sign Up</a>
        
        {/* Cart Icon */}
        <a className="relative"
        href="/user/cart">
          <FiShoppingCart className="text-black text-2xl cursor-pointer" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </a>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <AiOutlineClose className="text-white text-2xl" /> : <AiOutlineMenu className="text-white text-2xl" />}
        </button>
      </div>
    </div>
    </div>
    </nav>
  );
};
export default Navbar
