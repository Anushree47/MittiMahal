'use client'
import React from 'react'
import { motion } from "framer-motion";
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-[url('/images/.jpg')] bg-cover bg-center h-[60vh] flex items-center justify-center text-white">
        <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center">
          <h1 className="text-4xl md:text-6xl font-bold">Mitti Mahal</h1>
          <p className="text-lg md:text-xl mt-3">Bringing Earth’s Art to Your Home</p>
        </div>
      </section>

      {/* About Mitti Mahal */}
      <section className="container mx-auto py-16 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-6">About Mitti Mahal</h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Mitti Mahal is an e-commerce platform dedicated to **handcrafted clay products**. Our mission is to support artisans, promote sustainable living, and bring **authentic terracotta and ceramic** pieces to your home.
          </p>
        </motion.div>
      </section>

      {/* Why Choose Us? */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Authentic Handcrafted Art", desc: "Each product is handmade with love and skill." },
              { title: "Sustainable & Eco-Friendly", desc: "We use natural materials that are safe for the environment." },
              { title: "Supporting Local Artisans", desc: "Your purchase helps skilled artisans earn a livelihood." }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="p-6 bg-gray-50 rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Categories */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">Our Categories</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "Home Decor",
            "Kitchen & Dining",
            "Garden Essentials",
            "Toys & Miniatures",
            "Custom & Personalized",
            "Art & Craft Supplies"
          ].map((category, index) => (
            <motion.div 
              key={index} 
              className="px-4 py-2 bg-white rounded-lg shadow-md text-lg font-medium"
              whileHover={{ scale: 1.1 }}
            >
              {category}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Meet the Artisans */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Meet the Artisans</h2>
          <p className="text-lg text-gray-600 mb-10">The heart and soul of Mitti Mahal.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Placeholder artisan profiles */}
            {["Aman Kumar", "Pooja Devi", "Ramesh Sharma"].map((name, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg shadow-md">
                <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full"></div>
                <h3 className="text-xl font-semibold mt-4">{name}</h3>
                <p className="text-gray-600 mt-2">Master Potter</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>
          <p className="text-lg text-gray-600 mb-10">See what our customers say about us.</p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            {[
              { name: "Priya Sharma", review: "Absolutely love the craftsmanship!" },
              { name: "Rahul Verma", review: "Perfect for home decor and gifts." },
              { name: "Sneha Gupta", review: "High-quality and eco-friendly products." }
            ].map((testimonial, index) => (
              <motion.div 
                key={index} 
                className="p-6 bg-white rounded-lg shadow-md text-center"
                whileHover={{ scale: 1.05 }}
              >
                <p className="italic text-gray-600">"{testimonial.review}"</p>
                <h3 className="mt-4 text-lg font-semibold">{testimonial.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-yellow-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Explore Our Collection</h2>
        <p className="text-lg mb-4">Discover handcrafted clay products that bring warmth to your home.</p>
        <Link href="/browse" className="px-6 py-3 bg-white text-yellow-600 font-semibold rounded-md shadow-md hover:bg-gray-200">Shop Now</Link>
      </section>
    </div>
  );
};


export default AboutPage


