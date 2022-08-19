/* eslint-disable no-unused-vars */
import { createContext } from "react";
import { Lecture, Quiz } from "../typings";

type ModuleContextType = {
  lectures: Lecture[] | null;
  selectedLecture: Lecture | null;
  setLectures: (lecture: Lecture[]) => void;
  setSelectedLecture: (lecture: Lecture) => void;
  setShowEditLectureModal: (val: boolean) => void;
  setShowConfirmDeleteLectureModal: (val: boolean) => void;

  quizzes: Quiz[] | null;
  selectedQuiz: Quiz | null;
  setQuizzes: (lecture: Quiz[]) => void;
  setSelectedQuiz: (lecture: Quiz) => void;
  setShowConfirmDeleteQuizModal: (val: boolean) => void;
};

export const ModuleContext = createContext<ModuleContextType>({
  lectures: null,
  selectedLecture: null,
  setLectures: () => {},
  setSelectedLecture: () => {},
  setShowEditLectureModal: () => {},
  setShowConfirmDeleteLectureModal: () => {},

  quizzes: null,
  selectedQuiz: null,
  setQuizzes: () => {},
  setSelectedQuiz: () => {},
  setShowConfirmDeleteQuizModal: () => {}
});
