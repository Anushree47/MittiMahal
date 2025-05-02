
"use client";
import { motion } from "framer-motion";

import React from "react";
import Link from 'next/link'

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
      <div>
      <Link href="/user/receipt"
          className="bg-yellow-900 border border-black-400 text-white-800 hover:bg-yellow-600 font-medium px-4 py-2 rounded transition duration-300 ">
        Download Invoice
    </Link>
    </div>
    </div>
  );
}
