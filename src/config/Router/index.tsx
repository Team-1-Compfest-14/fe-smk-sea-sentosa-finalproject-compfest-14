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
  Page404,
  InstructorCourse,
  AdminVerifyCourses,
  AdminVerifyInstructors,
  InstructorQuiz
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
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </LoginContext.Provider>
    </BrowserRouter>
  );
};

export default Router;
