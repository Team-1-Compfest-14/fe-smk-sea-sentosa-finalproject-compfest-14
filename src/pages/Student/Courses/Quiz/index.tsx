/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { QuestionCard, ConfirmExitModal } from "../Components";
import { answersInterface, QuestionStudent } from "../../../../typings";
import { useDocumentTitle } from "../../../../hooks";
import axiosJWT from "../../axiosJWT";

interface questionAnswersInterface {
  answers: answersInterface[];
}

const StudentQuiz = () => {
  useDocumentTitle("Quiz | Pelajarin");
  const navigate = useNavigate();
  const { courseId, quizId } = useParams();

  const [showConfirmExitModal, setShowConfirmExitModal] = useState(false);
  const [questionsData, setQuestionsData] = useState<QuestionStudent[] | []>([]);
  const [quizName, setQuizName] = useState("Quiz");

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      await axiosJWT
        .get(`http://localhost:5000/courses/${courseId}/quizzes/${quizId}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((res) => {
          const { quizName, questions } = res.data.data;
          setQuestionsData(questions);
          setQuizName(quizName);
        })
        .catch((err) => {
          if (
            err.response.status === 400 &&
            err.response.data.message === "Quiz already completed."
          ) {
            navigate(`/student/courses/${courseId}/quizzes/${quizId}/feedback`);
          } else {
            alert("There's an error");
            navigate(`/student/dashboard`);
          }
        });
    };

    fetchData();
  }, []);

  const studentAnswers: answersInterface[] = [];

  const handleAnswer = (answer: answersInterface) => {
    studentAnswers.push(answer);
  };

  const handleSubmitAnswer = async () => {
    const answers: questionAnswersInterface = {
      answers: studentAnswers
    };

    const accessToken = localStorage.getItem("accessToken");

    await axiosJWT
      .post(
        `http://localhost:5000/courses/${courseId}/quizzes/${quizId}/answer`,
        {
          answers: studentAnswers
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then(() => {
        alert("You have finished the quiz");
        navigate(`/student/courses/${courseId}/quizzes/${quizId}/feedback`);
      })
      .catch(() => {
        alert("There's an error");
        navigate(`/student/dashboard`);
      });
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
            {quizName}
          </p>
        </div>

        {/* Questions */}
        {questionsData.length > 0 ? (
          questionsData.map((question, index) => (
            <QuestionCard
              key={index}
              question={question}
              index={index}
              handleAnswer={handleAnswer}
            />
          ))
        ) : (
          <p className="text-center text-2xl my-5">
            Question has not been added. Please come back later.
          </p>
        )}
        <div className="flex justify-end mt-8">
          {questionsData.length > 0 && (
            <button
              className="bg-blue text-white px-4 py-2 rounded-xl border border-black hover:bg-blue-dark"
              onClick={() => {
                handleSubmitAnswer();
              }}
            >
              Submit
            </button>
          )}
        </div>
      </div>
      {showConfirmExitModal && <ConfirmExitModal handleConfirmExit={handleConfirmExit} />}
    </div>
  );
};

export default StudentQuiz;
