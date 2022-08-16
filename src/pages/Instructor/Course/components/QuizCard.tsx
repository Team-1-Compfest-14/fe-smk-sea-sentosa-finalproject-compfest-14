/* eslint-disable no-unused-vars */
import { MdDeleteForever, MdDragIndicator, MdModeEdit } from "react-icons/md";
import { Quiz } from "../../../../typings";
import { DraggableProvided } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";

interface QuizCardProp {
  provided: DraggableProvided;
  quiz: Quiz;
  index: number;
  setSelectedItem(param: Quiz): void;
  setShowConfirmDeleteQuizModal(param: boolean): void;
}

const QuizCard = ({
  provided,
  quiz,
  index,
  setSelectedItem,
  setShowConfirmDeleteQuizModal
}: QuizCardProp) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white border border-black rounded-xl px-8 py-2 flex items-center justify-between mt-4"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {/* Drag Icon, Title, and Details */}
      <div className="flex items-center gap-5">
        <MdDragIndicator size={32} />
        <div>
          <p className="text-xl font-bold">{quiz.title}</p>
          <p>{quiz.questions.length} questions</p>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex gap-4">
        {/* Edit Button */}
        <div
          className="text-sm flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-slate-200 hover:rounded-xl"
          onClick={() => {
            navigate("quizzes/1");
          }}
        >
          <MdModeEdit size={32} />
          <p className="font-bold">Edit</p>
        </div>
        {/* Delete Button */}
        <div
          className="text-sm flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-slate-200 hover:rounded-xl text-red-600"
          onClick={() => {
            setSelectedItem({ ...quiz, index });
            setShowConfirmDeleteQuizModal(true);
          }}
        >
          <MdDeleteForever size={32} />
          <p className="font-bold">Delete</p>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
