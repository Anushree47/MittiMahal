'use client';
import { useWishlistContext } from "@/context/WishlistContext";
import { useCartContext } from "@/context/CartContext";
import Image from "next/image";
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
                          //toast.success(`${item.title} removed from wishlist!`);
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
