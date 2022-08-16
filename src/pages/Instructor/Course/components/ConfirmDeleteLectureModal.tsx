import { IoChevronBack } from "react-icons/io5";

type Lecture = {
  id: number;
  title: string;
  link: string;
  index: number;
};

interface ConfirmDeleteLectureModalProp {
  lectures: Lecture[];
  selectedLecture: Lecture;
  // eslint-disable-next-line no-unused-vars
  setLectures: (params: Lecture[]) => void;
  handleBack: () => void;
}

const ConfirmDeleteLectureModal = ({
  lectures,
  selectedLecture,
  setLectures,
  handleBack
}: ConfirmDeleteLectureModalProp) => {
  return (
    <div className="backdrop-brightness-50 backdrop-blur-sm w-screen h-screen fixed flex justify-center items-center top-0 left-0">
      <div className="fixed bg-white p-10 rounded-xl container max-w-lg border-2 border-red-600">
        <div className="flex items-center mb-4 gap-4">
          <IoChevronBack
            onClick={() => {
              handleBack();
            }}
            size={28}
            className="rounded-lg border-2 border-black cursor-pointer"
          />
          <p className="font-bold text-xl gap-4 text-red-600">Deleting {selectedLecture.title}</p>
        </div>
        <div className="text-center text-red-600">
          <p>Are you sure you want to delete {selectedLecture.title}? </p>
          <p className="font-bold">This cannot be undone.</p>
        </div>
        <div className="flex flex-col mt-4 gap-2">
          <button
            onClick={() => {
              const items = Array.from(lectures);
              items.splice(selectedLecture.index, 1);
              setLectures(items);
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
      </div>
    </div>
  );
};

export default ConfirmDeleteLectureModal;
