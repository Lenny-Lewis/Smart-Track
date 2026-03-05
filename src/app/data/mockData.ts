// Mock data for Smart Track system - Kenyan University Edition

export type UserRole = 'admin' | 'lecturer' | 'advisor' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  avatar?: string;
}

export interface Student {
  id: string;
  studentId: string; // Admission number
  name: string;
  email: string;
  department: string;
  year: number;
  gpa: number;
  attendanceRate: number;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  avatar?: string;
  enrolledCourses: string[];
  feeBalance: number;
  helbStatus?: string;
  hostel?: string;
  nationalId?: string;
  phoneNumber?: string;
  county?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  lecturer: string;
  credits: number;
  enrolledStudents: number;
  averageGrade: number;
  semester: string;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  courseName: string;
  grade: number;
  letter: string;
  semester: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
}

export interface Alert {
  id: string;
  studentId: string;
  studentName: string;
  type: 'GPA' | 'Attendance' | 'Grade Drop' | 'Failed Assessment' | 'Fee Balance' | 'Exam Card';
  severity: 'Low' | 'Medium' | 'High';
  message: string;
  date: string;
  status: 'New' | 'Viewed' | 'Resolved';
}

export interface Intervention {
  id: string;
  studentId: string;
  studentName: string;
  type: 'Academic Advising' | 'Tutoring' | 'Counseling' | 'Mentoring' | 'Financial Aid';
  description: string;
  assignedTo: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  createdDate: string;
  completedDate?: string;
}

export interface MLPrediction {
  model: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
}

export interface FeePayment {
  id: string;
  studentId: string;
  amount: number;
  date: string;
  semester: string;
  paymentMethod: string;
  receiptNumber: string;
}

export interface IndustrialAttachment {
  id: string;
  studentId: string;
  company: string;
  startDate: string;
  endDate: string;
  status: 'Ongoing' | 'Completed' | 'Pending Approval';
  supervisor: string;
}

// Kenyan University Grading System
export const kenyanGradingSystem = {
  'A': { min: 70, max: 100, description: 'First Class Honours' },
  'B': { min: 60, max: 69, description: 'Upper Second Class Honours' },
  'C': { min: 50, max: 59, description: 'Lower Second Class Honours' },
  'D': { min: 40, max: 49, description: 'Pass' },
  'E': { min: 0, max: 39, description: 'Fail' },
};

export const getLetterGrade = (score: number): string => {
  if (score >= 70) return 'A';
  if (score >= 60) return 'B';
  if (score >= 50) return 'C';
  if (score >= 40) return 'D';
  return 'E';
};

export const getGradePoints = (letter: string): number => {
  const points: Record<string, number> = { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1 };
  return points[letter] || 0;
};

export const currentUser: User = {
  id: '1',
  name: 'Dr. Wanjiku Kamau',
  email: 'w.kamau@university.ac.ke',
  role: 'admin',
  department: 'Information Technology',
};

export const users: User[] = [
  currentUser,
  { id: '2', name: 'Terresa Trizah', email: 'terresa.trizah@university.ac.ke', role: 'lecturer', department: 'Information Technology' },
  { id: '3', name: 'Dr. Peter Mwangi', email: 'p.mwangi@university.ac.ke', role: 'lecturer', department: 'Computer Science' },
  { id: '4', name: 'Prof. Grace Njeri', email: 'g.njeri@university.ac.ke', role: 'lecturer', department: 'Information Technology' },
  { id: '5', name: 'Dr. James Ochieng', email: 'j.ochieng@university.ac.ke', role: 'advisor', department: 'Information Technology' },
  { id: '6', name: 'Ms. Faith Wambui', email: 'f.wambui@university.ac.ke', role: 'advisor', department: 'Computer Science' },
  { id: '7', name: 'Lennox Lewis Odhiambo', email: 'lennox.odhiambo@student.ac.ke', role: 'student', department: 'Information Technology' },
];

