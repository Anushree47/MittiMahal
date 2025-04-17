// 'use client'
// import { createContext, useContext, useState, useEffect } from "react";

// // Create Wishlist Context
// const WishlistContext = createContext();

// // Wishlist Provider
// export const WishlistProvider = ({ children }) => {
//   // Load wishlist from localStorage
//   const [wishlist, setWishlist] = useState(() => {
//     if (typeof window !== "undefined") {
//       return JSON.parse(localStorage.getItem("wishlist")) || [];
//     }
//     return [];
//   });

//   // Save wishlist to localStorage whenever it changes
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("wishlist", JSON.stringify(wishlist));
//     }
//   }, [wishlist]);

//   // Add to Wishlist
//   const addToWishlist = (product) => {
//     setWishlist((prevWishlist) => {
//       if (prevWishlist.find((item) => item.id === product.id)) return prevWishlist;
//       return [...prevWishlist, product];
//     });
//   };

//   // Remove from Wishlist
//   const removeFromWishlist = (id) => {
//     setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// // Custom Hook to use Wishlist Context
// export const useWishlistContext = () => useContext(WishlistContext);
// export default useWishlistContext;

'use client';
import { createContext, useContext, useState, useEffect } from "react";

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
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => useContext(WishlistContext);
export default useWishlistContext;
