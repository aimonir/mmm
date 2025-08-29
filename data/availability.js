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
<<<<<<< HEAD
    programName: 'BA and BSS',
    examYear: '2022',
    semester: '২য় সিমেস্টার',
    subjects: [
=======
    programName: 'BA & BSS',
    examYear: '2023',
    semester: '1st Semester',
    subjects: [
      'BBA-1301: বাংলা ভাষা-১ (সাহিত্য)',
      'BEN-1301: English Language Skills',
      'BCE-1301: সিভিক্স এন্ড সিটিজেনশিপ-১',
      'BCE-1302: সিভিক্স এন্ড সিটিজেনশিপ-২',
      'বাংলা ভাষা-১: সাহিত্য',
      'English Language Skills',
      'সিভিক এডুকেশন-১',
      'সিভিক এডুকেশন-২',
    ],
  },
  {
    programName: 'BA & BSS',
    examYear: '2023',
    semester: '2nd Semester',
    subjects: [
      'BBA-2302: বাংলা ভাষা-২ (অভিধান)',
      'BHI-2301: ইতিহাস',
      'BPH-2301: দর্শন পরিচিতি',
      'BIS-2301: ইসলামিক স্টাডিজ',
      'BPO-2301: রাষ্ট্রবিজ্ঞান',
      'BEC-2301: অর্থনীতি',
      'BSO-2301: সমাজতত্ত্ব',
      'BGE-2301: ভূগোল ও পরিবেশ',
>>>>>>> dev
      'বাংলা ভাষা-২',
      'ইতিহাস-১',
      'দর্শন পরিচিতি',
      'ইসলামিক স্টাডিজ-১',
      'রাষ্ট্রবিজ্ঞান-১',
    ],
  },
  {
<<<<<<< HEAD
    programName: 'BA and BSS',
    examYear: '2023',
    semester: '১ম সিমেস্টার',
    subjects: [
      'বাংলা ভাষা-১: সাহিত্য',
      'English Language Skills',
      'সিভিক এডুকেশন-১',
      'সিভিক এডুকেশন-২',
=======
    programName: 'BA & BSS',
    examYear: '2023',
    semester: '3rd Semester',
    subjects: [
      'BHI-3302: ইতিহাস-২',
      'BPH-3302: দর্শন-২',
      'BIS-3302: ইসলামিক স্টাডিজ-২',
      'BPO-3302: রাষ্ট্রবিজ্ঞান-২',
      'BEC-3302: অর্থনীতির মূলনীতি',
      'BSO-3302: সমাজতত্ত্ব-২',
      'BGE-3302: ভূগোল ও পরিবেশ-২'
    ],
  },
  {
    programName: 'BA & BSS',
    examYear: '2023',
    semester: '4th Semester',
    subjects: [
      'BHI-4303: ইতিহাস-৩',
      'BPH-4303: মুসলিম দর্শন ও প্রতীতি',
      'BIS-4303: ইসলামিক স্টাডিজ-৩',
      'BPO-4303: রাষ্ট্রবিজ্ঞান-৩',
      'BEC-4303: অর্থনীতি-৩',
      'BSO-4303: সমাজতত্ত্ব-৩',
      'BGE-4303: ভূগোল ও পরিবেশ-৩'
    ],
  },
  {
    programName: 'BA & BSS',
    examYear: '2023',
    semester: '5th Semester',
    subjects: [
      'BHI-5304: ইতিহাস-৪',
      'BPH-5304: দর্শন-৪',
      'BIS-5304: ইসলামিক স্টাডিজ-৪',
      'BPO-5304: রাষ্ট্রবিজ্ঞান-৪',
      'BEC-5304: অর্থনীতি-৪',
      'BSO-5304: সমাজতত্ত্ব-৪',
      'BGE-5304: ভূগোল ও পরিবেশ-৪'
    ],
  },
  {
    programName: 'BA & BSS',
    examYear: '2023',
    semester: '6th Semester',
    subjects: [
      'BHI-6305: ইতিহাস-৫',
      'BPH-6305: দর্শন-৫',
      'BIS-6305: ইসলামিক স্টাডিজ-৫',
      'BPO-6305: রাষ্ট্রবিজ্ঞান-৫',
      'BEC-6305: গাণিতিক অর্থনীতি',
      'BSO-6305: সমাজতত্ত্ব-৫',
      'BGE-6305: ভূগোল ও পরিবেশ-৫'
>>>>>>> dev
    ],
  },
];

