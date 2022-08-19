import { QuestionStudent, answersInterface } from "../../../../typings";

interface QuestionCardProp {
  question: QuestionStudent;
  index: number;
  isFeedback?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleAnswer?: (answer: answersInterface) => void;
}

const QuestionCard = ({ question, index, isFeedback, handleAnswer }: QuestionCardProp) => {
  return (
    <div className="bg-white border border-black rounded-xl px-8 py-4 flex flex-col gap-4 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-5">
          <p className="font-bold text-lg">Question {index + 1}</p>
        </div>
        {isFeedback && (
          <div className="flex gap-4">
            {question.isCorrect ? (
              // Correct
              <div className="flex flex-col items-center justify-center py-2 px-4 rounded-lg border-2 border-black bg-green">
                <p className="font-bold">Correct</p>
              </div>
            ) : (
              // Incorrect
              <div className="flex flex-col items-center justify-center py-2 px-4 rounded-lg border-2 border-black bg-red-500">
                <p className="font-bold">Incorrect</p>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Description */}
      <p>{question.description}</p>
      {question.options.map((option, index) => {
        const answer: answersInterface = {
          questionId: question.id,
          questionOptionId: option.id
        };

        if (isFeedback) {
          return (
            <div key={index} className="flex items-center gap-2">
              <input
                type="radio"
                value={option.value}
                className={`border-black ${
                  !question.isCorrect && option.isUserAnswer
                    ? "bg-orange-light border-orange-light"
                    : "checked:bg-green checked:border-green"
                }`}
                name={`question${question.id}Answer`}
                defaultChecked={
                  option.isQuestionAnswer || (!question.isCorrect && option.isUserAnswer)
                    ? true
                    : false
                }
                disabled
              />
              <label className={`${!question.isCorrect && option.isUserAnswer && "line-through"}`}>
                {option.value}
              </label>
            </div>
          );
        } else {
          return (
            <div key={index} className="flex items-center gap-2">
              <input
                type="radio"
                value={option.value}
                className="border-black checked:bg-green checked:border-green"
                name={`question${question.id}Answer`}
                onChange={() => {
                  if (handleAnswer) {
                    handleAnswer(answer);
                  }
                }}
              />
              <label>{option.value}</label>
            </div>
          );
        }
      })}
    </div>
  );
};

export default QuestionCard;
