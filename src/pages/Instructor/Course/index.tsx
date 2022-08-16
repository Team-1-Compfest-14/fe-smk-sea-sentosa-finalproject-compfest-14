import { IoChevronBack } from "react-icons/io5";
import { MdDeleteForever, MdDragIndicator, MdModeEdit } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../../../hooks";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useState } from "react";
import { AddLectureModal, EditLectureModal, ConfirmDeleteLectureModal } from "./components";

const InstructorCourse = () => {
  useDocumentTitle("Edit Calculus 1 | Pelajarin");
  const navigate = useNavigate();

  const [showLectures, setShowLectures] = useState(true);
  const [showAddLectureModal, setShowAddLectureModal] = useState(false);
  const [showEditLectureModal, setShowEditLectureModal] = useState(false);
  const [showConfirmDeleteLectureModal, setShowConfirmDeleteLectureModal] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState({
    index: -1,
    id: -1,
    title: "",
    link: ""
  });

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

  const handleBackModal = (action: "add" | "edit" | "delete") => {
    document.body.style.overflow = "auto";
    switch (action) {
      case "add":
        setShowAddLectureModal(false);
        break;
      case "edit":
        setShowEditLectureModal(false);
        break;
      case "delete":
        setShowConfirmDeleteLectureModal(false);
        break;
    }
  };

  const addLectureModalProps = {
    handleBack: () => handleBackModal("add"),
    setLectures,
    lectures
  };
  const editLectureModalProps = {
    handleBack: () => handleBackModal("edit"),
    selectedLecture,
    setLectures,
    lectures
  };
  const confirmDeleteLectureModalProps = {
    handleBack: () => handleBackModal("delete"),
    selectedLecture,
    setLectures,
    lectures
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;
    const items = Array.from(lectures);
    const moved = items[source.index];
    items.splice(source.index, 1);
    items.splice(destination.index, 0, moved);
    setLectures(items);
  };

  return (
    <div className="container mx-auto p-10 max-w-screen-lg">
      {/* Header Card*/}
      <div className="bg-yellow p-8 border border-black rounded-xl grid grid-cols-1 md:grid-cols-3 mb-8">
        <div className="col-span-2">
          {/* Back Button and Title */}
          <p className="flex items-center font-bold font-mono text-2xl">
            <IoChevronBack
              onClick={() => {
                navigate("/dashboard");
              }}
              size={32}
              className="bg-slate-200 rounded-xl border border-black mr-4"
            />
            Calculus 1
          </p>
          {/* Description */}
          <p className="bg-white border border-black p-4 ml-10 my-5 rounded-xl">
            In this course, students will be introduced to limits and how they are the basis of the
            topics of derivatives and their applications, and also integration and application of
            integrals. This course is a prerequisite for Calculus 2 and an understanding of this
            course will be crucial to understand Calculus 2.
          </p>
        </div>
        {/* Details */}
        <div className="flex gap-12 md:flex-col lg:gap-0 items-center justify-center">
          <div className="mb-6 flex flex-col items-center justify-center">
            <p className="w-16 h-16 bg-orange-light rounded-full border border-black flex items-center justify-center text-2xl font-mono">
              {lectures.length}
            </p>
            <p className="font-mono">Lectures</p>
          </div>
          <div className="mb-6 flex flex-col items-center justify-center">
            <p className="w-16 h-16 bg-orange-light rounded-full border border-black flex items-center justify-center text-2xl font-mono">
              2
            </p>
            <p className="font-mono">Quizzes</p>
          </div>
        </div>
      </div>
      {/* Lectures and Quizzes Buttons */}
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
              {lectures.map((lecture, index) => (
                <Draggable key={lecture.id} draggableId={lecture.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      className="bg-white border border-black rounded-xl px-8 py-2 flex items-center justify-between mt-4"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {/* Drag Icon and Title */}
                      <div
                        onClick={() => window.open(lecture.link, "_blank")}
                        className="flex items-center gap-5"
                      >
                        <MdDragIndicator size={32} />
                        <p className="text-xl font-bold">{lecture.title}</p>
                      </div>
                      {/* Buttons */}
                      <div className="flex gap-4">
                        {/* Preview Button */}
                        <div
                          className="text-sm flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-slate-200 hover:rounded-xl"
                          onClick={() => window.open(lecture.link, "_blank")}
                        >
                          <AiOutlineEye size={32} />
                          <p className="font-bold">Preview</p>
                        </div>
                        {/* Edit Button */}
                        <div
                          className="text-sm flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-slate-200 hover:rounded-xl"
                          onClick={() => {
                            setSelectedLecture({ ...lecture, index });
                            setShowEditLectureModal(true);
                          }}
                        >
                          <MdModeEdit size={32} />
                          <p className="font-bold">Edit</p>
                        </div>
                        {/* Delete Button */}
                        <div
                          className="text-sm flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-slate-200 hover:rounded-xl text-red-600"
                          onClick={() => {
                            setSelectedLecture({ ...lecture, index });
                            setShowConfirmDeleteLectureModal(true);
                          }}
                        >
                          <MdDeleteForever size={32} />
                          <p className="font-bold">Delete</p>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* Add Lecture Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={() => {
            document.body.style.overflow = "hidden";
            setShowAddLectureModal(true);
          }}
          className="bg-blue text-white px-4 py-2 rounded-xl border border-black hover:bg-blue-dark"
        >
          Add Lecture
        </button>
      </div>

      {/* Add Lecture Modal */}
      {showAddLectureModal && <AddLectureModal {...addLectureModalProps} />}
      {/* Edit Lecture Modal */}
      {showEditLectureModal && <EditLectureModal {...editLectureModalProps} />}
      {/* Confirm Delete Lecture Modal */}
      {showConfirmDeleteLectureModal && (
        <ConfirmDeleteLectureModal {...confirmDeleteLectureModalProps} />
      )}
    </div>
  );
};

export default InstructorCourse;
