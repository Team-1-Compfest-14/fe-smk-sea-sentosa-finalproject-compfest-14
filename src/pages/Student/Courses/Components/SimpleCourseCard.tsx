/* eslint-disable no-unused-vars */
import { GrView, GrPlay } from "react-icons/gr";
import { VscOpenPreview } from "react-icons/vsc";

interface SimpleCourseCardProps {
  id: number;
  courseNumber: number;
  name: string;
  isComplete: boolean;
  isQuiz: boolean;
  handleQuiz?: (quizId: number, isComplete: boolean) => void;
  handleLecture?: (lectureId: number, lectureLink: string, isComplete: boolean) => void;
  lectureLink?: string;
}

const SimpleCourseCard = ({
  id,
  courseNumber,
  name,
  isComplete,
  isQuiz,
  handleQuiz,
  handleLecture,
  lectureLink
}: SimpleCourseCardProps) => {
  return (
    <div className="h-28 border w-full border-black rounded-2xl flex justify-between items-center my-4 px-10">
      {/* Details */}
      <div className="my-auto flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold">
            <span className="mr-10">{courseNumber}</span>
            {name}
          </p>
        </div>
      </div>
      {/* Action */}
      <>
        {isQuiz ? (
          // Quiz
          <div
            className="flex flex-col items-center justify-center cursor-pointer p-4 hover:bg-slate-200 hover:rounded-xl"
            onClick={() => {
              if (handleQuiz) {
                handleQuiz(id, isComplete);
              }
            }}
          >
            {isComplete ? (
              <>
                <VscOpenPreview size={28} />
                <p className="font-bold text-xs mt-1">Review</p>
              </>
            ) : (
              <>
                <GrPlay size={28} />
                <p className="font-bold text-xs mx-2 mt-1">Start</p>
              </>
            )}
          </div>
        ) : (
          // Lectures
          <div
            className="flex flex-col items-center justify-center cursor-pointer p-4 hover:bg-slate-200 hover:rounded-xl"
            onClick={() => {
              if (handleLecture) {
                handleLecture(id, lectureLink!, isComplete);
              }
            }}
          >
            {isComplete ? (
              <>
                <VscOpenPreview size={28} />
                <p className="font-bold text-xs mt-1">Review</p>
              </>
            ) : (
              <>
                <GrView size={28} />
                <p className="font-bold text-xs mx-2 mt-1">View</p>
              </>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default SimpleCourseCard;
