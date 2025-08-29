<<<<<<< HEAD
/* eslint-disable react/display-name */


import React, { useState } from 'react';

const ExamSuggestions = () => {
  const [examYear, setExamYear] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [SuggestionComponent, setSuggestionComponent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const subjectsBySemester = {
    '১ম সিমেস্টার': [
      'বাংলা ভাষা-১: সাহিত্য',
      'English Language Skills',
      'সিভিক এডুকেশন-১',
      'সিভিক এডুকেশন-২',
    ],
    '২য় সিমেস্টার': [
      'বাংলা ভাষা-২',
      'ইতিহাস-১',
      'দর্শন পরিচিতি',
      'ইসলামিক স্টাডিজ-১',
      'রাষ্ট্রবিজ্ঞান-১',
      'অর্থনীতি-১',
      'সমাজতত্ত্ব-১',
      'ভূগোল ও পরিবেশ-১',
    ],
  };

  const subjectMapping = {
    'বাংলা ভাষা-১: সাহিত্য': 'Bangla1',
    'English Language Skills': 'EnglishSkills',
    'সিভিক এডুকেশন-১': 'CivicEducation1',
    'সিভিক এডুকেশন-২': 'CivicEducation2',
    'বাংলা ভাষা-২': 'Bangla2',
    'ইতিহাস-১': 'History1',
    'দর্শন পরিচিতি': 'PhilosophyIntro',
    'ইসলামিক স্টাডিজ-১': 'IslamicStudies1',
    'রাষ্ট্রবিজ্ঞান-১': 'PoliticalScience1',
    'অর্থনীতি-১': 'Economics1',
    'সমাজতত্ত্ব-১': 'Sociology1',
    'ভূগোল ও পরিবেশ-১': 'Geography1',
  };

  const availableModules = ['PoliticalScience122'];

  const handleShowSuggestions = async () => {
    if (!subject || !examYear) {
      alert('Please select both an exam year and subject!');
      return;
    }
  
    const mappedSubject = subjectMapping[subject];
    const yearSuffix = examYear.slice(-2);
    const moduleKey = `${mappedSubject}${yearSuffix}`;
  
    if (!availableModules.includes(moduleKey)) {
      alert('Suggestions are not available for the selected subject and year.');
      return;
    }
  
    try {
      const importedModule = await import(`./suggestions/${moduleKey}.js`);
      const Component = importedModule.default;
  
      // Wrap the dynamically imported component
      const WrappedComponent = (props) => <Component {...props} />;
      WrappedComponent.displayName = `Suggestion_${moduleKey}`; // Explicitly set displayName
  
      // Use a higher-order function to return the wrapped component
      setSuggestionComponent(() => WrappedComponent);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      setSuggestionComponent(() => () => (
        <div className="text-red-500 text-center">
          <p>Suggestions not available for the selected subject and year.</p>
        </div>
      ));
      setIsModalOpen(true);
    }
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSuggestionComponent(null);
  };

  const getAvailableSubjects = () => {
    const yearSuffix = examYear.slice(-2);
    return (subjectsBySemester[semester] || []).map((subject) => {
      const mappedSubject = subjectMapping[subject];
      const isAvailable = mappedSubject && availableModules.includes(`${mappedSubject}${yearSuffix}`);
      return { name: subject, isAvailable };
    });
  };
=======
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

const ExamSuggestions = () => {
  const [programName, setProgramName] = useState('BA & BSS');
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
>>>>>>> dev

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          BOU Exam Suggestions
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
          <div className="mb-4">
<<<<<<< HEAD
            <label
              htmlFor="examYear"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Select Exam Year
            </label>
            <select
              id="examYear"
              value={examYear}
              onChange={(e) => setExamYear(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
            >
              <option value="">Select Year</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
=======
            <label htmlFor="examYear" className="block text-lg font-medium text-gray-700 mb-2">Select Exam Year</label>
            <select id="examYear" value={examYear} onChange={(e) => setExamYear(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg">
              <option value="">Select Year</option>
              {uniqueYears.map(year => <option key={year} value={year}>{year}</option>)}
>>>>>>> dev
            </select>
          </div>

          <div className="mb-4">
<<<<<<< HEAD
            <label
              htmlFor="semester"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Select Semester
            </label>
            <select
              id="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
            >
              <option value="">Select Semester</option>
              {Object.keys(subjectsBySemester).map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
=======
            <label htmlFor="semester" className="block text-lg font-medium text-gray-700 mb-2">Select Semester</label>
            <select id="semester" value={semester} onChange={(e) => setSemester(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg">
              <option value="">Select Semester</option>
              {uniqueSemesters.map(sem => <option key={sem} value={sem}>{sem}</option>)}
>>>>>>> dev
            </select>
          </div>

          {semester && (
            <div className="mb-4">
<<<<<<< HEAD
              <label
                htmlFor="subject"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Select Subject
              </label>
              <select
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
              >
                <option value="">Select Subject</option>
                {getAvailableSubjects().map(({ name, isAvailable }) => (
                  <option key={name} value={name} disabled={!isAvailable}>
                    {name} {!isAvailable && '(Unavailable)'}
                  </option>
                ))}
=======
              <label htmlFor="subject" className="block text-lg font-medium text-gray-700 mb-2">Select Subject</label>
              <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg">
                <option value="">Select Subject</option>
                {filteredSubjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
>>>>>>> dev
              </select>
            </div>
          )}

<<<<<<< HEAD
          <button
            onClick={handleShowSuggestions}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
          >
            Show Suggestions
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 overflow-hidden relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✖
            </button>
            <div className="p-6">
              {SuggestionComponent ? <SuggestionComponent /> : <p>Loading...</p>}
=======
          <button onClick={handleShowSuggestions} className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">Show Suggestions</button>
        </div>
      </div>

      {isModalOpen && selectedSuggestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 overflow-hidden relative">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-600 hover:text-black">✖</button>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedSuggestion.subject}</h2>
              <div style={{whiteWhiteSpace: 'pre-wrap'}}>{selectedSuggestion.content}</div>
>>>>>>> dev
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

<<<<<<< HEAD
ExamSuggestions.displayName = 'ExamSuggestions';

=======
>>>>>>> dev
export default ExamSuggestions;