export const students: Student[] = [
  {
    id: 'S001',
    studentId: 'IN17/00141/23',
    name: 'Lennox Lewis Odhiambo',
    email: 'lennox.odhiambo@student.ac.ke',
    department: 'Information Technology',
    year: 3,
    gpa: 3.2,
    attendanceRate: 85,
    riskScore: 28,
    riskLevel: 'Low',
    enrolledCourses: ['BIT 312', 'BIT 314', 'BIT 316', 'BIT 318', 'BIT 320'],
    feeBalance: 15000,
    helbStatus: 'Active',
    hostel: 'Block C, Room 204',
    nationalId: '32456789',
    phoneNumber: '+254712345678',
    county: 'Kisumu',
  },
  {
    id: 'S002',
    studentId: 'IN17/00245/23',
    name: 'Akinyi Atieno Omondi',
    email: 'akinyi.omondi@student.ac.ke',
    department: 'Information Technology',
    year: 3,
    gpa: 4.2,
    attendanceRate: 92,
    riskScore: 12,
    riskLevel: 'Low',
    enrolledCourses: ['BIT 312', 'BIT 314', 'BIT 316', 'BIT 318'],
    feeBalance: 0,
    helbStatus: 'Active',
    hostel: 'Block A, Room 105',
    nationalId: '31234567',
    phoneNumber: '+254723456789',
    county: 'Nairobi',
  },
  {
    id: 'S003',
    studentId: 'IN17/00356/23',
    name: 'Brian Kiprop Koech',
    email: 'brian.koech@student.ac.ke',
    department: 'Computer Science',
    year: 2,
    gpa: 2.8,
    attendanceRate: 70,
    riskScore: 55,
    riskLevel: 'Medium',
    enrolledCourses: ['CSC 211', 'CSC 213', 'CSC 215', 'MTH 201'],
    feeBalance: 35000,
    helbStatus: 'Pending',
    hostel: 'Off Campus',
    nationalId: '33567890',
    phoneNumber: '+254734567890',
    county: 'Uasin Gishu',
  },
  {
    id: 'S004',
    studentId: 'IN17/00478/23',
    name: 'Wanjiru Njoroge Mwangi',
    email: 'wanjiru.mwangi@student.ac.ke',
    department: 'Information Technology',
    year: 4,
    gpa: 4.5,
    attendanceRate: 96,
    riskScore: 8,
    riskLevel: 'Low',
    enrolledCourses: ['BIT 411', 'BIT 413', 'BIT 415', 'BIT 417'],
    feeBalance: 0,
    helbStatus: 'Active',
    hostel: 'Block B, Room 301',
    nationalId: '30123456',
    phoneNumber: '+254745678901',
    county: 'Kiambu',
  },
  {
    id: 'S005',
    studentId: 'IN17/00589/23',
    name: 'Juma Hassan Abdi',
    email: 'juma.abdi@student.ac.ke',
    department: 'Computer Science',
    year: 1,
    gpa: 1.8,
    attendanceRate: 62,
    riskScore: 82,
    riskLevel: 'High',
    enrolledCourses: ['CSC 111', 'CSC 113', 'MTH 101', 'PHY 101'],
    feeBalance: 52000,
    helbStatus: 'Not Applied',
    hostel: 'Block D, Room 110',
    nationalId: '35678901',
    phoneNumber: '+254756789012',
    county: 'Garissa',
  },
  {
    id: 'S006',
    studentId: 'IN17/00690/23',
    name: 'Faith Chebet Rotich',
    email: 'faith.rotich@student.ac.ke',
    department: 'Information Technology',
    year: 2,
    gpa: 3.6,
    attendanceRate: 88,
    riskScore: 22,
    riskLevel: 'Low',
    enrolledCourses: ['BIT 211', 'BIT 213', 'BIT 215', 'BIT 217'],
    feeBalance: 8000,
    helbStatus: 'Active',
    hostel: 'Block A, Room 208',
    nationalId: '34789012',
    phoneNumber: '+254767890123',
    county: 'Nakuru',
  },
  {
    id: 'S007',
    studentId: 'IN17/00701/23',
    name: 'Moses Kamau Kariuki',
    email: 'moses.kariuki@student.ac.ke',
    department: 'Computer Science',
    year: 3,
    gpa: 2.4,
    attendanceRate: 68,
    riskScore: 68,
    riskLevel: 'Medium',
    enrolledCourses: ['CSC 311', 'CSC 313', 'CSC 315', 'MTH 301'],
    feeBalance: 28000,
    helbStatus: 'Active',
    hostel: 'Off Campus',
    nationalId: '32890123',
    phoneNumber: '+254778901234',
    county: 'Nyeri',
  },
  {
    id: 'S008',
    studentId: 'IN17/00812/23',
    name: 'Mercy Achieng Owino',
    email: 'mercy.owino@student.ac.ke',
    department: 'Information Technology',
    year: 4,
    gpa: 4.0,
    attendanceRate: 94,
    riskScore: 15,
    riskLevel: 'Low',
    enrolledCourses: ['BIT 411', 'BIT 413', 'BIT 415'],
    feeBalance: 0,
    helbStatus: 'Active',
    hostel: 'Block C, Room 310',
    nationalId: '31901234',
    phoneNumber: '+254789012345',
    county: 'Siaya',
  },
  {
    id: 'S009',
    studentId: 'IN17/00923/23',
    name: 'Kevin Otieno Ouma',
    email: 'kevin.ouma@student.ac.ke',
    department: 'Computer Science',
    year: 2,
    gpa: 3.0,
    attendanceRate: 78,
    riskScore: 42,
    riskLevel: 'Medium',
    enrolledCourses: ['CSC 211', 'CSC 213', 'CSC 215'],
    feeBalance: 18000,
    helbStatus: 'Active',
    hostel: 'Block D, Room 215',
    nationalId: '33012345',
    phoneNumber: '+254790123456',
    county: 'Migori',
  },
  {
    id: 'S010',
    studentId: 'IN17/01034/23',
    name: 'Lilian Wangari Kimani',
    email: 'lilian.kimani@student.ac.ke',
    department: 'Information Technology',
    year: 1,
    gpa: 3.8,
    attendanceRate: 90,
    riskScore: 18,
    riskLevel: 'Low',
    enrolledCourses: ['BIT 111', 'BIT 113', 'BIT 115', 'MTH 101'],
    feeBalance: 12000,
    helbStatus: 'Applied',
    hostel: 'Block B, Room 112',
    nationalId: '36123456',
    phoneNumber: '+254701234567',
    county: 'Murang\'a',
  },
];

