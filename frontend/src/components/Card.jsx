import { useCartContext } from "@/context/CartContext";
import { useWishlistContext } from "@/context/WishlistContext";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const Card = ({ id, title, price, images }) => {
  const { cart, addToCart } = useCartContext();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistContext();

  const isInCart = cart.some((item) => item._id === id);
  const isInWishlist = wishlist.some((item) => item._id === id);

  return (
    <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      
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
    console.log("Adding Product to Cart:", id); // ✅ Debugging log
    addToCart({ 
      _id: id, // Ensure we use `_id`
      title,
      price,
      images,
      quantity: 1
    });
    toast.success("Added to Cart!");
  }}
  className="w-full border border-yellow-600 text-yellow-900 px-4 py-2 rounded"
>
  Add to Cart
</button>


          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
