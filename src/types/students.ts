import { IQuizOption } from './quiz';

export type IStudentsTableRow = {
  _id: string;
  name: string;
  email: string;
  schoolName: string;
};

export type IStudentsTableSearch = {
  search: string;
};

export type IStudentsDetails = {
  _id: string;
  name: string;
  email: string;
  picture: string;
  schoolName: string;
  grade: string;
  guardianName: string;
  guardianEmail: string;
  numberOfSubmissions: number;
  role: string;
  createdAt: string;
  updatedAt: string;
  podId: string;
};

// --- Submission types ---

export type IManualSubmissionEntry = {
  submissionText: string;
  submissionFiles: string[];
};

export type IQuizQuestionSubmission = {
  question: string;
  scenerio: string;
  options: IQuizOption[];
  selectedOptionIndex: number;
  isCorrect: boolean;
};

export type IQuizDetails = {
  quizTitle: string;
  questions: IQuizQuestionSubmission[];
};

type ISubmissionBase = {
  _id: string;
  status?: string;
  atempts: number;
  score: number;
  createdAt: string;
  updatedAt: string;
};

export type IManualSubmission = ISubmissionBase & {
  manualSubmission: IManualSubmissionEntry[];
};

export type IQuizSubmission = ISubmissionBase & {
  quizDetails: IQuizDetails;
};

// --- Task types ---

type IStudentTaskBase = {
  taskIndex: number;
  title: string;
  challengeInstructions: string;
  refrenceMaterials: string[];
  links: string[];
};

type IStudentTaskManual = IStudentTaskBase & {
  challengeType: 'Manual Submission';
  submission: IManualSubmission | null;
};

type IStudentTaskQuiz = IStudentTaskBase & {
  challengeType: 'Quiz';
  submission: IQuizSubmission | null;
};

export type IStudentTask = IStudentTaskManual | IStudentTaskQuiz;

export type IStudentWeekSubmission = {
  challengeId: string;
  weekNumber: number;
  weektitle: string;
  tasks: IStudentTask[];
};
