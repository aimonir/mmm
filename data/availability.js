// Centralized configuration file for availability data

// Available suggestion modules (e.g., mapped to suggestion files)
export const availableModules = [
  'Bangla122',
  'PoliticalScience122',
  // Add more modules as suggestion files are added
];

// Data for programs, years, semesters, and subjects
export const availabilityData = [
  {
    programName: 'BA and BSS',
    examYear: '2022',
    semester: '২য় সিমেস্টার',
    subjects: [
      'বাংলা ভাষা-২',
      'ইতিহাস-১',
      'দর্শন পরিচিতি',
      'ইসলামিক স্টাডিজ-১',
      'রাষ্ট্রবিজ্ঞান-১',
    ],
  },
  {
    programName: 'BA and BSS',
    examYear: '2023',
    semester: '১ম সিমেস্টার',
    subjects: [
      'বাংলা ভাষা-১: সাহিত্য',
      'English Language Skills',
      'সিভিক এডুকেশন-১',
      'সিভিক এডুকেশন-২',
    ],
  },
];

// Subject-to-module mapping
export const subjectMapping = {
  'বাংলা ভাষা-১: সাহিত্য': 'Bangla1',
  'English Language Skills': 'EnglishSkills',
  'সিভিক এডুকেশন-১': 'CivicEducation1',
  'সিভিক এডুকেশন-২': 'CivicEducation2',
  'বাংলা ভাষা-২': 'Bangla2',
  'ইতিহাস-১': 'History1',
  'দর্শন পরিচিতি': 'PhilosophyIntro',
  'ইসলামিক স্টাডিজ-১': 'IslamicStudies1',
  'রাষ্ট্রবিজ্ঞান-১': 'PoliticalScience1',
};
