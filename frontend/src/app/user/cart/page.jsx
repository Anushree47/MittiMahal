'use client';
import useCartContext from "@/context/CartContext";
import OrderSummaryModal from "@/components/OrderSummaryModal";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { cart, removeFromCart, updateCartItem } = useCartContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  const handleQuantityChange = (productId, newQty) => {
    if (newQty < 1) return;
    updateCartItem(productId, newQty);
    console.log(`🔄 Updated quantity of ${productId} to ${newQty}`);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
    console.log(`🗑️ Removed item ${productId} from cart`);
  };

  const handleCheckout = () => {
    setIsModalOpen(false);
    console.log("✅ Proceeding to checkout...");
    router.push("/user/address");
  };

  return (
    <div className="min-h-screen bg-[#F5EFE7] p-4 sm:p-8">
      <header className="text-white p-4 shadow-md bg-[#8B5E3B] rounded-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">Your Cart</h1>
      </header>

      <main className="container mx-auto mt-6">
        {cart.length === 0 ? (
          <div className="text-center mt-12">
            <h2 className="text-lg sm:text-xl">Your cart is empty</h2>
          </div>
        ) : (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full min-w-[500px] text-sm sm:text-base">
              <thead>
                <tr className="border-b bg-gray-100 text-left">
                  <th className="p-2">Product</th>
                  <th className="p-2 text-center">Qty</th>
                  <th className="p-2 text-center">Price</th>
                  <th className="p-2 text-center">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.productId._id} className="border-b">
                    <td className="p-2 flex items-center gap-3">
                      <img
                        src={
                          Array.isArray(item.productId.images)
                            ? item.productId.images[0]
                            : item.productId.images
                        }
                        alt={item.productId.title}
                        className="w-14 h-14 object-cover rounded"
                      />
                      <span>{item.productId.title}</span>
                    </td>
                    <td className="p-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="bg-gray-200 px-2 rounded text-lg"
                          onClick={() =>
                            handleQuantityChange(item.productId._id, item.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          className="bg-gray-200 px-2 rounded text-lg"
                          onClick={() =>
                            handleQuantityChange(item.productId._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-2 text-center font-semibold">
                      ₹{item.productId.price * item.quantity}
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleRemove(item.productId._id)}
                        className="text-red-500"
                      >
                        <IconTrash size={22} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-lg sm:text-xl font-bold">
                Total: ₹{totalAmount}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  console.log("🧾 Opening Order Summary");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                Review Order
              </button>
            </div>
          </div>
        )}
      </main>

      <OrderSummaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cartItems={cart.map((item) => ({
          name: item.productId.title,
          images: item.productId.images,
          price: item.productId.price,
          quantity: item.quantity,
        }))}
        totalAmount={totalAmount}
        onConfirm={handleCheckout}
      />
    </div>
  );
};

export default CartPage;
