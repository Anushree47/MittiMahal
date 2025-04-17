'use client';
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      // Check if product is already in wishlist
      if (prev.find((item) => item._id === product._id)) {
        toast.error("Item is already in the wishlist.");
        return prev;
      }
      // Add product to wishlist and show success toast
      toast.success(`${product.title} added to the wishlist!`);
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => {
      // Remove product from wishlist and show success toast
      const updatedWishlist = prev.filter((item) => item._id !== id);
      toast.success("Item removed from the wishlist!");
      return updatedWishlist;
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => useContext(WishlistContext);
export default useWishlistContext;
