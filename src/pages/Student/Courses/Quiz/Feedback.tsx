import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { QuestionCard } from "../Components";

const StudentQuizFeedback = () => {
  const questions = [
    {
      id: 0,
      index: 0,
      description: "Test question",
      options: [
        { id: 0, value: "Option A", isUserAnswer: true, isQuestionAnswer: false },
        { id: 1, value: "Option B", isUserAnswer: false, isQuestionAnswer: false },
        { id: 2, value: "Option C", isUserAnswer: false, isQuestionAnswer: false },
        { id: 3, value: "Option D", isUserAnswer: false, isQuestionAnswer: false },
        { id: 4, value: "Option E", isUserAnswer: false, isQuestionAnswer: true }
      ]
    },
    {
      id: 1,
      index: 1,
      description: "Test question2",
      options: [
        { id: 0, value: "Option A", isUserAnswer: false, isQuestionAnswer: false },
        { id: 1, value: "Option B", isUserAnswer: false, isQuestionAnswer: false },
        { id: 2, value: "Option C", isUserAnswer: true, isQuestionAnswer: false },
        { id: 3, value: "Option D", isUserAnswer: false, isQuestionAnswer: false },
        { id: 4, value: "Option E", isUserAnswer: false, isQuestionAnswer: true }
      ],
      isCorrect: false
    },
    {
      id: 2,
      index: 2,
      description: "Test question3",
      options: [
        { id: 0, value: "Option A", isUserAnswer: false, isQuestionAnswer: false },
        { id: 1, value: "Option B", isUserAnswer: false, isQuestionAnswer: false },
        { id: 2, value: "Option C", isUserAnswer: true, isQuestionAnswer: true },
        { id: 3, value: "Option D", isUserAnswer: false, isQuestionAnswer: false }
      ],
      isCorrect: true
    }
  ];

  const navigate = useNavigate();

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div className="w-2/3">
        {/* Header */}
        <div className="flex items-center justify-between mb-20">
          <p className="font-bold text-4xl flex gap-3">
            <IoChevronBack
              onClick={() => {
                navigate(-1);
              }}
              size={40}
              className="bg-orange-light rounded-lg border border-black cursor-pointer mr-5"
            />
            Quiz 1 - Derivatives Practice
          </p>
        </div>

        {/* Questions */}
        {questions.map((question, index) => (
          <QuestionCard key={index} question={question} index={index} isFeedback />
        ))}

        <div className="flex justify-end mt-8">
          <button className="bg-orange-light px-4 py-2 rounded-xl border border-black hover:bg-orange-dark">
            Finish Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentQuizFeedback;
