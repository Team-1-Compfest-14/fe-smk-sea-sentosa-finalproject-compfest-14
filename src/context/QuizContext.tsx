/* eslint-disable no-unused-vars */
import { createContext } from "react";
import { Question } from "../typings";

type QuizContextType = {
  questions: Question[] | null;
  selectedQuestion: Question | null;
  setQuestions: (question: Question[]) => void;
  setSelectedQuestion: (question: Question) => void;
  setShowEditQuestionModal: (val: boolean) => void;
  setShowConfirmDeleteQuestionModal: (val: boolean) => void;
};

export const QuizContext = createContext<QuizContextType>({
  questions: null,
  selectedQuestion: null,
  setQuestions: () => {},
  setSelectedQuestion: () => {},
  setShowEditQuestionModal: () => {},
  setShowConfirmDeleteQuestionModal: () => {}
});
