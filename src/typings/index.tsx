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
  description: string;
  options: Option[];
};

export type Quiz = {
  id: number;
  title: string;
  questions: Question[];
  index: number;
};
