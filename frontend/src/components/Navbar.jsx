<<<<<<< HEAD
// 'use client'
// import useCartContext from '@/context/CartContext';
// import { IconShoppingCartFilled } from '@tabler/icons-react';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
=======
'use client'
import useCartContext from '@/context/CartContext';
import { IconShoppingCartFilled } from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
>>>>>>> 842364c9399629a763806dc12f46d56d6f456bb0

// const Navbar = () => {

//   const { cart } = useCartContext();

//   // Check for  token on component mou nt
//   useEffect(() => {

//   }, []);

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   return (


//     <div className="px-4 py-6 mx-auto lg:py-8 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">

//       <div className="relative flex items-center justify-between lg:justify-center lg:space-x-16">
//         <ul className="flex items-center hidden space-x-8 lg:flex">
//           {/*Product*/}
//           <li>
//             <Link
//               href="/browse"
//               aria-label="Our product"
//               title="Our product"
//               className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//             >
//               Product
//             </Link>
//           </li>
//           {/* Contact*/}
//           <li>
//             <Link
//               href="/contactForm"
//               aria-label="Our product"
//               title="Our product"
//               className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//             >
//               Contact
//             </Link>
//           </li>
//           {/* About us*/}
//           <li>
//             <Link
//               href="/about"
//               aria-label="About us"
//               title="About us"
//               className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//             >
//               About us
//             </Link>
//           </li>

//         </ul>
//         {/* HOME*/}
//         <Link
//           href="/"
//           aria-label="Company"
//           title="Company"
//           className="inline-flex items-center"
//         >
//           <svg
//             className="w-8 text-deep-purple-accent-400"
//             viewBox="0 0 24 24"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeMiterlimit="10"
//             stroke="currentColor"
//             fill="none"
//           >
//             <rect x="3" y="1" width="7" height="12" />
//             <rect x="3" y="17" width="7" height="6" />
//             <rect x="14" y="1" width="7" height="6" />
//             <rect x="14" y="11" width="7" height="12" />
//           </svg>
//           <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
//             Mitti Mahal
//           </span>
//         </Link>

//         <ul className="flex items-center hidden space-x-8 lg:flex">


//           {/* REGISTER*/}
//           <li>
//             <Link
//               href="/signupForm"
//               aria-label="Sign up"
//               title="Sign up"
//               className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//             >
//               Sign Up
//             </Link>
//           </li>
//           {/* LOG IN*/}
//           <li>
//             <Link
//               href="/loginForm"
//               aria-label="Sign In"
//               title="Sign in"
//               className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//             >
//               Sign In
//             </Link>
//           </li>
//           {/* CART*/}
//           <li>
//             <Link
//               href="/user/cart"
//               aria-label="Sign In"
//               title="Sign in"
//               className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//             >
//               {cart.length} <IconShoppingCartFilled />
//             </Link>
//           </li>

//         </ul>
//         <div className="lg:hidden">
//           <button
//             aria-label="Open Menu"
//             title="Open Menu"
//             className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
//             onClick={() => setIsMenuOpen(true)}
//           >
//             <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
//               <path
//                 fill="currentColor"
//                 d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
//               />
//             </svg>
//           </button>
//           {isMenuOpen && (
//             <div className="absolute top-0 left-0 w-full">
//               <div className="p-5 bg-white border rounded shadow-sm">
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <Link
//                       href="/"
//                       aria-label="Company"
//                       title="Company"
//                       className="inline-flex items-center"
//                     >
//                       <svg
//                         className="w-8 text-deep-purple-accent-400"
//                         viewBox="0 0 24 24"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeMiterlimit="10"
//                         stroke="currentColor"
//                         fill="none"
//                       >
//                         <rect x="3" y="1" width="7" height="12" />
//                         <rect x="3" y="17" width="7" height="6" />
//                         <rect x="14" y="1" width="7" height="6" />
//                         <rect x="14" y="11" width="7" height="12" />
//                       </svg>
//                       <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
//                         Company
//                       </span>
//                     </Link>
//                   </div>
//                   <div>
//                     <button
//                       aria-label="Close Menu"
//                       title="Close Menu"
//                       className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
//                         <path
//                           fill="currentColor"
//                           d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//                 <nav>
//                   <ul className="space-y-4">
//                     <li>
//                       <Link
//                         href="/browse"
//                         aria-label="Our product"
//                         title="Our product"
//                         className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//                       >
//                         Product
//                       </Link>
//                     </li>

//                     <li>
//                       <Link
//                         href="/about"
//                         aria-label="About us"
//                         title="About us"
//                         className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//                       >
//                         About us
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="/signupForm"
//                         aria-label="Sign up"
//                         title="Sign up"
//                         className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//                       >
//                         Sign Up
//                       </Link>
//                     </li>
//                   </ul>
//                 </nav>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Navbar
'use client';
import { useState } from "react"; 
import { FiShoppingCart } from "react-icons/fi"; 
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import useCartContext from "@/context/CartContext";

const Navbar = () => { const [menuOpen, setMenuOpen] = useState(false); 
  const { cart } = useCartContext(); // Replace this with your cart state

return ( 

<nav className="bg-transparent backdrop-blur-md fixed w-full top-0 left-0 z-50 shadow-md"> 
  
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
    
    <div className="flex justify-between items-center h-16">
       {/* Logo */} 
        <h1 className="text-black font-bold text-3xl">Mitti Mahal</h1>

{/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <a href="/" className="text-black text-lg hover:text-yellow-600">Home</a>
        <a href="/browse" className="text-black text-lg hover:text-yellow-600">Product</a>
        <a href="#" className="text-black text-lg hover:text-yellow-600">Services</a>
        <a href="/contactForm" className="text-black text-lg hover:text-yellow-600">Contact</a>
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
<<<<<<< HEAD
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="md:hidden bg-gray-900 bg-opacity-90 absolute w-full top-16 left-0 p-6 space-y-4 text-center">
      <a href="/" className="block text-white hover:text-yellow-600">Home</a>
      <a href="/browse" className="block text-white hover:text-yellow-600">Product</a>
      <a href="#" className="block text-white hover:text-yellow-600">Services</a>
      <a href="/contactForm" className="block text-white hover:text-yellow-600">Contact</a>
      <a href="/loginForm" className="bg-yellow-500 w-full py-2 text-white rounded-lg">Sign In</a>
      <a href="/signupForm" className="border border-yellow-900 text-yellow-900 w-full py-2 rounded-lg">Sign Up</a>
    </div>
  )}
</nav>

); };

export default Navbar;
=======
  );
};
export default Navbar
>>>>>>> 842364c9399629a763806dc12f46d56d6f456bb0
