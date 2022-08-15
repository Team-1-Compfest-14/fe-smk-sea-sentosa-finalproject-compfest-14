import { FolderIdeaBulb } from "../../../../assets";

const VerifiedCourseCard = () => {
  return (
    <div className="bg-purple border-2 border-black rounded-3xl flex justify-between items-center overflow-clip mb-8">
      <div>
        <p className="text-5xl font-bold ml-10">All Verified Courses</p>
        <p className="text-4xl font-light font-mono ml-10 mt-10 italic">
          Curiosity is fuel for innovation.
        </p>
      </div>
      <FolderIdeaBulb />
    </div>
  );
};

export default VerifiedCourseCard;
