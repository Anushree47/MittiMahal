import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const PaymentButton = ({ price, onSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handleBuyNow = async () => {
        try {
          
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/payment/create-order`, { amount: price });
          console.log("Frontend Razorpay Key:", process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
    
    
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "Mitti Mahal",
            description: "Test Transaction",
            order_id: data.id,
            handler: (response) => {
              toast.success("Payment successful! ID: " + response.razorpay_payment_id);
              console.log(response);
              if (onSuccess ) {
                onSuccess(response);
              }
            },
            prefill: {
              name: "test user",
              email: "text@example.com",
              contact: "9999999999",
            },
            theme: {
              color: "#3399cc"
            },
          };
    
          console.log("Key used:", options.key); // <- should not be undefined
    
          const razorpay = new window.Razorpay(options);
          razorpay.open();
    
        } catch (error) {
          console.error("Error in payment process:", error);
          toast.error("Payment failed. Please try again.");
        } finally {
          setLoading(false);
        }
      };

    return <button onClick={handleBuyNow} disabled={loading}
          className="bg-white border border-black-400 text-blue-800 hover:bg-blue-400 font-medium px-4 py-2 rounded transition duration-300 ">
        {loading ? 'Loading...' : 'Pay Now'}        
    </button>;
};

export default PaymentButton;