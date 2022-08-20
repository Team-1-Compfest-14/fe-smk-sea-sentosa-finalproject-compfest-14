import { useEffect, useState } from "react";
import { VerifiedCourseCard, StudentCourseCard } from "./Components";
import { useDocumentTitle } from "../../../hooks";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, refreshAuthLogic } from "../../../api";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import axios from "axios";

export type StudentAccessedCourse = {
  course: {
    id: number;
    instructorId: number;
    name: string;
    description: string;
    isVerified: boolean;
  };
  instructorName: string;
  totalModule: number;
};

const StudentCourses = () => {
  useDocumentTitle("All Verified Courses | Pelajarin");
  const [courses, setCourses] = useState<StudentAccessedCourse[] | null>(null);
  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get(`${BASE_URL}/courses/verified/`)
      .then((res) => {
        const { courses } = res.data.data;
        setCourses(courses);
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        alert("Error");
      });
  };
  useEffect(() => {
    createAuthRefreshInterceptor(axios, refreshAuthLogic);

    fetchData();
  }, []);

  const handleEnroll = async (courseId: number) => {
    await axios.post(`${BASE_URL}/courses/${courseId}/enrollment`, {}).then(() => {
      alert("Success enrolling new course");
      navigate(`/student/courses/${courseId}`);
    });
  };

  return (
    <div className="container mx-auto p-10 max-w-screen-lg">
      <VerifiedCourseCard />
      {courses?.length! > 0 ? (
        courses?.map((course: StudentAccessedCourse, index) => {
          return <StudentCourseCard key={index} course={course} handleEnroll={handleEnroll} />;
        })
      ) : (
        <div className="text-center text-2xl flex flex-col items-center">
          You have enrolled all verified courses.
          <Link
            to="/student/dashboard"
            className="w-1/3 bg-blue text-white px-4 py-2 rounded-xl border border-black hover:bg-blue-dark my-5"
          >
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default StudentCourses;