export const courses: Course[] = [
  // Year 1 - IT
  { id: 'BIT111', code: 'BIT 111', name: 'Introduction to Information Technology', department: 'Information Technology', lecturer: 'Terresa Trizah', credits: 4, enrolledStudents: 68, averageGrade: 3.4, semester: 'Semester 1' },
  { id: 'BIT113', code: 'BIT 113', name: 'Programming Fundamentals', department: 'Information Technology', lecturer: 'Terresa Trizah', credits: 4, enrolledStudents: 68, averageGrade: 3.2, semester: 'Semester 1' },
  { id: 'BIT115', code: 'BIT 115', name: 'Computer Organization', department: 'Information Technology', lecturer: 'Prof. Grace Njeri', credits: 3, enrolledStudents: 68, averageGrade: 3.1, semester: 'Semester 1' },
  
  // Year 2 - IT
  { id: 'BIT211', code: 'BIT 211', name: 'Object Oriented Programming', department: 'Information Technology', lecturer: 'Terresa Trizah', credits: 4, enrolledStudents: 52, averageGrade: 3.3, semester: 'Semester 1' },
  { id: 'BIT213', code: 'BIT 213', name: 'Database Systems', department: 'Information Technology', lecturer: 'Prof. Grace Njeri', credits: 4, enrolledStudents: 52, averageGrade: 3.5, semester: 'Semester 1' },
  { id: 'BIT215', code: 'BIT 215', name: 'Web Development', department: 'Information Technology', lecturer: 'Terresa Trizah', credits: 4, enrolledStudents: 52, averageGrade: 3.6, semester: 'Semester 1' },
  { id: 'BIT217', code: 'BIT 217', name: 'Systems Analysis and Design', department: 'Information Technology', lecturer: 'Prof. Grace Njeri', credits: 3, enrolledStudents: 52, averageGrade: 3.2, semester: 'Semester 1' },
  
  // Year 3 - IT
  { id: 'BIT312', code: 'BIT 312', name: 'Data Structures and Algorithms', department: 'Information Technology', lecturer: 'Terresa Trizah', credits: 4, enrolledStudents: 45, averageGrade: 3.0, semester: 'Semester 2' },
  { id: 'BIT314', code: 'BIT 314', name: 'Software Engineering', department: 'Information Technology', lecturer: 'Prof. Grace Njeri', credits: 4, enrolledStudents: 45, averageGrade: 3.4, semester: 'Semester 2' },
  { id: 'BIT316', code: 'BIT 316', name: 'Network Administration', department: 'Information Technology', lecturer: 'Terresa Trizah', credits: 4, enrolledStudents: 45, averageGrade: 3.2, semester: 'Semester 2' },
  { id: 'BIT318', code: 'BIT 318', name: 'Mobile Application Development', department: 'Information Technology', lecturer: 'Terresa Trizah', credits: 4, enrolledStudents: 45, averageGrade: 3.5, semester: 'Semester 2' },
  { id: 'BIT320', code: 'BIT 320', name: 'Cyber Security Fundamentals', department: 'Information Technology', lecturer: 'Prof. Grace Njeri', credits: 3, enrolledStudents: 45, averageGrade: 3.3, semester: 'Semester 2' },
  
  // Year 4 - IT
  { id: 'BIT411', code: 'BIT 411', name: 'Cloud Computing', department: 'Information Technology', lecturer: 'Prof. Grace Njeri', credits: 4, enrolledStudents: 38, averageGrade: 3.8, semester: 'Semester 1' },
  { id: 'BIT413', code: 'BIT 413', name: 'Artificial Intelligence', department: 'Information Technology', lecturer: 'Terresa Trizah', credits: 4, enrolledStudents: 38, averageGrade: 3.6, semester: 'Semester 1' },
  { id: 'BIT415', code: 'BIT 415', name: 'IT Project Management', department: 'Information Technology', lecturer: 'Prof. Grace Njeri', credits: 4, enrolledStudents: 38, averageGrade: 3.7, semester: 'Semester 1' },
  { id: 'BIT417', code: 'BIT 417', name: 'Research Project', department: 'Information Technology', lecturer: 'Terresa Trizah', credits: 6, enrolledStudents: 38, averageGrade: 3.9, semester: 'Semester 1' },
  
  // Computer Science
  { id: 'CSC111', code: 'CSC 111', name: 'Introduction to Computer Science', department: 'Computer Science', lecturer: 'Dr. Peter Mwangi', credits: 4, enrolledStudents: 72, averageGrade: 3.1, semester: 'Semester 1' },
  { id: 'CSC113', code: 'CSC 113', name: 'Discrete Mathematics', department: 'Computer Science', lecturer: 'Dr. Peter Mwangi', credits: 3, enrolledStudents: 72, averageGrade: 2.9, semester: 'Semester 1' },
  { id: 'CSC211', code: 'CSC 211', name: 'Data Structures', department: 'Computer Science', lecturer: 'Dr. Peter Mwangi', credits: 4, enrolledStudents: 58, averageGrade: 3.0, semester: 'Semester 1' },
  { id: 'CSC213', code: 'CSC 213', name: 'Computer Architecture', department: 'Computer Science', lecturer: 'Dr. Peter Mwangi', credits: 4, enrolledStudents: 58, averageGrade: 3.2, semester: 'Semester 1' },
  { id: 'CSC215', code: 'CSC 215', name: 'Operating Systems', department: 'Computer Science', lecturer: 'Dr. Peter Mwangi', credits: 4, enrolledStudents: 58, averageGrade: 3.1, semester: 'Semester 1' },
  { id: 'CSC311', code: 'CSC 311', name: 'Algorithm Analysis', department: 'Computer Science', lecturer: 'Dr. Peter Mwangi', credits: 4, enrolledStudents: 42, averageGrade: 2.8, semester: 'Semester 1' },
  { id: 'CSC313', code: 'CSC 313', name: 'Compiler Design', department: 'Computer Science', lecturer: 'Dr. Peter Mwangi', credits: 4, enrolledStudents: 42, averageGrade: 2.9, semester: 'Semester 1' },
  { id: 'CSC315', code: 'CSC 315', name: 'Computer Networks', department: 'Computer Science', lecturer: 'Dr. Peter Mwangi', credits: 4, enrolledStudents: 42, averageGrade: 3.0, semester: 'Semester 1' },
  
  // Mathematics & General
  { id: 'MTH101', code: 'MTH 101', name: 'Calculus I', department: 'Mathematics', lecturer: 'Prof. David Mutua', credits: 4, enrolledStudents: 120, averageGrade: 2.8, semester: 'Semester 1' },
  { id: 'MTH201', code: 'MTH 201', name: 'Linear Algebra', department: 'Mathematics', lecturer: 'Prof. David Mutua', credits: 3, enrolledStudents: 85, averageGrade: 3.0, semester: 'Semester 1' },
  { id: 'MTH301', code: 'MTH 301', name: 'Numerical Methods', department: 'Mathematics', lecturer: 'Prof. David Mutua', credits: 3, enrolledStudents: 62, averageGrade: 3.1, semester: 'Semester 1' },
  { id: 'PHY101', code: 'PHY 101', name: 'Physics for Computing', department: 'Physics', lecturer: 'Dr. Jane Mutisya', credits: 3, enrolledStudents: 95, averageGrade: 2.9, semester: 'Semester 1' },
];

