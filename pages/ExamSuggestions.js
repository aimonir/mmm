import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const ExamSuggestions = () => {
  const [programName] = useState('BA & BSS');
  const [examYear, setExamYear] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [allSubjectsData, setAllSubjectsData] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      const suggestionsSnapshot = await getDocs(collection(db, 'suggestions'));
      const suggestionsData = suggestionsSnapshot.docs.map(doc => doc.data());
      setSuggestions(suggestionsData);

      const subjectsSnapshot = await getDocs(collection(db, 'subjects'));
      const subjectsData = subjectsSnapshot.docs.map(doc => doc.data());
      setAllSubjectsData(subjectsData);
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (programName && examYear && semester) {
      const filtered = allSubjectsData.filter(
        (s) => s.programName === programName && s.examYear === examYear && s.semester === semester
      );
      setFilteredSubjects(filtered.map(s => s.subjectName));
    } else {
      setFilteredSubjects([]);
    }
    setSubject('');
  }, [programName, examYear, semester, allSubjectsData]);

  const handleShowSuggestions = () => {
    if (!subject) {
      alert('Please select a subject.');
      return;
    }
    const suggestion = suggestions.find(s => 
      s.programName === programName &&
      s.examYear === examYear && 
      s.semester === semester && 
      s.subject === subject
    );
    if (suggestion) {
      setSelectedSuggestion(suggestion);
      setIsModalOpen(true);
    } else {
      alert('Suggestions not found for the selected criteria.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSuggestion(null);
  };

  const uniqueYears = [...new Set(allSubjectsData.map(s => s.examYear))];
  const uniqueSemesters = [...new Set(allSubjectsData.map(s => s.semester))];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          BOU Exam Suggestions
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
          <div className="mb-4">
            <label htmlFor="examYear" className="block text-lg font-medium text-gray-700 mb-2">Select Exam Year</label>
            <select id="examYear" value={examYear} onChange={(e) => setExamYear(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg">
              <option value="">Select Year</option>
              {uniqueYears.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="semester" className="block text-lg font-medium text-gray-700 mb-2">Select Semester</label>
            <select id="semester" value={semester} onChange={(e) => setSemester(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg">
              <option value="">Select Semester</option>
              {uniqueSemesters.map(sem => <option key={sem} value={sem}>{sem}</option>)}
            </select>
          </div>

          {semester && (
            <div className="mb-4">
              <label htmlFor="subject" className="block text-lg font-medium text-gray-700 mb-2">Select Subject</label>
              <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg">
                <option value="">Select Subject</option>
                {filteredSubjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
              </select>
            </div>
          )}

          <button onClick={handleShowSuggestions} className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">Show Suggestions</button>
        </div>
      </div>

      {isModalOpen && selectedSuggestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 flex flex-col max-h-full">
            <div className="flex justify-between items-center p-4 bg-blue-600 text-white rounded-t-lg">
              <h2 className="text-2xl font-bold">{selectedSuggestion.subject}</h2>
              <button onClick={closeModal} className="text-white hover:text-gray-200 text-2xl">✖</button>
            </div>
            <div className="p-6 overflow-y-auto bg-gray-100">
              <div style={{whiteSpace: 'pre-wrap'}}>{selectedSuggestion.content.map((item, index) => {
                const isImportant = item.isImportant;
                const itemClasses = `p-3 rounded-lg mb-2 ${
                  isImportant
                    ? 'bg-yellow-200 border-l-4 border-yellow-500'
                    : index % 2 === 0
                    ? 'bg-white'
                    : 'bg-gray-50'
                }`;
                return (
                  <div key={index} className={itemClasses}>
                    {isImportant && <span className="font-bold text-yellow-600 mr-2">★</span>}
                    {item.text}
                  </div>
                );
              })}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamSuggestions;