'use client';
import React, { createContext, useContext, useState } from "react";

const BuyNowContext = createContext();

export const useBuyNowContext = () => useContext(BuyNowContext);

export const BuyNowProvider = ({ children }) => {
  const [buyNowItems, setBuyNowItems] = useState([]);

  // This should replace previous items with the new one
  const addBuyNowItem = (item) => {
    setBuyNowItems([item]);
  };

  const totalAmount = buyNowItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <BuyNowContext.Provider value={{ buyNowItems, addBuyNowItem, totalAmount }}>
      {children}
    </BuyNowContext.Provider>
  );
};

