// import useCartContext from '@/context/CartContext';
// import Link from 'next/link'
// import React, { useState } from 'react'
// import toast from 'react-hot-toast';

// const Card = ({ title, price, images, id }) => {
//   const [productData, setProductData] = useState(null);
    
//     const { addToCart } = useCartContext(); // Get the addToCart function from the CartContext
  
//     const handleAddToCart = () => {
//       if (productData) {
//         addToCart(productData); // Add product to cart context
//         toast.success(" added to cart!!!!!"); // Toast message
//       }
//     };


//   return (

//     <Link href={'http://localhost:3000/view-detail/' + id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">

//       {/* Product Image */}
//       {/* <a href="#"> */}
//       <img
//         className=" rounded-t-lg w-full h-80 object-cover"
//         src={images}
//         alt="product image"
//       />
//       {/* </a> */}

//       {/* Product Info */}
//       <div className="px-5 pb-5">

//         {/* Product Title */}
//         <Link href="/view-product/[id]" as={`/view-detail/${id}`}>
//           <h5 className="text-xl font-semibold text-center text-gray-900 dark:text-white mt-3">
//             {title}
//           </h5>
//         </Link>

//         {/* Product Rating */}
//         <div className="flex items-center justify-center mt-2 mb-4">
//           <div className="flex items-center space-x-1 rtl:space-x-reverse">
//             <svg
//               className="w-4 h-4 text-yellow-300"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="currentColor"
//               viewBox="0 0 22 20"
//             >
//               <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//             </svg>
//             <svg
//               className="w-4 h-4 text-yellow-300"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="currentColor"
//               viewBox="0 0 22 20"
//             >
//               <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//             </svg>
//             <svg
//               className="w-4 h-4 text-yellow-300"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="currentColor"
//               viewBox="0 0 22 20"
//             >
//               <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//             </svg>
//             <svg
//               className="w-4 h-4 text-yellow-300"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="currentColor"
//               viewBox="0 0 22 20"
//             >
//               <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//             </svg>
//             <svg
//               className="w-4 h-4 text-gray-200 dark:text-gray-600"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="currentColor"
//               viewBox="0 0 22 20"
//             >
//               <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//             </svg>
//           </div>
//           <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
//             5.0
//           </span>
//         </div>


//         <div className="flex items-center justify-between">

//           {/* Product Price */}
//           <span className="text-2xl font-bold text-gray-900 dark:text-black">
//             {price}
//           </span>

//           {/* Buy Now Button */}
//           <div className='w-full flex justify-center'>
//             <Link
//               href="/user/cart"
//               className="bg-yellow-900 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
//             >
//               Buy Now
//             </Link>
//           </div>
//         {/* Add to Cart Button */}
//         <div className='w-full flex justify-center'>
//               <button
//                 onClick={handleAddToCart} // Trigger add to cart on click
//                 className="border border-yellow-600 text-yellow-900 hover:bg-yellow-900 hover:text-white px-4 py-2 rounded-lg"
//               >
//                 Add to cart
//               </button>
//             </div>
//         </div>
//       </div>
//     </Link>
//   )
// }

// export default Card

//NEW CODE

import useCartContext from '@/context/CartContext';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Card = ({ title, price, images, id }) => {
  const { addToCart } = useCartContext(); // Get the addToCart function from the CartContext

  const handleAddToCart = () => {
    addToCart({ title, price, images, id }); // Pass product details
    toast.success(`${title} added to cart!`); // Toast message
  };

  return (
    <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 dark:bg-gray-800 dark:border-gray-700">
      {/* Product Image */}
      <Link href={`/view-detail/${id}`} className="block overflow-hidden">
        <img
          className="w-full h-80 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          src={images}
          alt={title}
        />
      </Link>

      {/* Product Info */}
      <div className="p-5">
        {/* Title */}
        <Link href={`/view-detail/${id}`}>
          <h5 className="text-xl font-semibold text-center text-gray-900 dark:text-white mt-3 transition-colors duration-200 hover:text-yellow-600">
            {title}
          </h5>
        </Link>

        {/* Rating */}
        <div className="flex items-center justify-center mt-2">
          <div className="flex items-center space-x-1">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg
                  key={index}
                  className="w-5 h-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
          </div>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-2">
            5.0
          </span>
        </div>

        {/* Price & Buttons */}
        <div className="flex flex-col items-center mt-4">
          {/* Price */}
          {/* <span className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ₹{price}
          </span> */}

          {/* Buttons */}
          <div className="flex space-x-3">
            <Link
              href="/user/cart"
              className="px-4 py-2 text-white bg-yellow-900 rounded-lg transition-all duration-300 hover:bg-yellow-500 shadow-md"
            >
              Buy Now
            </Link>
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 border border-yellow-600 text-yellow-900 rounded-lg transition-all duration-300 hover:bg-yellow-600 hover:text-white shadow-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
