import axios from "axios";
import { useDocumentTitle } from "../../../hooks";
import { CourseCard, HeaderCard } from "../../../components";
import { useContext, useEffect, useState } from "react";
import { AddCourseModal, ConfirmDeleteCourseModal } from "./components";
import { CourseContext } from "../../../context";
import { Course, UserDetails } from "../../../typings";
import { BASE_URL } from "../../../api";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { refreshAuthLogic } from "../../../api";

const InstructorDashboard = () => {
  const { setCourses, selectedCourse } = useContext(CourseContext);
  const [verifiedCourses, setVerifiedCourses] = useState<Course[]>([]);
  const [pendingCourses, setPendingCourses] = useState<Course[]>([]);

  const [showVerified, setShowVerified] = useState(true);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showConfirmDeleteCourseModal, setShowConfirmDeleteCourseModal] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useDocumentTitle(`${userDetails?.name}'s Courses | Pelajarin`);
  useEffect(() => {
    window.scrollTo(0, 0);
    // Refresh token handler
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
    // Get all instructor's courses
    axios
      .get(`${BASE_URL}/courses/instructor/own`)
      .then((res) => {
        const { courses } = res.data.data;
        setCourses(courses);
        setVerifiedCourses(courses.filter((course: Course) => course.isVerified === true));
        setPendingCourses(courses.filter((course: Course) => course.isVerified === false));
      })
      .catch((err) => console.log(err));
    // Get user profile
    axios
      .get(`${BASE_URL}/users/profile`)
      .then((res) => {
        const { user } = res.data.data;
        setUserDetails(user);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(verifiedCourses);

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
      {showVerified ? (
        verifiedCourses.length > 0 ? (
          verifiedCourses.map((course, index) => (
            <CourseCard
              key={index}
              course={course}
              setShowConfirmDeleteCourseModal={setShowConfirmDeleteCourseModal}
            />
          ))
        ) : (
          <p className="p-10 w-full text-center bg-black text-white rounded-lg my-8">
            No verified courses yet.
          </p>
        )
      ) : pendingCourses.length > 0 ? (
        pendingCourses.map((course, index) => (
          <CourseCard
            key={index}
            course={course}
            setShowConfirmDeleteCourseModal={setShowConfirmDeleteCourseModal}
          />
        ))
      ) : (
        <p className="p-10 w-full text-center bg-black text-white rounded-lg my-8">
          No pending courses.
        </p>
      )}
      {/* Add Course Button */}
      {!showVerified && (
        <div className="flex justify-end w-full">
          <button
            onClick={() => {
              document.body.style.overflow = "hidden";
              setShowAddCourseModal(true);
            }}
            className="bg-blue text-white px-3 py-4 rounded-xl border border-black hover:bg-blue-dark"
          >
            Add Course
          </button>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <AddCourseModal
          handleBack={() => {
            document.body.style.overflow = "auto";
            setShowAddCourseModal(false);
          }}
        />
      )}
      {showConfirmDeleteCourseModal && (
        <ConfirmDeleteCourseModal
          handleBack={() => {
            document.body.style.overflow = "auto";
            setShowConfirmDeleteCourseModal(false);
          }}
          course={selectedCourse!}
        />
      )}
    </div>
  );
};

export default InstructorDashboard;
