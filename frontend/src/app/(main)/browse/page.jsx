'use client';
// import Card from '@/components/Card';
// import useCartContext from '@/context/CartContext';
// import { IconSearch } from '@tabler/icons-react';
// import axios from 'axios';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';

// const ProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const { cart, addToCart } = useCartContext();
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   // Get category from URL query params
//   const categoryFromUrl = searchParams.get('category') || 'All';
//   const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
//   const [searchKeyword, setSearchKeyword] = useState('');

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     setSelectedCategory(categoryFromUrl);
//   }, [categoryFromUrl]);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/product/getall');
//       setProducts(response.data);
//       console.log(response.data);
      
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handleFilterChange = (e) => {
//     setSelectedCategory(e.target.value);
//     router.push(`/browse?category=${encodeURIComponent(e.target.value)}`);
//   };

//   const filteredProducts = products.filter(
//     (product) =>
//       (selectedCategory === 'All' ||
//         product.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()) &&
//       product.title.toLowerCase().includes(searchKeyword.toLowerCase())
//   );

//   return (
//     <div className='min-h-screen p-8 bg-gray-100'>
//       <h1 className='text-3xl font-bold text-center text-[#5a3e2b] mb-8'>Our Exclusive Clay Products</h1>

//       {/* Search Bar */}
//       <div className="relative w-full max-w-lg my-4 mx-auto">
//         <input
//           type="text"
//           placeholder="Search product..."
//           value={searchKeyword}
//           onChange={(e) => setSearchKeyword(e.target.value)}
//           className="w-full px-6 py-3 pr-16 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-600 border border-[#5a3e2b]"
//         />
//         <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-900 text-white px-5 py-2 rounded-full flex items-center gap-1 hover:bg-yellow-600">
//           <IconSearch /> Search
//         </button>
//       </div>

//       {/* Filter Dropdown */}
//       <div className='flex justify-center mb-6'>
//         <select
//           id='productFilter'
//           value={selectedCategory}
//           onChange={handleFilterChange}
//           className='border border-[#5a3e2b] px-4 py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#d89b64] bg-white text-[#5a3e2b]'
//         >
//           <option value='All'>All Categories</option>
//           <option value='Home Decor'>Home Decor</option>
//           <option value='Kitchen and Dining'>Kitchen and Dining</option>
//           <option value='Garden Essentials'>Garden Essentials</option>
//           <option value='Toy and Miniature'>Toy and Miniature</option>
//           <option value='Custom and Personalized Item'>Custom & Personalized</option>
//           <option value='Art and Craft Supplies'>Art & Craft Supplies</option>
//         </select>
//       </div>

//       {/* Product Grid */}
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
//         {filteredProducts.map((product, index) => (
//           <Card
//             key={index}
//             price={product.price}
//             title={product.title}
//             images={product.images[0]}
//             id={product._id}
//             category={product.category || 'Unknown'}
//             detailedDescription={product.detailedDescription || 'No details available'}
//             buttonText={cart.some((item) => item._id === product._id) ? 'Go to Cart' : 'Add to Cart'}
//             buttonAction={() => {
//               if (cart.some((item) => item._id === product._id)) {
//                 console.log("Navigating to cart...");
//                 router.push('/user/cart');
//               } else {
//                 addToCart(product);
//                 toast.success(`${product.title} added to cart!`);
//               }
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

// 'use client';
// import Card from '@/components/Card';
// import useCartContext from '@/context/CartContext';
// import { IconSearch } from '@tabler/icons-react';
// import axios from 'axios';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';

// const ProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const { cart, addToCart } = useCartContext();
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   // Get category from URL query params
//   const categoryFromUrl = searchParams.get('category') || 'All';
//   const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
//   const [searchKeyword, setSearchKeyword] = useState('');

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     setSelectedCategory(categoryFromUrl);
//   }, [categoryFromUrl]);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/product/getall');
//       setProducts(response.data);
//       console.log("Fetched Products:", response.data);
      
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handleFilterChange = (e) => {
//     setSelectedCategory(e.target.value);
//     router.push(`/browse?category=${encodeURIComponent(e.target.value)}`);
//   };

//   const filteredProducts = products.filter(
//     (product) =>
//       (selectedCategory === 'All' ||
//         product.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()) &&
//       product.title.toLowerCase().includes(searchKeyword.toLowerCase())
//   );

//   return (
//     <div className='min-h-screen p-8 bg-gray-100'>
//       <h1 className='text-3xl font-bold text-center text-[#5a3e2b] mb-8'>Our Exclusive Clay Products</h1>

//       {/* Search Bar */}
//       <div className="relative w-full max-w-lg my-4 mx-auto">
//         <input
//           type="text"
//           placeholder="Search product..."
//           value={searchKeyword}
//           onChange={(e) => setSearchKeyword(e.target.value)}
//           className="w-full px-6 py-3 pr-16 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-600 border border-[#5a3e2b]"
//         />
//         <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-900 text-white px-5 py-2 rounded-full flex items-center gap-1 hover:bg-yellow-600">
//           <IconSearch /> Search
//         </button>
//       </div>

//       {/* Filter Dropdown */}
//       <div className='flex justify-center mb-6'>
//         <select
//           id='productFilter'
//           value={selectedCategory}
//           onChange={handleFilterChange}
//           className='border border-[#5a3e2b] px-4 py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#d89b64] bg-white text-[#5a3e2b]'
//         >
//           <option value='All'>All Categories</option>
//           <option value='Home Decor'>Home Decor</option>
//           <option value='Kitchen and Dining'>Kitchen and Dining</option>
//           <option value='Garden Essentials'>Garden Essentials</option>
//           <option value='Toy and Miniature'>Toy and Miniature</option>
//           <option value='Custom and Personalized Item'>Custom & Personalized</option>
//           <option value='Art and Craft Supplies'>Art & Craft Supplies</option>
//         </select>
//       </div>

//       {/* Product Grid */}
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
//         {filteredProducts.map((product) => (
//           <Card
//             key={product._id}
//             price={product.price}
//             title={product.title}
//             images={product.images[0]}
//             id={product._id}
//             category={product.category || 'Unknown'}
//             detailedDescription={product.detailedDescription || 'No details available'}
//             buttonText="Add to Cart"
//             buttonAction={() => {
//               console.log("Adding product to cart:", product._id);  // Debugging Log
//               addToCart({ 
//                 _id: product._id,
//                 title: product.title,
//                 images: product.images[0],
//                 price: product.price,
//                 quantity: 1
//               });
//               toast.success(`${product.title} added to cart!`);
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;





'use client';
import Card from '@/components/Card';
import useCartContext from '@/context/CartContext';
import { IconSearch } from '@tabler/icons-react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const { cart, addToCart } = useCartContext();
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryFromUrl = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  // const fetchProducts = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/product/getall');
  //     const updatedProducts = response.data.map(p => ({ ...p, _id: p._id || p.id })); // ✅ Ensuring `_id`
  //     setProducts(updatedProducts);
  //     console.log("Fetched Products:", updatedProducts);
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   }
  // };
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/product/getall');
      console.log("Fetched Products:", response.data); // ✅ Check if `_id` is present
  
      const updatedProducts = response.data.map(p => ({
        ...p,
        _id: p._id || p.id, // ✅ Ensure `_id` exists
      }));
  
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  const handleFilterChange = (e) => {
    setSelectedCategory(e.target.value);
    router.push(`/browse?category=${encodeURIComponent(e.target.value)}`);
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === 'All' ||
        product.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()) &&
      product.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className='min-h-screen p-8 bg-gray-100'>
      <h1 className='text-3xl font-bold text-center text-[#5a3e2b] mb-8'>Our Exclusive Clay Products</h1>

      {/* Search Bar */}
      <div className="relative w-full max-w-lg my-6 mx-auto">
        <input
          type="text"
          placeholder="Search product..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="w-full px-4 py-3 pr-16 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-600"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-900 text-white px-5 py-2 rounded-full flex items-center gap-1 hover:bg-yellow-600">
          <IconSearch /> Search
        </button>
      </div>

      {/* Filter Dropdown */}
      <div className='flex justify-center mb-6'>
        <select
          id='productFilter'
          value={selectedCategory}
          onChange={handleFilterChange}
          className='border border-gray-300 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-600 bg-white text-gray-700'
        >
          <option value='All'>All Categories</option>
          <option value='Home Decor'>Home Decor</option>
          <option value='Kitchen and Dining'>Kitchen and Dining</option>
          <option value='Garden Essentials'>Garden Essentials</option>
          <option value='Toy and Miniature'>Toy and Miniature</option>
          <option value='Custom and Personalized Item'>Custom & Personalized</option>
          <option value='Art and Craft Supplies'>Art & Craft Supplies</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {filteredProducts.map((product) => (
          <Card
            key={product._id}
            id={product._id}
            title={product.title}
            price={product.price}
            images={product.images[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
