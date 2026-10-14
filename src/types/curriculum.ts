export type ICurriculumTask = {
  challengeType: string;
  title: string;
  challengeInstructions: string;
  refrenceMaterials: string[];
  links: string[];
  quiz?: string | { _id: string; [key: string]: any };
  order: number;
};

export type ICurriculumItem = {
  _id?: string;
  weekNumber: number;
  weektitle: string;
  scheduleDate: string;
  dueDate: string;
  tasks: ICurriculumTask[];
};

export type ICurriculumTaskFormValue = {
  challengeType: string;
  title: string;
  challengeInstructions: string;
  refrenceMaterials: (File | string)[];
  links: string[];
  quiz?: string;
  order: number;
};

// ----------------------------------------------------------------------

export type ICurriculumTableRow = {
  _id: string;
  weekNumber: number;
  weektitle: string;
  scheduleDate: string;
  dueDate: string;
};

export type ICurriculumTableSearch = {
  search: string;
};

export type fileType = 'doc' | 'pdf' | 'xlsx' | 'mp4';
export type taskType = 'MANUAL_SUBMISSION' | 'QUIZ';
