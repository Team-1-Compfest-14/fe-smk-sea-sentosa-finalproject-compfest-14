import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { QuestionCard } from "../Components";

const Feedback = () => {
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
          <QuestionCard key={index} question={question} index={index} />
        ))}

        <div className="flex justify-end mt-8">
          <button className="bg-blue text-white px-4 py-2 rounded-xl border border-black hover:bg-blue-dark">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
