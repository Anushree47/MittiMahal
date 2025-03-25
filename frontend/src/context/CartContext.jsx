//'use client';
// import { createContext, useContext, useEffect, useState } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//     const [cart, setCart] = useState([]);
//     const [total, setTotal] = useState(0);

//     // Load cart from localStorage on mount
//     useEffect(() => {
//         const storedCart = localStorage.getItem("cart");
//         if (storedCart) {
//             setCart(JSON.parse(storedCart));
//         }
//     }, []);

//     // Save cart to localStorage whenever it changes
//     useEffect(() => {
//         localStorage.setItem("cart", JSON.stringify(cart));
//         setTotal(cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0));
//     }, [cart]);

//     // Add or update product in cart
//     const addToCart = (product) => {
//         setCart((prevCart) => {
//             const existingProduct = prevCart.find((item) => item._id === product._id);
//             console.log(existingProduct);
            
//             if (existingProduct) {
//                 return prevCart.map((item) =>
//                     item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
//                 );
//             } else {
//                 return [...prevCart, { ...product, quantity: 1 }];
//             }
//         });
//     };

//     // Update quantity of a product in cart
//     const updateQuantity = (productId, quantity) => {
//         setCart((prevCart) =>
//             prevCart.map((item) =>
//                 item._id === productId ? { ...item, quantity: quantity } : item
//             )
//         );
//     };

//     // Remove product completely from cart
//     const removeFromCart = (productToRemove) => {
//         setCart(cart.filter((product) => product._id !== productToRemove._id));
//     };

//     // Clear cart
//     const clearCart = () => {
//         setCart([]);
//         localStorage.removeItem("cart");
//     };

//     return (
//         <CartContext.Provider value={{ cart,total, addToCart, updateQuantity, removeFromCart, clearCart }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// // Custom Hook to use Cart Context
// export const useCartContext = () => useContext(CartContext);
// export default useCartContext;

"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    // Load cart from localStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        setTotal(cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0));
    }, [cart]);

    // ✅ FIXED: Add or update product in cart correctly
    const addToCart = (product) => {
        setCart((prevCart) => {
            // Ensure we're getting the correct product ID
            console.log("Clicked Product ID:", product._id);

            // Clone the previous cart to avoid direct mutation
            const updatedCart = [...prevCart];

            // Find the product index correctly
            const existingIndex = updatedCart.findIndex((item) => item._id === product._id);

            if (existingIndex !== -1) {
                // If product exists, update the quantity properly
                updatedCart[existingIndex] = {
                    ...updatedCart[existingIndex],
                    quantity: updatedCart[existingIndex].quantity + 1,
                };
            } else {
                // If new product, add it correctly
                updatedCart.push({ ...product, quantity: 1 });
            }

            console.log("Updated Cart:", updatedCart);
            return updatedCart;
        });
    };

    // Update quantity of a product in cart
    const updateQuantity = (productId, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === productId ? { ...item, quantity: quantity } : item
            )
        );
    };

    // Remove product completely from cart
    const removeFromCart = (productToRemove) => {
        setCart(cart.filter((product) => product._id !== productToRemove._id));
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    return (
        <CartContext.Provider value={{ cart, total, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom Hook to use Cart Context
export const useCartContext = () => useContext(CartContext);
export default useCartContext;
