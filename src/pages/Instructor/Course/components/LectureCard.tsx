/* eslint-disable no-unused-vars */
import { MdDeleteForever, MdDragIndicator, MdModeEdit } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { Lecture } from "../../../../typings";
import { DraggableProvided } from "@hello-pangea/dnd";

interface LectureCardProp {
  provided: DraggableProvided;
  lecture: Lecture;
  index: number;
  setSelectedItem(param: Lecture): void;
  setShowEditLectureModal(param: boolean): void;
  setShowConfirmDeleteLectureModal(param: boolean): void;
}

const LectureCard = ({
  provided,
  lecture,
  index,
  setSelectedItem,
  setShowConfirmDeleteLectureModal,
  setShowEditLectureModal
}: LectureCardProp) => {
  return (
    <div
      className="bg-white border border-black rounded-xl px-8 py-2 flex items-center justify-between mt-4"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {/* Drag Icon and Title */}
      <div className="flex items-center gap-5">
        <MdDragIndicator size={32} />
        <p className="text-xl font-bold">{lecture.title}</p>
      </div>
      {/* Buttons */}
      <div className="flex gap-4">
        {/* Preview Button */}
        <div
          onClick={() => window.open(lecture.link, "_blank")}
          className="text-sm flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-slate-200 hover:rounded-xl"
        >
          <AiOutlineEye size={32} />
          <p className="font-bold">Preview</p>
        </div>
        {/* Edit Button */}
        <div
          className="text-sm flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-slate-200 hover:rounded-xl"
          onClick={() => {
            setSelectedItem({ ...lecture, index });
            setShowEditLectureModal(true);
          }}
        >
          <MdModeEdit size={32} />
          <p className="font-bold">Edit</p>
        </div>
        {/* Delete Button */}
        <div
          className="text-sm flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-slate-200 hover:rounded-xl text-red-600"
          onClick={() => {
            setSelectedItem({ ...lecture, index });
            setShowConfirmDeleteLectureModal(true);
          }}
        >
          <MdDeleteForever size={32} />
          <p className="font-bold">Delete</p>
        </div>
      </div>
    </div>
  );
};

export default LectureCard;
