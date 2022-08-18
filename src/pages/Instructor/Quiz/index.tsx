/* eslint-disable no-unused-vars */
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Question } from "../../../typings";
import { AddQuestionModal, CompactQuestionCard, StudentQuestionCard } from "./components";
// import { Question } from "../../../typings";
// import { AddQuestionModal, CompactQuestionCard, EditQuestionModal } from "./components";

const InstructorQuiz = () => {
  const [showCompactView, setShowCompactView] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);
  const [showConfirmDeleteQuestionModal, setShowConfirmDeleteQuestionModal] = useState(false);
  const [questions, setQuestions] = useState([
    {
      id: 0,
      index: 0,
      description: "Test question",
      options: [
        { id: 0, value: "Option A", correctAnswer: true },
        { id: 1, value: "Option B", correctAnswer: false },
        { id: 2, value: "Option C", correctAnswer: false },
        { id: 3, value: "Option D", correctAnswer: false },
        { id: 4, value: "Option E", correctAnswer: false }
      ]
    },
    {
      id: 1,
      index: 1,
      description: "Test question2",
      options: [
        { id: 0, value: "Option A", correctAnswer: false },
        { id: 1, value: "Option B", correctAnswer: false },
        { id: 2, value: "Option C", correctAnswer: true },
        { id: 3, value: "Option D", correctAnswer: false },
        { id: 4, value: "Option E", correctAnswer: false }
      ]
    },
    {
      id: 2,
      index: 2,
      description: "Test question3",
      options: [
        { id: 0, value: "Option A", correctAnswer: false },
        { id: 1, value: "Option B", correctAnswer: false },
        { id: 2, value: "Option C", correctAnswer: false },
        { id: 3, value: "Option D", correctAnswer: false },
        { id: 4, value: "Option E", correctAnswer: true }
      ]
    }
  ]);
  const navigate = useNavigate();
  const handleBackModal = (action: "add" | "edit" | "delete") => {
    document.body.style.overflow = "auto";
    switch (action) {
      case "add":
        setShowAddQuestionModal(false);
        break;
      case "edit":
        setShowEditQuestionModal(false);
        break;
      case "delete":
        setShowConfirmDeleteQuestionModal(false);
        break;
    }
  };

  const addQuestionModalProps = {
    handleBack: () => handleBackModal("add"),
    setQuestions,
    questions
  };
  // const editQuestionModalProps = {
  //   handleBack: () => handleBackModal("edit"),
  //   selectedItem: selectedItem as Question,
  //   setQuestions,
  //   questions
  // };
  // const confirmDeleteQuestionModalProps = {
  //   handleBack: () => handleBackModal("delete"),
  //   selectedItem
  // };
  const compactQuestionCardProps = {
    setSelectedQuestion,
    setShowEditQuestionModal,
    setShowConfirmDeleteQuestionModal
  };

  // const onDragEnd = ({ destination, source }: DropResult) => {
  //   if (!destination) return;
  //   if (destination.droppableId === source.droppableId && destination.index === source.index)
  //     return;
  //   const items = Array.from(questions);
  //   const moved = items[source.index];
  //   items.splice(source.index, 1);
  //   items.splice(destination.index, 0, moved);
  //   setQuestions(items);
  // };

  return (
    <div className="container mx-auto p-10 max-w-screen-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-bold text-xl flex gap-3">
          <IoChevronBack
            onClick={() => {
              navigate(-1);
            }}
            size={28}
            className="bg-orange-light rounded-lg border border-black cursor-pointer"
          />
          Quiz 1 - Derivatives Practice
        </p>
        <button className="bg-blue text-white px-4 py-2 rounded-lg border border-black">
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
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="lectures">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {showCompactView
                ? questions.map((question, index) => (
                    <Draggable key={question.id} draggableId={question.id.toString()} index={index}>
                      {(provided) => (
                        <CompactQuestionCard
                          provided={provided}
                          index={index}
                          question={question}
                          {...compactQuestionCardProps}
                        />
                      )}
                    </Draggable>
                  ))
                : questions.map((question, index) => (
                    <Draggable key={question.id} draggableId={question.id.toString()} index={index}>
                      {(provided) => (
                        <StudentQuestionCard
                          provided={provided}
                          index={index}
                          question={question}
                          {...compactQuestionCardProps}
                        />
                      )}
                    </Draggable>
                  ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
      {showAddQuestionModal && <AddQuestionModal {...addQuestionModalProps} />}
    </div>
  );
};

export default InstructorQuiz;
