

'use client';
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useCartContext from "@/context/CartContext";
import axiosInstance from "@/utils/axiosInstance";
import { useBuyNowContext } from "@/context/BuyNowContext";
import PaymentButton from "@/components/PaymentButton";
import Spinner from "@/components/Spinner";
import { useAppContext } from "@/context/AppContext";

const OrderConfirmation = () => {
    const searchParams = useSearchParams();
    const addressId = searchParams.get("addressId");
    const { cart, total, clearCart } = useCartContext();
    const { buyNowItems, totalAmount } = useBuyNowContext();
    const { user } = useAppContext();
    const router = useRouter();

    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderItems, setOrderItems] = useState([]);

    const GST_RATE = 0.18;
    const DELIVERY_CHARGE = 50;

    const isBuyNow = buyNowItems.length > 0;
    const cartTotal = isBuyNow ? totalAmount : total;
    // const validatedTotal = cartTotal ? 0 : cartTotal;
    const validatedTotal = orderItems.reduce((sum, item) => {
        const itemTotal = (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1);
        return sum + itemTotal;
    }, 0);

    const gstAmount = validatedTotal * GST_RATE;
    const finalAmount = validatedTotal + gstAmount + DELIVERY_CHARGE;

    // Prepare items
    useEffect(() => {
        const items = (isBuyNow ? buyNowItems : cart).map((item) => {
            const product = item.product || item;
            const price = parseFloat(item.price) || 0; // Ensure price is a valid number
            const quantity = Number(item.quantity) || 1; // Ensure quantity is at least 1

            if (isNaN(price)) {
                console.error(`Invalid price for product: ${item.title || "Unnamed Product"}`);
                return null; // Skip invalid items
            }

            const fixedItem = {
                id: item._id || product._id,
                name: item.productId.title,
                price: item.productId.price,
                quantity: quantity,
            };

            console.log(`🛍️ Product: ${fixedItem.name}`);
            console.log(`   Price: ₹${fixedItem.price}`);
            console.log(`   Quantity: ${fixedItem.quantity}`);
            console.log(`   Total: ₹${(fixedItem.price * fixedItem.quantity).toFixed(2)}`);

            return fixedItem;
        }).filter(item => item !== null); // Remove invalid items

        setOrderItems(items); // ✅ This line is crucial
    }, [buyNowItems, cart, isBuyNow]);

    // Fetch address
    useEffect(() => {
        if (!addressId) {
            setError("Invalid address selected.");
            setLoading(false);
            return;
        }

        const fetchAddress = async () => {
            try {
                const res = await axiosInstance.get('/address/selected');
                if (!res.data) throw new Error("No selected address found");
                setAddress(res.data);
            } catch (err) {
                console.error("❌ Error fetching address:", err);
                setError("Failed to fetch address");
            } finally {
                setLoading(false);
            }
        };

        fetchAddress();
    }, [addressId]);

    const handleConfirmOrder = async (paymentId) => {
        if (!address || orderItems.length === 0) {
            setError("Cannot place order. Missing address or empty cart.");
            return;
        }

        const orderData = {
            user: {
                name: user?.name || "Unknown User",
                email: user?.email || "No Email",
                phone: user?.phone || "No Phone",
            },
            address,
            items: orderItems,
            totalAmount: finalAmount,
            gstAmount,
            deliveryCharge: DELIVERY_CHARGE,
            deliveryStatus: "Processing",
            paymentId,
        };

        console.log("🟢 Order Data being sent:", orderData);

        try {
            const res = await axiosInstance.post("/order/add", orderData);
            console.log("✅ Order placed successfully:", res.data);
            if (!isBuyNow) clearCart();
            router.push("/user/landingPage");
        } catch (err) {
            console.error("🔴 Error placing order:", err.response?.data || err.message);
            setError("Failed to place order.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Order Confirmation</h1>

            {loading ? (
                <Spinner />
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <>
                    <div className="border p-4 rounded shadow-md mb-6">
                        <h2 className="text-lg font-semibold">Delivery Address</h2>
                        <p>{address.addressLine1}, {address.addressLine2}</p>
                        <p>{address.city}, {address.state}, {address.postalCode}, {address.country}</p>

                        <h2 className="text-lg font-semibold mt-4">User Details</h2>
                        <p><strong>Name:</strong> {user?.name}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Phone:</strong> {user?.phone}</p>
                    </div>

                    <div className="border p-4 rounded shadow-md">
                        <h2 className="text-lg font-semibold mb-3">Order Summary</h2>

                        <table className="w-full table-auto text-sm border mb-4">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-2 py-1">Product</th>
                                    <th className="border px-2 py-1">Price</th>
                                    <th className="border px-2 py-1">Quantity</th>
                                    <th className="border px-2 py-1">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((item) => (
                                    <tr key={item.id}>
                                        <td className="border px-2 py-1">{item.name}</td>
                                        <td className="border px-2 py-1">₹{item.price.toFixed(2)}</td>
                                        <td className="border px-2 py-1">{item.quantity}</td>
                                        <td className="border px-2 py-1">₹{(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="text-right">
                            <p><strong>Subtotal:</strong> ₹{validatedTotal.toFixed(2)}</p>
                            <p><strong>GST (18%):</strong> ₹{gstAmount.toFixed(2)}</p>
                            <p><strong>Delivery Charges:</strong> ₹{DELIVERY_CHARGE.toFixed(2)}</p>
                            <hr className="my-2" />
                            <p className="text-xl font-bold">Total Payable: ₹{finalAmount.toFixed(2)}</p>
                        </div>

                        <div className="mt-4">
                            <PaymentButton price={finalAmount} onSuccess={handleConfirmOrder} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default OrderConfirmation;