// Subject-to-module mapping
export const subjectMapping = {
<<<<<<< HEAD
  'বাংলা ভাষা-১: সাহিত্য': 'Bangla1',
  'English Language Skills': 'EnglishSkills',
  'সিভিক এডুকেশন-১': 'CivicEducation1',
  'সিভিক এডুকেশন-২': 'CivicEducation2',
=======
  'BBA-1301: বাংলা ভাষা-১ (সাহিত্য)': 'BBA1301',
  'BEN-1301: English Language Skills': 'BEN1301',
  'BCE-1301: সিভিক্স এন্ড সিটিজেনশিপ-১': 'BCE1301',
  'BCE-1302: সিভিক্স এন্ড সিটিজেনশিপ-২': 'BCE1302',
  'BBA-2302: বাংলা ভাষা-২ (অভিধান)': 'BBA2302',
  'BHI-2301: ইতিহাস': 'BHI2301',
  'BPH-2301: দর্শন পরিচিতি': 'BPH2301',
  'BIS-2301: ইসলামিক স্টাডিজ': 'BIS2301',
  'BPO-2301: রাষ্ট্রবিজ্ঞান': 'BPO2301',
  'BEC-2301: অর্থনীতি': 'BEC2301',
  'BSO-2301: সমাজতত্ত্ব': 'BSO2301',
  'BGE-2301: ভূগোল ও পরিবেশ': 'BGE2301',
  'BHI-3302: ইতিহাস-২': 'BHI3302',
  'BPH-3302: দর্শন-২': 'BPH3302',
  'BIS-3302: ইসলামিক স্টাডিজ-২': 'BIS3302',
  'BPO-3302: রাষ্ট্রবিজ্ঞান-২': 'BPO3302',
  'BEC-3302: অর্থনীতির মূলনীতি': 'BEC3302',
  'BSO-3302: সমাজতত্ত্ব-২': 'BSO3302',
  'BGE-3302: ভূগোল ও পরিবেশ-২': 'BGE3302',
  'BHI-4303: ইতিহাস-৩': 'BHI4303',
  'BPH-4303: মুসলিম দর্শন ও প্রতীতি': 'BPH4303',
  'BIS-4303: ইসলামিক স্টাডিজ-৩': 'BIS4303',
  'BPO-4303: রাষ্ট্রবিজ্ঞান-৩': 'BPO4303',
  'BEC-4303: অর্থনীতি-৩': 'BEC4303',
  'BSO-4303: সমাজতত্ত্ব-৩': 'BSO4303',
  'BGE-4303: ভূগোল ও পরিবেশ-৩': 'BGE4303',
  'BHI-5304: ইতিহাস-৪': 'BHI5304',
  'BPH-5304: দর্শন-৪': 'BPH5304',
  'BIS-5304: ইসলামিক স্টাডিজ-৪': 'BIS5304',
  'BPO-5304: রাষ্ট্রবিজ্ঞান-৪': 'BPO5304',
  'BEC-5304: অর্থনীতি-৪': 'BEC5304',
  'BSO-5304: সমাজতত্ত্ব-৪': 'BSO5304',
  'BGE-5304: ভূগোল ও পরিবেশ-৪': 'BGE5304',
  'BHI-6305: ইতিহাস-৫': 'BHI6305',
  'BPH-6305: দর্শন-৫': 'BPH6305',
  'BIS-6305: ইসলামিক স্টাডিজ-৫': 'BIS6305',
  'BPO-6305: রাষ্ট্রবিজ্ঞান-৫': 'BPO6305',
  'BEC-6305: গাণিতিক অর্থনীতি': 'BEC6305',
  'BSO-6305: সমাজতত্ত্ব-৫': 'BSO6305',
  'BGE-6305: ভূগোল ও পরিবেশ-৫': 'BGE6305',
>>>>>>> dev
  'বাংলা ভাষা-২': 'Bangla2',
  'ইতিহাস-১': 'History1',
  'দর্শন পরিচিতি': 'PhilosophyIntro',
  'ইসলামিক স্টাডিজ-১': 'IslamicStudies1',
  'রাষ্ট্রবিজ্ঞান-১': 'PoliticalScience1',
<<<<<<< HEAD
=======
  'বাংলা ভাষা-১: সাহিত্য': 'Bangla1',
  'English Language Skills': 'EnglishSkills',
  'সিভিক এডুকেশন-১': 'CivicEducation1',
  'সিভিক এডুকেশন-২': 'CivicEducation2',
>>>>>>> dev
};
