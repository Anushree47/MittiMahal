'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

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
        <div className="flex flex-col md:flex-row items-center bg-slate-100 shadow-md rounded-lg border-2 border-lime-200  p-6 mx-9 space-y-6 md:space-y-0 md:space-x-8">

            {/* Image Section */}
            <img 
            className="rounded-lg w-full md:w-1/3 object-cover" 
            src={product.imageUrl} 
            alt={product.title} 
            />


            {/* Product Info */}
            <div className="flex flex-col w-full md:w-2/3 space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">Name: {product.title}</h1>
                <h6 className="text-xl font-semibold text-white-600">Category: {product.category}</h6>
                <p className="text-gray-600 leading-relaxed">{product.price}</p>
                <p className="text-gray-600">
                <strong className="text-black">Description:</strong> {product.description}
                </p>
            </div>


            {/* Button Section */}
            <div className="flex gap-5">
            
                <Link
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-100"
                href={'/BuyNow/'+id}
                >
                Buy Now
                </Link>

                <button
                onClick={() => router.push('/cart')}
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-100"
                >
                    Add to Cart
                </button>
            
        </div>
        </div>

    );
};

export default ProductDetails;