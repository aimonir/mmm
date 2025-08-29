import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from '../firebase/config';
import { useRouter } from 'next/router';
import Sidebar from "../components/Sidebar"; // Sidebar component

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (user) {
      const fetchRequests = async () => {
        setLoading(true);
        try {
          const querySnapshot = await getDocs(collection(db, "requests"));
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRequests(data);
        } catch (err) {
          console.error("Error fetching requests:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchRequests();
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Student Requests</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-100 border-b">
                <th className="p-3 font-medium text-gray-700">#</th>
                <th className="p-3 font-medium text-gray-700">Program</th>
                <th className="p-3 font-medium text-gray-700">Year</th>
                <th className="p-3 font-medium text-gray-700">Semester</th>
                <th className="p-3 font-medium text-gray-700">Subject</th>
                <th className="p-3 font-medium text-gray-700">Student</th>
                <th className="p-3 font-medium text-gray-700">Email</th>
                <th className="p-3 font-medium text-gray-700">Message</th>
                <th className="p-3 font-medium text-gray-700">Created At</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{req.programName}</td>
                  <td className="p-3">{req.examYear}</td>
                  <td className="p-3">{req.semester || "N/A"}</td>
                  <td className="p-3">{req.subject}</td>
                  <td className="p-3">{req.studentName}</td>
                  <td className="p-3">{req.email}</td>
                  <td className="p-3">{req.message || "No message"}</td>
                  <td className="p-3">{new Date(req.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}