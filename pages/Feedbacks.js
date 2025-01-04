import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/config'; // Correct usage for named export

import Sidebar from "../components/Sidebar"; // Sidebar component

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "feedbacks")); // Replace "feedbacks" with your Firestore collection name
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeedbacks(data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        setError("Failed to fetch feedbacks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Feedbacks</h1>
        {loading ? (
          <p>Loading feedbacks...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-100 border-b">
                  <th className="p-3 font-medium text-gray-700">#</th>
                  <th className="p-3 font-medium text-gray-700">Name</th>
                  <th className="p-3 font-medium text-gray-700">Email</th>
                  <th className="p-3 font-medium text-gray-700">Feedback</th>
                  <th className="p-3 font-medium text-gray-700">Rating</th>
                  <th className="p-3 font-medium text-gray-700">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((fb, index) => (
                  <tr key={fb.id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{fb.studentName}</td>
                    <td className="p-3">{fb.email}</td>
                    <td className="p-3">{fb.feedback}</td>
                    <td className="p-3">{fb.rating || "N/A"}</td>
                    <td className="p-3">{new Date(fb.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
