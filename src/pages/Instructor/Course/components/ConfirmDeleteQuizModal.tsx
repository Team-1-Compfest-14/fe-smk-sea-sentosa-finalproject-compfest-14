import axios from "axios";
import { useContext } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { Modal } from "../../../../components";
import { ModuleContext } from "../../../../context";

interface ConfirmDeleteItemModalProp {
  handleBack: () => void;
}

const ConfirmDeleteItemModal = ({ handleBack }: ConfirmDeleteItemModalProp) => {
  const { selectedQuiz } = useContext(ModuleContext);
  const { id: courseId } = useParams();

  const handleDeleteQuiz = () => {
    axios
      .delete(`http://localhost:5000/courses/${courseId}/quizzes/${selectedQuiz?.quiz?.id}`)
      .then((res) => {
        console.log(res.data);
        alert("Successfully deleted quiz!");
        window.location.reload();
        handleBack();
      })
      .catch((err) => console.log(err));
  };
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
        <p className="font-bold text-xl gap-4 text-red-600">Deleting {selectedQuiz?.name}</p>
      </div>
      {/* Message */}
      <div className="text-center text-red-600">
        <p>Are you sure you want to delete {selectedQuiz?.name}? </p>
        <p className="font-bold">This cannot be undone.</p>
      </div>
      {/* Buttons */}
      <div className="flex flex-col mt-4 gap-2">
        <button
          onClick={handleDeleteQuiz}
          className="px-4 py-2 border border-red-600 rounded-lg text-red-600"
        >
          Yes
        </button>
        <button
          onClick={() => handleBack()}
          className="px-4 py-2 border border-black bg-blue rounded-lg text-white hover:bg-slate-200"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteItemModal;
