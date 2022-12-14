import { useState, useContext, useEffect } from "react";
import { useDocumentTitle } from "../../../hooks";
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
import { BASE_URL, refreshAuthLogic } from "../../../api";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const InstructorCourse = () => {
  const { id: courseId } = useParams();
  const { selectedCourse, setSelectedCourse } = useContext(CourseContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Refresh token handler
    createAuthRefreshInterceptor(axios, refreshAuthLogic);

    // Get selected course
    axios
      .get(`${BASE_URL}/courses/instructor/own/${courseId}`)
      .then((res) => {
        const { course } = res.data.data;
        setSelectedCourse(course);
      })
      .catch((err) => console.log(err));
    // Get instructor's course lectures
    axios
      .get(`${BASE_URL}/courses/instructor/own/${courseId}/lectures`)
      .then((res) => {
        const { lectures } = res.data.data;
        const sortedLectures = lectures.sort((a: Lecture, b: Lecture) => a.order < b.order);
        console.log("sortedLectures ", sortedLectures);
        setLectures(sortedLectures);
      })
      .catch((err) => console.log(err));
    // Get instructor's course quizzes
    axios
      .get(`${BASE_URL}/courses/${courseId}/quizzes/instructor`)
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
  const [lectures, setLectures] = useState<Lecture[]>([]);
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

        <div>
          {showLectures ? (
            lectures?.length! > 0 ? (
              lectures?.map((lecture, index) => (
                <LectureCard key={index} index={index} lecture={lecture} />
              ))
            ) : (
              <p className="text-center p-10 bg-black text-white rounded-lg">
                No lectures added yet.
              </p>
            )
          ) : quizzes?.length! > 0 ? (
            quizzes?.map((quiz, index) => <QuizCard key={index} index={index} quiz={quiz} />)
          ) : (
            <p className="text-center p-10 bg-black text-white rounded-lg">No quizzes added yet.</p>
          )}
        </div>

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
