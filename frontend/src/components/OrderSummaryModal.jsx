"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

const OrderSummaryModal = ({ isOpen, onClose, cartItems, totalAmount, onConfirm }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <Dialog.Title className="text-lg font-bold">Order Summary</Dialog.Title>

          <div className="mt-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between border-b py-2">
                <span>{item.name}</span>
                <span>₹{item.price} x {item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold mt-4">
              <span>Total:</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          {/* Buttons */}
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
              Proceed to Address
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default OrderSummaryModal;
