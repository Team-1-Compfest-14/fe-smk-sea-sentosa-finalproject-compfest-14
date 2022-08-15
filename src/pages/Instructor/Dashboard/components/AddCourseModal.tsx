import { IoChevronBack } from "react-icons/io5";

interface AddCourseModalProp {
  handleBack: () => void;
}

const AddCourseModal = ({ handleBack }: AddCourseModalProp) => {
  return (
    <div className="backdrop-brightness-50 backdrop-blur-sm w-screen h-screen fixed flex justify-center items-center top-0">
      <div className="fixed bg-white p-10 rounded-xl">
        <p className="flex items-center mb-4 font-bold">
          <IoChevronBack
            onClick={() => handleBack()}
            size={28}
            className="bg-slate-300 rounded-lg border border-black mr-2"
          />
          Enter a new course name:
        </p>
        <form onSubmit={() => {}}>
          <input type="text" className="border border-black px-3 py-2 rounded-lg w-full" />
          <div className="flex items-center justify-end mt-4">
            <input
              type="submit"
              className="bg-blue text-white px-5 py-2 border border-black rounded-lg"
              value="Add"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
