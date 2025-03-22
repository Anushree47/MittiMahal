// 'use client';
// import { useRouter, useSearchParams } from "next/navigation";

// const OrderConfirmation = () => {
//     const searchParams = useSearchParams();
//     const addressId = searchParams.get("addressId");

//     return (
//         <div className="max-w-4xl mx-auto p-4">
//             <h1 className="text-2xl font-semibold mb-4">Order Confirmation</h1>
//             <p>Selected Address ID: {addressId}</p>
//             <p>Your order will be processed soon.</p>
//         </div>
//     );
// };

// export default OrderConfirmation;
'use client';
import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import useCartContext from "@/context/CartContext"; // Use Cart Context

const OrderConfirmation = () => {
    const searchParams = useSearchParams();
    const addressId = searchParams.get("addressId");
    const userId = searchParams.get("userId");
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState(null);
    const { cart, total } = useCartContext(); // Get cart and total from Context

    const GST_RATE = 0.18; // 18% GST
    const DELIVERY_CHARGE = 50; // Flat delivery charge

    useEffect(() => {
        fetchUserDetails();
        fetchAddressDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/users/getbyid/${userId}`);
            setUser(res.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const fetchAddressDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/Address/selected/${userId}`);
            setAddress(res.data);
        } catch (error) {
            console.error("Error fetching address details:", error);
        }
    };

    const gstAmount = total * GST_RATE;
    const finalAmount = total + gstAmount + DELIVERY_CHARGE;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Order Confirmation</h1>
            {user && address ? (
                <div className="border p-4 rounded shadow-md">
                    <h2 className="text-lg font-semibold">Customer Details</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    
                    <h2 className="text-lg font-semibold mt-4">Delivery Address</h2>
                    <p>{address.addressLine1}, {address.addressLine2}</p>
                    <p>{address.city}, {address.state}, {address.postalCode}, {address.country}</p>
                    
                    <h2 className="text-lg font-semibold mt-4">Order Summary</h2>
                    <p><strong>Cart Total:</strong> ₹{total.toFixed(2)}</p>
                    <p><strong>GST (18%):</strong> ₹{gstAmount.toFixed(2)}</p>
                    <p><strong>Delivery Charges:</strong> ₹{DELIVERY_CHARGE.toFixed(2)}</p>
                    <hr className="my-2" />
                    <p className="text-xl font-bold">Total Payable: ₹{finalAmount.toFixed(2)}</p>
                </div>
            ) : (
                <p>Loading order details...</p>
            )}
        </div>
    );
};

export default OrderConfirmation;
