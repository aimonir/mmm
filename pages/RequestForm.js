import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase/config'; // Correct usage for named export


export default function RequestForm() {
  const [formData, setFormData] = useState({
    programName: "",
    examYear: "",
    semester: "",
    subject: "",
    message: "",
    studentName: "",
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!formData.programName || !formData.examYear || !formData.subject || !formData.studentName || !formData.email) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      // Save the request to Firestore
      await addDoc(collection(db, "requests"), {
        ...formData,
        createdAt: new Date().toISOString(),
      });
      setIsSubmitted(true); // Mark submission as successful
    } catch (error) {
      console.error("Error submitting the request:", error);
      setError("Failed to submit your request. Please try again later.");
    } finally {
      setLoading(false);
      // Reset form after submission
      setFormData({
        programName: "",
        examYear: "",
        semester: "",
        subject: "",
        message: "",
        studentName: "",
        email: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Request Exam Suggestions
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            {/* Display error message */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Program Name */}
            <div className="mb-4">
              <label htmlFor="programName" className="block text-sm font-medium text-gray-700">
                Program Name
              </label>
              <input
                type="text"
                id="programName"
                name="programName"
                value={formData.programName}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter program name"
                required
              />
            </div>

            {/* Exam Year */}
            <div className="mb-4">
              <label htmlFor="examYear" className="block text-sm font-medium text-gray-700">
                Exam Year
              </label>
              <input
                type="number"
                id="examYear"
                name="examYear"
                value={formData.examYear}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter exam year (e.g., 2023)"
                required
              />
            </div>

            {/* Semester */}
            <div className="mb-4">
              <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
                Semester
              </label>
              <input
                type="text"
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter semester (e.g., ১ম সিমেস্টার)"
              />
            </div>

            {/* Subject */}
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter subject name"
                required
              />
            </div>

            {/* Message */}
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Additional Details (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Provide additional details or comments"
                rows="4"
              ></textarea>
            </div>

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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-bold text-green-600 mb-4">Thank you for your request!</h3>
            <p>We have received your request. Our team will review it and get back to you soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
