// 'use client';
// import { useState } from "react"; 
// import { FiShoppingCart, FiHeart ,FiUser  } from "react-icons/fi"; 
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import Link from "next/link";
// import useCartContext from "@/context/CartContext";
// import useWishlistContext from "@/context/WishlistContext"; // ✅ Import Wishlist Context
// import { useAppContext } from '@/context/AppContext';
// import { useParams, useRouter } from 'next/navigation';


// const Navbar = () => { 
//   const [menuOpen, setMenuOpen] = useState(false); 
//   const { cart } = useCartContext(); 
//   const { wishlist } = useWishlistContext(); // ✅ Get wishlist context
//   const { user, logout } = useAppContext();
//   const router = useRouter();
// const {id}= useParams();
//   const handleLogout = () => {
//     logout();
//     router.push('/loginForm');
//   };

//   return ( 
//     <nav className="bg-transparent backdrop-blur-md fixed w-full top-0 left-0 z-50 shadow-md"> 
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
//         <div className="flex justify-between items-center h-16">
          
//           {/* Logo */} 
//           <a
//             className="flex-none rounded-xl text-xl inline-block font-bold focus:outline-none focus:opacity-80"
//             href="../templates/creative-agency/index.html"
//             aria-label="Preline"
//           >
//             <img src="/logo2.png" alt="logo" className='w-28 h-auto' />
//           </a>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-6">
//             <Link href="/" className="text-black text-lg hover:text-yellow-600">Home</Link>
//             <Link href="/browse" className="text-black text-lg hover:text-yellow-600">Product</Link>
//             <Link href="/about" className="text-black text-lg hover:text-yellow-600">About Us</Link>
//             <Link href="/contactForm" className="text-black text-lg hover:text-yellow-600">Contact</Link>
//           </div>

//           {/* Right Side (Buttons & Icons) */}
//           <div className="flex items-center space-x-4">
//             {/* <Link href="/loginForm" className="bg-yellow-900 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
//               Sign In
//             </Link>
//             <Link href="/signupForm" className="border border-yellow-600 text-yellow-900 hover:bg-yellow-900 hover:text-white px-4 py-2 rounded-lg">
//               Sign Up
//             </Link> */}
//             <div>
//         {user ? (
//           <button onClick={handleLogout} className="bg-white text-yellow-900 px-4 py-2 rounded">
//             Logout
//           </button>
//         ) : (
//           <a href="/loginForm" className="underline">Login</a>
//         )}
//       </div>
//       <Link
//               href={user ? `/user/dashboard/${id}` : "/loginForm"}
//               title={user ? "Dashboard" : "Login"}
//             >
//               <FiUser className="text-black text-2xl cursor-pointer hover:text-yellow-600" />
//             </Link>

//             {/* Wishlist Icon */}
//             <Link href="/user/wishlist" className="relative">
//               <FiHeart className="text-black text-2xl cursor-pointer" />
//               {wishlist.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
//                   {wishlist.length}
//                 </span>
//               )}
//             </Link>

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
//               {menuOpen ? (
//                 <AiOutlineClose className="text-white text-2xl" />
//               ) : (
//                 <AiOutlineMenu className="text-white text-2xl" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

'use client';
import { useState } from "react"; 
import { FiShoppingCart, FiHeart, FiUser } from "react-icons/fi"; 
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import useCartContext from "@/context/CartContext";
import useWishlistContext from "@/context/WishlistContext"; 
import useAppContext from '@/context/AppContext';
import { useRouter } from 'next/navigation';

const Navbar = () => { 
  const [menuOpen, setMenuOpen] = useState(false); 
  const { cart } = useCartContext(); 
  const { wishlist } = useWishlistContext(); 
  const { user, logout } = useAppContext();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/loginForm');
  };

  const handleUserIconClick = () => {
    if (user) {
      console.log("✅ Logged In User Details:", user);
      router.push("/user/dashboard");  // Use user's _id dynamically
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
                <button onClick={handleLogout} className="bg-white text-yellow-900 px-4 py-2 rounded">
                  Logout
                </button>
              ) : (
                <Link href="/loginForm" className="underline">Login</Link>
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
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              )}
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
              {menuOpen ? (
                <AiOutlineClose className="text-white text-2xl" />
              ) : (
                <AiOutlineMenu className="text-white text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
