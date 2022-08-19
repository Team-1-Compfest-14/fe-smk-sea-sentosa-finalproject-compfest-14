import axios from "axios";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginContext } from "../../context";
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
import { User } from "../../typings";

const Router = () => {
  const [user, setUser] = useState<User>({
    accessToken: localStorage.getItem("accessToken") ?? null
  });

  axios.defaults.headers.common["Authorization"] = `Bearer ${user?.accessToken}`;

  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/courses" element={<AdminVerifyCourses />} />
          <Route path="/admin/instructors" element={<AdminVerifyInstructors />} />
          <Route
            path="/dashboard"
            element={user?.accessToken !== null ? <InstructorDashboard /> : <Login />}
          />
          <Route path="/courses/:id" element={<InstructorCourse />} />
          <Route path="/courses/:id/quizzes/:id" element={<InstructorQuiz />} />
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
      </LoginContext.Provider>
    </BrowserRouter>
  );
};

export default Router;
