// import {useCartContext} from "@/context/CartContext";
// import { useWishlistContext } from "@/context/WishlistContext";
// import Link from "next/link";
// import React from "react";
// import toast from "react-hot-toast";

// const Card = ({ id, title, price, images }) => {
//   const { cart, addToCart } = useCartContext(); // Get cart and addToCart function
//   const { wishlist, addToWishlist, removeFromWishlist } = useWishlistContext(); // Wishlist functions

//   // Check if product is already in cart
//   const isInCart = cart.some((item) => item.id === id);
//   const isInWishlist = wishlist.some((item) => item.id === id);

//   return (
//     <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-xl 
//     shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
//     {id}
//       {/* Product Image */}
//       <Link href={`/view-detail/${id}`} className="block overflow-hidden">
//         <img
//           className="w-full h-80 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
//           src={images}
//           alt={title}
//         />
//       </Link>

//       {/* Product Info */}
//       <div className="p-5">
//         {/* Title */}
//         <Link href={`/view-detail/${id}`}>
//           <h5 className="text-xl font-semibold text-center text-gray-900 mt-3 hover:text-yellow-600 transition-colors">
//             {title}
//           </h5>
//         </Link>

//         {/* Price */}
//         <p className="text-lg font-bold text-gray-900 text-center mt-2">₹{price}</p>

//         {/* Buttons */}
//         <div className="flex flex-col items-center mt-4 space-y-2">
//           {/* Wishlist Button */}
//           <button
//             onClick={() => {
//               isInWishlist ? removeFromWishlist(id) : addToWishlist({ id, title, price, images });
//               toast.success(isInWishlist ? "Removed from Wishlist" : "Added to Wishlist");
//             }}
//             className={`px-3 py-1 rounded text-white ${isInWishlist ? "bg-red-500" : "bg-gray-500"} hover:bg-red-600 transition-all`}
//           >
//             {isInWishlist ? "❤️ Wishlisted" : "♡ Add to Wishlist"}
//           </button>

//           {/* Add to Cart / Go to Cart Button */}
//           {isInCart ? (
//             <Link
//               href="/user/cart"
//               className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-center"
//             >
//               Go to Cart
//             </Link>
//           ) : (
//             <button
//               onClick={() => {
//                 addToCart({ id, title, price, images });
//                 toast.success("Added to Cart!");
//               }}
//               className="w-full border border-yellow-600 text-yellow-900 hover:bg-yellow-600 hover:text-white px-4 py-2 rounded"
//             >
//               Add to Cart
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;
import { useCartContext } from "@/context/CartContext";
import { useWishlistContext } from "@/context/WishlistContext";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const Card = ({ id, title, price, images }) => {
  const { cart, addToCart } = useCartContext(); // Get cart and addToCart function
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistContext(); // Wishlist functions

  // Check if product is already in cart
  const isInCart = cart.some((item) => item.id === id);
  const isInWishlist = wishlist.some((item) => item.id === id);

  return (
    <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-xl 
    shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      {/* Wishlist Heart Icon */}
      <button
        onClick={() => {
          isInWishlist ? removeFromWishlist(id) : addToWishlist({ id, title, price, images });
          toast.success(isInWishlist ? "Removed from Wishlist" : "Added to Wishlist");
        }}
        className="absolute top-3 right-3 text-2xl"
      >
        {isInWishlist ? "❤️" : "♡"}
      </button>
      
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
          <h5 className="text-xl font-semibold text-center text-gray-900 mt-3 hover:text-yellow-600 transition-colors">
            {title}
          </h5>
        </Link>

        {/* Price */}
        <p className="text-lg font-bold text-gray-900 text-center mt-2">₹{price}</p>

        {/* Buttons */}
        <div className="flex flex-col items-center mt-4 space-y-2">
          {/* Add to Cart / Go to Cart Button */}
          {isInCart ? (
            <Link
              href="/user/cart"
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-center"
            >
              Go to Cart
            </Link>
          ) : (
            <button
              onClick={() => {
                addToCart({ id, title, price, images });
                toast.success("Added to Cart!");
              }}
              className="w-full border border-yellow-600 text-yellow-900 hover:bg-yellow-600 hover:text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          )}
          
          {/* Buy Now Button */}
          <Link
            href="/"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-center"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
