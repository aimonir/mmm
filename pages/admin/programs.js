import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Sidebar from '../../components/Sidebar';

export default function ManagePrograms() {
  const [programs, setPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // { text: '...', type: 'success' | 'error' }

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'programs'));
        const programsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPrograms(programsData);
      } catch (error) {
        console.error('Error fetching programs:', error);
        setMessage({ text: 'Failed to fetch programs.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const handleInputChange = (e) => {
    setNewProgram(e.target.value);
  };

  const handleAddProgram = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' }); // Clear previous messages
    if (!newProgram.trim()) {
      setMessage({ text: 'Please enter a program name.', type: 'error' });
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'programs'), { name: newProgram.trim() });
      setNewProgram('');
      setMessage({ text: 'Program added successfully!', type: 'success' });
      // Refresh list
      const querySnapshot = await getDocs(collection(db, 'programs'));
      const programsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPrograms(programsData);
    } catch (error) {
      console.error('Error adding program:', error);
      setMessage({ text: 'Failed to add program.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProgram = async (id, programName) => {
    if (window.confirm(`Are you sure you want to delete the program: ${programName}?`)) {
      setLoading(true);
      setMessage({ text: '', type: '' }); // Clear previous messages
      try {
        await deleteDoc(doc(db, 'programs', id));
        setMessage({ text: 'Program deleted successfully!', type: 'success' });
        // Refresh list
        const querySnapshot = await getDocs(collection(db, 'programs'));
        const programsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPrograms(programsData);
      } catch (error) {
        console.error('Error deleting program:', error);
        setMessage({ text: 'Failed to delete program.', type: 'error' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Manage Programs</h1>
        
        {message.text && (
          <div className={`p-3 mb-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        {/* Add new program form */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">Add New Program</h2>
          <form onSubmit={handleAddProgram}>
            <div className="flex gap-4 mb-4">
              <input type="text" name="programName" value={newProgram} onChange={handleInputChange} placeholder="Program Name" className="w-full p-3 border border-gray-300 rounded-lg" />
              <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">
                {loading ? 'Adding...' : 'Add Program'}
              </button>
            </div>
          </form>
        </div>

        {/* List of existing programs */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Existing Programs</h2>
          {loading ? <p>Loading...</p> : (
            <div className="space-y-4">
              {programs.map((program) => (
                <div key={program.id} className="p-4 border rounded-lg flex justify-between items-center">
                  <h3 className="font-bold">{program.name}</h3>
                  <button onClick={() => handleDeleteProgram(program.id, program.name)} disabled={loading} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
