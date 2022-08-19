import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDocumentTitle } from "../../../hooks";
import { CourseCard, HeaderCard } from "../../../components";
import { useContext, useEffect, useState } from "react";
import { AddCourseModal } from "./components";
import { LoginContext } from "../../../context";
import { Course } from "../../../typings";

const InstructorDashboard = () => {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [showVerified, setShowVerified] = useState(true);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const { user } = useContext(LoginContext);
  const decoded = jwt_decode(user?.accessToken!);
  const { userId }: any = decoded;

  useDocumentTitle(`${userId}'s Courses | Pelajarin`);
  useEffect(() => {
    axios.get("http://localhost:5000/courses/instructor/own").then((res) => {
      const { courses } = res.data.data;
      setCourses(courses);
    });
  }, []);

  return (
    <div className="p-10 mx-64 my-5 flex flex-col items-center justify-center">
      {/* Header Card */}
      <HeaderCard name={userId} />
      {/* Course Options */}
      <div className="flex w-full items-center justify-evenly my-4">
        <button
          onClick={() => {
            setShowVerified(true);
          }}
          className={`px-4 py-2 bg-slate-200 rounded-lg ${
            showVerified && "bg-yellow rounded-lg border border-black text-black"
          }`}
        >
          Verified
        </button>
        <button
          onClick={() => {
            setShowVerified(false);
          }}
          className={`px-4 py-2 bg-slate-200 rounded-lg ${
            !showVerified && "bg-yellow rounded-lg border border-black text-black"
          }`}
        >
          Pending
        </button>
      </div>
      {/* Courses */}
      {showVerified
        ? courses
            ?.filter((course) => course.isVerified === true)
            .map((course, index) => (
              <CourseCard
                key={index}
                id={course.id}
                title={course.name}
                numOfStudents={0}
                numOfSections={0}
              />
            ))
        : courses
            ?.filter((course) => course.isVerified === false)
            .map((course, index) => (
              <CourseCard
                key={index}
                id={course.id}
                title={course.name}
                numOfStudents={course.total}
                numOfSections={0}
              />
            ))}
      {/* Add Course Button */}
      {!showVerified && (
        <div className="flex justify-end w-full">
          <button
            onClick={() => {
              document.body.style.overflow = "hidden";
              setShowAddCourse(true);
            }}
            className="bg-blue text-white px-3 py-4 rounded-xl border border-black hover:bg-blue-dark"
          >
            Add Course
          </button>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddCourse && (
        <AddCourseModal
          handleBack={() => {
            document.body.style.overflow = "auto";
            setShowAddCourse(false);
          }}
        />
      )}
    </div>
  );
};

export default InstructorDashboard;
