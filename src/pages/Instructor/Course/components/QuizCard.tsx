/* eslint-disable no-unused-vars */
import { MdDeleteForever, MdDragIndicator, MdModeEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ModuleContext } from "../../../../context";
import axios from "axios";
import { Quiz, QuizData } from "../../../../typings";
import { BASE_URL } from "../../../../api";

interface QuizCardProp {
  index: number;
  quiz: Quiz;
}

const QuizCard = ({ index, quiz }: QuizCardProp) => {
  const navigate = useNavigate();
  const { setSelectedQuiz, setShowConfirmDeleteQuizModal } = useContext(ModuleContext);
  const { id: courseId } = useParams();
  const quizId = quiz?.quiz?.id;

  const [quizData, setQuizData] = useState<QuizData | null>(null);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/courses/${courseId}/quizzes/${quizId}`)
      .then((res) => {
        const { data } = res.data;
        setQuizData(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="bg-white border border-black rounded-xl px-8 py-2 flex items-center justify-between mt-4">
      {/* Drag Icon, Title, and Details */}
      <div className="flex items-center gap-5">
        <MdDragIndicator size={32} />
        <div>
          <p className="text-xl font-bold">{quizData?.quizName}</p>
          <p>
            {quizData?.questions.length ?? "No"}
            {quizData?.questions.length! !== 1 ? " questions" : " question"}
          </p>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex gap-4">
        {/* Edit Button */}
        <div
          className="text-sm flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-slate-200 hover:rounded-xl"
          onClick={() => {
            navigate(`quizzes/${quizId}`);
          }}
        >
          <MdModeEdit size={32} />
          <p className="font-bold">Edit</p>
        </div>
        {/* Delete Button */}
        <div
          className="text-sm flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-slate-200 hover:rounded-xl text-red-600"
          onClick={() => {
            setSelectedQuiz(quiz);
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
