'use client';
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from '@/utils/axiosInstance';
import useAppContext from "@/context/AppContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAppContext();
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const res = await axiosInstance.get(`/wishlist/${user._id}`);
      const data = res.data.map(item => item.productId); // Extract product info
      setWishlist(data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  const saveWishlist = async (updatedWishlist) => {
    await axiosInstance.post("/wishlist/update", {
      userId: user._id,
      wishlist: updatedWishlist,
    });
  };

  useEffect(() => {
    if (user) fetchWishlist();
  }, [user]);

  const addToWishlist = async (product) => {
    if (wishlist.find(item => item._id === product._id)) {
      toast.error("Already in wishlist");
      console.log(`❌ ${new Date().toLocaleString()} - ${user.name} tried to add duplicate "${product.title}" to wishlist.`);
      return;
    }

    const updatedWishlist = [...wishlist, product];
    setWishlist(updatedWishlist);
    saveWishlist(updatedWishlist);
    toast.success(`${product.title} added to wishlist`);

    console.log(`✅ ${new Date().toLocaleString()} - ${user.name} added "${product.title}" to wishlist.`);
  };

  const removeFromWishlist = async (productId) => {
    const removedItem = wishlist.find(item => item._id === productId);
    const updatedWishlist = wishlist.filter(item => item._id !== productId);
    setWishlist(updatedWishlist);
    saveWishlist(updatedWishlist);
    toast.success("Removed from wishlist");

    if (removedItem) {
      console.log(`🗑️ ${new Date().toLocaleString()} - ${user.name} removed "${removedItem.title}" from wishlist.`);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => useContext(WishlistContext);
export default useWishlistContext;
