'use client';
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

// categories
const categories = [
  { title: "Home Decor", image: "/HomeDecorCard.jpg" },
  { title: "Kitchen and Dining", image: "/KitchenCard.jpg" },
  { title: "Garden Essentials", image: "/GardenCard.jpg" },
  { title: "Toy and Miniature", image: "/ToyCard.jpg" },
  { title: "Custom and Personalized Item", image: "/CustomCard.jpg" },
    { title: "Art and Craft Supplies", image: "/ArtCard.jpg" },
];

export default function CategorySlider() {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);

  const router = useRouter();

  //Function to handle category click
  const handleCategoryClick = (category) => {
    const formatCategory = encodeURIComponent(category); //Encose for URL safety
    router.push(`/browse?category=${formatCategory}`);
  };

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Move to next slide
  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % categories.length);
    scrollSlider(350); // Adjust based on card width
  };

  // Move to previous slide
  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
    scrollSlider(-350); // Adjust based on card width
  };

  // Scroll animation for smooth movement
  const scrollSlider = (offset) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += offset;
    }
  };

  return (
    <div className="w-screen h-[500px] py-10 bg-gray-100">
      <Link href='/browse' className="text-3xl font-bold text-center mb-6">Explore Categories</Link>

      {/* Slider Container */}
      <div className="relative w-full overflow-hidden px-10">
        <div
          ref={sliderRef}
          className="flex w-full space-x-6 overflow-x-scroll scroll-smooth no-scrollbar"
        >
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="min-w-[300px] h-[400px] bg-white p-6 rounded-lg shadow-md flex flex-col justify-between"
              onClick={() => handleCategoryClick(category.title)}
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-[300px] object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold text-center">{category.title}</h3>
            </motion.div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-lg"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-lg"
        >
          ❯
        </button>
      </div>
    </div>
  );
}