export const alerts: Alert[] = [
  {
    id: 'A001',
    studentId: 'S005',
    studentName: 'Juma Hassan Abdi',
    type: 'GPA',
    severity: 'High',
    message: 'GPA critical: 1.8 (Below 2.0 pass mark)',
    date: '2026-02-28',
    status: 'New',
  },
  {
    id: 'A002',
    studentId: 'S005',
    studentName: 'Juma Hassan Abdi',
    type: 'Fee Balance',
    severity: 'High',
    message: 'Outstanding fee balance: KES 52,000. Cannot generate exam card.',
    date: '2026-02-27',
    status: 'New',
  },
  {
    id: 'A003',
    studentId: 'S005',
    studentName: 'Juma Hassan Abdi',
    type: 'Attendance',
    severity: 'High',
    message: 'Attendance at 62% - Below 75% minimum requirement',
    date: '2026-02-26',
    status: 'Viewed',
  },
  {
    id: 'A004',
    studentId: 'S007',
    studentName: 'Moses Kamau Kariuki',
    type: 'Grade Drop',
    severity: 'Medium',
    message: 'Grade drop in CSC 311: From B to D in recent assessments',
    date: '2026-02-25',
    status: 'New',
  },
  {
    id: 'A005',
    studentId: 'S003',
    studentName: 'Brian Kiprop Koech',
    type: 'Fee Balance',
    severity: 'Medium',
    message: 'Fee balance of KES 35,000. Pay to avoid registration issues.',
    date: '2026-02-24',
    status: 'New',
  },
  {
    id: 'A006',
    studentId: 'S007',
    studentName: 'Moses Kamau Kariuki',
    type: 'Attendance',
    severity: 'Medium',
    message: 'Attendance rate: 68% - Approaching critical threshold',
    date: '2026-02-23',
    status: 'Viewed',
  },
  {
    id: 'A007',
    studentId: 'S001',
    studentName: 'Lennox Lewis Odhiambo',
    type: 'Fee Balance',
    severity: 'Low',
    message: 'Fee balance: KES 15,000. Clear before end of semester.',
    date: '2026-02-22',
    status: 'Resolved',
  },
];

