import axios from "axios";
import { useDocumentTitle } from "../../../hooks";
import { CourseCard, HeaderCard } from "../../../components";
import { useContext, useEffect, useState } from "react";
import { AddCourseModal } from "./components";
import { CourseContext } from "../../../context";
import { UserDetails } from "../../../typings";

const InstructorDashboard = () => {
  const { courses, setCourses } = useContext(CourseContext);

  const [showVerified, setShowVerified] = useState(true);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useDocumentTitle(`${userDetails?.name}'s Courses | Pelajarin`);
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get("http://localhost:5000/courses/instructor/own")
      .then((res) => {
        const { courses } = res.data.data;
        setCourses(courses);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/users/profile")
      .then((res) => {
        const { user } = res.data.data;
        setUserDetails(user);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-10 my-5 flex flex-col items-center justify-center container mx-auto max-w-screen-lg">
      {/* Header Card */}
      <HeaderCard name={userDetails?.name!} />
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
      {courses
        ?.filter((course) =>
          showVerified ? course.isVerified === true : course.isVerified === false
        )
        .map((course, index) => (
          <CourseCard
            key={index}
            id={course.id}
            name={course.name}
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
