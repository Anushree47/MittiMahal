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

    // ✅ Fixed: Ensure `_id` is used properly
    // const addToCart = (product) => {
    //     if (!product || !product._id) {
    //         console.error("❌ ERROR: Invalid product data in addToCart:", product);
    //         return;
    //     }

    //     console.log("✅ Clicked Product ID:", product._id);

    //     setCart((prevCart) => {
    //         const existingIndex = prevCart.findIndex((item) => item._id === product._id);

    //         if (existingIndex !== -1) {
    //             prevCart[existingIndex] = {
    //                 ...prevCart[existingIndex],
    //                 quantity: prevCart[existingIndex].quantity + 1,
    //             };
    //         } else {
    //             prevCart.push({ ...product, quantity: 1 });
    //         }

    //         console.log("🛒 Updated Cart:", prevCart);
    //         return [...prevCart];
    //     });
    // };
    const addToCart = (product) => {
        if (!product || !product._id) {
            console.error("❌ ERROR: Product ID is missing!", product);
            return;
        }
    
        console.log("✅ Clicked Product ID:", product._id);
    
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            const existingIndex = updatedCart.findIndex((item) => item._id === product._id);
    
            if (existingIndex !== -1) {
                updatedCart[existingIndex] = {
                    ...updatedCart[existingIndex],
                    quantity: updatedCart[existingIndex].quantity + 1,
                };
            } else {
                updatedCart.push({ ...product, quantity: 1 });
            }
    
            console.log("🛒 Updated Cart:", updatedCart);
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

export const useCartContext = () => useContext(CartContext);
export default useCartContext;
