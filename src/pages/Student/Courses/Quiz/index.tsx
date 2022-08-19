/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { QuestionCard, ConfirmExitModal } from "../Components";
import { answersInterface } from "../../../../typings";

interface questionAnswersInterface {
  answers: answersInterface[];
}

const StudentQuiz = () => {
  const navigate = useNavigate();

  const [showConfirmExitModal, setShowConfirmExitModal] = useState(false);

  const questions = [
    {
      id: 0,
      index: 0,
      description: "Test question",
      options: [
        { id: 0, value: "Option A" },
        { id: 1, value: "Option B" },
        { id: 2, value: "Option C" },
        { id: 3, value: "Option D" },
        { id: 4, value: "Option E" }
      ]
    },
    {
      id: 1,
      index: 1,
      description: "Test question2",
      options: [
        { id: 0, value: "Option A" },
        { id: 1, value: "Option B" },
        { id: 2, value: "Option C" },
        { id: 3, value: "Option D" },
        { id: 4, value: "Option E" }
      ]
    },
    {
      id: 2,
      index: 2,
      description: "Test question3",
      options: [
        { id: 0, value: "Option A" },
        { id: 1, value: "Option B" },
        { id: 2, value: "Option C" },
        { id: 3, value: "Option D" }
      ]
    }
  ];

  const studentAnswers: answersInterface[] = [];

  const handleAnswer = (answer: answersInterface) => {
    studentAnswers.push(answer);
  };

  const handleSubmitAnswer = () => {
    const answers: questionAnswersInterface = {
      answers: studentAnswers
    };
  };

  const handleConfirmExit = (type: string) => {
    if (type === "confirm") {
      setShowConfirmExitModal(false);
      navigate(-1);
    } else {
      setShowConfirmExitModal(false);
    }
  };

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="w-2/3">
        {/* Header */}
        <div className="flex items-center justify-between mb-20">
          <p className="font-bold text-4xl flex gap-3">
            <IoChevronBack
              onClick={() => setShowConfirmExitModal(true)}
              size={40}
              className="bg-orange-light rounded-lg border border-black cursor-pointer mr-5"
            />
            Quiz 1 - Derivatives Practice
          </p>
        </div>

        {/* Questions */}
        {questions.map((question, index) => (
          <QuestionCard key={index} question={question} index={index} handleAnswer={handleAnswer} />
        ))}

        <div className="flex justify-end mt-8">
          <button
            className="bg-blue text-white px-4 py-2 rounded-xl border border-black hover:bg-blue-dark"
            onClick={() => {
              alert("You have finished the quiz");
              handleSubmitAnswer();
            }}
          >
            Submit
          </button>
        </div>
      </div>
      {showConfirmExitModal && <ConfirmExitModal handleConfirmExit={handleConfirmExit} />}
    </div>
  );
};

export default StudentQuiz;
