import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';




export default function AdminRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const querySnapshot = await getDocs(collection(db, 'requests'));
      const requestData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRequests(requestData);
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Student Requests</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Program</th>
                <th className="border p-2">Semester</th>
                <th className="border p-2">Subject</th>
                <th className="border p-2">Message</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-100">
                  <td className="border p-2">{request.studentName}</td>
                  <td className="border p-2">{request.email}</td>
                  <td className="border p-2">{request.programName}</td>
                  <td className="border p-2">{request.semester}</td>
                  <td className="border p-2">{request.subject}</td>
                  <td className="border p-2">{request.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
