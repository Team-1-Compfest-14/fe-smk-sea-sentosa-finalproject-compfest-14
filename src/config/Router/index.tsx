import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Navbar } from "../../layouts";
import {
  Home,
  Register,
  Login,
  InstructorDashboard,
  InstructorCourse,
  StudentCourses,
  StudentCourseDetail,
  Page404
} from "../../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<InstructorDashboard />} />
        <Route path="/courses/:id" element={<InstructorCourse />} />

        <Route path="/student/courses" element={<StudentCourses />} />
        <Route path="/student/courses/1" element={<StudentCourseDetail />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
