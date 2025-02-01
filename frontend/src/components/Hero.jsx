// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// const HeroSection = () => {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end end"], // Scroll range
//   });

//   // Transform scroll progress into horizontal sliding position
//   const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]); // First image slides left
//   const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]); // Second image slides left
//   const x3 = useTransform(scrollYProgress, [0, 1], ["0%", "-200%"]); // Third image slides left

//   return (
//     <section ref={ref} className="relative h-screen bg-gray-100 overflow-hidden">
//       {/* Sliding images with different speeds */}
//       <motion.div
//         className="absolute top-1/4 left-0 w-full h-full flex justify-center items-center"
//         style={{ x: x1 }}
//       >
//         <motion.img
//           src="/img1.jpg" // Image from public folder
//           alt="Sliding 1"
//           className="w-2/3 md:w-1/2"
//         />
//       </motion.div>
      
//       <motion.div
//         className="absolute top-1/4 left-0 w-full h-full flex justify-center items-center"
//         style={{ x: x2 }}
//       >
//         <motion.img
//           src="/img2.jpg"
//           alt="Sliding 2"
//           className="w-2/3 md:w-1/2"
//         />
//       </motion.div>

//       <motion.div
//         className="absolute top-1/4 left-0 w-full h-full flex justify-center items-center"
//         style={{ x: x3 }}
//       >
//         <motion.img
//           src="/img3.jpg"
//           alt="Sliding 3"
//           className="w-2/3 md:w-1/2"
//         />
//       </motion.div>
//     </section>
//   );
// };

// export default HeroSection;


'use client';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required Swiper modules
import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

// Slide data (reusable content)
const slides = [
  {
    
    imageUrl: '/img1.jpg',
  },
  {
    imageUrl: '/img2.jpg',
  },
  {
    
    imageUrl: '/img3.jpg',
  },

];

const SlideComponent = () => {
  return (
    <div className="w-full h-[70vh] relative">
      <Swiper
        modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50, // Slide rotation angle
          stretch: 0, // Space between slides
          depth: 100, // 3D depth of slides
          modifier: 1, // Multiplier for the 3D effect
          slideShadows: true, // Enable slide shadows
        }}
        autoplay={{
          delay: 2000, // 3 seconds delay for autoplay
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        className="h-full w-full"
      >
        {/* Dynamically map through the slides */}
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="w-[fit] h-[fit]">
            <div
              className="relative flex flex-col justify-center items-center  h-fit w-fit bg-cover bg-center rounded-lg shadow-lg"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            >
              {/* Overlay to improve text visibility */}
              {/* <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div> */}

              {/* Slide Content */}
              {/* <div className="relative z-10 p-4"> */}
                {/* <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
                <p className="text-sm">{slide.description}</p> */}
              </div>
          
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideComponent;
