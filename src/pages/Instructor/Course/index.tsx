import { useState, useContext, useEffect } from "react";
import { useDocumentTitle } from "../../../hooks";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import {
  AddLectureModal,
  EditLectureModal,
  ConfirmDeleteLectureModal,
  ConfirmDeleteQuizModal,
  CourseDetailHeaderCard,
  LectureCard,
  QuizCard,
  AddQuizModal
} from "./components";
import { Lecture, Quiz } from "../../../typings";
import { CourseContext, ModuleContext } from "../../../context";
import { useParams } from "react-router-dom";
import axios from "axios";

const InstructorCourse = () => {
  const { id: courseId } = useParams();
  const { selectedCourse, setSelectedCourse } = useContext(CourseContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`http://localhost:5000/courses/instructor/own/${courseId}`)
      .then((res) => {
        const { course } = res.data.data;
        setSelectedCourse(course);
      })
      .catch((err) => console.log(err));
    axios
      .get(`http://localhost:5000/courses/instructor/own/${courseId}/lectures`)
      .then((res) => {
        const { lectures } = res.data.data;
        setLectures(lectures);
      })
      .catch((err) => console.log(err));
    axios
      .get(`http://localhost:5000/courses/${courseId}/quizzes/instructor`)
      .then((res) => {
        const { quizzes } = res.data.data;
        setQuizzes(quizzes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useDocumentTitle(`Edit ${selectedCourse?.name} | Pelajarin`);

  // Lecture states and props
  const [lectures, setLectures] = useState<Lecture[] | null>(null);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);

  const [showAddLectureModal, setShowAddLectureModal] = useState(false);
  const [showEditLectureModal, setShowEditLectureModal] = useState(false);
  const [showConfirmDeleteLectureModal, setShowConfirmDeleteLectureModal] = useState(false);

  // Quiz states and props
  const [quizzes, setQuizzes] = useState<Quiz[] | null>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const [showAddQuizModal, setShowAddQuizModal] = useState(false);
  const [showConfirmDeleteQuizModal, setShowConfirmDeleteQuizModal] = useState(false);

  // General states and functions
  const [showLectures, setShowLectures] = useState(true);

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
      const items = Array.from(lectures!);
      const moved = items[source.index];
      items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);
      moved.order = destination.index;
      setLectures(items);
      // axios.put("http://localhost:5000/courses/:courseId/modules/:moduleId/lectures");
    } else {
      const items = Array.from(quizzes!);
      const moved = items[source.index];
      items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);
      setQuizzes(items);
    }
  };

  console.log(quizzes);
  return (
    <ModuleContext.Provider
      value={{
        lectures,
        quizzes,
        setLectures,
        setQuizzes,
        selectedLecture,
        selectedQuiz,
        setSelectedLecture,
        setSelectedQuiz,
        setShowEditLectureModal,
        setShowConfirmDeleteLectureModal,
        setShowConfirmDeleteQuizModal
      }}
    >
      <div className="container mx-auto p-10 max-w-screen-lg">
        {/* Header Card*/}
        <CourseDetailHeaderCard />
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
                  ? lectures?.length! > 0 &&
                    lectures?.map((lecture, index) => (
                      <Draggable key={lecture.id} draggableId={lecture.id.toString()} index={index}>
                        {(provided) => (
                          <LectureCard provided={provided} index={index} lecture={lecture} />
                        )}
                      </Draggable>
                    ))
                  : quizzes?.length! > 0 &&
                    quizzes?.map((quiz, index) => (
                      <Draggable key={quiz.id} draggableId={quiz.id.toString()} index={index}>
                        {(provided) => <QuizCard provided={provided} index={index} quiz={quiz} />}
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
        {showAddLectureModal && <AddLectureModal handleBack={() => handleBackModal("add")} />}
        {/* Edit Lecture Modal */}
        {showEditLectureModal && <EditLectureModal handleBack={() => handleBackModal("edit")} />}
        {/* Confirm Delete Lecture Modal */}
        {showConfirmDeleteLectureModal && (
          <ConfirmDeleteLectureModal handleBack={() => handleBackModal("delete")} />
        )}

        {/* Add Quiz Modal */}
        {showAddQuizModal && <AddQuizModal handleBack={() => handleBackModal("add")} />}
        {/* Confirm Delete Quiz Modal */}
        {showConfirmDeleteQuizModal && (
          <ConfirmDeleteQuizModal handleBack={() => handleBackModal("delete")} />
        )}
      </div>
    </ModuleContext.Provider>
  );
};

export default InstructorCourse;
