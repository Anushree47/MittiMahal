'use client';
import { useCartContext } from "@/context/CartContext";
import { useWishlistContext } from "@/context/WishlistContext";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { IconHeart, IconShoppingCart } from "@tabler/icons-react"; // ✅ Fixed import
import axios from "axios";

const Card = ({ id, title, price, images }) => {

  const handleBuyNow = async () => {
    try {
      
      const { data } = await axios.post("http://localhost:5000/payment/create-order", { amount: price });
      console.log("Frontend Razorpay Key:", process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);


      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Mitti Mahal",
        description: "Test Transaction",
        order_id: data.id,
        handler: (response) => {
          toast.success("Payment successful! ID: " + response.razorpay_payment_id);
          console.log(response);
        },
        prefill: {
          name: "test user",
          email: "text@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc"
        },
      };

      console.log("Key used:", options.key); // <- should not be undefined

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error("Error in payment process:", error);
      toast.error("Payment failed. Please try again.");
    }
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

        <div className="flex flex-col items-center mt-4 space-y-2">
          {isInCart ? (
            <Link href="/user/cart" className="w-full bg-green-500 text-white px-4 py-2 rounded text-center">
              Go to Cart
            </Link>
          ) : (
            <button
              onClick={() => {
                addToCart({ _id: id, title, price, images, quantity: 1 });
                toast.success("Added to Cart!");
              }}
              className="w-full border border-yellow-600 text-yellow-900 hover:bg-yellow-600 hover:text-white px-4 py-2 rounded flex items-center justify-center gap-2"
            >
              <IconShoppingCart size={18} /> Add to Cart
            </button>
          )}

          <button
            onClick={handleBuyNow}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-center"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
