/* eslint-disable no-unused-vars */
interface CourseDetailModalProp {
  handleBack: () => void;
  courseName: string;
  instructorName: string;
  description: string;
  handeModalEnroll: (type: string) => void;
}

const CourseDetailModal = ({
  handleBack,
  courseName,
  instructorName,
  description,
  handeModalEnroll
}: CourseDetailModalProp) => (
  <div className="backdrop-brightness-50 backdrop-blur-sm w-screen h-screen fixed flex justify-center items-center top-0 left-0">
    <div className="fixed bg-white rounded-2xl border border-black w-2/5">
      <div className="border w-full border-black rounded-2xl bg-orange-light p-5">
        <h1 className="text-4xl font-sans font-bold">{courseName}</h1>
        <p className="font-sans mt-2 text-lg">{instructorName}</p>
      </div>
      <div className="p-5 mt-5">
        <p className="flex items-center mb-4 font-sans font-bold text-2xl">Description</p>
        <p>{description}</p>
        <div className="flex justify-end">
          <div className="flex flex-col items-center justify-center p-4">
            <button
              onClick={() => handeModalEnroll("confirm")}
              className="my-1 px-5 py-2 border border-black rounded-lg bg-orange-light hover:bg-orange-dark"
            >
              Enroll
            </button>
            <button
              onClick={() => handleBack()}
              className="my-1 px-6 py-2 border border-black rounded-lg hover:bg-slate-200"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CourseDetailModal;
