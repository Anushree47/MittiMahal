


// 'use client';
// import { useEffect, useState } from "react"; 
// import { FiShoppingCart } from "react-icons/fi"; 
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import useCartContext from "@/context/CartContext";
// import Link from "next/link";

// const Navbar = () => { 
//   const [menuOpen, setMenuOpen] = useState(false); 
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const { cart } = useCartContext();

//   // Check token on component mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   // Function to handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//   };

//   return ( 
//     <nav className="bg-transparent backdrop-blur-md fixed w-full top-0 left-0 z-50 shadow-md"> 
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */} 
//           <h1 className="text-black font-bold text-3xl">Mitti Mahal</h1>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-6">
//             <Link href="/" className="text-black text-lg hover:text-yellow-600">Home</Link>
//             <Link href="/browse" className="text-black text-lg hover:text-yellow-600">Product</Link>
//             <Link href="/about" className="text-black text-lg hover:text-yellow-600">About Us</Link>
//             <Link href="/contactForm" className="text-black text-lg hover:text-yellow-600">Contact</Link>
            
//             {/* Conditional Login/Logout */}
//             {isLoggedIn ? (
//               <button onClick={handleLogout} className="text-red-500 hover:underline">
//                 Logout
//               </button>
//             ) : (
//               <Link href="/loginForm" className="text-blue-500 hover:underline">
//                 Login
//               </Link>
//             )}
//           </div>

//           {/* Right Side (Buttons & Cart) */}
//           <div className="flex items-center space-x-4">
//             {!isLoggedIn && (
//               <>
//                 <Link href="/loginForm" className="bg-yellow-900 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
//                   Sign In
//                 </Link>
//                 <Link href="/signupForm" className="border border-yellow-600 text-yellow-900 hover:bg-yellow-900 hover:text-white px-4 py-2 rounded-lg">
//                   Sign Up
//                 </Link>
//               </>
//             )}
            
//             {/* Cart Icon */}
//             <Link href="/user/cart" className="relative">
//               <FiShoppingCart className="text-black text-2xl cursor-pointer" />
//               {cart.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
//                   {cart.length}
//                 </span>
//               )}
//             </Link>

//             {/* Mobile Menu Button */}
//             <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
//               {menuOpen ? <AiOutlineClose className="text-black text-2xl" /> : <AiOutlineMenu className="text-black text-2xl" />}
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// 'use client';
// import { useState } from "react"; 
// import { FiShoppingCart } from "react-icons/fi"; 
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import Link from "next/link";
// //import { useAuth } from "@/context/AuthContext"; // ✅ Import Auth Context
// import useCartContext from "@/context/CartContext"; // ✅ Import Cart Context

// const Navbar = () => { 
//   const [menuOpen, setMenuOpen] = useState(false); 
//   const { user, logout } = useAuth(); // ✅ Get user & logout from AuthContext
//   const { cart } = useCartContext();

//   return ( 
//     <nav className="bg-transparent backdrop-blur-md fixed w-full top-0 left-0 z-50 shadow-md"> 
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */} 
//           <h1 className="text-black font-bold text-3xl">Mitti Mahal</h1>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-6">
//             <Link href="/" className="text-black text-lg hover:text-yellow-600">Home</Link>
//             <Link href="/browse" className="text-black text-lg hover:text-yellow-600">Product</Link>
//             <Link href="/about" className="text-black text-lg hover:text-yellow-600">About Us</Link>
//             <Link href="/contactForm" className="text-black text-lg hover:text-yellow-600">Contact</Link>
            
//             {/* Conditional Login/Logout */}
//             {user ? (
//               <>
//                 <Link href="/user/dashboard" className="text-blue-500 hover:underline">Dashboard</Link>
//                 <button onClick={logout} className="text-red-500 hover:underline">Logout</button>
//               </>
//             ) : (
//               <Link href="/loginForm" className="text-blue-500 hover:underline">Login</Link>
//             )}
//           </div>

//           {/* Right Side (Buttons & Cart) */}
//           <div className="flex items-center space-x-4">
//             {!user && (
//               <>
//                 <Link href="/loginForm" className="bg-yellow-900 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
//                   Sign In
//                 </Link>
//                 <Link href="/signupForm" className="border border-yellow-600 text-yellow-900 hover:bg-yellow-900 hover:text-white px-4 py-2 rounded-lg">
//                   Sign Up
//                 </Link>
//               </>
//             )}
            
//             {/* Cart Icon */}
//             <Link href="/user/cart" className="relative">
//               <FiShoppingCart className="text-black text-2xl cursor-pointer" />
//               {cart.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
//                   {cart.length}
//                 </span>
//               )}
//             </Link>

//             {/* Mobile Menu Button */}
//             <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
//               {menuOpen ? <AiOutlineClose className="text-black text-2xl" /> : <AiOutlineMenu className="text-black text-2xl" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className="md:hidden bg-white shadow-lg p-4">
//             <Link href="/" className="block text-black text-lg hover:text-yellow-600 mb-2">Home</Link>
//             <Link href="/browse" className="block text-black text-lg hover:text-yellow-600 mb-2">Product</Link>
//             <Link href="/about" className="block text-black text-lg hover:text-yellow-600 mb-2">About Us</Link>
//             <Link href="/contactForm" className="block text-black text-lg hover:text-yellow-600 mb-2">Contact</Link>

//             {user ? (
//               <>
//                 <Link href="/user/dashboard" className="block text-blue-500 hover:underline mb-2">Dashboard</Link>
//                 <button onClick={logout} className="block text-red-500 hover:underline">Logout</button>
//               </>
//             ) : (
//               <>
//                 <Link href="/loginForm" className="block text-blue-500 hover:underline mb-2">Login</Link>
//                 <Link href="/signupForm" className="block text-blue-500 hover:underline">Sign Up</Link>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

'use client';
import { useState } from "react"; 
import { FiShoppingCart } from "react-icons/fi"; 
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import useCartContext from "@/context/CartContext"; // ✅ Import Cart Context

const Navbar = () => { 
  const [menuOpen, setMenuOpen] = useState(false); 
  const { cart } = useCartContext(); // ✅ Get cart context

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
            <Link href="/about" className="text-black text-lg hover:text-yellow-600">About Us</Link>
            <Link href="/contactForm" className="text-black text-lg hover:text-yellow-600">Contact</Link>
          </div>

          {/* Right Side (Buttons & Cart) */}
          <div className="flex items-center space-x-4">
            <Link href="/loginForm" className="bg-yellow-900 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
              Sign In
            </Link>
            <Link href="/signupForm" className="border border-yellow-600 text-yellow-900 hover:bg-yellow-900 hover:text-white px-4 py-2 rounded-lg">
              Sign Up
            </Link>

            {/* Cart Icon */}
            <Link href="/user/cart" className="relative">
              <FiShoppingCart className="text-black text-2xl cursor-pointer" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <AiOutlineClose className="text-black text-2xl" /> : <AiOutlineMenu className="text-black text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg p-4">
            <Link href="/" className="block text-black text-lg hover:text-yellow-600 mb-2">Home</Link>
            <Link href="/browse" className="block text-black text-lg hover:text-yellow-600 mb-2">Product</Link>
            <Link href="/about" className="block text-black text-lg hover:text-yellow-600 mb-2">About Us</Link>
            <Link href="/contactForm" className="block text-black text-lg hover:text-yellow-600 mb-2">Contact</Link>
            <Link href="/loginForm" className="block text-blue-500 hover:underline mb-2">Login</Link>
            <Link href="/signupForm" className="block text-blue-500 hover:underline">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

