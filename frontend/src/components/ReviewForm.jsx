// 'use client';
// import { useState } from 'react';
// import axios from 'axios';
// import t from 'star-rating-react-component';
// import toast from 'react-hot-toast';

// const ReviewForm = ({ itemId, onClose }) => {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');
 
//   const [showForm, setShowForm] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate rating and comment
//     if (rating < 1 || rating > 5) {
//       setError('Please provide a valid rating between 1 and 5.');
//       return;
//     }

//     if (comment.trim() === '') {
//       setError('Please provide a comment.');
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const userId = JSON.parse(localStorage.getItem('user'))._id; // Assuming user ID is stored in localStorage
      
//       const response = await axios.post(
//         'http://localhost:5000/review/add',
//         { userId, itemId, rating, comment },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
      
//       if (response.status === 201) {
//         toast.success('Review submitted successfully!');
//         onClose(); // Close the form after submission
//       }
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       toast.error('Failed to submit review. Please try again later.');
//     }
//   };

//   return (
//     <div className="mt-6">
//       {!showForm ? (
//         <button
//           className="text-blue-500 underline"
//           onClick={() => setShowForm(true)}
//         >
//           Write a Review
//         </button>
//       ) : (
//         <form onSubmit={handleSubmit} className="mt-4">
//           <div className="mb-4">
//             <label className="block text-gray-700">Rating</label>
//             <select
//               className="w-full p-2 border border-gray-300"
//               value={rating}
//               onChange={(e) => setRating(Number(e.target.value))}
//             >
//               <option value="0">Select Rating</option>
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <option key={star} value={star}>
//                   {star} {star === 1 ? 'star' : 'stars'}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Comment</label>
//             <textarea
//               className="w-full p-2 border border-gray-300"
//               rows="4"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-500 text-white"
//           >
//             Submit Review
//           </button>
//         </form>
//       )}

      
//     </div>
//   );
// };

// export default ReviewForm;


'use client';

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';

const ReviewForm = ({ itemId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      toast.error('Please provide a rating by selecting stars.');
      return;
    }

    if (comment.trim() === '') {
      toast.error('Please add a comment.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const userId = JSON.parse(localStorage.getItem('user'))._id;

      const response = await axios.post(
        'http://localhost:5000/review/add',
        { userId, itemId, rating, comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        toast.success('Review submitted successfully!');
        onClose();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error('Failed to submit review. Try again later.');
    }
  };

  return (
    <div className="mt-6">
      
        <form
          onSubmit={handleSubmit}
          className="mt-4 p-4 bg-white shadow-lg rounded-2xl border border-gray-200"
        >
          <div className="mb-4">
            <label className="block text-black font-medium mb-2">Rating</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-3xl transition ${
                    (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-black font-medium mb-2">Comment</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-900 text-white font-semibold rounded-xl hover:bg-yellow-600 transition"
          >
            Submit Review
          </button>
        </form>
      
    </div>
  );
};

export default ReviewForm;

