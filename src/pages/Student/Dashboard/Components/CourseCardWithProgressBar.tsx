import { GiTeacher } from "react-icons/gi";
import { GrPlay } from "react-icons/gr";
import { enrolledCourses } from "../../../../typings";

const CourseCardWithProgressBar = ({
  name,
  teacher,
  totalModule,
  totalModuleCompletion,
  isComplete,
  courseId
}: enrolledCourses) => {
  function countProgressBar() {
    return (totalModuleCompletion / totalModule) * 100;
  }

  const progressStyle = {
    width: countProgressBar() + "%"
  };

  return (
    <div className="h-40 border w-full border-black rounded-2xl flex justify-between items-center my-4 px-10">
      {/* Details */}
      <div className="my-auto flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold mb-4">{name}</p>
          <p className="flex items-center mb-2">
            <GiTeacher className="mr-2" size={20} />
            {teacher}
          </p>
          <div>
            {!isComplete && (
              <p className="mt-5 text-sm font-semibold">
                {totalModule} out of {totalModuleCompletion} sections completed.
              </p>
            )}
            <div className="w-full bg-orange-light rounded-full border border-black">
              <div
                className="text-xs font-medium text-center p-0.5 leading-none rounded-full"
                style={progressStyle}
              >
                {countProgressBar()}%
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Button */}
      {!isComplete && (
        <div
          className="flex flex-col items-center justify-center cursor-pointer p-4 hover:bg-slate-200 hover:rounded-xl"
          onClick={() => alert(courseId)}
        >
          <GrPlay size={28} />
          <p className="font-bold text-xs mx-2 mt-1">Continue</p>
        </div>
      )}
    </div>
  );
};

export default CourseCardWithProgressBar;
