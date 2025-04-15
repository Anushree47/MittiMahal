import React, { useState } from 'react';
import axios from 'axios';

const PaymentButton = ({ amount }) => {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        try {
            const response = await axios.post('/payment', { amount }, {
                headers: { "Content-Type": "application/json" }
            });

            const order = response.data;
            setLoading(false);

            const options = {
                key: process.env.RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: 'Mitti Mahal',
                description: 'Test Transaction',
                order_id: order.id,
                handler: function (response) {
                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                },
                prefill: {
                    name: "test user",
                    email: "test@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc"
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Payment error:", error);
            setLoading(false);
            
        }
    };

    return <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Loading...' : 'Pay Now'}        
    </button>;
};

export default PaymentButton;