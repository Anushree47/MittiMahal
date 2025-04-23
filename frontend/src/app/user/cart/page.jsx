"use client";
import useCartContext from "@/context/CartContext";
import { IconTrash, IconShoppingCart, IconPlus, IconMinus } from "@tabler/icons-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import OrderSummaryModal from "@/components/OrderSummaryModal";
import { useState, useContext, useEffect } from "react";
import AppContext from "@/context/AppContext";

const Cart = () => {
  const { cart, total, updateQuantity, removeFromCart } = useCartContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, token, logout } = useContext(AppContext);

  useEffect(() => {
    if (!token) {
      logout();
    }
  }, [token]);

  const handleProceed = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    window.location.href = "/user/address";
  };

  return (
    <div className="min-h-screen bg-[#F5EFE7] p-8">
      <header className="text-white p-4 shadow-md bg-[#8B5E3B]">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold">Your Cart</h1>
        </div>
      </header>

      <main className="container mx-auto mt-8">
        {cart.length === 0 ? (
          <div className="text-center text-gray-700">
            <IconShoppingCart size={80} className="mx-auto text-gray-500" />
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <Link href="/browse" className="mt-4 inline-block text-blue-600 hover:underline">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-100 text-left">
                  <th className="p-2">Product</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={item._id || index} className="border-b">
                    <td className="p-2 flex items-center space-x-4">
                      <img src={item.images} alt={item.title} className="w-16 h-16 object-cover rounded-md border" />
                      <span className="text-lg">{item.title}</span>
                    </td>
                    <td className="p-2 text-lg">₹{item.price}</td>
                    <td className="p-2 text-lg flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                        className="p-2 bg-gray-200 rounded"
                      >
                        <IconMinus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="p-2 bg-gray-200 rounded"
                      >
                        <IconPlus size={16} />
                      </button>
                    </td>
                    <td className="p-2 text-lg font-semibold">₹{item.price * item.quantity}</td>
                    <td className="p-2">
                      <button
                        onClick={() => {
                          removeFromCart(item);
                          toast.success(`${item.title} removed from cart!`);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <IconTrash size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 text-right">
              <h2 className="text-xl font-semibold">Total: ₹{total}</h2>
            </div>

            <div className="mt-6 flex justify-between">
              <Link href="/browse" className="text-blue-600 hover:underline">
                Continue Shopping
              </Link>
              <button
                onClick={handleProceed}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>

      <OrderSummaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cartItems={cart}
        totalAmount={total}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default Cart;
