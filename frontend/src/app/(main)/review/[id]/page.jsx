// 'use client';
// import { IconStarFilled } from '@tabler/icons-react';
// import axios from 'axios';
// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';

// function ViewPage() {
//     const [reviews, setReviews] = useState([]);
//     const [userReview, setUserReview] = useState({ rating: 0, reviewText: '' });
//     const { id } = useParams();
//     const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

//     useEffect(() => {
//         fetchReviews();
//     }, []);

//     const fetchReviews = async () => {
//         try {
//             const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/review/${id}`);
//             setReviews(res.data); // Assuming res.data is an array of reviews
//         } catch (error) {
//             console.error("Error fetching reviews:", error);
//         }
//     };

//     const handleReviewSubmit = async (e) => {
//         e.preventDefault();
//         if (!token) {
//             alert("You must be logged in to submit a review.");
//             return;
//         }

//         try {
//             const res = await axios.post('${process.env.NEXT_PUBLIC_API_URI}/review/add', {
//                 product: id,
//                 rating: userReview.rating,
//                 reviewText: userReview.reviewText
//             });

//             setReviews([...reviews, res.data.review]); // Assuming `res.data.review` is the new review
//             setUserReview({ rating: 0, reviewText: '' }); // Reset form
//         } catch (error) {
//             console.error("Error submitting review:", error);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-[#F5EFE7]">
//             <main className="container mx-auto p-8">
//                 <div className="flex flex-col lg:flex-row lg:space-x-12">
//                     <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
//                         {/* You can put product image/details here */}
//                     </div>

//                     <div className="w-full lg:w-1/2">
//                         {/* Review Form */}
//                         <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
//                             <h3 className="text-xl font-semibold text-[#8B5E3B] mb-4">Write a Review</h3>
//                             <form onSubmit={handleReviewSubmit}>
//                                 <div className="mb-4">
//                                     <label className="block text-gray-700 font-medium">Rating:</label>
//                                     <div className="flex space-x-2">
//                                         {[1, 2, 3, 4, 5].map((star) => (
//                                             <IconStarFilled
//                                                 key={star}
//                                                 className={`cursor-pointer ${star <= userReview.rating ? "text-yellow-500" : "text-gray-300"}`}
//                                                 onClick={() => setUserReview({ ...userReview, rating: star })}
//                                                 size={28}
//                                             />
//                                         ))}
//                                     </div>
//                                 </div>
//                                 <div className="mb-4">
//                                     <label className="block text-gray-700 font-medium">Your Review:</label>
//                                     <textarea
//                                         className="w-full p-2 border rounded-md"
//                                         rows="4"
//                                         placeholder="Write your experience..."
//                                         value={userReview.reviewText}
//                                         onChange={(e) => setUserReview({ ...userReview, reviewText: e.target.value })}
//                                     />
//                                 </div>
//                                 <button type="submit" className="px-4 py-2 bg-[#8B5E3B] text-white rounded-md hover:bg-[#6D4C41]">
//                                     Submit Review
//                                 </button>
//                             </form>
//                         </div>

//                         {/* Display Reviews */}
//                         <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
//                             <h3 className="text-xl font-semibold text-[#8B5E3B] mb-4">Reviews</h3>
//                             {Array.isArray(reviews) && reviews.length === 0 ? (
//                                 <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
//                             ) : (
//                                 reviews.map((review) => (
//                                     <div key={review._id} className="border-b py-4">
//                                         <p className="text-lg font-medium text-gray-800">{review.user?.name || "Anonymous"}</p>
//                                         <div className="flex">
//                                             {[...Array(5)].map((_, i) => (
//                                                 <IconStarFilled key={i} size={20} className={i < review.rating ? "text-yellow-500" : "text-gray-300"} />
//                                             ))}
//                                         </div>
//                                         <p className="text-gray-700">{review.reviewText}</p>
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }

// export default ViewPage;
'use client';
import { IconStarFilled } from '@tabler/icons-react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function ViewPage() {
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState({ rating: 0, reviewText: '' });
  const { id } = useParams();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    if (id) fetchReviews();
  }, [id]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/review/product/${id}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!token || !userId) {
      alert("You must be logged in to submit a review.");
      return;
    }

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/review/add`, {
        user: userId,
        product: id,
        rating: userReview.rating,
        reviewText: userReview.reviewText
      });

      setReviews((prev) => [...prev, res.data.review]);
      setUserReview({ rating: 0, reviewText: '' });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE7]">
      <main className="container mx-auto p-8">
        <div className="flex flex-col lg:flex-row lg:space-x-12">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            {/* Product details or image can go here */}
          </div>

          <div className="w-full lg:w-1/2">
            {/* Review Form */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
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
            </div>

            {/* Display Reviews */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#8B5E3B] mb-4">Reviews</h3>
              {reviews.length === 0 ? (
                <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
              ) : (
                reviews.map((review) => (
                  <div key={review._id} className="border-b py-4">
                    <p className="text-lg font-medium text-gray-800">{review.user?.name || "Anonymous"}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <IconStarFilled
                          key={i}
                          size={20}
                          className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.reviewText}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ViewPage;
