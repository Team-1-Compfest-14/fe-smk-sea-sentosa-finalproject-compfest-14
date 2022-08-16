import { GrView, GrPlay } from "react-icons/gr";
import { VscOpenPreview } from "react-icons/vsc";

interface SimpleCourseCardProps {
  courseNumber: number;
  name: string;
  numOfQuestions?: number;
  isComplete: boolean;
}

const SimpleCourseCard = ({
  courseNumber,
  name,
  numOfQuestions,
  isComplete
}: SimpleCourseCardProps) => (
  <div className="h-28 border w-full border-black rounded-2xl flex justify-between items-center my-4 px-10">
    {/* Details */}
    <div className="my-auto flex justify-between items-center">
      <div>
        <p className="text-2xl font-bold">
          <span className="mr-10">{courseNumber}</span>
          {name}
        </p>
        {numOfQuestions && <p className="flex items-center ml-14">{numOfQuestions} questions</p>}
      </div>
    </div>
    {/* Action */}
    <>
      {numOfQuestions ? (
        // Quiz
        <div
          className="flex flex-col items-center justify-center cursor-pointer p-4 hover:bg-slate-200 hover:rounded-xl"
          onClick={() => {}}
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
        // Course
        <div
          className="flex flex-col items-center justify-center cursor-pointer p-4 hover:bg-slate-200 hover:rounded-xl"
          onClick={() => {}}
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

export default SimpleCourseCard;
