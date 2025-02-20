// 'use client'
// import React from 'react'

// const page = () => {
//   return (
//  <div className="flex items-center justify-center min-h-screen bg-yellow-50">
     
//      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
//         <div className="grid gap-10 lg:grid-cols-2">
//           <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
//             <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-accent-400">
//               <svg className="text-teal-900 w-7 h-7" 
//               viewBox="0 0 24 24">
//                 <polyline
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeMiterlimit="10"
//                   points=" 8,5 8,1 16,1 16,5"
//                   strokeLinejoin="round"
//                 />
//                 <polyline
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeMiterlimit="10"
//                   points="9,15 1,15 1,5 23,5 23,15 15,15"
//                   strokeLinejoin="round"
//                 />
//                 <polyline
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeMiterlimit="10"
//                   points="22,18 22,23 2,23 2,18"
//                   strokeLinejoin="round"
//                 />
//                 <rect
//                   x="9"
//                   y="13"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeMiterlimit="10"
//                   width="6"
//                   height="4"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </div>
//             <div className="max-w-xl mb-6">
//               <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
//              Rediscover the Beauty 
              
//                 <br className="hidden md:block" />
//                 of Clay with  <br className="hidden md:block" />
//                 <span className="inline-block text-deep-purple-accent-400">
//                 Mitti Mahal
//                 </span>
//               </h2>
//               <p className="text-base text-gray-700 md:text-lg">
//                 Mitti Mahal is a pottery studio that offers a variety of classes and workshops for all skill levels. We specialize in hand-building, wheel-throwing, and glazing techniques. Our studio is a place where you can relax, unwind, and get creative with clay. Whether you are a beginner or an experienced potter, we have something for everyone. Come join us and rediscover the beauty of clay!
//                 Handcrafted clay products designed with love, connecting artisans and customers with tradition, sustainability, and elegance."  
//                 </p>
//             </div>
//             <div>
//               <a
//                 href="/"
//                 aria-label=""
//                 className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
//               >
//                 Learn more
//                 <svg
//                   className="inline-block w-3 ml-2"
//                   fill="currentColor"
//                   viewBox="0 0 12 12"
//                 >
//                   <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//           <div className="flex items-center justify-center -mx-4 lg:pl-8">
//             <div className="flex flex-col items-end px-3">
//               <img
//                 className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
//                 src="/img1.jpg"
//                 alt=""
//               />
//               <img
//                 className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
//                 src="/img2.jpg"
//                 alt=""
//               />
//             </div>
//             <div className="px-3">
//               <img
//                 className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
//                 src="/img3.jpg"
//                 alt=""
//               />
//             </div>
//           </div>
//         </div>

//         <div className='flex flex-wrap h-[60vh] justify-center items-center w-full gap-4 md:gap-6 lg:gap-7'>

//           <div className='h-3/5 w-[20%] sm:w-[15%] md:w-[12%] lg:w-[9%] hover:h-4/5 hover:w-[25%] sm:hover:w-[20%] md:hover:w-[18%] hover:ease-linear blur-sm hover:blur-none transition-all duration-300'>
//             <img className='object-cover h-full w-full' src="/homeImg1.jpg" alt="image" />
//           </div>

//           <div className='h-3/5 w-[20%] sm:w-[15%] md:w-[12%] lg:w-[9%] hover:h-4/5 hover:w-[25%] sm:hover:w-[20%] md:hover:w-[18%] hover:ease-linear blur-sm hover:blur-none transition-all duration-300'>
//             <img className='object-cover h-full w-full' src="/homeImg2.jpg" alt="image" />
//           </div>

//           <div className='h-3/5 w-[20%] sm:w-[15%] md:w-[12%] lg:w-[9%] hover:h-4/5 hover:w-[25%] sm:hover:w-[20%] md:hover:w-[18%] hover:ease-linear blur-sm hover:blur-none transition-all duration-300'>
//             <img className='object-cover h-full w-full' src="/homeImg3.jpg" alt="image" />
//           </div>

//           <div className='h-3/5 w-[20%] sm:w-[15%] md:w-[12%] lg:w-[9%] hover:h-4/5 hover:w-[25%] sm:hover:w-[20%] md:hover:w-[18%] hover:ease-linear blur-sm hover:blur-none transition-all duration-300'>
//             <img className='object-cover h-full w-full' src="/homeImg4.jpeg" alt="image"/>
//           </div>

//           <div className='h-3/5 w-[20%] sm:w-[15%] md:w-[12%] lg:w-[9%] hover:h-4/5 hover:w-[25%] sm:hover:w-[20%] md:hover:w-[18%] hover:ease-linear blur-sm hover:blur-none transition-all duration-300'>
//             <img className='object-cover h-full w-full' src="/homeImg5.jpg" alt="image"/>
//           </div>

//           <div className='h-3/5 w-[20%] sm:w-[15%] md:w-[12%] lg:w-[9%] hover:h-4/5 hover:w-[25%] sm:hover:w-[20%] md:hover:w-[18%] hover:ease-linear blur-sm hover:blur-none transition-all duration-300'>
//             <img className='object-cover h-full w-full' src="/homeImg6.jpg" alt="image" />
//           </div>

//           <div className='h-3/5 w-[20%] sm:w-[15%] md:w-[12%] lg:w-[9%] hover:h-4/5 hover:w-[25%] sm:hover:w-[20%] md:hover:w-[18%] hover:ease-linear blur-sm hover:blur-none transition-all duration-300'>
//             <img className='object-cover h-full w-full' src="/homeImg7.jpg" alt="image" />
//           </div>

//           <div className='h-3/5 w-[20%] sm:w-[15%] md:w-[12%] lg:w-[9%] hover:h-4/5 hover:w-[25%] sm:hover:w-[20%] md:hover:w-[18%] hover:ease-linear blur-sm hover:blur-none transition-all duration-300'>
//             <img className='object-cover h-full w-full' src="/homeImg1.jpg" alt="images" />
//           </div>
//         </div>
//        <div>
    
  
//        </div>
//       </div>
//  </div>
//     );
//   };

  

// export default page


import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import MiddleSec from '@/components/MiddleSec'
import React from 'react'
import EndSec from '@/components/EndSec'

const page = () => {
  return (
    <div className='p-5 my-4 '>
      
      <Hero/>

      {/* animation section */}
      <MiddleSec/>

      {/*end section */}
      <EndSec/>
      
    </div>
  )
}

export default page
