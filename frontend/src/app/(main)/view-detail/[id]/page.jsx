'use client';
import { IconBrandRevolut, IconFileDescription } from '@tabler/icons-react';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProductDetails = () => {
  const [productData, setProductData] = useState(null);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/product/getbyid/${id}`);
        setProductData(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);

  if (!productData) {
    return <h1 className="text-center text-xl text-gray-700 mt-10">Loading ...</h1>;
  }

  return (
    <div className="min-h-screen bg-[#F5EFE7]">
      <header className="text-white p-4 shadow-md bg-[#8B5E3B]">
        <div className="container mx-auto">
          <h1 className="text-3xl text-center font-bold">Product Details</h1>
        </div>
      </header>

      <main className="container mx-auto p-8">
        <div className="flex flex-col lg:flex-row lg:space-x-12">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <div className="flex overflow-x-auto space-x-4">
              {productData?.images?.length > 0 ? (
                productData.images.map((img, index) => (
                  <img key={index} src={img} alt="image" className="w-60 h-60 object-cover rounded-lg shadow-lg border-2 border-[#8B5E3B]" />
                ))
              ) : (
                <p className="text-center text-gray-500">No images available</p>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-semibold text-[#5D4037] mb-4">{productData.title}</h2>
            <div className="flex items-center mb-4 gap-3">
              <IconBrandRevolut size={28} className="text-[#8B5E3B]" />
              <p className="text-2xl font-bold text-[#4E342E]">₹{productData.price}</p>
            </div>
            <p className="text-xl font-semibold text-[#6D4C41] mb-4">{productData.category}</p>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-2 gap-2">
                <IconFileDescription size={24} className="text-[#8B5E3B]" />
                <h3 className="text-lg font-semibold text-[#5D4037]">Description</h3>
              </div>
              <p className="text-2xl font-bold text-[#4E342E]">{productData.description}</p>
            </div>
            {/* Add to Cart Button */}
          <div className='w-full flex justify-center'>
            <Link
              href="/user/cart"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </Link>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;