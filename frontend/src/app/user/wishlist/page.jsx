'use client';
import { useWishlistContext } from "@/context/WishlistContext";
import { useCartContext } from "@/context/CartContext";
import { IconTrash } from "@tabler/icons-react";
import { toast } from "react-hot-toast";
import Link from "next/link";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlistContext();
  const { addToCart } = useCartContext();

  return (
    <div className="min-h-screen bg-[#F5EFE7] p-8">
      <header className="text-white p-4 shadow-md bg-[#8B5E3B]">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold">Your Wishlist</h1>
        </div>
      </header>

      <main className="container mx-auto mt-8">
        {wishlist.length === 0 ? (
          <div className="text-center text-gray-700">
            <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
            <Link href="/browse" className="mt-4 inline-block text-blue-600 hover:underline">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-100 text-left">
                  <th className="p-2">Product</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Stock Status</th>
                  <th className="p-2">Action</th>
                  <th className="p-2">Remove</th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="p-2 flex items-center space-x-4">
                      <img src={item.images} alt={item.title} className="w-16 h-16 object-cover rounded-md border" />
                      <span className="text-lg">{item.title}</span>
                    </td>
                    <td className="p-2 text-lg">₹{item.price}</td>
                    <td className="p-2">
                      <span className="inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                        In Stock
                      </span>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => {
                          addToCart(item);
                          removeFromWishlist(item._id);
                          
                        }}
                        className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
                      >
                        Add to Cart
                      </button>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => {
                          removeFromWishlist(item._id);
                          toast.success(`${item.title} removed from wishlist!`);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <IconTrash size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 text-right">
              <Link href="/browse" className="text-blue-600 hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default WishlistPage;







// 'use client';
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useCartContext } from "@/context/CartContext";

// const WishlistPage = ({ userId }) => {
//   const [wishlist, setWishlist] = useState([]);
//   const { addToCart } = useCartContext();

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/get/wishlist/${userId}`);
//         setWishlist(res.data);
//       } catch (err) {
//         console.error("Error fetching wishlist:", err);
//       }
//     };
//     if (userId) fetchWishlist();
//   }, [userId]);

//   const handleRemove = async (productId) => {
//     try {
//       await axios.delete("http://localhost:5000/remove/wishlist", {
//         data: { userId, productId },
//       });
//       setWishlist((prev) => prev.filter((item) => item.productId._id !== productId));
//     } catch (err) {
//       console.error("Error removing from wishlist:", err);
//     }
//   };

//   const handleAddToWishlist = async (productId) => {
//     try {
//       const res = await axios.post("http://localhost:5000/add/wishlist", {
//         userId,
//         productId,
//       });
//       console.log("Added to wishlist:", res.data);
//     } catch (err) {
//       console.error("Error adding to wishlist:", err);
//     }
//   };

//   const handleAddToCart = (product) => {
//     addToCart(product);
//     console.log("Added to cart:", product);
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6">Your Favorite Items</h2>
//       <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
//         <table className="min-w-full divide-y divide-gray-200 text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-3 text-left font-medium text-gray-700">Product</th>
//               <th className="px-6 py-3 text-left font-medium text-gray-700">Price</th>
//               <th className="px-6 py-3 text-left font-medium text-gray-700">Stock</th>
//               <th className="px-6 py-3 text-left font-medium text-gray-700">Action</th>
//               <th className="px-6 py-3 text-left font-medium text-gray-700">Remove</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {wishlist.map(({ productId }) => (
//               <tr key={productId._id}>
//                 <td className="px-6 py-4 flex items-center gap-4">
//                   <img
//                     src={productId.image}
//                     alt={productId.name}
//                     className="h-12 w-12 rounded object-cover"
//                   />
//                   <div>
//                     <p className="font-semibold">{productId.name}</p>
//                     <p className="text-gray-500 text-xs">{productId.description}</p>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">₹{productId.price}</td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                       productId.stock > 0
//                         ? "bg-green-100 text-green-700"
//                         : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {productId.stock > 0 ? "In Stock" : "Out of Stock"}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <button
//                     onClick={() => handleAddToCart(productId)}
//                     className="rounded bg-blue-600 px-4 py-1 text-white hover:bg-blue-700"
//                   >
//                     Add to Cart
//                   </button>
//                 </td>
//                 <td className="px-6 py-4">
//                   <button onClick={() => handleRemove(productId._id)}>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 text-red-600 hover:text-red-800"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {wishlist.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
//                   Your wishlist is empty.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default WishlistPage;
