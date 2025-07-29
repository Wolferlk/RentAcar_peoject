// Web/src/pages/WriteReview.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

const WriteReview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the review data to your backend
    console.log(`Vehicle ID: ${id}, Rating: ${rating}, Feedback: ${feedback}`);
    alert('Review submitted successfully!');
    navigate('/dashboard'); // Redirect to the dashboard or another page after submission
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Rate Vehicle</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  <Star />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Feedback</label>
            <textarea
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Write your feedback here..."
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteReview;
