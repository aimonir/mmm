import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config'; // Correct usage for named export


export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    feedback: '',
    rating: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.studentName || !formData.email || !formData.feedback) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      // Save the feedback to Firestore
      await addDoc(collection(db, 'feedbacks'), {
        ...formData,
        createdAt: new Date().toISOString(),
      });
      setIsSubmitted(true); // Show success message
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError('Failed to submit your feedback. Please try again later.');
    } finally {
      setLoading(false);
      setFormData({
        studentName: '',
        email: '',
        feedback: '',
        rating: '',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Student Feedback Form
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Student Name */}
            <div className="mb-4">
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email address"
                required
              />
            </div>

            {/* Feedback */}
            <div className="mb-4">
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
                Your Feedback
              </label>
              <textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your feedback or comments"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Rating */}
            <div className="mb-4">
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                Rating (Optional)
              </label>
              <select
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a rating</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-bold text-green-600 mb-4">Thank you for your feedback!</h3>
            <p>Your feedback helps us improve our services.</p>
          </div>
        )}
      </div>
    </div>
  );
}
