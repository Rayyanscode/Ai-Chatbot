export type IQuizTableRow = {
  _id: string;
  title: string;
  questions: IQuizQuestion[];
};

export type IQuizTableSearch = {
  search: string;
};

export type IQuizOption = {
  _id?: string;
  option: string;
  isCorrect: boolean;
};

export type IQuizQuestion = {
  _id?: string;
  scenerio: string;
  question: string;
  options: IQuizOption[];
};

export type IQuizForm = {
  _id?: string;
  title: string;
  questions: IQuizQuestion[];
};

export type IQuizDetails = {
  _id: string;
  title: string;
  questions: IQuizQuestion[];
};
