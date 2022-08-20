/* eslint-disable no-unused-vars */
import { MdDeleteForever, MdDragIndicator, MdModeEdit } from "react-icons/md";
import { DraggableProvided } from "@hello-pangea/dnd";
import { useContext } from "react";
import { QuizContext } from "../../../../context";
import { Question } from "../../../../typings";

interface StudentQuestionCardProp {
  provided: DraggableProvided;
  index: number;
  question: Question;
}

const StudentQuestionCard = ({ provided, index, question }: StudentQuestionCardProp) => {
  const { setSelectedQuestion, setShowEditQuestionModal, setShowConfirmDeleteQuestionModal } =
    useContext(QuizContext);
  return (
    <div
      className="bg-white border border-black rounded-xl px-8 py-4 flex flex-col gap-4 mt-4"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        {/* Drag Icon and Title */}
        <div className="flex items-center gap-5">
          <MdDragIndicator size={32} />
          <p className="font-bold text-lg">Question {index + 1}</p>
        </div>
        {/* Buttons */}
        <div className="flex gap-4">
          {/* Edit Button */}
          <div
            className="text-sm flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-slate-200 hover:rounded-xl"
            onClick={() => {
              setSelectedQuestion(question!);
              setShowEditQuestionModal(true);
            }}
          >
            <MdModeEdit size={32} />
            <p className="font-bold">Edit</p>
          </div>
          {/* Delete Button */}
          <div
            className="text-sm flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-slate-200 hover:rounded-xl text-red-600"
            onClick={() => {
              setSelectedQuestion(question);
              setShowConfirmDeleteQuestionModal(true);
            }}
          >
            <MdDeleteForever size={32} />
            <p className="font-bold">Delete</p>
          </div>
        </div>
      </div>
      {/* Description and Options */}
      <p>{question?.question}</p>
      {question?.questionOptions.map((option, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="checkbox"
            disabled
            value={option.option}
            className="border-black checked:bg-green rounded-full"
            defaultChecked={option.isCorrectAnswer ? true : false}
          />
          <label>{option.option}</label>
        </div>
      ))}
    </div>
  );
};

export default StudentQuestionCard;
