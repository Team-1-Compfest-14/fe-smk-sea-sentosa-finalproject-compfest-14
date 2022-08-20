/* eslint-disable no-unused-vars */
import { MdDeleteForever, MdDragIndicator, MdModeEdit } from "react-icons/md";
import { DraggableProvided } from "@hello-pangea/dnd";
import { useContext } from "react";
import { QuizContext } from "../../../../context";
import { Question } from "../../../../typings";

interface CompactQuestionCardProp {
  provided: DraggableProvided;
  index: number;
  question: Question;
}

const CompactQuestionCard = ({ provided, index, question }: CompactQuestionCardProp) => {
  const { setSelectedQuestion, setShowEditQuestionModal } = useContext(QuizContext);
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
        <p>{question?.question}</p>
      </div>
      {/* Buttons */}
      <div className="flex gap-4">
        {/* Edit Button */}
        <div
          className="text-sm flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-slate-200 hover:rounded-xl"
          onClick={() => {
            setSelectedQuestion(question);
            setShowEditQuestionModal(true);
          }}
        >
          <MdModeEdit size={32} />
          <p className="font-bold">Edit</p>
        </div>
      </div>
    </div>
  );
};

export default CompactQuestionCard;
