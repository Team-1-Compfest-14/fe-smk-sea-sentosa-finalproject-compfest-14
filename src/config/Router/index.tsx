import axios from "axios";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CourseContext, LoginContext } from "../../context";
import { Footer, Navbar } from "../../layouts";
import {
  Home,
  Register,
  Login,
  InstructorDashboard,
  StudentCourses,
  StudentCourseDetail,
  StudentDashboard,
  Page404,
  InstructorCourse,
  InstructorQuiz,
  StudentQuiz,
  StudentQuizFeedback,
  AdminVerifyCourses,
  AdminVerifyInstructors
} from "../../pages";
import { Course, User } from "../../typings";

const Router = () => {
  const [user, setUser] = useState<User>({
    accessToken: localStorage.getItem("accessToken") ?? null
  });
  axios.defaults.headers.common["Authorization"] = `Bearer ${user?.accessToken}`;

  const [courses, setCourses] = useState<Course[] | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ user, setUser }}>
        <CourseContext.Provider
          value={{
            courses,
            setCourses,
            selectedCourse,
            setSelectedCourse
          }}
        >
          {/* idea https://stackoverflow.com/questions/59812003/tailwindcss-fixed-sticky-footer-on-the-bottom */}
          <div className="flex flex-col w-full h-screen justify-between">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/courses" element={<AdminVerifyCourses />} />
              <Route path="/admin/instructors" element={<AdminVerifyInstructors />} />
              <Route
                path="/instructor/dashboard"
                element={user?.accessToken !== null ? <InstructorDashboard /> : <Login />}
              />
              <Route
                path="/instructor/courses/:id"
                element={user?.accessToken !== null ? <InstructorCourse /> : <Login />}
              />
              <Route
                path="/instructor/courses/:courseId/quizzes/:quizId"
                element={user?.accessToken !== null ? <InstructorQuiz /> : <Login />}
              />
              {/* Student */}
              <Route
                path="/student/dashboard"
                element={user?.accessToken !== null ? <StudentDashboard /> : <Login />}
              />
              <Route
                path="/student/courses"
                element={user?.accessToken !== null ? <StudentCourses /> : <Login />}
              />
              <Route
                path="/student/courses/:courseId"
                element={user?.accessToken !== null ? <StudentCourseDetail /> : <Login />}
              />
              <Route
                path="/student/courses/:courseId/quizzes/:quizId"
                element={user?.accessToken !== null ? <StudentQuiz /> : <Login />}
              />
              <Route
                path="/student/courses/:courseId/quizzes/:quizId/feedback"
                element={user?.accessToken !== null ? <StudentQuizFeedback /> : <Login />}
              />
              <Route path="*" element={<Page404 />} />
            </Routes>
            <Footer />
          </div>
        </CourseContext.Provider>
      </LoginContext.Provider>
    </BrowserRouter>
  );
};

export default Router;
