'use client';
import { use, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useCartContext from "@/context/CartContext";
import axiosInstance from "@/utils/axiosInstance";
import { useBuyNowContext } from "@/context/BuyNowContext";
import PaymentButton from "@/components/PaymentButton";

const OrderConfirmation = () => {
  const searchParams = useSearchParams();
  const addressId = searchParams.get("addressId");
  const { cart, total, clearCart } = useCartContext();
  const router = useRouter();

  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GST_RATE = 0.18;
  const DELIVERY_CHARGE = 50;

  const { buyNowItems, totalAmount } = useBuyNowContext(); // Get the buy now item from context

  useEffect(() => {
    console.log("buy Now item : ", buyNowItems);
  }, [buyNowItems]); // Log the buy now item whenever it changes

  useEffect(() => {
    if (!addressId) {
      setError("Invalid address selected.");
      setLoading(false);
      return;
    }
    fetchAddressDetails();
  }, [addressId]);

  const fetchAddressDetails = async () => {
    try {
      const res = await axiosInstance.get('/address/selected');
      if (!res.data) {
        throw new Error("No selected address found");
      }
      setAddress(res.data);
    } catch (error) {
      console.error("Error fetching selected address:", error);
      setError("Failed to fetch address");
    } finally {
      setLoading(false);
    }
  };

  const isBuyNow = buyNowItems.length > 0; // Check if there are items in the buy now context
  const cartTotal = isBuyNow ? totalAmount : total;
  const gstAmount = cartTotal * GST_RATE ;
  const finalAmount = cartTotal + gstAmount + DELIVERY_CHARGE ;

  const handleConfirmOrder = async (paymentId) => {
    if (!address || (cart.length === 0 && buyNowItems.length === 0)) {
      setError("Cannot place order. Missing address or empty cart.");
      return;
    }

    const orderItems = isBuyNow 
      ? buyNowItems.map(item => ({
          id  : item._id,
          name : item.title || item.name,
          price: item.price,
          quantity : item.quantity,
      }))
      : cart.map(item => ({
          id: item._id,
          name: item.title || item.name,
          price: item.price,
          quantity: item.quantity,
      }));


    const orderData = {
      address,
      // items: cart.map(item => ({
      //   id: item._id,
      //   name: item.title || item.name,
      //   price: item.price,
      //   quantity: item.quantity,
      // })),
      items: orderItems,
      totalAmount: finalAmount,
      gstAmount,
      deliveryCharge: DELIVERY_CHARGE,
      deliveryStatus: "Processing",
      paymentId,  //Optional: store payment ID if needed
    };

    console.log("🟢 Order Data being sent:", orderData);

    try {
      const response = await axiosInstance.post("/order/add", orderData);
      console.log("✅ Order placed successfully:", response.data);


      if (!isBuyNow) {
        clearCart(); // Clear the cart only if not a buy now order
      } 
      
      router.push("/user/landingPage");
    } catch (error) {
      console.error("🔴 Error placing order:", error.response?.data || error.message);
      setError("Failed to place order.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Order Confirmation</h1>

      {loading ? (
        <p>Loading order details...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : address ? (
        <div className="border p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold">Delivery Address</h2>
          <p>{address.addressLine1}, {address.addressLine2}</p>
          <p>{address.city}, {address.state}, {address.postalCode}, {address.country}</p>

          <h2 className="text-lg font-semibold mt-4">Order Summary</h2>

          {/* <p><strong>Cart Total:</strong> ₹{total?.toFixed(2)}</p> */}

          {isBuyNow ? (
            <p><strong>Product Price:</strong> ₹{totalAmount?.toFixed(2)}</p>
          ) : (
            <p><strong>Cart Total:</strong> ₹{total?.toFixed(2)}</p>
        )}
          <p><strong>GST (18%):</strong> ₹{gstAmount?.toFixed(2)}</p>
          <p><strong>Delivery Charges:</strong> ₹{DELIVERY_CHARGE.toFixed(2)}</p>
          <hr className="my-2" />
          <p className="text-xl font-bold">Total Payable: ₹{finalAmount?.toFixed(2)}</p>

          {/* <button
            className="bg-green-600 text-white px-6 py-2 mt-4 rounded w-full"
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </button> */}

          {/* New payment button */}
          <PaymentButton
          price={finalAmount}
          onSuccess={handleConfirmOrder}
          />
        </div>
      ) : (
        <p>No delivery address found.</p>
      )}
    </div>
  );
};

export default OrderConfirmation;
