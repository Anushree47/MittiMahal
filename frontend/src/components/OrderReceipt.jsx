
'use client';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import Spinner from '@/components/Spinner';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const OrderReceipt = ({ orderId }) => {
  const [receipt, setReceipt] = useState(null);
  const receiptRef = useRef();

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const res = await axiosInstance.get(`/order/receipt/${orderId}`);
        console.log("📦 Receipt Data:", res.data);
        setReceipt(res.data);
      } catch (err) {
        console.error("❌ Error fetching receipt:", err);
      }
    };

    if (orderId) fetchReceipt();
  }, [orderId]);

  const downloadPDF = async () => {
    const canvas = await html2canvas(receiptRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Order_${receipt.orderId}.pdf`);
  };

  if (!receipt) return <Spinner />;

  const orderDate = new Date(receipt.placedOn);
  const deletionDate = new Date(orderDate);
  deletionDate.setDate(orderDate.getDate() + 6);

  return (
    <div>
      <div ref={receiptRef} className="border p-4 rounded bg-white">
        <h2 className="text-2xl font-bold mb-4">Order Receipt</h2>

        <div className="mb-4">
          <p><strong>Order ID:</strong> {receipt.orderId}</p>
          <p><strong>Placed On:</strong> {orderDate.toLocaleString()}</p>
          <p><strong>Delivery On:</strong> {deletionDate.toLocaleString()}</p>
        </div>

        <div className="mb-4">
          <p><strong>Name:</strong> {receipt.user.name}</p>
          <p><strong>Email:</strong> {receipt.user.email}</p>
          <p><strong>Phone:</strong> {receipt.user.phone}</p>
          <p><strong>Subtotal:</strong> ₹{receipt.subTotal}</p>
          <p><strong>Tax:</strong> ₹{receipt.taxAmount}</p>
          <p><strong>Delivery Charges:</strong> ₹{receipt.deliveryCharge}</p>
          <p><strong>Discount:</strong> ₹{receipt.discount}</p>
          <hr className="my-2" />
          <p className="font-bold"><strong>Total Amount:</strong> ₹{receipt.totalAmount}</p>
        </div>

        <h3 className="font-semibold mb-2">Items:</h3>
        <ul className="mb-4 space-y-1">
          {receipt.items.map((item, idx) => (
            <li key={idx}>
              {item.name} - Qty: {item.quantity} - ₹{item.price * item.quantity}
            </li>
          ))}
        </ul>

        <p className="mb-2"><strong>Delivery Address:</strong> {receipt.deliveryAddress}</p>
        {receipt.exchangeAddress && (
          <p className="mb-2"><strong>Exchange Address:</strong> {receipt.exchangeAddress}</p>
        )}
      </div>

      <button
        onClick={downloadPDF}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download PDF
      </button>
    </div>
  );
};

export default OrderReceipt;