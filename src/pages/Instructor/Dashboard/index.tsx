import { ReactComponent as CellArt } from "./assets/cell_art.svg";

const InstructorDashboard = () => {
  return (
    <div className="p-10 flex flex-col items-center justify-center">
      {/* Header Card */}
      <div className="bg-orange-light border-2 border-black rounded-3xl w-2/3 flex justify-between items-center overflow-clip mb-8">
        <p className="text-4xl font-bold ml-10">Mike&apos;s Courses</p>
        <CellArt />
      </div>
      {/* Course Card */}
      <div className="w-2/3 h-36 border border-black rounded-2xl flex">
        {/* Image */}
        <div className="w-1/5 bg-yellow h-full rounded-2xl border border-black"></div>
        {/* Details */}
        <div className="w-4/5 mx-8 my-auto flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold mb-2">Calculus 1</p>
            <p>20 students enrolled</p>
            <p>8 sections</p>
          </div>
          <div>
            <p>Edit</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
