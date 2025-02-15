'use client';
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item._id === product._id);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };
    
    const removeFromCart = (productToRemove) => {
        setCart(cart.filter((product) => product._id !== productToRemove._id));
    };

    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0));
    }, [cart]);
    
    return (
        <CartContext.Provider value={{ cart, total, addToCart, removeFromCart }}>
        {children}
        </CartContext.Provider>
    );
}

const useCartContext = () => useContext(CartContext);
export default useCartContext;