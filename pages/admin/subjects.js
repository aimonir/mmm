import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Sidebar from '../../components/Sidebar';

export default function ManageSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [newSubject, setNewSubject] = useState({
    programName: '',
    semester: '',
    subjectName: '',
  });
  const [loading, setLoading] = useState(false);
  const [filterSemester, setFilterSemester] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' }); // { text: '...', type: 'success' | 'error' }

  const semesters = ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester'];

  useEffect(() => {
    const fetchSubjectsAndPrograms = async () => {
      setLoading(true);
      setMessage({ text: '', type: '' }); // Clear previous messages
      try {
        const programsSnapshot = await getDocs(collection(db, 'programs'));
        const programsData = programsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPrograms(programsData);
        if (programsData.length > 0) {
          setNewSubject((prev) => ({ ...prev, programName: programsData[0].name }));
        }

        let q = collection(db, 'subjects');
        if (filterSemester) {
          q = query(q, where('semester', '==', filterSemester));
        }
        const subjectsSnapshot = await getDocs(q);
        const subjectsData = subjectsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setSubjects(subjectsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage({ text: 'Failed to fetch data.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchSubjectsAndPrograms();
  }, [filterSemester]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubject((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' }); // Clear previous messages
    if (!newSubject.programName.trim() || !newSubject.semester.trim() || !newSubject.subjectName.trim()) {
      setMessage({ text: 'Please fill out all fields.', type: 'error' });
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'subjects'), newSubject);
      setNewSubject({ programName: programs[0]?.name || '', semester: '', subjectName: '' });
      setMessage({ text: 'Subject added successfully!', type: 'success' });
      // Refresh list
      let q = collection(db, 'subjects');
      if (filterSemester) {
        q = query(q, where('semester', '==', filterSemester));
      }
      const querySnapshot = await getDocs(q);
      const subjectsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSubjects(subjectsData);
    } catch (error) {
      console.error('Error adding subject:', error);
      setMessage({ text: 'Failed to add subject.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubject = async (id, subjectName) => {
    if (window.confirm(`Are you sure you want to delete the subject: ${subjectName}?`)) {
      setLoading(true);
      setMessage({ text: '', type: '' }); // Clear previous messages
      try {
        await deleteDoc(doc(db, 'subjects', id));
        setMessage({ text: 'Subject deleted successfully!', type: 'success' });
        // Refresh list
        let q = collection(db, 'subjects');
        if (filterSemester) {
          q = query(q, where('semester', '==', filterSemester));
        }
        const querySnapshot = await getDocs(q);
        const subjectsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setSubjects(subjectsData);
      } catch (error) {
        console.error('Error deleting subject:', error);
        setMessage({ text: 'Failed to delete subject.', type: 'error' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Manage Subjects</h1>
        
        {message.text && (
          <div className={`p-3 mb-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        {/* Add new subject form */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">Add New Subject</h2>
          <form onSubmit={handleAddSubject}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <select name="programName" value={newSubject.programName} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg">
                {programs.map(program => <option key={program.id} value={program.name}>{program.name}</option>)}
              </select>
              <select name="semester" value={newSubject.semester} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg">
                <option value="">Select Semester</option>
                {semesters.map(semester => <option key={semester} value={semester}>{semester}</option>)}
              </select>
              <input type="text" name="subjectName" value={newSubject.subjectName} onChange={handleInputChange} placeholder="Subject Name" className="w-full p-3 border border-gray-300 rounded-lg" required />
            </div>
            <button type="submit" disabled={loading} className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              {loading ? 'Adding...' : 'Add Subject'}
            </button>
          </form>
        </div>

        {/* List of existing subjects */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Existing Subjects</h2>
          <div className="mb-4">
            <label htmlFor="filterSemester" className="block text-lg font-medium text-gray-700 mb-2">Filter by Semester</label>
            <select id="filterSemester" value={filterSemester} onChange={(e) => setFilterSemester(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg">
              <option value="">All Semesters</option>
              {semesters.map(semester => <option key={semester} value={semester}>{semester}</option>)}
            </select>
          </div>
          {loading ? <p>Loading...</p> : (
            <div className="space-y-4">
              {subjects.map((subject) => (
                <div key={subject.id} className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{subject.subjectName}</h3>
                    <p className="text-sm text-gray-500">{subject.programName} - {subject.semester}</p>
                  </div>
                  <button onClick={() => handleDeleteSubject(subject.id, subject.subjectName)} disabled={loading} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
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
