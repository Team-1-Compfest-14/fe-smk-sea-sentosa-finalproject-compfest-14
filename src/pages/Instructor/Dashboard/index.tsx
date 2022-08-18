import { useDocumentTitle } from "../../../hooks";
import { CourseCard, HeaderCard } from "../../../components";
import { useState } from "react";
import { AddCourseModal } from "./components";

const InstructorDashboard = () => {
  useDocumentTitle("Mike's Courses | Pelajarin");

  const [showVerified, setShowVerified] = useState(true);
  const [showAddCourse, setShowAddCourse] = useState(false);

  const courses = [
    {
      id: 0,
      index: 0,
      title: "Calculus 1",
      description:
        "In this course, students will be introduced to limits and how they are the basis of the topics of derivatives and their applications, and also integration and application of integrals. This course is a prerequisite for Calculus 2 and an understanding of this course will be crucial to understand Calculus 2.",
      numOfStudents: 10,
      numOfSections: 10,
      verified: true
    },
    {
      id: 1,
      index: 1,
      title: "Calculus 2",
      description:
        "In this course, students will be introduced to limits and how they are the basis of the topics of derivatives and their applications, and also integration and application of integrals. This course is a prerequisite for Calculus 2 and an understanding of this course will be crucial to understand Calculus 2.",
      numOfStudents: 10,
      numOfSections: 10,
      verified: false
    },
    {
      id: 2,
      index: 3,
      title: "Calculus 3",
      description:
        "In this course, students will be introduced to limits and how they are the basis of the topics of derivatives and their applications, and also integration and application of integrals. This course is a prerequisite for Calculus 2 and an understanding of this course will be crucial to understand Calculus 2.",
      numOfStudents: 10,
      numOfSections: 10,
      verified: false
    },
    {
      id: 3,
      index: 3,
      title: "Calculus 14",
      description:
        "In this course, students will be introduced to limits and how they are the basis of the topics of derivatives and their applications, and also integration and application of integrals. This course is a prerequisite for Calculus 2 and an understanding of this course will be crucial to understand Calculus 2.",
      numOfStudents: 10,
      numOfSections: 10,
      verified: true
    }
  ];

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
      {showVerified
        ? courses
            .filter((course) => course.verified === true)
            .map((course, index) => (
              <CourseCard
                key={index}
                id={course.id}
                title={course.title}
                numOfStudents={course.numOfStudents}
                numOfSections={course.numOfSections}
              />
            ))
        : courses
            .filter((course) => course.verified === false)
            .map((course, index) => (
              <CourseCard
                key={index}
                id={course.id}
                title={course.title}
                numOfStudents={course.numOfStudents}
                numOfSections={course.numOfSections}
              />
            ))}
      {/* Add Course Button */}
      {showVerified && (
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
