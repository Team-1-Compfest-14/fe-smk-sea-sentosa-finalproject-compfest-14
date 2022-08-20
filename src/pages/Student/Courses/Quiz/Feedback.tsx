import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { QuestionCard } from "../Components";
import axiosJWT from "../../axiosJWT";
import { useDocumentTitle } from "../../../../hooks";
import { QuestionStudent } from "../../../../typings";
import { BASE_URL } from "../../../../api";

const StudentQuizFeedback = () => {
  useDocumentTitle("Quiz Feedback | Pelajarin");
  const navigate = useNavigate();
  const { courseId, quizId } = useParams();
  const [questionsData, setQuestionsData] = useState<QuestionStudent[] | []>([]);
  const [quizName, setQuizName] = useState("Quiz");

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      await axiosJWT
        .get(`${BASE_URL}/courses/${courseId}/quizzes/${quizId}/feedback`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((res) => {
          const { quizName, questions } = res.data.data;
          setQuestionsData(questions);
          setQuizName(quizName);
        })
        .catch(() => {
          alert("There's an error");
          navigate(`/student/dashboard`);
        });
    };

    fetchData();
  }, []);

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
            {quizName}
          </p>
        </div>

        {/* Questions */}
        {questionsData.map((question, index) => (
          <QuestionCard key={index} question={question} index={index} isFeedback />
        ))}

        <div className="flex justify-end mt-8">
          <button
            className="bg-orange-light px-4 py-2 rounded-xl border border-black hover:bg-orange-dark"
            onClick={() => {
              navigate(`/student/courses/${courseId}`);
            }}
          >
            Finish Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentQuizFeedback;
