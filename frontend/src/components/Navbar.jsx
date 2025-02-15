// 'use client'
// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// const Navbar = () => {
//   // State to manage popup visibility
//   const [showPopup, setShowPopup] = useState(false);

//   // Check for  token on component mou nt
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log("Token in localStorage:", token); // Debugging
//     if (!token) {
//       setShowPopup(true); // Show popup if token doesn't exist
//       console.log("Popup should be visible now");
//     }  else {
//       console.log("Token exists. Popup will not be shown.");
//     }
//   }, []);
  
  

//   // Function to handle login action
//   const handleLogin = () => {
//     console.log("Login button clicked");
//     localStorage.setItem("token", "yourGeneratedTokenHere");
//     setShowPopup(false); // Close popup after login
//   };

//   // Function to handle logout action
//   const handleLogout = () => {
//     console.log("Logout button clicked");
//     localStorage.removeItem("token"); // Remove token from localStorage
//     setShowPopup(true); // Show popup after logout
//   };
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//   return (
    
       
//           <div className="px-4 py-6 mx-auto lg:py-8 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
//              {/* Popup for Admin Login */}
//         {showPopup && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
//               <h2 className="text-2xl font-bold mb-4">Welcome to Mitti Mahal</h2>
//               <p className="text-gray-600 mb-6">Log in to continue.</p>
//               <Link
//               href="/loginForm"
//                 onClick={handleLogin}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
//               >
//                 Log In
//               </Link>
//             </div>
//           </div>
//         )}

//             <div className="relative flex items-center justify-between lg:justify-center lg:space-x-16">
//               <ul className="flex items-center hidden space-x-8 lg:flex">
                
//                 <li>
//                   <Link
//                     href="/browse"
//                     aria-label="Our product"
//                     title="Our product"
//                     className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//                   >
//                     Product
//                   </Link>
//                 </li>

//                 <li>
//                   <Link
//                     href="/contactForm"
//                     aria-label="Our product"
//                     title="Our product"
//                     className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//                   >
//                     Contact 
//                   </Link>
//                 </li>
               
//               </ul>

   
//               <Link
//                 href="/"
//                 aria-label="Company"
//                 title="Company"
//                 className="inline-flex items-center"
//               >
//                 <svg
//                   className="w-8 text-deep-purple-accent-400"
//                   viewBox="0 0 24 24"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeMiterlimit="10"
//                   stroke="currentColor"
//                   fill="none"
//                 >
//                   <rect x="3" y="1" width="7" height="12" />
//                   <rect x="3" y="17" width="7" height="6" />
//                   <rect x="14" y="1" width="7" height="6" />
//                   <rect x="14" y="11" width="7" height="12" />
//                 </svg>
//                 <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
//                   Mitti Mahal
//                 </span>
//               </Link>

//               <ul className="flex items-center hidden space-x-8 lg:flex">
               
//                 <li>
//                   <Link
//                     href="/about"
//                     aria-label="About us"
//                     title="About us"
//                     className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//                   >
//                     About us
//                   </Link>
//                 </li>

                
//                 <li>
//                   <Link
//                     href="/signupForm"
//                     aria-label="Sign up"
//                     title="Sign up"
//                     className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//                   >
//                     Sign Up
//                   </Link>
//                 </li>
          
//                 <li>
//                   <Link
//                     href="/loginForm"
//                     aria-label="Sign In"
//                     title="Sign in"
//                     className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//                   >
//                     Sign In
//                   </Link>
//                 </li>
//                  {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="w-full mt-8 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
//           >
//             Logout
//           </button>
//               </ul>
//               <div className="lg:hidden">
//                 <button
//                   aria-label="Open Menu"
//                   title="Open Menu"
//                   className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
//                   onClick={() => setIsMenuOpen(true)}
//                 >
//                   <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
//                     <path
//                       fill="currentColor"
//                       d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
//                     />
//                     <path
//                       fill="currentColor"
//                       d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
//                     />
//                     <path
//                       fill="currentColor"
//                       d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
//                     />
//                   </svg>
//                 </button>
//                 {isMenuOpen && (
//                   <div className="absolute top-0 left-0 w-full">
//                     <div className="p-5 bg-white border rounded shadow-sm">
//                       <div className="flex items-center justify-between mb-4">
//                         <div>
//                           <Link
//                             href="/"
//                             aria-label="Company"
//                             title="Company"
//                             className="inline-flex items-center"
//                           >
//                             <svg
//                               className="w-8 text-deep-purple-accent-400"
//                               viewBox="0 0 24 24"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeMiterlimit="10"
//                               stroke="currentColor"
//                               fill="none"
//                             >
//                               <rect x="3" y="1" width="7" height="12" />
//                               <rect x="3" y="17" width="7" height="6" />
//                               <rect x="14" y="1" width="7" height="6" />
//                               <rect x="14" y="11" width="7" height="12" />
//                             </svg>
//                             <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
//                               Company
//                             </span>
//                           </Link>
//                         </div>
//                         <div>
//                           <button
//                             aria-label="Close Menu"
//                             title="Close Menu"
//                             className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
//                             onClick={() => setIsMenuOpen(false)}
//                           >
//                             <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
//                               <path
//                                 fill="currentColor"
//                                 d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
//                               />
//                             </svg>
//                           </button>
//                         </div>
//                       </div>
//                       <nav>
//                         <ul className="space-y-4">
//                           <li>
//                             <Link
//                               href="/browse"
//                               aria-label="Our product"
//                               title="Our product"
//                               className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//                             >
//                               Product
//                             </Link>
//                           </li>
                       
