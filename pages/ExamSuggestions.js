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

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          BOU Exam Suggestions
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
          <div className="mb-4">
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
            </select>
          </div>

          <div className="mb-4">
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
            </select>
          </div>

          {semester && (
            <div className="mb-4">
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
              </select>
            </div>
          )}

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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ExamSuggestions.displayName = 'ExamSuggestions';

export default ExamSuggestions;
