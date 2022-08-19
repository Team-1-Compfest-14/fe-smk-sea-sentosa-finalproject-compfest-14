import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { Lecture, Quiz } from "../../../../typings";
import { useState } from "react";
import EditCourseModal from "./EditCourseModal";

interface CourseDetailHeaderCardProps {
  name: string;
  description: string;
  lectures: Lecture[];
  quizzes: Quiz[];
}

const CourseDetailHeaderCard = ({
  name,
  description,
  lectures,
  quizzes
}: CourseDetailHeaderCardProps) => {
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-yellow p-8 border border-black rounded-xl grid grid-cols-1 md:grid-cols-3 mb-8">
      <div className="col-span-2">
        {/* Back Button and Title */}
        <div className="flex items-center justify-between">
          <p className="flex items-center font-bold font-mono text-2xl">
            <IoChevronBack
              onClick={() => {
                navigate(-1);
              }}
              size={32}
              className="bg-slate-200 rounded-lg border border-black mr-4 hover:bg-slate-300 cursor-pointer"
            />
            {name}
          </p>
          <button
            onClick={() => {
              document.body.style.overflow = "hidden";
              setShowEditCourseModal(true);
            }}
            className="bg-blue text-white px-4 py-2 rounded-lg border border-black"
          >
            Edit Details
          </button>
        </div>
        {/* Description */}
        <p className="bg-white border border-black p-4 ml-10 my-5 rounded-xl">{description}</p>
      </div>
      {/* Details */}
      <div className="flex gap-12 md:flex-col lg:gap-0 items-center justify-center">
        <div className="mb-6 flex flex-col items-center justify-center">
          <p className="w-16 h-16 bg-orange-light rounded-full border border-black flex items-center justify-center text-2xl font-mono">
            {lectures.length}
          </p>
          <p className="font-mono">Lectures</p>
        </div>
        <div className="mb-6 flex flex-col items-center justify-center">
          <p className="w-16 h-16 bg-orange-light rounded-full border border-black flex items-center justify-center text-2xl font-mono">
            {quizzes.length}
          </p>
          <p className="font-mono">Quizzes</p>
        </div>
      </div>
      {showEditCourseModal && (
        <EditCourseModal
          handleBack={() => {
            document.body.style.overflow = "auto";
            setShowEditCourseModal(false);
          }}
          selectedCourse={{
            id: 1,
            instructorId: 1,
            name: "",
            description: "",
            isVerified: false,
            total: 0
          }}
        />
      )}
    </div>
  );
};

export default CourseDetailHeaderCard;
