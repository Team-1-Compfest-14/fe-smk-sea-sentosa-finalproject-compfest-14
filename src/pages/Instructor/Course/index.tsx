import { useDocumentTitle } from "../../../hooks";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useState } from "react";
import {
  AddLectureModal,
  EditLectureModal,
  ConfirmDeleteItemModal,
  CourseDetailHeaderCard,
  LectureCard,
  QuizCard,
  AddQuizModal
} from "./components";
import { Course, Lecture, Quiz } from "../../../typings";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const InstructorCourse = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/courses/instructor/own/${id}`)
      .then((res) => {
        const { course } = res.data.data;
        setCourse(course);
      })
      .catch((err) => console.log(err));
  }, []);
  useDocumentTitle(`Edit ${course?.name} | Pelajarin`);

  // General states and functions
  const [showLectures, setShowLectures] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Lecture | Quiz>({
    index: 0,
    id: 0,
    title: "",
    link: ""
  });

  const handleBackModal = (action: "add" | "edit" | "delete") => {
    document.body.style.overflow = "auto";
    switch (action) {
      case "add":
        showLectures ? setShowAddLectureModal(false) : setShowAddQuizModal(false);
        break;
      case "edit":
        setShowEditLectureModal(false);
        break;
      case "delete":
        showLectures
          ? setShowConfirmDeleteLectureModal(false)
          : setShowConfirmDeleteQuizModal(false);
        break;
    }
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;
    if (showLectures) {
      const items = Array.from(lectures);
      const moved = items[source.index];
      items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);
      setLectures(items);
    } else {
      const items = Array.from(quizzes);
      const moved = items[source.index];
      items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);
      setQuizzes(items);
    }
  };

  // Lecture states and props
  const [showAddLectureModal, setShowAddLectureModal] = useState(false);
  const [showEditLectureModal, setShowEditLectureModal] = useState(false);
  const [showConfirmDeleteLectureModal, setShowConfirmDeleteLectureModal] = useState(false);
  const [showConfirmDeleteQuizModal, setShowConfirmDeleteQuizModal] = useState(false);

  const [lectures, setLectures] = useState([
    { index: 0, id: 0, title: "Limits", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    { index: 1, id: 1, title: "Derivatives", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    { index: 2, id: 2, title: "Integrals", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    {
      index: 3,
      id: 3,
      title: "Applications of Integrals",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
  ]);

  const addLectureModalProps = {
    handleBack: () => handleBackModal("add"),
    setLectures,
    lectures
  };
  const editLectureModalProps = {
    handleBack: () => handleBackModal("edit"),
    selectedItem: selectedItem as Lecture,
    setLectures,
    lectures
  };
  const confirmDeleteItemModalProps = {
    handleBack: () => handleBackModal("delete"),
    selectedItem
  };
  const lectureCardProps = {
    setSelectedItem,
    setShowEditLectureModal,
    setShowConfirmDeleteLectureModal
  };

  // Quiz states and props
  const [showAddQuizModal, setShowAddQuizModal] = useState(false);

  const [quizzes, setQuizzes] = useState([
    {
      id: 0,
      title: "Derivatives Practice",
      questions: [
        {
          id: 0,
          index: 0,
          description: "Test question",
          options: [
            { id: 0, value: "Option A", correctAnswer: true, mandatory: true },
            { id: 1, value: "Option B", correctAnswer: false, mandatory: true },
            { id: 2, value: "Option C", correctAnswer: false, mandatory: true },
            { id: 3, value: "Option D", correctAnswer: false, mandatory: true },
            { id: 4, value: "Option E", correctAnswer: false, mandatory: true }
          ]
        },
        {
          id: 1,
          index: 1,
          description: "Test question2",
          options: [
            { id: 0, value: "Option A", correctAnswer: true, mandatory: true },
            { id: 1, value: "Option B", correctAnswer: false, mandatory: true },
            { id: 2, value: "Option C", correctAnswer: false, mandatory: true },
            { id: 3, value: "Option D", correctAnswer: false, mandatory: true },
            { id: 4, value: "Option E", correctAnswer: false, mandatory: true }
          ]
        },
        {
          id: 2,
          index: 2,
          description: "Test question3",
          options: [
            { id: 0, value: "Option A", correctAnswer: true, mandatory: true },
            { id: 1, value: "Option B", correctAnswer: false, mandatory: true },
            { id: 2, value: "Option C", correctAnswer: false, mandatory: true },
            { id: 3, value: "Option D", correctAnswer: false, mandatory: true },
            { id: 4, value: "Option E", correctAnswer: false, mandatory: true }
          ]
        }
      ],
      index: 0
    },
    {
      id: 1,
      title: "Integrals Practice",
      questions: [
        {
          id: 0,
          index: 0,
          description: "Test question",
          options: [
            { id: 0, value: "Option A", correctAnswer: true, mandatory: true },
            { id: 1, value: "Option B", correctAnswer: false, mandatory: true },
            { id: 2, value: "Option C", correctAnswer: false, mandatory: true },
            { id: 3, value: "Option D", correctAnswer: false, mandatory: true },
            { id: 4, value: "Option E", correctAnswer: false, mandatory: true }
          ]
        },
        {
          id: 1,
          index: 1,
          description: "Test question2",
          options: [
            { id: 0, value: "Option A", correctAnswer: true, mandatory: true },
            { id: 1, value: "Option B", correctAnswer: false, mandatory: true },
            { id: 2, value: "Option C", correctAnswer: false, mandatory: true },
            { id: 3, value: "Option D", correctAnswer: false, mandatory: true },
            { id: 4, value: "Option E", correctAnswer: false, mandatory: true }
          ]
        },
        {
          id: 2,
          index: 2,
          description: "Test question3",
          options: [
            { id: 0, value: "Option A", correctAnswer: true, mandatory: true },
            { id: 1, value: "Option B", correctAnswer: false, mandatory: true },
            { id: 2, value: "Option C", correctAnswer: false, mandatory: true },
            { id: 3, value: "Option D", correctAnswer: false, mandatory: true },
            { id: 4, value: "Option E", correctAnswer: false, mandatory: true }
          ]
        }
      ],
      index: 1
    }
  ]);

  const addQuizModalProps = {
    handleBack: () => handleBackModal("add"),
    setQuizzes,
    quizzes
  };

  const quizCardProps = {
    setSelectedItem,
    setShowConfirmDeleteQuizModal
  };

  return (
    <div className="container mx-auto p-10 max-w-screen-lg">
      {/* Header Card*/}
      <CourseDetailHeaderCard
        name={course?.name ?? "Course"}
        description={course?.description ?? "Description"}
        lectures={lectures}
        quizzes={quizzes}
      />
      {/* Lectures and Quizzes Options Buttons */}
      <div className="container flex justify-around my-8">
        <button
          onClick={() => setShowLectures(true)}
          className={`px-4 py-2 border border-black rounded-lg hover:bg-slate-400 ${
            showLectures && "bg-orange-light hover:bg-orange-dark"
          }`}
        >
          Lectures
        </button>
        <button
          onClick={() => setShowLectures(false)}
          className={`px-4 py-2 border border-black rounded-lg hover:bg-slate-400 ${
            !showLectures && "bg-orange-light hover:bg-orange-dark"
          }`}
        >
          Quizzes
        </button>
      </div>
      {/* Lecture or Quizzes Cards */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lectures">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {showLectures
                ? lectures.map((lecture, index) => (
                    <Draggable key={lecture.id} draggableId={lecture.id.toString()} index={index}>
                      {(provided) => (
                        <LectureCard
                          provided={provided}
                          index={index}
                          lecture={lecture}
                          {...lectureCardProps}
                        />
                      )}
                    </Draggable>
                  ))
                : quizzes.map((quiz, index) => (
                    <Draggable key={quiz.id} draggableId={quiz.id.toString()} index={index}>
                      {(provided) => (
                        <QuizCard
                          provided={provided}
                          index={index}
                          quiz={quiz}
                          {...quizCardProps}
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
            showLectures ? setShowAddLectureModal(true) : setShowAddQuizModal(true);
          }}
          className="bg-blue text-white px-4 py-2 rounded-xl border border-black hover:bg-blue-dark"
        >
          {showLectures ? "Add Lecture" : "Add Quiz"}
        </button>
      </div>

      {/* Add Lecture Modal */}
      {showAddLectureModal && <AddLectureModal {...addLectureModalProps} />}
      {/* Edit Lecture Modal */}
      {showEditLectureModal && <EditLectureModal {...editLectureModalProps} />}
      {/* Confirm Delete Lecture Modal */}
      {showConfirmDeleteLectureModal && (
        <ConfirmDeleteItemModal
          items={lectures}
          // eslint-disable-next-line no-unused-vars
          setItems={setLectures as (params: Lecture[] | Quiz[]) => void}
          {...confirmDeleteItemModalProps}
        />
      )}

      {/* Add Quiz Modal */}
      {showAddQuizModal && <AddQuizModal {...addQuizModalProps} />}
      {/* Confirm Delete Quiz Modal */}
      {showConfirmDeleteQuizModal && (
        <ConfirmDeleteItemModal
          items={quizzes}
          // eslint-disable-next-line no-unused-vars
          setItems={setQuizzes as (params: Lecture[] | Quiz[]) => void}
          {...confirmDeleteItemModalProps}
        />
      )}
    </div>
  );
};

export default InstructorCourse;