export const interventions: Intervention[] = [
  {
    id: 'I001',
    studentId: 'S005',
    studentName: 'Juma Hassan Abdi',
    type: 'Academic Advising',
    description: 'Emergency academic counseling session. Discuss study habits, attendance, and time management.',
    assignedTo: 'Dr. James Ochieng',
    status: 'In Progress',
    createdDate: '2026-02-28',
  },
  {
    id: 'I002',
    studentId: 'S005',
    studentName: 'Juma Hassan Abdi',
    type: 'Financial Aid',
    description: 'Connect with bursary office for emergency funding. Explore HELB loan options.',
    assignedTo: 'Finance Office',
    status: 'Pending',
    createdDate: '2026-02-27',
  },
  {
    id: 'I003',
    studentId: 'S005',
    studentName: 'Juma Hassan Abdi',
    type: 'Tutoring',
    description: 'Assign peer tutor for CSC 111 and MTH 101',
    assignedTo: 'Academic Support Center',
    status: 'In Progress',
    createdDate: '2026-02-26',
  },
  {
    id: 'I004',
    studentId: 'S007',
    studentName: 'Moses Kamau Kariuki',
    type: 'Tutoring',
    description: 'Weekly tutoring sessions for CSC 311 (Algorithm Analysis)',
    assignedTo: 'Dr. Peter Mwangi',
    status: 'In Progress',
    createdDate: '2026-02-25',
  },
  {
    id: 'I005',
    studentId: 'S003',
    studentName: 'Brian Kiprop Koech',
    type: 'Financial Aid',
    description: 'Fee payment plan arrangement. Monitor HELB application status.',
    assignedTo: 'Ms. Faith Wambui',
    status: 'Completed',
    createdDate: '2026-02-20',
    completedDate: '2026-02-24',
  },
];

