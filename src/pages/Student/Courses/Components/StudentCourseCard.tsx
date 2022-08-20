/* eslint-disable no-unused-vars */
import { useState } from "react";
import { GiTeacher } from "react-icons/gi";
import { TbNotes } from "react-icons/tb";
import { StudentAccessedCourse } from "..";
import CourseDetailModal from "./CourseDetailModal";

interface StudentCourseCardProps {
  course: StudentAccessedCourse;
  handleEnroll: (type: number) => void;
}

const StudentCourseCard = ({ course, handleEnroll }: StudentCourseCardProps) => {
  const [showCourseDetailModal, setShowCourseDetailModal] = useState(false);

  const handleModalEnroll = (type: string) => {
    if (type === "confirm") {
      setShowCourseDetailModal(false);
      handleEnroll(course.course.id);
    } else {
      setShowCourseDetailModal(false);
    }
  };

  return (
    <div className="h-40 border w-full border-black rounded-2xl flex justify-between items-center my-4 px-10">
      {/* Details */}
      <div className="my-auto flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold mb-4">{course.course.name}</p>
          <p className="flex items-center mb-2">
            <GiTeacher className="mr-2" size={20} />
            {course.instructorName}
          </p>
          <p className="flex items-center mb-2">
            <TbNotes className="mr-2" size={20} />
            {course.totalModule} sections
          </p>
        </div>
      </div>
      {/* Button */}
      <div className="flex flex-col items-center justify-center p-4">
        <button
          onClick={() => {
            document.body.style.overflow = "hidden";
            setShowCourseDetailModal(true);
          }}
          className="my-2 px-4 py-2 border border-black rounded-lg hover:bg-slate-200"
        >
          Details
        </button>
        <button
          className="my-2 px-5 py-2 border border-black rounded-lg bg-orange-light hover:bg-orange-dark"
          onClick={() => handleEnroll(course.course.id)}
        >
          Enroll
        </button>
      </div>

      {showCourseDetailModal && (
        <CourseDetailModal
          handleBack={() => {
            document.body.style.overflow = "auto";
            setShowCourseDetailModal(false);
          }}
          courseName={course.course.name}
          instructorName={course.instructorName}
          description={course.course.description}
          handeModalEnroll={handleModalEnroll}
        />
      )}
    </div>
  );
};

export default StudentCourseCard;
