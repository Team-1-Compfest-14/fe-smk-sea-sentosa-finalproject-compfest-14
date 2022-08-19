import { MdModeEdit } from "react-icons/md";
import { MdBackpack } from "react-icons/md";
import { RiBookMarkFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  id: number;
  name: string;
  numOfStudents: number;
  numOfSections: number;
  // eslint-disable-next-line no-unused-vars
}

const CourseCard = ({ id, name, numOfStudents, numOfSections }: CourseCardProps) => {
  const navigate = useNavigate();
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
      <div
        className="flex flex-col items-center justify-center cursor-pointer p-4 hover:bg-slate-200 hover:rounded-xl"
        onClick={() => {
          navigate(`/instructor/courses/${id}`);
        }}
      >
        <MdModeEdit size={32} />
        <p className="font-bold">Edit</p>
      </div>
    </div>
  );
};

export default CourseCard;
