export type UserRole = 'admin' | 'professor' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  subject?: string; // For professors
  academicPreferences?: string; // For students
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  professorId: string;
  professorName: string;
  fileType: 'pdf' | 'ppt' | 'doc' | 'note';
  uploadDate: string;
  description?: string;
  fileName: string;
}

export interface Feedback {
  id: string;
  studentId: string;
  studentName: string;
  message: string;
  category: string;
  date: string;
}
