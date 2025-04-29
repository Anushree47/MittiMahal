'use client';
import { useWishlistContext } from "@/context/WishlistContext";
import { useCartContext } from "@/context/CartContext";
import { IconTrash } from "@tabler/icons-react";
import Link from "next/link";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlistContext();
  const { addToCart } = useCartContext();

  return (
    <div className="min-h-screen bg-[#F5EFE7] p-8">
      <header className="text-white p-4 shadow-md bg-[#8B5E3B]">
        <h1 className="text-3xl font-bold text-center">Your Wishlist</h1>
      </header>

      <main className="container mx-auto mt-8">
        {wishlist.length === 0 ? (
          <div className="text-center">
            <h2>Your wishlist is empty</h2>
            <Link href="/browse" className="text-blue-600 hover:underline">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="p-2">Product</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Action</th>
                  <th className="p-2">Remove</th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map(item => (
                  <tr key={item._id} className="border-b">
                    <td className="p-2 flex items-center space-x-4">
                      <img src={item.images} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                      <span>{item.title}</span>
                    </td>
                    <td className="p-2">₹{item.price}</td>
                    <td className="p-2">
                      <button
                        onClick={() => {
                          addToCart(item);
                          removeFromWishlist(item._id);
                        }}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Add to Cart
                      </button>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => removeFromWishlist(item._id)}
                        className="text-red-500"
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
