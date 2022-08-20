import { Modal } from "../../../../components";

interface ConfirmExitModalProp {
  // eslint-disable-next-line no-unused-vars
  handleConfirmExit: (type: string) => void;
}

const ConfirmExitModal = ({ handleConfirmExit }: ConfirmExitModalProp) => {
  return (
    <Modal>
      <div className="text-center text-red-600">
        <p>Are you sure you want to leave this page? </p>
        <p className="font-bold">Your progress will not be saved.</p>
      </div>
      {/* Buttons */}
      <div className="flex flex-col mt-4 gap-2">
        <button
          onClick={() => handleConfirmExit("confirm")}
          className="px-4 py-2 border border-red-600 rounded-lg text-red-600"
        >
          Yes
        </button>
        <button
          onClick={() => handleConfirmExit("cancel")}
          className="px-4 py-2 border border-black bg-blue rounded-lg text-white"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmExitModal;
