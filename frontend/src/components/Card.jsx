// import { useCartContext } from "@/context/CartContext";
// import { useWishlistContext } from "@/context/WishlistContext";
// import Link from "next/link";
// import React from "react";
// import toast from "react-hot-toast";

// const Card = ({ id, title, price, images }) => {
//   const { cart, addToCart } = useCartContext();
//   const { wishlist, addToWishlist, removeFromWishlist } = useWishlistContext();

//   const isInCart = cart.some((item) => item._id === id);
//   const isInWishlist = wishlist.some((item) => item._id === id);

//   return (
//     <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      
//       {/* Product Image */}
//       <Link href={`/view-detail/${id}`} className="block overflow-hidden">
//         <img className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105" src={images} alt={title} />
//       </Link>

//       {/* Product Info */}
//       <div className="p-5">
//         <h5 className="text-xl font-semibold text-center text-gray-900 mt-3">{title}</h5>
//         <p className="text-lg font-bold text-gray-900 text-center mt-2">₹{price}</p>

//         <div className="flex flex-col items-center mt-4 space-y-2">
//           {isInCart ? (
//             <Link href="/user/cart" className="w-full bg-green-500 text-white px-4 py-2 rounded text-center">
//               Go to Cart
//             </Link>
//           ) : (
//             <button
//   onClick={() => {
//     console.log("Adding Product to Cart:", id); // ✅ Debugging log
//     addToCart({ 
//       _id: id, // Ensure we use `_id`
//       title,
//       price,
//       images,
//       quantity: 1
//     });
//     toast.success("Added to Cart!");
//   }}
//   className="w-full border border-yellow-600 text-yellow-900 px-4 py-2 rounded"
// >
//   Add to Cart
// </button>


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
import { Heart, ShoppingCart } from "@tabler/icons-react"; // Icons

const Card = ({ id, title, price, images }) => {

  const handleBuyNow = async () => {
    try {
      //Step1 : create order from backend
      const { data } = await axios.post("http://localhost:5000/payment/create-order", { amount: price });

      //Step2 : Initialize Razorpay payment
      const options = {
        key: process.env.RAZORPAY_KEY_ID, // Your Razorpay key ID
        amount: data.amount, // Amount in paise (₹1 = 100 paise)
        currency: data.currency,  // Currency code
        name: "Mitti Mahal", // Your company name
        description: "Test Transaction", // Description of the transaction      
        order_id: data.id, // Order ID created in Step 1
        handler: (response) => {
          toast.success("payment successfully done" + response.razorpay_payment_id);
          console.log(response);
        },
        prefill: {
          name: "test user", // User's name
          email: "text@example.com",
          contact: "9999999999", // User's contact number
        },
        theme: {
          color: "#3399cc" // Theme color for Razorpay checkout);
        },

      };
      const razorpay = new window.Razorpay(options);
      razorpay.open(); // Open Razorpay checkout

    } catch (error) {
      console.error("Error in payment process:", error); // Log any errors
      toast.error("Payment failed. Please try again."); // Show error message
    }
  }




  const { cart, addToCart } = useCartContext();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistContext();

  const isInCart = cart.some((item) => item._id === id);
  const isInWishlist = wishlist.some((item) => item._id === id);

  return (
    <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      
      {/* Wishlist Button (Heart Icon) */}
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
          <Heart className="text-red-500" fill="red" />
        ) : (
          <Heart className="text-gray-500 hover:text-red-500" />
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
          {/* Add to Cart / Go to Cart Button */}
          {isInCart ? (
            <Link href="/user/cart" className="w-full bg-green-500 text-white px-4 py-2 rounded text-center">
              Go to Cart
            </Link>
          ) : (
            <button
              onClick={() => {
                console.log("Adding Product to Cart:", id);
                addToCart({ _id: id, title, price, images, quantity: 1 });
                toast.success("Added to Cart!");
              }}
              className="w-full border border-yellow-600 text-yellow-900 hover:bg-yellow-600 hover:text-white px-4 py-2 rounded flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
          )}

          {/* Buy Now Button */}
          <button
            onClick={handleBuyNow}
            href="/checkout"
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
