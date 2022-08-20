import { useContext } from "react";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { MdBackpack } from "react-icons/md";
import { RiBookMarkFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../context";
import { Course } from "../typings";

interface CourseCardProps {
  id: number;
  name: string;
  numOfStudents: number;
  numOfSections: number;
  // eslint-disable-next-line no-unused-vars
  setShowConfirmDeleteCourseModal: (val: boolean) => void;
  course: Course;
}

const CourseCard = ({
  id,
  name,
  numOfStudents,
  numOfSections,
  setShowConfirmDeleteCourseModal,
  course
}: CourseCardProps) => {
  const navigate = useNavigate();
  const { setSelectedCourse } = useContext(CourseContext);
  return (
    <div className="h-40 border w-full border-black rounded-2xl flex justify-between items-center my-4 px-10">
      {/* Details */}
      <div className="my-auto flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold mb-2">{name}</p>
          <p className="flex items-center">
            <MdBackpack className="mr-2" size={20} />
            {numOfStudents ? numOfStudents : "No"} students enrolled
          </p>
          <p className="flex items-center">
            <RiBookMarkFill className="mr-2" size={20} />
            {numOfSections} sections
          </p>
        </div>
      </div>
      {/* Edit */}
      <div className="flex gap-4">
        <div
          className="flex flex-col items-center justify-center cursor-pointer p-4 hover:bg-slate-200 hover:rounded-xl"
          onClick={() => {
            navigate(`/instructor/courses/${id}`);
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
