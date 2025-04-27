// 'use client';
// import { createContext, useContext, useState, useEffect } from "react";
// import { toast } from "react-hot-toast";

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState(() => {
//     if (typeof window !== "undefined") {
//       return JSON.parse(localStorage.getItem("wishlist")) || [];
//     }
//     return [];
//   });

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("wishlist", JSON.stringify(wishlist));
//     }
//   }, [wishlist]);

//   const addToWishlist = (product) => {
//     setWishlist((prev) => {
//       // Check if product is already in wishlist
//       if (prev.find((item) => item._id === product._id)) {
//         toast.error("Item is already in the wishlist.");
//         return prev;
//       }
//       // Add product to wishlist and show success toast
//       toast.success(`${product.title} added to the wishlist!`);
//       return [...prev, product];
//     });
//   };

//   const removeFromWishlist = (id) => {
//     setWishlist((prev) => {
//       // Remove product from wishlist and show success toast
//       const updatedWishlist = prev.filter((item) => item._id !== id);
//       toast.success("Item removed from the wishlist!");
//       return updatedWishlist;
//     });
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlistContext = () => useContext(WishlistContext);
// export default useWishlistContext;

// 'use client';
// import { createContext, useContext, useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import axiosInstance from '@/utils/axiosInstance';
// import useAppContext from "@/context/AppContext";

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const { user } = useAppContext();
//   const [wishlist, setWishlist] = useState([]);

//   // Fetch wishlist from backend
//   const fetchWishlist = async () => {
//     try {
//       const res = await axiosInstance.get(`/wishlist/${user._id}`);
//       const data = res.data.map(item => item.productId); // Extract product info
//       setWishlist(data);
//     } catch (err) {
//       console.error("Error fetching wishlist:", err);
//     }
//   };

//   // Save entire wishlist to backend
//   const saveWishlist = async (updatedWishlist) => {
//     await axiosInstance.post("/wishlist/update", {
//       userId: user._id,
//       wishlist: updatedWishlist,
//     });
//   };

//   useEffect(() => {
//     if (user) fetchWishlist();
//   }, [user]);

//   const addToWishlist = async (product) => {
//     if (wishlist.find(item => item._id === product._id)) {
//       toast.error("Already in wishlist");
//       return;
//     }
//     const updatedWishlist = [...wishlist, product];
//     setWishlist(updatedWishlist);
//     saveWishlist(updatedWishlist);
//     toast.success(`${product.title} added to wishlist`);
//   };

//   const removeFromWishlist = async (productId) => {
//     const updatedWishlist = wishlist.filter(item => item._id !== productId);
//     setWishlist(updatedWishlist);
//     saveWishlist(updatedWishlist);
//     toast.success("Removed from wishlist");
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlistContext = () => useContext(WishlistContext);
// export default useWishlistContext;
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
