import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Sidebar from '../../components/Sidebar';

export default function ManageSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [newSuggestion, setNewSuggestion] = useState({
    programName: '',
    examYear: '',
    semester: '',
    subject: '',
    content: [],
    suggestionType: '',
  });
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // { text: '...', type: 'success' | 'error' }
  const [editingSuggestionId, setEditingSuggestionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(''); // For adding individual questions
  const [currentQuestionType, setCurrentQuestionType] = useState('essay'); // Default type

  const questionTypes = [
    { value: 'essay', label: 'রচনামূলক প্রশ্ন' },
    { value: 'short', label: 'সংক্ষিপ্ত উত্তরমূলক প্রশ্ন' },
  ];

  const suggestionTypes = [
    { value: '', label: 'Select Type' },
    { value: 'final', label: 'Final Exam' },
    { value: 'midterm', label: 'Midterm' },
    { value: 'quiz', label: 'Quiz' },
    { value: 'assignment', label: 'Assignment' },
  ];

  const examYears = ['2024', '2025', '2026'];
  const semesters = ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester'];

  useEffect(() => {
    const fetchSuggestionsAndPrograms = async () => {
      setLoading(true);
      setMessage({ text: '', type: '' }); // Clear previous messages
      try {
        const suggestionsSnapshot = await getDocs(collection(db, 'suggestions'));
        const suggestionsData = suggestionsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setSuggestions(suggestionsData);

        const programsSnapshot = await getDocs(collection(db, 'programs'));
        const programsData = programsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPrograms(programsData);
        if (programsData.length > 0) {
          setNewSuggestion((prev) => ({ ...prev, programName: programsData[0].name, content: [] }));
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setMessage({ text: 'Failed to fetch initial data.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchSuggestionsAndPrograms();
  }, []);

    
  
  
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchSubjects = async () => {
      const { programName, semester } = newSuggestion;
      if (programName && semester) {
        setLoading(true);
        setMessage({ text: '', type: '' }); // Clear previous messages
        try {
          const q = query(
            collection(db, 'subjects'),
            where('programName', '==', programName),
            where('semester', '==', semester)
          );
          const querySnapshot = await getDocs(q);
          const subjectsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setSubjects(subjectsData);
          if (subjectsData.length > 0 && !editingSuggestionId) {
            setNewSuggestion((prev) => ({ ...prev, subject: subjectsData[0].subjectName }));
          } else if (!editingSuggestionId) {
            setNewSuggestion((prev) => ({ ...prev, subject: '' }));
          }
        } catch (error) {
          console.error('Error fetching subjects:', error);
          setMessage({ text: 'Failed to fetch subjects.', type: 'error' });
        } finally {
          setLoading(false);
        }
      } else {
        setSubjects([]);
        setNewSuggestion((prev) => ({ ...prev, subject: '', content: [] }));
      }
    };
    fetchSubjects();
  }, [newSuggestion.programName, newSuggestion.semester]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSuggestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddQuestion = () => {
    if (currentQuestion.trim()) {
      setNewSuggestion((prev) => ({
        ...prev,
        content: [...prev.content, { text: currentQuestion.trim(), isImportant: false, type: currentQuestionType, sl: prev.content.length + 1 }],
      }));
      setCurrentQuestion('');
    }
  };

  const handleRemoveQuestion = (indexToRemove) => {
    setNewSuggestion((prev) => ({
      ...prev,
      content: prev.content.filter((_, index) => index !== indexToRemove).map((item, idx) => ({ ...item, sl: idx + 1 })), // Re-number after removal
    }));
  };

  const handleEditSuggestion = (suggestion) => {
    setNewSuggestion({
      programName: suggestion.programName,
      examYear: suggestion.examYear,
      semester: suggestion.semester,
      subject: suggestion.subject,
      content: suggestion.content ? suggestion.content.map((item, idx) => ({ ...item, type: item.type || 'essay', sl: idx + 1 })) : [], // Ensure content is an array and each item has a type and sl
      suggestionType: suggestion.suggestionType || '',
    });
    setEditingSuggestionId(suggestion.id);
  };

  const handleCancelEdit = () => {
    setNewSuggestion({ programName: programs[0]?.name || '', examYear: '', semester: '', subject: '', content: [], suggestionType: '' });
    setEditingSuggestionId(null);
  };

  const handleSubmitSuggestion = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' }); // Clear previous messages
    if (!newSuggestion.subject.trim() || newSuggestion.content.length === 0 || !newSuggestion.suggestionType.trim()) {
      setMessage({ text: 'Please fill out at least the subject, add some content (questions), and select a suggestion type.' , type: 'error' });
      return;
    }
    setLoading(true);
    try {
      if (editingSuggestionId) {
        // Update existing suggestion
        const suggestionRef = doc(db, 'suggestions', editingSuggestionId);
        await updateDoc(suggestionRef, newSuggestion);
        setMessage({ text: 'Suggestion updated successfully!', type: 'success' });
      } else {
        // Add new suggestion
        await addDoc(collection(db, 'suggestions'), newSuggestion);
        setMessage({ text: 'Suggestion added successfully!', type: 'success' });
      }
      setNewSuggestion({ programName: programs[0]?.name || '', examYear: '', semester: '', subject: '', content: [], suggestionType: '' });
      setEditingSuggestionId(null); // Exit edit mode
      // Refresh list
      const querySnapshot = await getDocs(collection(db, 'suggestions'));
      const suggestionsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSuggestions(suggestionsData);
    } catch (error) {
      console.error('Error saving suggestion:', error);
      setMessage({ text: `Failed to ${editingSuggestionId ? 'update' : 'add'} suggestion.`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSuggestion = async (id) => {
    if (window.confirm('Are you sure you want to delete this suggestion?')) {
      setLoading(true);
      setMessage({ text: '', type: '' }); // Clear previous messages
      try {
        await deleteDoc(doc(db, 'suggestions', id));
        setMessage({ text: 'Suggestion deleted successfully!', type: 'success' });
        // Refresh list
        const querySnapshot = await getDocs(collection(db, 'suggestions'));
        const suggestionsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setSuggestions(suggestionsData);
      } catch (error) {
        console.error('Error deleting suggestion:', error);
        setMessage({ text: 'Failed to delete suggestion.', type: 'error' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Manage Suggestions</h1>
        
        {message.text && (
          <div className={`p-3 mb-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        {/* Add new suggestion form */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">{editingSuggestionId ? 'Edit Suggestion' : 'Add New Suggestion'}</h2>
          <form onSubmit={handleSubmitSuggestion}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <select name="programName" value={newSuggestion.programName} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg">
                {programs.map(program => <option key={program.id} value={program.name}>{program.name}</option>)}
              </select>
              <select name="examYear" value={newSuggestion.examYear} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg">
                <option value="">Select Year</option>
                {examYears.map(year => <option key={year} value={year}>{year}</option>)}
              </select>
              <select name="semester" value={newSuggestion.semester} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg">
                <option value="">Select Semester</option>
                {semesters.map(semester => <option key={semester} value={semester}>{semester}</option>)}
              </select>
              <select name="suggestionType" value={newSuggestion.suggestionType} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg">
                {suggestionTypes.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
              </select>
              <select name="subject" value={newSuggestion.subject} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg" required>
                <option value="">Select Subject</option>
                {subjects.map(subject => <option key={subject.id} value={subject.subjectName}>{subject.subjectName}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="questionInput" className="block text-lg font-medium text-gray-700 mb-2">Add Questions</label>
              <div className="flex space-x-2 mb-2">
                <select
                  value={currentQuestionType}
                  onChange={(e) => setCurrentQuestionType(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg"
                >
                  {questionTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                <input
                  type="text"
                  id="questionInput"
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  placeholder="Enter question text"
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Add Question
                </button>
              </div>
              <div className="mt-4 space-y-4">
                {questionTypes.map((type) => {
                  const typedQuestions = newSuggestion.content.filter(q => q.type === type.value);
                  return typedQuestions.length > 0 && (
                    <div key={type.value}>
                      <h3 className="text-xl font-semibold mb-2">{type.label}</h3>
                      <div className="space-y-2">
                        {typedQuestions.map((q, index) => (
                          <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg bg-gray-50">
                            <input
                              type="text"
                              value={`${q.sl}. ${q.text}`}
                              onChange={(e) => {
                                const updatedContent = [...newSuggestion.content];
                                const originalIndex = newSuggestion.content.findIndex(item => item === q); // Find original index
                                // Extract text after the serial number and dot
                                const newText = e.target.value.replace(/^\d+\.\s*/, '');
                                updatedContent[originalIndex].text = newText;
                                setNewSuggestion((prev) => ({ ...prev, content: updatedContent }));
                              }}
                              className="flex-1 p-2 border border-gray-300 rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveQuestion(newSuggestion.content.findIndex(item => item === q))}
                              className="ml-4 text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                {loading ? (editingSuggestionId ? 'Updating...' : 'Adding...') : (editingSuggestionId ? 'Update Suggestion' : 'Add Suggestion')}
              </button>
              {editingSuggestionId && (
                <button type="button" onClick={handleCancelEdit} className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600">
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List of existing suggestions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Existing Suggestions</h2>
          {loading ? <p>Loading...</p> : (
            <div className="space-y-4">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{suggestion.subject}</h3>
                    <p className="text-sm text-gray-500">{suggestion.programName} - {suggestion.examYear} - {suggestion.semester}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditSuggestion(suggestion)} disabled={loading} className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteSuggestion(suggestion.id)} disabled={loading} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
