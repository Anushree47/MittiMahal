// 'use client';
// import Card from '@/components/Card';
// import useCartContext from '@/context/CartContext';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';


// const productPage = () => {

//   const [product, setproducts] = useState([]);
//   const { addToCart } = useCartContext();

//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [searchKeyword, setSearchKeyword] = useState('');

//   const router = useRouter()
//   const handleSearch = () => {

//   };
//   //fetch tool from backend 

//   const fetchtools = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/product/getall');
//       setproducts(response.data);
//       console.log(response.data);

//     } catch (error) {
//       console.error('Error fetching tools:', error);

//     }
//   };

//   useEffect(() => {
//     fetchtools();
//   }, []);
//   useEffect(() => {
    

//   }, [])


//   // Handle dropdown change
//   const handleFilterChange = (e) => {
//     setSelectedCategory(e.target.value);
//   };

//   // Filtered tool based on selected category
//   const filteredProduct = product.filter(
//     (tool) => (selectedCategory === 'All' || tool.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()) && tool.title.toLowerCase().includes(searchKeyword.toLowerCase())
//   );



//   return (
//     <div className='p-6 bg-gradient-to-r from-[#7F5539] to-[#E6CCB2]'>
//       <h1 className='text-2xl text-center font-bold mb-6 '> Our Products </h1>
//       <div className="p-6 bg-gray-100">
//         <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#7F5539] to-[#E6CCB2]">Find Clay Product Near You</h2>
//         <div className="flex justify-center">
//           <input
//             type="text"
//             placeholder="Search product..."
//             value={searchKeyword}
//             onChange={e => setSearchKeyword(e.target.value)}
//             className="px-4 py-2 w-1/2 border rounded-l-lg bg-gradient-to-r from-[#7F5539] to-[#E6CCB2]"
//           />
//           <button
//             onClick={handleSearch}
//             className="px-6 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-500"    >
//             Search
//           </button>
//         </div>
//       </div>

//       {/* Filter Dropdown */}
//       <div className="mb-6 flex justify-center">
//         <label htmlFor="productFilter" className="mr-4 font-bold">Filter by Category:</label>
//         <select
//           id="productFilter"
//           value={selectedCategory}
//           onChange={handleFilterChange}
//           className="border p-2 rounded"
//         >
//           <option value="" disabled>Select Category</option>
//           <option value="ALL">ALL</option>
//           <option value="Home Decor">Home Decor</option>
//           <option value="Kitchen and Dining">Kitchen and Dining</option>
//           <option value="Garden Essentials">Garden Essentials</option>
//           <option value="Toy and Miniature">Toy and Miniature</option>
//           <option value="Custom and Personalized Item">Custom and Personalized Item</option>
//           <option value="Art and Craft Supplies">Art and Craft Supplies</option>
//         </select>
//       </div>

//       {/* product Grid */}
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  '>
//         {filteredProduct.map((product, index) => (
//           <Card
//             addToCart={addToCart}
//             key={index}
//             title={product.title}

//             // description={tools.description.substring(0,30 )}
//             images={product.images[0]}
//             id={product._id}//Pass PRODUCT ID to card

//             category={product.Category || 'unknown'} // Pass tool
//             detailedDescription={product.detailedDescription || 'No details available'}

//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default productPage;
'use client';
import Card from '@/components/Card';
import useCartContext from '@/context/CartContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const productPage = () => {
  const [product, setProducts] = useState([]);
  const { cart, addToCart } = useCartContext();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchKeyword, setSearchKeyword] = useState('');
  const router = useRouter();

  const fetchTools = async () => {
    try {
      const response = await axios.get('http://localhost:5000/product/getall');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const handleFilterChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProduct = product.filter(
    (tool) =>
      (selectedCategory === 'All' || tool.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()) &&
      tool.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className='p-6 bg-gradient-to-r from-[#7F5539] to-[#E6CCB2]'>
      <h1 className='text-2xl text-center font-bold mb-6'> Our Products </h1>
      <div className='p-6 bg-gray-100'>
        <h2 className='text-2xl font-bold text-center mb-4 bg-gradient-to-r from-[#7F5539] to-[#E6CCB2]'>Find Clay Product Near You</h2>
        <div className='flex justify-center'>
          <input
            type='text'
            placeholder='Search product...'
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className='px-4 py-2 w-1/2 border rounded-l-lg bg-gradient-to-r from-[#7F5539] to-[#E6CCB2]'
          />
        </div>
      </div>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {filteredProduct.map((product, index) => (
          <Card
            key={index}
            title={product.title}
            images={product.images[0]}
            id={product._id}
            category={product.Category || 'unknown'}
            detailedDescription={product.detailedDescription || 'No details available'}
            buttonText={cart.some((item) => item._id === product._id) ? 'Go to Cart' : 'Add to Cart'}
            buttonAction={() => {
              if (cart.some((item) => item._id === product._id)) {
                router.push('/user/cart');
              } else {
                addToCart(product);
                toast.success(`${product.title} added to cart!`);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default productPage;