<<<<<<< HEAD
import React from 'react';

import { availableModules, availabilityData, subjectMapping } from '../data/availability';

// Helper function to check availability
const isSubjectAvailable = (subject, examYear) => {
  const mappedSubject = subjectMapping[subject];
  if (!mappedSubject) return false;

  const yearSuffix = examYear.slice(-2); // Last two digits of the year
  const moduleKey = `${mappedSubject}${yearSuffix}`;
  return availableModules.includes(moduleKey);
};

export default function Availability() {
=======
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const getSemesterNumber = (semesterString) => {
  const match = semesterString.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

export default function Availability() {
  const [suggestions, setSuggestions] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const suggestionsSnapshot = await getDocs(collection(db, 'suggestions'));
      const suggestionsData = suggestionsSnapshot.docs.map(doc => doc.data());
      setSuggestions(suggestionsData);

      const subjectsSnapshot = await getDocs(collection(db, 'subjects'));
      const subjectsData = subjectsSnapshot.docs.map(doc => doc.data());
      setAllSubjects(subjectsData);
    };
    fetchData();
  }, []);

  const isSubjectAvailable = (programName, semester, subjectName) => {
    return suggestions.some(s => 
      s.programName === programName && 
      s.semester === semester && 
      s.subject === subjectName
    );
  };

  // Group subjects by program and semester
  const groupedSubjects = allSubjects.reduce((acc, subject) => {
    const key = `${subject.programName}-${subject.semester}`;
    if (!acc[key]) {
      acc[key] = {
        programName: subject.programName,
        semester: subject.semester,
        subjects: new Set(), // Use a Set to store unique subjects
      };
    }
    acc[key].subjects.add(subject.subjectName);
    return acc;
  }, {});

  const displayData = Object.values(groupedSubjects).sort((a, b) => {
    const semesterA = getSemesterNumber(a.semester);
    const semesterB = getSemesterNumber(b.semester);
    return semesterA - semesterB;
  }).map(item => ({
    ...item,
    subjects: Array.from(item.subjects).sort(), // Convert Set to Array and sort alphabetically
  }));

>>>>>>> dev
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Available Exam Suggestions</h1>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Program Name</th>
<<<<<<< HEAD
                <th className="px-6 py-3 text-left text-sm font-medium">Exam Year</th>
=======
>>>>>>> dev
                <th className="px-6 py-3 text-left text-sm font-medium">Semester</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Subjects</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
<<<<<<< HEAD
              {availabilityData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.programName}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.examYear}</td>
=======
              {displayData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.programName}</td>
>>>>>>> dev
                  <td className="px-6 py-4 text-sm text-gray-700">{item.semester}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {item.subjects.map((subject, subIndex) => {
<<<<<<< HEAD
                        const available = isSubjectAvailable(subject, item.examYear);
=======
                        const available = isSubjectAvailable(item.programName, item.semester, subject);
>>>>>>> dev
                        return (
                          <li
                            key={subIndex}
                            className={available ? 'text-green-600 font-bold' : 'text-red-600'}
                          >
                            {subject} {available ? '(Available)' : '(Not Available)'}
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
