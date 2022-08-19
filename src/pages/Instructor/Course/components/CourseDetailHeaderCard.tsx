import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { useContext } from "react";
import { CourseContext, ModuleContext } from "../../../../context";

const CourseDetailHeaderCard = () => {
  const navigate = useNavigate();
  const { selectedCourse } = useContext(CourseContext);
  const { lectures, quizzes } = useContext(ModuleContext);

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
            {selectedCourse?.name}
          </p>
        </div>
        {/* Description */}
        <p className="bg-white border border-black p-4 ml-10 my-5 rounded-xl">
          {selectedCourse?.description}
        </p>
      </div>
      {/* Details */}
      <div className="flex gap-12 md:flex-col lg:gap-0 items-center justify-center">
        <div className="mb-6 flex flex-col items-center justify-center">
          <p className="w-16 h-16 bg-orange-light rounded-full border border-black flex items-center justify-center text-2xl font-mono">
            {lectures?.length ?? 0}
          </p>
          <p className="font-mono">Lectures</p>
        </div>
        <div className="mb-6 flex flex-col items-center justify-center">
          <p className="w-16 h-16 bg-orange-light rounded-full border border-black flex items-center justify-center text-2xl font-mono">
            {quizzes?.length ?? 0}
          </p>
          <p className="font-mono">Quizzes</p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailHeaderCard;
