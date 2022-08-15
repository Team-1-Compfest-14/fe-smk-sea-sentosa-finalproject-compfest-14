import { useDocumentTitle } from "../../../hooks";
import { CourseCard, HeaderCard } from "../../../components";
import { useState } from "react";
import { AddCourseModal } from "./components";

const InstructorDashboard = () => {
  useDocumentTitle("Mike's Courses | Pelajarin");

  const [showVerified, setShowVerified] = useState(true);
  const [showAddCourse, setShowAddCourse] = useState(false);

  return (
    <div className="p-10 mx-64 my-5 flex flex-col items-center justify-center">
      {/* Header Card */}
      <HeaderCard name="Mike" />
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
      {showVerified ? (
        <>
          {/* Verified Courses */}
          <CourseCard name="Calculus 1" numOfStudents="20" numOfSections="8" />
          <CourseCard name="Calculus 2" numOfStudents="20" numOfSections="8" />
        </>
      ) : (
        // Pending Courses
        <>
          <CourseCard name="Introduction to Digital System" numOfSections="8" />
          <CourseCard name="Foundations of Programming" numOfSections="8" />
          {/* Add Course Button */}
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
          {/* Add Course Modal */}
          {showAddCourse && (
            <AddCourseModal
              handleBack={() => {
                document.body.style.overflow = "auto";
                setShowAddCourse(false);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default InstructorDashboard;
