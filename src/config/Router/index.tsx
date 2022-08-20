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
  Page404,
  InstructorCourse,
  AdminVerifyCourses,
  AdminVerifyInstructors,
  InstructorQuiz
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
              <Route path="/instructor/courses/:id" element={<InstructorCourse />} />
              <Route
                path="/instructor/courses/:courseId/quizzes/:quizId"
                element={<InstructorQuiz />}
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
