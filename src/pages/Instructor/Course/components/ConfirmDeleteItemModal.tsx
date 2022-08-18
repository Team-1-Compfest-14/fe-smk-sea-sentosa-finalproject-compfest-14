import { IoChevronBack } from "react-icons/io5";
import { Modal } from "../../../../components";
import { Lecture, Quiz } from "../../../../typings";

interface ConfirmDeleteItemModalProp {
  items: Lecture[] | Quiz[];
  selectedItem: Lecture | Quiz;
  // eslint-disable-next-line no-unused-vars
  setItems: (params: Lecture[] | Quiz[]) => void;
  handleBack: () => void;
}

const isLecture = (o: Lecture | Quiz): o is Lecture => {
  return (o as Lecture).link !== undefined;
};

const ConfirmDeleteItemModal = ({
  items,
  selectedItem,
  setItems,
  handleBack
}: ConfirmDeleteItemModalProp) => {
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
        <p className="font-bold text-xl gap-4 text-red-600">Deleting {selectedItem.title}</p>
      </div>
      {/* Message */}
      <div className="text-center text-red-600">
        <p>Are you sure you want to delete {selectedItem.title}? </p>
        <p className="font-bold">This cannot be undone.</p>
      </div>
      {/* Buttons */}
      <div className="flex flex-col mt-4 gap-2">
        <button
          onClick={() => {
            const itemsCopy = isLecture(selectedItem)
              ? Array.from(items as Lecture[])
              : Array.from(items as Quiz[]);
            itemsCopy.splice(selectedItem.index, 1);
            setItems(itemsCopy);
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

export default ConfirmDeleteItemModal;
