
"use client";
import { motion } from "framer-motion";
import React from "react";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="text-center"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-green-600"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Order Placed!
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-green-800"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Thank you for your purchase.
        </motion.p>
      </motion.div>
    </div>
  );
}
