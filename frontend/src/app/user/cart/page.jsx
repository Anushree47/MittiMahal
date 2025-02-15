"use client";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import CartItem from "@/components/CartItem";

const CartPage = () => {
    const { cart, totalAmount, totalQuantity } = useContext(CartContext);

    return (
        <div className="container mx-auto py-10 px-6">
            <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
            <div className="bg-white p-6 shadow-md rounded-lg">
                {cart.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                    <>
                        {cart.map((item) => <CartItem key={item.productId} item={item} />)}
                        <div className="mt-6">
                            <p className="text-xl font-semibold">Total Items: {totalQuantity}</p>
                            <p className="text-xl font-semibold">Total Amount: ₹{totalAmount}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartPage;