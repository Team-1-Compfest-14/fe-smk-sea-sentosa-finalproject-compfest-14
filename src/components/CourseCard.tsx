import { useContext } from "react";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { MdBackpack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../context";
import { Course } from "../typings";

interface CourseCardProps {
  // eslint-disable-next-line no-unused-vars
  setShowConfirmDeleteCourseModal: (val: boolean) => void;
  course: Course;
}

const CourseCard = ({ setShowConfirmDeleteCourseModal, course }: CourseCardProps) => {
  const navigate = useNavigate();
  const { setSelectedCourse } = useContext(CourseContext);
  return (
    <div className="h-40 border w-full border-black rounded-2xl flex justify-between items-center my-4 px-10">
      {/* Details */}
      <div className="my-auto flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold mb-2">{course.name}</p>
          <p className="flex items-center">
            <MdBackpack className="mr-2" size={20} />
            {course.total ?? "No"} {course.total > 1 ? "students" : "student"} enrolled
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* Edit Button */}
        <div
          className="flex flex-col items-center justify-center cursor-pointer p-4 hover:bg-slate-200 hover:rounded-xl"
          onClick={() => {
            navigate(`/instructor/courses/${course.id}`);
          }}
        >
          <MdModeEdit size={32} />
          <p className="font-bold">Edit</p>
        </div>
        {/* Delete Button */}
        <div
          className="text-sm flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-slate-200 hover:rounded-xl text-red-600"
          onClick={() => {
            setSelectedCourse(course);
            setShowConfirmDeleteCourseModal(true);
          }}
        >
          <MdDeleteForever size={32} />
          <p className="font-bold">Delete</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
