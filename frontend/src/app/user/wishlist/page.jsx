"use client";
import { useWishlistContext} from "@/context/WishlistContext";
import { useCartContext } from "@/context/CartContext";
import Image from "next/image";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlistContext();
  const { addToCart } = useCartContext();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((item) => (
            <div key={item.id} className="border rounded-lg shadow p-4">
              <Image src={item.image} alt={item.name} width={200} height={200} className="rounded" />
              <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
              <p className="text-gray-700">₹{item.price}</p>
              
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    addToCart(item);
                    removeFromWishlist(item.id);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
