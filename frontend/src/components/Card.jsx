'use client';
import { useCartContext } from "@/context/CartContext";
import { useWishlistContext } from "@/context/WishlistContext";
import { motion } from 'framer-motion';
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { IconHeart, IconShoppingCart } from "@tabler/icons-react"; // ✅ Fixed import
import { useBuyNowContext } from "@/context/BuyNowContext";
import axios from "axios";
import { useRouter } from "next/navigation";


const Card = ({ id, title, price, images }) => {

  const { addBuyNowItem } = useBuyNowContext(); // Use the context to add item for Buy Now
  const router = useRouter(); // Use Next.js router for navigation

  const handleBuyNow = async () => {
    const buyNowProduct = {
      _id: id,
      title,
      price,
      images,
      quantity: 1,
    };

    addBuyNowItem(buyNowProduct); // Add item to Buy Now context
    router.push("/user/address"); // Redirect to address page
  };

  const { cart, addToCart } = useCartContext();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistContext();

  const isInCart = cart.some((item) => item._id === id);
  const isInWishlist = wishlist.some((item) => item._id === id);

  return (
    <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">

      {/* Wishlist Button */}
      <button
        onClick={() => {
          if (isInWishlist) {
            removeFromWishlist(id);
            toast.success("Removed from Wishlist");
          } else {
            addToWishlist({ _id: id, title, price, images });
            toast.success("Added to Wishlist");
          }
        }}
        className="absolute top-3 right-3 text-2xl p-1"
      >
        {isInWishlist ? (
          <IconHeart className="text-red-500" fill="red" />
        ) : (
          <IconHeart className="text-gray-500 hover:text-red-500" />
        )}
      </button>

      {/* Product Image */}
      <Link href={`/view-detail/${id}`} className="block overflow-hidden">
        <img className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105" src={images} alt={title} />
      </Link>

      {/* Product Info */}
      <div className="p-5">
        <h5 className="text-xl font-semibold text-center text-gray-900 mt-3">{title}</h5>
        <p className="text-lg font-bold text-gray-900 text-center mt-2">₹{price}</p>

        {/* <div className="flex justify-between gap-3 mt-5">
          {isInCart ? (
            <Link
              href="/user/cart"
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded text-center text-sm hover:bg-green-600"
            >
              Go to Cart
            </Link>
          ) : (
            <button
              onClick={() => {
                addToCart({ _id: id, title, price, images, quantity: 1 });
                toast.success("Added to Cart!");
              }}
              className="flex-1 border border-yellow-600 text-yellow-900 hover:bg-yellow-600 hover:text-white px-4 py-2 rounded flex items-center justify-center gap-2 text-sm"
            >
              <IconShoppingCart size={18} /> Add to Cart
            </button>
          )}

          <button
            onClick={handleBuyNow}
            className="flex-1 bg-yellow-900 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm"
          >
            Buy Now
          </button>
        </div> */
        
        <div className="flex gap-4 mt-6">
          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (isInCart) {
                router.push('/user/cart');
              } else {
                addToCart({ _id: id, title, price, images, quantity: 1 });
                toast.success(`${title} added to cart!`);
              }
            }}
            className={`flex-1 px-6 py-3 font-semibold rounded-lg shadow-md transition-all ${isInCart ? "bg-green-600 text-white hover:bg-green-700" : "bg-yellow-900 text-white hover:bg-yellow-600"}`}
          >
            
            {isInCart ? "Go to Cart" : "Add to Cart"}
          </motion.button>

          {/* Buy Now Button */}
          <motion.button
            onClick={handleBuyNow}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-6 py-3 border border-yellow-600 text-yellow-900 font-semibold rounded-lg shadow-md hover:bg-yellow-900 hover:text-white transition-all"
          >
            Buy Now
          </motion.button>
        </div>}


      </div>
    </div>
  );
};

export default Card;
