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
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Available Exam Suggestions</h1>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Program Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Exam Year</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Semester</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Subjects</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {availabilityData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.programName}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.examYear}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.semester}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {item.subjects.map((subject, subIndex) => {
                        const available = isSubjectAvailable(subject, item.examYear);
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
