'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  IconBrandRevolut,
  IconChevronLeft,
  IconChevronRight,
  IconFileDescription,
  IconX,
  IconHeart,
  IconShoppingCart,
} from '@tabler/icons-react';

import { useCartContext } from '@/context/CartContext';
import { useWishlistContext } from '@/context/WishlistContext';
import { useBuyNowContext } from '@/context/BuyNowContext';
import Spinner from '@/components/Spinner';
import ReviewList from '@/components/ReviewList';
import ReviewForm from '@/components/ReviewForm';
import useAppContext from '@/context/AppContext';

const ProductDetails = () => {
  const [productData, setProductData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false); // State to control review form visibility
  const { id } = useParams();
  const router = useRouter();
  const { cart, addToCart } = useCartContext();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistContext();
  const { addBuyNowItem } = useBuyNowContext();
  const { user } = useAppContext(); // Get user info from context
  const [userOrders, setUserOrders] = useState([]); // State to store user orders

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/getbyid/${id}`);
        setProductData(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);

  if (!productData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const isInCart = cart.some((item) => {
    if (item._id === id) return true;
    if (item.productId && item.productId._id === id) return true;
    return false;
  });

  const isInWishlist = wishlist.some((item) => item._id === productData._id);

  const handleAddToCart = () => {
    const product = {
      _id: productData._id,
      title: productData.title,
      price: productData.price,
      images: typeof productData.images === 'string' ? productData.images : productData.images[0],
      quantity: 1,
    };

    if (isInCart) {
      router.push('/user/cart');
    } else {
      addToCart(product);
      toast.success(`${product.title} added to cart!`);
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(productData._id);
      toast.success('Removed from Wishlist');
    } else {
      addToWishlist(productData);
      toast.success('Added to Wishlist');
    }
  };
  // Function to check if the user has purchased the product before showing the review form
  const checkPurchaseAndShowReviewForm = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/order/has-purchased/${user._id}/${productData._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );

      if (response.data.hasPurchased) {
        setShowReviewForm(true); // Show the review form if the user has purchased the product
      } else {
        toast.error("You need to purchase the product before reviewing it.");
      }
    } catch (error) {
      console.error("Error checking purchase:", error);
      toast.error("Error checking purchase status.");
    }
  };



  const handleBuyNow = () => {
    const buyNowProduct = {
      _id: productData._id,
      title: productData.title,
      price: productData.price,
      images: productData.images,
      quantity: 1,
    };
    addBuyNowItem(buyNowProduct);
    router.push('/user/address');
  };

  const nextImage = () => {
    if (productData?.images?.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % productData.images.length);
    }
  };

  const prevImage = () => {
    if (productData?.images?.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + productData.images.length) % productData.images.length);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <header className="text-black p-4 shadow-lg bg-white rounded-lg mx-4 md:mx-20">
        <h1 className="text-3xl text-center font-bold">Product Details</h1>
      </header>

      <main className="container mx-auto p-8">
        <div className="flex flex-col lg:flex-row lg:space-x-12 bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-xl">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex flex-col items-center">
            {productData?.images?.length > 0 ? (
              <div className="relative flex items-center">
                <button onClick={prevImage} className="absolute left-2 bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100">
                  <IconChevronLeft />
                </button>

                <motion.img
                  src={productData.images[currentIndex]}
                  alt="Product"
                  className="w-80 h-80 object-cover rounded-xl shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setFullscreen(true)}
                />

                <button onClick={nextImage} className="absolute right-2 bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100">
                  <IconChevronRight />
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

            <div className="flex items-center gap-4 mt-6">
              {/* Wishlist Button */}
              <button
                onClick={handleWishlistToggle}
                className="text-2xl p-2 border rounded-full border-gray-300 hover:bg-gray-100 transition"
                title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                {isInWishlist ? (
                  <IconHeart className="text-red-500" fill="red" />
                ) : (
                  <IconHeart className="text-gray-500 hover:text-red-500" />
                )}
              </button>

              {/* Cart Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className={`flex-1 px-6 py-3 font-semibold rounded-lg shadow-md transition-all ${isInCart ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-yellow-900 text-white hover:bg-yellow-600'
                  }`}
              >
                {isInCart ? (
                  'Go to Cart'
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <IconShoppingCart size={18} /> Add to Cart
                  </span>
                )}
              </motion.button>

              {/* Buy Now Button */}
              <motion.button
                onClick={handleBuyNow}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-6 py-3 border border-yellow-600 text-yellow-900 font-semibold rounded-lg shadow-md hover:bg-yellow-900 hover:text-white transition-all"
              >
                Buy Now
              </motion.button>
            </div>
          </div>
        </div>
      </main>


      {/* Reviews Section */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#4E342E] mb-4">Customer Reviews</h2>

        <ReviewList productId={productData._id} />

        {user && (
          <button
            onClick={checkPurchaseAndShowReviewForm}
            className="mt-4 px-4 py-2 bg-yellow-900 text-white rounded-lg shadow-md hover:bg-yellow-600">
            Write a Review
          </button>
        )}

        {showReviewForm && (
          <ReviewForm
            itemId={productData._id}
            onClose={() => setShowReviewForm(false)}
          />
        )}

      </div>



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
