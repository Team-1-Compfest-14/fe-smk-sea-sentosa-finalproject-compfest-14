import { useContext } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Modal } from "../../../../components";
import { QuizContext } from "../../../../context";

interface ConfirmDeleteQuestionModalProp {
  handleBack: () => void;
}

const ConfirmDeleteQuestionModal = ({ handleBack }: ConfirmDeleteQuestionModalProp) => {
  const { selectedQuestion } = useContext(QuizContext);
  return (
    <Modal>
      <div className="flex items-center mb-4 gap-4">
        <IoChevronBack
          onClick={() => {
            handleBack();
          }}
          size={28}
          className="rounded-lg border-2 border-black cursor-pointer"
        />
        <p className="font-bold text-xl gap-4 text-red-600">
          Deleting Question {selectedQuestion?.index! + 1}
        </p>
      </div>
      {/* Message */}
      <div className="text-center text-red-600">
        <p>Are you sure you want to delete Question {selectedQuestion?.index! + 1}? </p>
        <p className="font-bold">This cannot be undone.</p>
      </div>
      {/* Buttons */}
      <div className="flex flex-col mt-4 gap-2">
        <button
          onClick={() => {
            handleBack();
          }}
          className="px-4 py-2 border border-red-600 rounded-lg text-red-600"
        >
          Yes
        </button>
        <button
          onClick={() => handleBack()}
          className="px-4 py-2 border border-black bg-blue rounded-lg text-white"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteQuestionModal;
