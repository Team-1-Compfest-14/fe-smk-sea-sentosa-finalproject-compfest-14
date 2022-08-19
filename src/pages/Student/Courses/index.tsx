import { useEffect, useState } from "react";
import { VerifiedCourseCard, StudentCourseCard } from "./Components";
import { useDocumentTitle } from "../../../hooks";
import axiosJWT from "../axiosJWT";
import { Link, useNavigate } from "react-router-dom";

interface courses {
  courseId: number;
  courseName: string;
  instructorName: string;
  description: string;
  numOfSections: number;
}

const StudentCourses = () => {
  useDocumentTitle("All Verified Courses | Pelajarin");
  const navigate = useNavigate();

  const [courses, setCourses] = useState<courses[] | []>([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      await axiosJWT
        .get("http://localhost:5000/courses/verified/", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((res) => {
          const { courses } = res.data.data;
          const tempCourse: courses[] = [];
          courses.map((course: any) => {
            tempCourse.push({
              courseId: course.id,
              courseName: course.name,
              instructorName: "Testing",
              description: course.description,
              numOfSections: 5
            });
          });
          setCourses(tempCourse);
        })
        .catch(async (err) => {
          console.log(err);
          alert("Error");
        });
    };

    fetchData();
  }, []);

  const handleEnroll = async (courseId: number) => {
    await axiosJWT
      .post(
        `http://localhost:5000/courses/${courseId}/enrollment`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then(async () => {
        alert("Success enrolling new course");
        navigate(`/student/courses/${courseId}`);
      });
  };

  return (
    <div className="container mx-auto p-10 max-w-screen-lg">
      <VerifiedCourseCard />
      {courses.length > 0 ? (
        courses.map((course: courses, index) => {
          return <StudentCourseCard key={index} {...course} handleEnroll={handleEnroll} />;
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
