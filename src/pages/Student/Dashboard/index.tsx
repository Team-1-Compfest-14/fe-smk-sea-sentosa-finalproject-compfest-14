import { useState } from "react";
import { useDocumentTitle } from "../../../hooks";
import { StudentDashboardHeaderCard, CourseCardWithProgressBar } from "./Components";

const StudentDashboard = () => {
  useDocumentTitle("Dashboard | Pelajarin");
  const [showCompleteCourses, setShowCompleteCourses] = useState(false);

  const enrolledCourses = [
    {
      name: "Introduction to Computer Science",
      instructorName: "John Doe",
      completeSection: 5,
      totalSection: 10,
      isComplete: false
    },
    {
      name: "Introduction to Backend",
      instructorName: "John Doe",
      completeSection: 6,
      totalSection: 10,
      isComplete: false
    },
    {
      name: "Introduction to REST API",
      instructorName: "John Doe",
      completeSection: 6,
      totalSection: 6,
      isComplete: true
    }
  ];

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="w-2/3">
        <StudentDashboardHeaderCard name="Rafi Priatna K" />
        <div className="flex w-full items-center justify-evenly my-8">
          <button
            onClick={() => {
              setShowCompleteCourses(false);
            }}
            className={`px-4 py-2 bg-slate-200 rounded-lg ${
              !showCompleteCourses && "bg-yellow rounded-lg border border-black text-black"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => {
              setShowCompleteCourses(true);
            }}
            className={`px-4 py-2 bg-slate-200 rounded-lg ${
              showCompleteCourses && "bg-orange-dark rounded-lg border border-black text-black"
            }`}
          >
            Completed
          </button>
        </div>
        {showCompleteCourses
          ? enrolledCourses
              .filter((item) => item.isComplete === true)
              .map((item, index) => (
                <CourseCardWithProgressBar
                  key={index}
                  courseName={item.name}
                  instructorName={item.instructorName}
                  completeSections={item.completeSection}
                  totalSections={item.totalSection}
                  isComplete={item.isComplete}
                />
              ))
          : enrolledCourses
              .filter((item) => item.isComplete === false)
              .map((item, index) => (
                <CourseCardWithProgressBar
                  key={index}
                  courseName={item.name}
                  instructorName={item.instructorName}
                  completeSections={item.completeSection}
                  totalSections={item.totalSection}
                  isComplete={item.isComplete}
                />
              ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
