import { studentDashboardHeader } from "../../../../typings";
import { CellArt } from "../../../../assets";

const StudentDashboardHeaderCard = ({
  name,
  totalActive,
  totalComplete
}: studentDashboardHeader) => {
  return (
    <div className="bg-orange-light border border-black rounded-3xl h-64 flex justify-between items-center overflow-clip">
      <div>
        <p className="text-4xl font-bold ml-10 max-w-md">{name}&apos;s Courses</p>
        <div className="flex justify-center">
          <div className="flex flex-col items-start justify-center mx-6 mt-5">
            <div className="bg-yellow rounded-full p-4 border-2 border-black">
              <p className="text-2xl mx-2">{totalActive}</p>
            </div>
            <p className="mt-2 text-lg font-semibold mx-2">Active</p>
          </div>
          <div className="flex flex-col items-center justify-center mx-6 mt-5">
            <div className="bg-orange-dark rounded-full p-4 border-2 border-black">
              <p className="text-2xl mx-2">{totalComplete}</p>
            </div>
            <p className="mt-2 text-lg font-semibold mx-2">Completed</p>
          </div>
        </div>
      </div>
      <CellArt className="h-full w-1/2" />
    </div>
  );
};

export default StudentDashboardHeaderCard;
