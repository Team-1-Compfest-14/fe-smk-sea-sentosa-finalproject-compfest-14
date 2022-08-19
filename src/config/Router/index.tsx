import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  AdminVerifyCourses,
  AdminVerifyInstructors
} from "../../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/courses" element={<AdminVerifyCourses />} />
        <Route path="/admin/instructors" element={<AdminVerifyInstructors />} />
        <Route path="/dashboard" element={<InstructorDashboard />} />
        <Route path="/courses/:id" element={<InstructorCourse />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/courses" element={<StudentCourses />} />
        <Route path="/student/courses/1" element={<StudentCourseDetail />} />
        <Route path="/student/courses/1/quizzes/1" element={<StudentQuiz />} />
        <Route path="/courses/:id/quizzes/:id" element={<InstructorQuiz />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
