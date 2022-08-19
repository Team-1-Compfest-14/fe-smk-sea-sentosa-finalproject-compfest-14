/* eslint-disable no-unused-vars */
import { createContext } from "react";
import { Course } from "../typings";

type CourseContextType = {
  courses: Course[] | null;
  selectedCourse: Course | null;
  setCourses: (course: Course[]) => void;
  setSelectedCourse: (course: Course) => void;
};

export const CourseContext = createContext<CourseContextType>({
  courses: null,
  selectedCourse: null,
  setCourses: () => {},
  setSelectedCourse: () => {}
});
