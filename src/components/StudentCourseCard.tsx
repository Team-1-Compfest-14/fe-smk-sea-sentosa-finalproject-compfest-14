import { GoPerson } from "react-icons/go";
import { TbNotes } from "react-icons/tb";

interface StudentCourseCardProps {
  courseName: string;
  instructorName: string;
  numOfSections: number;
}

const StudentCourseCard = ({
  courseName,
  instructorName,
  numOfSections
}: StudentCourseCardProps) => {
  return (
    <div className="h-40 border w-full border-black rounded-2xl flex justify-between items-center my-4 px-10">
      {/* Details */}
      <div className="my-auto flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold mb-4">{courseName}</p>
          <p className="flex items-center mb-2">
            <GoPerson className="mr-2" size={20} />
            {instructorName}
          </p>
          <p className="flex items-center mb-2">
            <TbNotes className="mr-2" size={20} />
            {numOfSections} sections
          </p>
        </div>
      </div>
      {/* Button */}
      <div className="flex flex-col items-center justify-center p-4">
        <button className="my-2 px-4 py-2 border border-black rounded-lg hover:bg-slate-200">
          Details
        </button>
        <button className="my-2 px-5 py-2 border border-black rounded-lg bg-orange-light hover:bg-orange-dark">
          Enroll
        </button>
      </div>
    </div>
  );
};

export default StudentCourseCard;
