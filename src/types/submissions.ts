export type ISubmissionTableRow = {
  studentId: string;
  student: {
    name: string;
    email: string;
    schoolName: string;
  };
};

export type ISubmissionsTableSearch = {
  search: string;
};

export type ISubmissionDetailsType = 'MANUAL_SUBMISSION' | 'QUIZ';
