

'use client';
import { IconBrandRevolut, IconFileDescription } from '@tabler/icons-react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

const ProductDetails = () => {

function ViewPage() {
  const [productData, setProductData] = useState(null);
  

  const { id } = useParams();
 

  useEffect(() => {
    fetchProductData();
  
  }, []);

  const fetchProductData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/product/getbyid/${id}`);
      setProductData(res.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  if (!productData) {
    return <h1 className="text-center text-xl text-gray-700 mt-10">Loading ... </h1>;
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
              {productData.images.map((img, index) => (
                <img key={index} src={img} alt={`Product ${index + 1}`} className="w-60 h-60 object-cover rounded-lg shadow-lg border-2 border-[#8B5E3B]" />
              ))}
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

            {/* Review Form */}
            {/* <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#8B5E3B] mb-4">Write a Review</h3>
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Rating:</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <IconStarFilled
                        key={star}
                        className={`cursor-pointer ${star <= userReview.rating ? "text-yellow-500" : "text-gray-300"}`}
                        onClick={() => setUserReview({ ...userReview, rating: star })}
                        size={28}
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Your Review:</label>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    rows="4"
                    placeholder="Write your experience..."
                    value={userReview.reviewText}
                    onChange={(e) => setUserReview({ ...userReview, reviewText: e.target.value })}
                  />
                </div>
                <button type="submit" className="px-4 py-2 bg-[#8B5E3B] text-white rounded-md hover:bg-[#6D4C41]">
                  Submit Review
                </button>
              </form>
            </div> */}

            {/* Display Reviews */}
            {/* <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#8B5E3B] mb-4">Reviews</h3>
              {reviews.length === 0 ? (
                <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
              ) : (
                reviews.map((review) => (
                  <div key={review._id} className="border-b py-4">
                    <p className="text-lg font-medium text-gray-800">{review.user.name}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <IconStarFilled key={i} size={20} className={i < review.rating ? "text-yellow-500" : "text-gray-300"} />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.reviewText}</p>
                  </div>
                ))
              )}    */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );

