import { IoChevronBack } from "react-icons/io5";
import { Modal } from "../../../../components";

interface AddCourseModalProp {
  handleBack: () => void;
}

const AddCourseModal = ({ handleBack }: AddCourseModalProp) => {
  return (
    <Modal>
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
    </Modal>
  );
};

export default AddCourseModal;
