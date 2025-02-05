'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const ProductDetails = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/product/getbyid/${id}`);
                setProduct(response.data);
            } 
            catch (error)
                {
                console.error('Error fetching product details:', error.response || error);
                setError('Failed to fetch product details');
                }
        };

        fetchProductDetails();
            }, [id]);

        if (error) return <div className="text-red-500">{error}</div>;
        if (!product) return <div>Loading...</div>;

    return (
        <div className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg border-2 border-gray-200 
        p-6 mx-9 space-y-6 md:space-y-0 md:space-x-8">
            

            {/* Image Section */}
            <img 
            className="rounded-lg w-full md:w-1/3 object-cover" 
            src={product.images[0]} 
            alt={product.title} 
            />

            {/* <Swiper className="rounded-lg w-full md:w-1/3 object-cover">
                {product.images.map((img, index) => (
                    <SwiperSlide key={index} className="swiper-slide">
                        <img src={img} alt={product.title} className="rounded-lg w-full object-cover" />
                    </SwiperSlide>
                ))}
            </Swiper> */}
            


            {/* Product Info */}
            <div className="flex flex-col w-full md:w-2/3 space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">Name: {product.title}</h1>
                <h6 className="text-xl font-semibold text-white-600">Category: {product.category}</h6>
                <p className="text-gray-600 leading-relaxed"><span className=' text-black font-bold'>Price:</span>&#8377;{product.price}</p>
                <p className="text-gray-600">
                <strong className="text-black">Description:</strong> {product.description}
                </p>

                {/* Button Section */}
            <div className="flex gap-5">
            
            <Link
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 
            dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            href={'/BuyNow/'+id}
            >
            Buy Now
            </Link>

            <button
            onClick={() => router.push('/cart')}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Add to Cart
            </button>
        
    </div>
            </div>


            
        </div>

    );
};

export default ProductDetails;