export const mlModels: MLPrediction[] = [
  { model: 'Logistic Regression', accuracy: 0.84, precision: 0.82, recall: 0.79, f1Score: 0.80, rocAuc: 0.88 },
  { model: 'Random Forest', accuracy: 0.91, precision: 0.89, recall: 0.88, f1Score: 0.89, rocAuc: 0.94 },
  { model: 'Gradient Boosting (XGBoost)', accuracy: 0.93, precision: 0.92, recall: 0.90, f1Score: 0.91, rocAuc: 0.96 },
  { model: 'Neural Network (MLP)', accuracy: 0.89, precision: 0.87, recall: 0.85, f1Score: 0.86, rocAuc: 0.92 },
];

export const featureImportance = [
  { feature: 'Attendance Rate', importance: 0.42 },
  { feature: 'Previous GPA', importance: 0.28 },
  { feature: 'Fee Payment Status', importance: 0.12 },
  { feature: 'Failed Units', importance: 0.10 },
  { feature: 'Study Hours', importance: 0.08 },
];

// Generate time-series data for charts
export const generateGPAHistory = (currentGPA: number) => {
  const semesters = ['Sem 1, 2024', 'Sem 2, 2024', 'Sem 1, 2025', 'Sem 2, 2025'];
  const variation = currentGPA > 3.0 ? 0.3 : 0.4;
  
  return semesters.map((semester, idx) => ({
    semester,
    gpa: Math.max(0, Math.min(5.0, currentGPA + (Math.random() - 0.5) * variation * (4 - idx))).toFixed(2),
  }));
};

export const generateAttendanceHistory = () => {
  const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
  return months.map(month => ({
    month,
    attendance: Math.floor(Math.random() * 30 + 70),
  }));
};

export const departmentStats = [
  { department: 'Information Technology', totalStudents: 280, atRisk: 35, averageGPA: 3.4, retentionRate: 94 },
  { department: 'Computer Science', totalStudents: 240, atRisk: 42, averageGPA: 3.1, retentionRate: 91 },
  { department: 'Business IT', totalStudents: 195, atRisk: 28, averageGPA: 3.5, retentionRate: 95 },
  { department: 'Engineering', totalStudents: 310, atRisk: 48, averageGPA: 3.2, retentionRate: 92 },
  { department: 'Mathematics', totalStudents: 165, atRisk: 22, averageGPA: 3.3, retentionRate: 93 },
];

export const riskTrendData = [
  { month: 'Aug', high: 38, medium: 62, low: 315 },
  { month: 'Sep', high: 42, medium: 68, low: 305 },
  { month: 'Oct', high: 45, medium: 75, low: 295 },
  { month: 'Nov', high: 52, medium: 82, low: 281 },
  { month: 'Dec', high: 48, medium: 78, low: 289 },
  { month: 'Jan', high: 44, medium: 72, low: 299 },
  { month: 'Feb', high: 40, medium: 65, low: 310 },
];

export const feePayments: FeePayment[] = [
  {
    id: 'FP001',
    studentId: 'S001',
    amount: 35000,
    date: '2026-01-15',
    semester: 'Semester 2, 2025/2026',
    paymentMethod: 'M-PESA',
    receiptNumber: 'REC2026001234',
  },
  {
    id: 'FP002',
    studentId: 'S002',
    amount: 50000,
    date: '2026-01-10',
    semester: 'Semester 2, 2025/2026',
    paymentMethod: 'Bank Transfer',
    receiptNumber: 'REC2026001235',
  },
];

export const industrialAttachments: IndustrialAttachment[] = [
  {
    id: 'IA001',
    studentId: 'S004',
    company: 'Safaricom PLC',
    startDate: '2025-09-01',
    endDate: '2025-12-15',
    status: 'Completed',
    supervisor: 'Mr. John Maina',
  },
  {
    id: 'IA002',
    studentId: 'S008',
    company: 'Kenya Commercial Bank',
    startDate: '2025-09-01',
    endDate: '2025-12-15',
    status: 'Completed',
    supervisor: 'Ms. Susan Wambui',
  },
];
