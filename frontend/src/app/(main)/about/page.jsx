"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const artisans = [
  {
    name: "Ramesh Kumar",
    image: "/artist1.jpeg", // Replace with real image
    description: "A 3rd-generation potter specializing in hand-carved designs."
  },
  {
    name: "Sita Devi",
    image: "artist2.jpeg", // Replace with real image
    description: "An expert in organic clay modeling with 20+ years of experience."
  },
  {
    name: "Amit Verma",
    image: "artist3.jpeg", // Replace with real image
    description: "Renowned for his unique terracotta figurines and kitchenware."
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-yellow-900 text-white py-20 px-6 text-center"
      >
        <h1 className="text-5xl font-extrabold">Welcome to Mitti Mahal</h1>
        <p className="text-lg mt-2 max-w-2xl mx-auto">
          Where Earth Meets Art – Handmade, Eco-Friendly, and Timeless Clay Creations.
        </p>
      </motion.section>

      {/* Why Choose Us - Animated Cards */}
      <section className="py-16 px-6">
        <h2 className="text-4xl font-bold text-center text-[#5a3e2b]">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8 max-w-6xl mx-auto">
          {[
            { title: "Handcrafted Excellence", desc: "Each product is carefully crafted by skilled artisans." },
            { title: "Eco-Friendly & Sustainable", desc: "Our materials are 100% natural and biodegradable." },
            { title: "Authentic & Timeless Designs", desc: "Blending tradition with modern aesthetics." }
          ].map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-700 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      
      {/* Meet the Artisans - Enhanced Hover Effect */}
<section className="bg-gray-100 py-16 px-6 text-center">
  <h2 className="text-4xl font-bold text-[#5a3e2b]">Meet Our Artisans</h2>
  <p className="text-lg mt-2 max-w-4xl mx-auto">
    Behind every Mitti Mahal product is a skilled artisan pouring heart and soul into each piece.
  </p>
  
  <div className="flex flex-wrap justify-center gap-10 mt-10">
    {artisans.map((artisan, index) => (
      <div key={index} className="relative w-56 h-56 overflow-hidden rounded-lg shadow-lg group cursor-pointer">
        {/* Image */}
        <motion.img 
          src={artisan.image} 
          alt={artisan.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <h3 className="text-white text-lg font-bold">{artisan.name}</h3>
          <p className="text-gray-300 text-sm">{artisan.description}</p>
        </motion.div>
      </div>
    ))}
  </div>
</section>


      {/* Customer Testimonials */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="py-16 px-6"
      >
        <h2 className="text-4xl font-bold text-center text-[#5a3e2b]">What Our Customers Say</h2>
        <div className="grid md:grid-cols-2 gap-8 mt-8 max-w-5xl mx-auto">
          {[
            { name: "Aarti Sharma", text: "Absolutely love the craftsmanship and quality!" },
            { name: "Rahul Mehta", text: "Each piece tells a story, supporting local artisans!" }
          ].map((testimonial, index) => (
            <motion.div 
              key={index} 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              <p className="text-gray-700">"{testimonial.text}"</p>
              <h3 className="text-yellow-600 font-semibold mt-2">- {testimonial.name}</h3>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action (CTA) */}
      <motion.section 
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-center py-16 bg-yellow-900 text-white"
      >
        <h2 className="text-4xl font-bold">Bring Home a Piece of Tradition</h2>
        <p className="text-lg mt-2">Shop from our collection and celebrate handcrafted beauty.</p>
        <Link href="/browse">
        <button
        className="mt-6 px-6 py-3 bg-white text-yellow-900 font-bold rounded-full hover:bg-gray-200">
          Explore Collection
        </button>
        </Link>
      </motion.section>
    </div>
  );
};

export default AboutPage;
