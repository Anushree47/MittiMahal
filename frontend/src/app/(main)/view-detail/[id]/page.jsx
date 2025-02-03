// 'use client';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useRouter } from 'next/navigation';

// const ProductDetails = () => {

//     const { id } = useParams();
//     const [product, setProduct] = useState(null);
//     const [error, setError] = useState(null);

//     const router = useRouter();

//     useEffect(() => {
//         const fetchProductDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/product/getbyid/${id}`);
//                 setProduct(response.data);
//             } 
//             catch (error)
//                 {
//                 console.error('Error fetching product details:', error.response || error);
//                 setError('Failed to fetch product details');
//                 }
//         };

//         fetchProductDetails();
//             }, [id]);

//         if (error) return <div className="text-red-500">{error}</div>;
//         if (!product) return <div>Loading...</div>;

//     return (
//         <div c lassName="flex flex-col md:flex-row items-center bg-slate-100 shadow-md rounded-lg border-2 border-lime-200  p-6 mx-9 space-y-6 md:space-y-0 md:space-x-8">

//             {/* Image Section */}
//             <img 
//             className="rounded-lg w-full md:w-1/3 object-cover" 
//             src={product.images[0][1]} 
//             alt={product.title} 
//             />


//             {/* Product Info */}
//             <div className="flex flex-col w-full md:w-2/3 space-y-4">
//                 <h1 className="text-3xl font-bold text-gray-800">Name: {product.title}</h1>
//                 <h6 className="text-xl font-semibold text-white-600">Category: {product.category}</h6>
//                 <p className="text-gray-600 leading-relaxed">{product.price}</p>
//                 <p className="text-gray-600">
//                 <strong className="text-black">Description:</strong> {product.description}
//                 </p>
//             </div>


//             {/* Button Section */}
//             <div className="flex gap-5">
            
//                 <Link
//                 className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-100"
//                 href={'/BuyNow/'+id}
//                 >
//                 Buy Now
//                 </Link>

//                 <button
//                 onClick={() => router.push('/cart')}
//                     type="button"
//                     className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-100"
//                 >
//                     Add to Cart
//                 </button>
            
//         </div>
//         </div>

//     );
// };

// export default ProductDetails;


'use client';
import { IconBrandRevolut, IconFileDescription, IconNote } from '@tabler/icons-react';
import axios from 'axios';

import { useParams, useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';


function ViewPage() {

  const [productData, setproductData] = useState(null);
  const { id } = useParams();
  const router = useRouter();

  const fetchproductData = async () => {
    console.log(id);

    const res = await axios.get(`http://localhost:5000/product/getbyid/${id}`);
    console.log(res.data);
    setproductData(res.data);
  }

  useEffect(() => {
    fetchproductData()
  }, [])

  const Products = {
    title: ' ',
   
    category: '',
    images: '[]',
    price: '',
    
    description: ''

  };

  if (productData === null) {
    return <h1>Loading ... </h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 ">
      <header className=" text-white p-4 shadow-md bg-green-600">
        <div className="container mx-auto ">
        <h1 className='text-2xl text-center font-bold mb-6 '>  Product Details</h1>
        </div>
      </header>
      <main className="container mx-auto p-8">
        <div className="flex flex-col lg:flex-row space-x-8">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <img
              className="w-full h-80 object-cover rounded-lg shadow-lg"
              src={productData.images[0][1]}
              alt={productData.title}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">{productData.title}</h2>
      
            <div className="flex items-center mb-4 gap-3">
              < IconBrandRevolut/>
              <p className="text-2xl font-bold text-gray-900"> ₹{productData.price}</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-4">{productData.category}</p>
            {/* <p className="text-lg text-gray-700 mb-6">{productData.description}</p> */}
          <IconFileDescription />  <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
  {productData.description
    .split(',') // Split the string into an array by the period (adjust if separator differs)
    .filter((feature) => feature.trim() !== "") // Remove empty items
    .map((feature, index) => (
      <li key={index}>{feature.trim()}</li>
    ))}
</ul>


          </div>
        </div>
      </main>


    </div>
  );
}

export default ViewPage;