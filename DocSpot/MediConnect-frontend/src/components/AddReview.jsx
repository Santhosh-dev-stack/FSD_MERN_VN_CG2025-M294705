import { useState } from 'react';
import API from '../api/axios';

const AddReview = ({ appointmentId, onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const submit = async () => {
    try {
      await API.post('/reviews', { appointmentId, rating, comment });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="font-semibold mb-2">Leave a Review</h4>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border p-2 rounded mb-2 w-full"
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} ⭐
          </option>
        ))}
      </select>

      <textarea
        placeholder="Your feedback"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <button onClick={submit} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
        Submit Review
      </button>
    </div>
  );
};

export default AddReview;
