export type Course = {
  id: number;
  index: number;
  title: string;
  description: string;
  numOfStudents: number;
  numOfSections: number;
  verified: boolean;
};

export type Lecture = {
  id: number;
  title: string;
  link: string;
  index: number;
};

export type Option = {
  id: number;
  value: string;
  correctAnswer: boolean;
};

export type Question = {
  id: number;
  index: number;
  description: string;
  options: Option[];
};

export type Quiz = {
  id: number;
  title: string;
  questions: Question[];
  index: number;
};
