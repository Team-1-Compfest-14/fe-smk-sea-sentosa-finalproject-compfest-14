import axios from "axios";
import { IoChevronBack } from "react-icons/io5";
import { BASE_URL, refreshAuthLogic } from "../../../../api";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { Modal } from "../../../../components";
import { Course } from "../../../../typings";

interface ConfirmDeleteCourseProp {
  handleBack: () => void;
  course: Course;
}

const ConfirmDeleteCourseModal = ({ handleBack, course }: ConfirmDeleteCourseProp) => {
  const handleDeleteCourse = () => {
    const courseId = course.id;
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
    axios
      .delete(`${BASE_URL}/courses/${courseId}`)
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        alert("Successfully deleted course!");
        window.location.reload();
        handleBack();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal>
      <div className="flex items-center mb-4 gap-4">
        <IoChevronBack
          onClick={() => {
            handleBack();
          }}
          size={28}
          className="rounded-lg border-2 border-black cursor-pointer"
        />
        <p className="font-bold text-xl gap-4 text-red-600">Deleting {course?.name}</p>
      </div>
      {/* Message */}
      <div className="text-center text-red-600">
        <p>Are you sure you want to delete {course?.name}? </p>
        <p className="font-bold">This cannot be undone.</p>
      </div>
      {/* Buttons */}
      <div className="flex flex-col mt-4 gap-2">
        <button
          onClick={handleDeleteCourse}
          className="px-4 py-2 border border-red-600 rounded-lg text-red-600"
        >
          Yes
        </button>
        <button
          onClick={() => handleBack()}
          className="px-4 py-2 border border-black bg-blue rounded-lg text-white hover:bg-slate-200"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteCourseModal;
