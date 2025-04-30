'use client';
import { Dialog } from "@headlessui/react";
import React from "react";

const OrderSummaryModal = ({ isOpen, onClose, cartItems, totalAmount, onConfirm }) => {
  // Function to handle image loading errors
  const handleImageError = (event) => {
    event.target.src = "/next.svg"; // Replace with your placeholder image path
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <Dialog.Title className="text-lg font-bold mb-4">Order Summary</Dialog.Title>

          {/* Cart Items */}
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {cartItems.map((item, index) => {
              // Determine the image URL
              let imageUrl = "";

              if (Array.isArray(item.images)) {
                imageUrl = item.images[0];
              } else if (typeof item.images === "string") {
                imageUrl = item.images.split(",")[0].trim();
              }

              return (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={imageUrl || "/placeholder.png"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                      onError={handleImageError}
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold">₹{item.price * item.quantity}</p>
                </div>
              );
            })}
          </div>

          {/* Total Amount */}
          <div className="flex justify-between font-bold text-lg mt-6">
            <span>Total:</span>
            <span>₹{totalAmount}</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default OrderSummaryModal;
