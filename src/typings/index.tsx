export type User = {
  accessToken: string | null;
};

export type UserDetails = {
  name: string;
  email: string;
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
  courseId: number;
  lecture: { id: number; moduleId: number; lectureLink: string };
  name: string;
  order: number;
  type: number;
};

export type Option = {
  option: string;
  isCorrectAnswer: boolean;
};

export type Question = {
  id: number;
  quizId: number;
  index: number;
  question: string;
  questionOptions: Option[];
};

export type Quiz = {
  id: number;
  courseId: number;
  name: string;
  order: number;
  quiz: { id: number; moduleId: number };
  type: number;
};

export type QuizData = {
  quizName: string;
  questions: { id: number }[];
};
