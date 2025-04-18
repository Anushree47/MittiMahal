"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import useCartContext from "@/context/CartContext"; // Cart Context Hook

const OrderConfirmation = () => {
    const searchParams = useSearchParams();
    const addressId = searchParams.get("addressId");
    const userId = searchParams.get("userId");
    const { cart, total, clearCart } = useCartContext();
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const GST_RATE = 0.18;
    const DELIVERY_CHARGE = 50;
    useEffect(() => {
        console.log("userId:", userId);
        console.log("addressId:", addressId);
    }, [userId, addressId]);
    
    useEffect(() => {

        if (!addressId || !userId) {
            setError("Invalid user or address ID");
            setLoading(false);
            return;
        }
        fetchUserDetails();
        fetchAddressDetails();
    }, [userId, addressId]);

    const fetchUserDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/users/getbyid/${userId}`);
            setUser(res.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
            setError("Failed to fetch user details");
        }
    };

    const fetchAddressDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/address/selected/${userId}`);
            setAddress(res.data);
        } catch (error) {
            console.error("Error fetching selected address:", error);
            setError("Failed to fetch address details");
        } finally {
            setLoading(false);
        }
    };

    const gstAmount = total ? total * GST_RATE : 0;
    const finalAmount = total ? total + gstAmount + DELIVERY_CHARGE : 0;

    // const handleConfirmOrder = async () => {
    //     if (!user || !address || cart.length === 0) {
    //         setError("Cannot place order. Missing details or empty cart.");
    //         return;
    //     }
    //     try {
    //         const orderData = {
    //             userId,
    //             address,
    //             items: cart,
    //             totalAmount: finalAmount,
    //             gstAmount,
    //             deliveryCharge: DELIVERY_CHARGE,
    //             deliveryStatus: "Processing",
    //         };
    //         await axios.post("http://localhost:5000/Order/add", orderData);
    //         clearCart();
    //         router.push("/user/landingPage");
    //     } catch (error) {
    //         console.error("Error placing order:", error);
    //         setError("Failed to place order. Please try again.");
    //     }
    // };
    // const handleConfirmOrder = async () => {
    //     if (!user || !address || cart.length === 0) {
    //         setError("Cannot place order. Missing details or empty cart.");
    //         return;
    //     }
    
    //     const orderData = {
    //         userId,
    //         address,
    //         items: cart.map(item => ({
    //             productId: item.productId,  // Ensure this exists
    //             name: item.name,
    //             price: item.price,
    //             quantity: item.quantity
    //         })),
    //         totalAmount: finalAmount,
    //         gstAmount,
    //         deliveryCharge: DELIVERY_CHARGE,
    //         deliveryStatus: "Processing",
    //     };
    
    //     console.log("🟢 Order Data being sent:", orderData); // Debugging
    
    //     try {
    //         await axios.post("http://localhost:5000/Order/add", orderData);
    //         clearCart();
    //         router.push("/user/landingPage");
    //     } catch (error) {
    //         console.error("🔴 Error placing order:", error);
    //         setError("Failed to place order. Please try again.");
    //     }
    // };
    
    // const handleConfirmOrder = async () => {
    //     if (!user || !address || cart.length === 0) {
    //         setError("Cannot place order. Missing details or empty cart.");
    //         return;
    //     }
    
    //     console.log("🛒 Cart Data Before Order:", cart); // Debugging
    
    //     const orderData = {
    //         userId,
    //         address,
    //         items: cart.map(item => ({
    //             productId: item.id,  // Ensure this exists
    //             name: item.title,
    //             price: item.price,
    //             quantity: item.quantity
    //         })),
    //         totalAmount: finalAmount,
    //         gstAmount,
    //         deliveryCharge: DELIVERY_CHARGE,
    //         deliveryStatus: "Processing",
    //     };
    
    //     console.log("🟢 Order Data being sent:", orderData); // Debugging
    
    //     try {
    //         const response = await axios.post("http://localhost:5000/Order/add", orderData);
    //         console.log(response.data); // Debugging
            
    //         console.log(orderData);
            
    //         clearCart();
    //         router.push("/user/landingPage");
    //     } catch (error) {

    //         console.error("🔴 Error placing order:", error);
    //         console.log(error);
            
    //         setError("Failed to place order. Please try again.");
    //     }
    // };
    const handleConfirmOrder = async () => {
        if (!user || !address || cart.length === 0) {
            setError("Cannot place order. Missing details or empty cart.");
            return;
        }
    
        const orderData = {
            userId,
            address,
            items: cart.map(item => ({
                id: item.id || item._id, // ✅ This must match Mongoose schema
                name: item.title || item.name,
                price: item.price,
                quantity: item.quantity
            })),
            totalAmount: finalAmount,
            gstAmount,
            deliveryCharge: DELIVERY_CHARGE,
            deliveryStatus: "Processing",
        };
        console.log("🟢 Order Data being sent:", orderData); // Debugging
        try {
            const response = await axios.post("http://localhost:5000/Order/add", orderData);
            console.log("✅ Order placed:", response.data);
            clearCart();
            router.push("/user/landingPage");
        } catch (error) {
            console.error("🔴 Error placing order:", error.response?.data || error.message);
            setError("Failed to place order. Please try again.");
        }
    };
    

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Order Confirmation</h1>

            {loading ? (
                <p>Loading order details...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : user && address ? (
                <div className="border p-4 rounded shadow-md">
                    <h2 className="text-lg font-semibold">Customer Details</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>

                    <h2 className="text-lg font-semibold mt-4">Delivery Address</h2>
                    <p>{address.addressLine1}, {address.addressLine2}</p>
                    <p>{address.city}, {address.state}, {address.postalCode}, {address.country}</p>

                    <h2 className="text-lg font-semibold mt-4">Order Summary</h2>
                    <p><strong>Cart Total:</strong> ₹{total?.toFixed(2)}</p>
                    <p><strong>GST (18%):</strong> ₹{gstAmount?.toFixed(2)}</p>
                    <p><strong>Delivery Charges:</strong> ₹{DELIVERY_CHARGE.toFixed(2)}</p>
                    <hr className="my-2" />
                    <p className="text-xl font-bold">Total Payable: ₹{finalAmount?.toFixed(2)}</p>

                    <button className="bg-green-600 text-white px-6 py-2 mt-4 rounded w-full" onClick={handleConfirmOrder}>
                        Confirm Order
                    </button>
                </div>
            ) : (
                <p>Order details not available.</p>
            )}
        </div>
    );
};

export default OrderConfirmation;