//                           <li>
//                             <Link
//                               href="/about"
//                               aria-label="About us"
//                               title="About us"
//                               className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//                             >
//                               About us
//                             </Link>
//                           </li>
//                           {/* <li>
//                             <a
//                               href="/"
//                               aria-label="Sign in"
//                               title="Sign in"
//                               className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//                             >
//                               Sign in
//                             </a>
//                           </li>
//                           <li>
//                             <a
//                               href="/"
//                               className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
//                               aria-label="Sign up"
//                               title="Sign up"
//                             >
//                               Sign up
//                             </a>
//                           </li> */}
//                         </ul>
//                       </nav>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       };
// export default Navbar

'use client';
import React, { useEffect, useState } from 'react'

const Navbar = () => {

  const [isLoggedin, setIsLoggedin] = useState(false);

useEffect(() => {
  const token = localStorage.getItem('token');
  if(token) {
    setIsLoggedin(true);
  }
},[]);

const handleLogout =() => {
  localStorage.removeItem('token');
  setIsLoggedin(false);
};

  const handleLoginLogout =( ) => {
    setIsLoggedin(!isLoggedin);
  };

  const handleContact = (event) => {
    if(!isLoggedin) {
      //Show toast if not logged in
      toast.error('You need to log in first!');
      event.preventDefault();
    }
    
  };

  return (
    <div className='bg-white '>
      <nav className="bg-white border-yellow-200 ">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="#" className="h-8" alt="Logo" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        logo
      </span>
    </a>
    <button
      data-collapse-toggle="navbar-default"
      type="button"
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-yellow-500 rounded-lg md:hidden hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-200 dark:text-yellow-400 dark:hover:bg-yellow-700 dark:focus:ring-yellow-600"
      aria-controls="navbar-default"
      aria-expanded="false"
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" >
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-white ">
        <li>
          <a
            href="/"
            className="block py-2 px-3 text-white bg-yellow-950 rounded md:bg-transparent md:text-yellow-900 md:p-0 dark:text-black md:dark:text-yellow-800"
            aria-current="page"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/about"
            className="block py-2 px-3 text-yellow-900 rounded hover:bg-yellow-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-700 md:p-0 dark:text-black md:dark:hover:text-yellow-500 dark:hover:bg-yellow-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="/services"
            className="block py-2 px-3 text-yellow-900 rounded hover:bg-yellow-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-700 md:p-0 dark:text-black md:dark:hover:text-yellow-500 dark:hover:bg-yellow-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="book-listing"
            className="block py-2 px-3 text-yellow-900 rounded hover:bg-yellow-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-700 md:p-0 dark:text-black md:dark:hover:text-yellow-500 dark:hover:bg-yellow-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Books
          </a>
        </li>
        <li>
          <a
            href = {isLoggedin ? '/contact-page' : '/login-page'}
            className="block py-2 px-3 text-yellow-900 rounded hover:bg-yellow-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-700 md:p-0 dark:text-black md:dark:hover:text-yellow-500 dark:hover:bg-yellow-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Contact
          </a>
        </li>

        <div className='px-8 ml-12 flex items-center'>
        <li>
          <a
            href={isLoggedin ? "#" : "/login-page"}
            onClick={isLoggedin ? handleLogout : null} 
            className="block py-2 px-3 mx-4 text-2xl text-yellow-900 rounded hover:bg-yellow-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-700 md:p-0 dark:text-black md:dark:hover:text-yellow-500 dark:hover:bg-yellow-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            {isLoggedin ? "Logout" : "Login"}
          </a>
        </li>
        <li>
          <a
            href="/signup-page"
            className="block py-2 px-3 text-2xl text-yellow-900 rounded hover:bg-yellow-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-700 md:p-0 dark:text-black md:dark:hover:text-yellow-500 dark:hover:bg-yellow-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Signup
          </a>
        </li>
        </div>
      </ul>
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar
