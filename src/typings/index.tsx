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

export type QuestionStudent = {
  id: number;
  index: number;
  description: string;
  options: OptionStudent[];
  isCorrect?: boolean;
};

export type OptionStudent = {
  id: number;
  value: string;
  iscorrectAnswer?: boolean;
  isUserAnswer?: boolean;
  isQuestionAnswer?: boolean;
};

export interface answersInterface {
  questionId: number;
  questionOptionId: number;
}

export interface enrolledCourses {
  name: string;
  teacher: string;
  totalModule: number;
  totalModuleCompletion: number;
  isComplete: boolean;
  courseId: number;
}

export interface studentDashboardHeader {
  name: string;
  totalActive: number;
  totalComplete: number;
}
