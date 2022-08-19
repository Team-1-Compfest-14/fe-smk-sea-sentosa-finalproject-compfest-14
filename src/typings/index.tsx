export type User = {
  accessToken: string | null;
};

export type Course = {
  id: number;
  instructorId: number;
  name: string;
  description: string;
  isVerified: boolean;
  total: number;
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
  mandatory: boolean;
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
