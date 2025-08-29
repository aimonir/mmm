import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
<<<<<<< HEAD

import { db } from '../firebase/config';

import Sidebar from "../components/Sidebar"; // Sidebar component

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle password submission
  const handleLogin = () => {
    const adminPassword = "11690"; // Change this to your password
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  // Fetch data from Firestore after authentication
  useEffect(() => {
    if (isAuthenticated) {
=======
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
>>>>>>> dev
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
<<<<<<< HEAD
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow w-96">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 mb-4"
          />
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </div>
=======
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Loading...</p>
>>>>>>> dev
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
<<<<<<< HEAD
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Student Requests</h1>
        {loading ? (
          <p className="text-gray-600">Loading requests...</p>
        ) : (
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
        )}
=======
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
>>>>>>> dev
      </div>
    </div>
  );
}
