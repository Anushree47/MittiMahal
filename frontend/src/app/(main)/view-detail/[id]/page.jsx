'use client';
import { IconBrandRevolut, IconChevronLeft, IconChevronRight, IconFileDescription, IconX } from '@tabler/icons-react';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useCartContext from '@/context/CartContext'; // Assuming this is the correct path
import { toast } from 'react-hot-toast'; // To show a toast notification when the product is added to the cart

const ProductDetails = () => {
  const [productData, setProductData] = useState(null);
  const { id } = useParams();
  const { addToCart } = useCartContext(); // Get the addToCart function from the CartContext

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/product/getbyid/${id}`);
        setProductData(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (productData) {
      addToCart(productData); // Add product to cart context
      toast.success(`${productData.title} added to cart!`); // Toast message
    }
  };

  if (!productData) {
    return <h1 className="text-center text-xl text-gray-700 mt-10">Loading ...</h1>;
  }

  const isInCart = cart.some((item) => item._id === productData._id);

  return (
    <div className="min-h-screen  py-10">
      <header className="text-black p-4 shadow-lg bg-white rounded-lg mx-4 md:mx-20">
        <h1 className="text-3xl text-center font-bold">Product Details</h1>
      </header>

      <main className="container mx-auto p-8">
        <div className="flex flex-col lg:flex-row lg:space-x-12 bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-xl">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex flex-col items-center">
            {productData?.images?.length > 0 ? (
              <div className="relative flex items-center">
                {/* Left Button */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100"
                >
                  <IconChevronLeft/>
                </button>

                <motion.img
                  src={productData.images[currentIndex]}
                  alt="Product"
                  className="w-80 h-80 object-cover rounded-xl shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setFullscreen(true)}
                />

                {/* Right Button */}
                <button
                  onClick={nextImage}
                  className="absolute right-2 bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100"
                >
                  <IconChevronRight/>
                </button>
              </div>
            ) : (
              <p className="text-center text-gray-500">No images available</p>
            )}
          </div>

          {/* Product Info Section */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <h2 className="text-4xl font-bold text-[#4E342E]">{productData.title}</h2>
            <div className="flex items-center gap-3 text-2xl font-semibold text-[#5D4037]">
              <IconBrandRevolut size={28} className="text-[#8B5E3B]" /> ₹{productData.price}
            </div>
            <p className="text-xl font-medium text-[#6D4C41]">{productData.category}</p>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <IconFileDescription size={24} className="text-[#8B5E3B]" />
                <h3 className="text-lg font-semibold text-[#5D4037]">Description</h3>
              </div>
              <p className="text-gray-700">{productData.description}</p>
            </div>

          {/* Buy Now Button */}
          <div className='w-full flex justify-center'>
            <Link
              href="/user/cart"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Buy Now
            </Link>
          </div>
            {/* Add to Cart Button */}
            <div className='w-full flex justify-center'>
              <button
                onClick={handleAddToCart} // Trigger add to cart on click
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Fullscreen Image Modal */}
      {fullscreen && (
  <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
    <motion.img
      src={productData.images[currentIndex]}
      alt="Fullscreen Image"
      className="w-screen h-screen object-contain"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
    />
    <button
      className="absolute top-5 right-5 bg-white p-3 rounded-full shadow-lg"
      onClick={() => setFullscreen(false)}
    >
      <IconX size={30} className="text-gray-800" />
    </button>
  </div>
)}

    </div>
  );
};

export default ProductDetails;