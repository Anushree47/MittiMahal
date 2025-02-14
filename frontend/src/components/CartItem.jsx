import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

const CartItem = ({ item }) => {
    const { removeFromCart } = useContext(CartContext);
    const userId = "USER_ID"; // Replace with actual user ID

    return (
        <div className="flex items-center justify-between border-b py-4">
            <img src={item.productId.image} alt={item.productId.name} className="w-20 h-20 object-cover" />
            <div>
                <h3 className="text-lg font-semibold">{item.productId.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <button onClick={() => removeFromCart(item._id, userId)} className="text-red-500">Remove</button>
        </div>
    );
};

export default CartItem;