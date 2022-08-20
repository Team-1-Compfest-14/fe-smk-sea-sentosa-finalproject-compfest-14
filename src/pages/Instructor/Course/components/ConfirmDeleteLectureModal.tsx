import axios from "axios";
import { useContext } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { BASE_URL, refreshAuthLogic } from "../../../../api";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { Modal } from "../../../../components";
import { ModuleContext } from "../../../../context";

interface ConfirmDeleteLectureModalProp {
  handleBack: () => void;
}

const ConfirmDeleteLectureModal = ({ handleBack }: ConfirmDeleteLectureModalProp) => {
  const { id: courseId } = useParams();
  const { selectedLecture } = useContext(ModuleContext);

  const handleDeleteLecture = () => {
    const lectureId = selectedLecture?.id;
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
    axios
      .delete(`${BASE_URL}/courses/${courseId}/lectures/${lectureId}`)
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        alert("Successfully deleted lecture!");
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
        <p className="font-bold text-xl gap-4 text-red-600">Deleting {selectedLecture?.name}</p>
      </div>
      {/* Message */}
      <div className="text-center text-red-600">
        <p>Are you sure you want to delete {selectedLecture?.name}? </p>
        <p className="font-bold">This cannot be undone.</p>
      </div>
      {/* Buttons */}
      <div className="flex flex-col mt-4 gap-2">
        <button
          onClick={handleDeleteLecture}
          className="px-4 py-2 border border-red-600 rounded-lg text-red-600 hover:bg-red-600 hover:text-white hover:border-black"
        >
          Yes
        </button>
        <button
          onClick={() => handleBack()}
          className="px-4 py-2 border border-black bg-blue rounded-lg text-white hover:bg-blue-dark"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteLectureModal;
