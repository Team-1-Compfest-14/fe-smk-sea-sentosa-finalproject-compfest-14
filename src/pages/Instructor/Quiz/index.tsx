import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { QuizContext } from "../../../context";
import { Quiz, Question } from "../../../typings";
import {
  AddQuestionModal,
  CompactQuestionCard,
  ConfirmDeleteQuestionModal,
  EditQuestionModal,
  EditQuizNameModal,
  StudentQuestionCard
} from "./components";
import axios from "axios";
import { BASE_URL, refreshAuthLogic } from "../../../api";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const InstructorQuiz = () => {
  const { courseId, quizId } = useParams();
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showEditQuizNameModal, setShowEditQuizNameModal] = useState(false);

  const [showCompactView, setShowCompactView] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);
  const [showConfirmDeleteQuestionModal, setShowConfirmDeleteQuestionModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
    fetchData();
  }, []);

  const fetchData = () => {
    // Get selected quiz
    axios
      .get(`${BASE_URL}/courses/${courseId}/quizzes/instructor`)
      .then((res) => {
        const { quizzes } = res.data.data;
        setSelectedQuiz(quizzes.filter((quiz: Quiz) => quiz.quiz.id.toString() === quizId)[0]);
      })
      .catch((err) => console.log(err));

    // Get all questions in the selected quiz
    axios
      .get(`${BASE_URL}/courses/${courseId}/quizzes/${quizId}/instructor`)
      .then((res) => {
        const { questions } = res.data.data;
        setQuestions(questions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBackModal = (action: "add" | "edit" | "delete") => {
    document.body.style.overflow = "auto";
    switch (action) {
      case "add":
        setShowAddQuestionModal(false);
        break;
      case "edit":
        showEditQuestionModal ? setShowEditQuestionModal(false) : setShowEditQuizNameModal(false);
        break;
      case "delete":
        setShowConfirmDeleteQuestionModal(false);
        break;
    }
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;
    const items = Array.from(questions!);
    const moved = items[source.index];
    items.splice(source.index, 1);
    items.splice(destination.index, 0, moved);
    setQuestions(items);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        setQuestions,
        selectedQuestion,
        setSelectedQuestion,
        setShowEditQuestionModal,
        setShowConfirmDeleteQuestionModal
      }}
    >
      <div className="container mx-auto p-10 max-w-screen-lg">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="font-bold text-xl flex gap-3">
            <IoChevronBack
              onClick={() => {
                navigate(-1);
              }}
              size={28}
              className="bg-orange-light rounded-lg border border-black cursor-pointer hover:bg-orange-dark"
            />
            Quiz {selectedQuiz?.order! + 1} - {selectedQuiz?.name}
          </p>
          <button
            onClick={() => {
              setShowEditQuizNameModal(true);
            }}
            className="bg-blue text-white px-4 py-2 rounded-lg border border-black hover:bg-blue-dark"
          >
            Edit Name
          </button>
        </div>
        {/* View Options */}
        <div className="container flex justify-around my-8">
          <button
            onClick={() => setShowCompactView(true)}
            className={`px-4 py-2 border border-black rounded-lg hover:bg-slate-400 ${
              showCompactView && "bg-orange-light hover:bg-orange-dark"
            }`}
          >
            Compact View
          </button>
          <button
            onClick={() => setShowCompactView(false)}
            className={`px-4 py-2 border border-black rounded-lg hover:bg-slate-400 ${
              !showCompactView && "bg-orange-light hover:bg-orange-dark"
            }`}
          >
            Student View
          </button>
        </div>
        {/* Question Cards */}
        {questions?.length! > 0 ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="questions">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {showCompactView
                    ? questions?.map((question, index) => (
                        <Draggable
                          key={question.id}
                          draggableId={question.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <CompactQuestionCard
                              provided={provided}
                              index={index}
                              question={question}
                            />
                          )}
                        </Draggable>
                      ))
                    : questions?.map((question, index) => (
                        <Draggable
                          key={question.id}
                          draggableId={question.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <StudentQuestionCard
                              provided={provided}
                              index={index}
                              question={question}
                            />
                          )}
                        </Draggable>
                      ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <p className="text-center p-10 bg-black text-white rounded-lg">No questions added yet.</p>
        )}

        {/* Add Item Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={() => {
              document.body.style.overflow = "hidden";
              setShowAddQuestionModal(true);
            }}
            className="bg-blue text-white px-4 py-2 rounded-xl border border-black hover:bg-blue-dark"
          >
            Add Question
          </button>
        </div>
        {showAddQuestionModal && <AddQuestionModal handleBack={() => handleBackModal("add")} />}
        {showEditQuestionModal && <EditQuestionModal handleBack={() => handleBackModal("edit")} />}
      </div>
      {showEditQuizNameModal && (
        <EditQuizNameModal handleBack={() => handleBackModal("edit")} quiz={selectedQuiz!} />
      )}
      {showConfirmDeleteQuestionModal && (
        <ConfirmDeleteQuestionModal handleBack={() => handleBackModal("delete")} />
      )}
    </QuizContext.Provider>
  );
};

export default InstructorQuiz;
