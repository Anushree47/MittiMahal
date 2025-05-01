
"use client";
import next from 'next';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { IconArrowBadgeLeftFilled, IconArrowBadgeRightFilled } from '@tabler/icons-react';

const slides = [
  {image:"/HeroN1.jpg",text:"Unleash Creativity with Custom Designs"},
  {image:"/HeroN2.jpg",text:"Transform your Space with Unique Pieces"},
  {image:"/HeroN3.jpg",text:"Explore our exclusive collection"},
];


const Hero = () => {

  const [currentIndex , setCurrentIndex] = useState(0);
  
//auto switch image
useEffect(() => {
  const interval = setInterval(() => {
    nextImage();
  },5000);
  return () => clearInterval(interval);
}, [currentIndex]);

const nextImage = () => {   
  setCurrentIndex((prev) => (prev+1)% slides.length);
};

const prevImage = () => { 
  setCurrentIndex((prev) => (prev-1 + slides.length) % slides.length);
};



  return (
    <div className="relative w-full h-[750px] overflow-hidden ">  
      {/**Image container with stripped transition */}
      <motion.div
      key = {currentIndex}
      initial={{opacity:0, clipPath: 'inset(0 100% 0 0)'}}
      animate={{opacity:1, clipPath: 'inset(0 0 0 0)'}}
      transition={{duration:1,ease:'easeInOut'}}
      className="absolute  w-full h-full">

        <img 
        src={slides[currentIndex].image} 
        alt=""
        className='w-full h-full object-cover' />
      </motion.div>

      {/**Text container */}
      <div className="absolute inset-0 flex flex-col text-white items-center justify-center bg-black bg-opacity-50 p-6 rounded-md text-center">
        <motion.h1
        key={currentIndex}
        initial={{y:20, opacity:0}}
        animate={{y:0, opacity:1}}
        transition={{duration:0.8,ease:'easeOut'}}
        className='text-3xl font-bold mb-4'>
          {slides[currentIndex].text}
        </motion.h1>
        <button
  className="bg-yellow-900 hover:bg-yellow-600 text-white px-6 py-2 rounded-md shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl"
>
  Shop Now
</button>

        </div>

      {/**Navigation buttons */}
      <button 
      onClick={prevImage}
      className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full'>
        <IconArrowBadgeLeftFilled size={24} />
      </button>

      <button 
      onClick={prevImage}
      className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full'>
        <IconArrowBadgeRightFilled size={24} />
      </button>

    </div>
  )
}

export default Hero
