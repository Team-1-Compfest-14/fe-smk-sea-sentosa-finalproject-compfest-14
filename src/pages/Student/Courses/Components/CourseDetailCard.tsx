import { IoChevronBack } from "react-icons/io5";
import { GiTeacher } from "react-icons/gi";
import { StudentCourseDetailHeaderInterface } from "../../../../typings";
import { useNavigate } from "react-router-dom";

const CourseDetailCard = ({
  name,
  instructorName,
  description,
  totalLectures,
  totalCompleteLectures,
  totalQuizzes,
  totalCompleteQuizzes
}: StudentCourseDetailHeaderInterface) => {
  const navigate = useNavigate();
  return (
    <div className="bg-yellow border-2 border-black rounded-3xl mb-8 p-12 flex justify-between">
      <div className="font-mono w-5/6">
        <p className="flex items-center mb-4 text-4xl font-bold">
          <IoChevronBack
            size={40}
            className="bg-white rounded-lg border border-black mr-10 p-1 hover:bg-slate-200 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          {name}
        </p>
        <div className="bg-white rounded-3xl p-5 font-sans ml-20 border-2 border-black mt-8 mr-5">
          <p>{description}</p>
        </div>
      </div>

      <div>
        <p className="flex items-center text-lg font-semibold">
          <GiTeacher className="mr-2" size={20} />
          {instructorName}
        </p>
        <div className="flex flex-col items-center justify-center mt-12">
          <div className="bg-orange-light rounded-full p-4 border-2 border-black">
            <p>
              {totalCompleteLectures}/{totalLectures}
            </p>
          </div>
          <p className="mt-2">Lectures</p>
        </div>
        <div className="flex flex-col items-center justify-center mt-5">
          <div className="bg-orange-light rounded-full p-4 border-2 border-black">
            <p>
              {totalCompleteQuizzes}/{totalQuizzes}
            </p>
          </div>
          <p className="mt-2">Quizzes</p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailCard;
