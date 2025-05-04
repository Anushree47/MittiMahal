"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/review/product/${productId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="mb-4 p-4 border-b">
            <h3 className="font-semibold text-lg">{review.name}</h3>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewList;
