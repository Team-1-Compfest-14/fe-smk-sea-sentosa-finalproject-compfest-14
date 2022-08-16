import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Navbar } from "../../layouts";
import {
  Home,
  Register,
  Login,
  InstructorDashboard,
  Page404,
  InstructorCourse,
  AdminVerifyCourses
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
        <Route path="/dashboard" element={<InstructorDashboard />} />
        <Route path="/courses/:id" element={<InstructorCourse />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
