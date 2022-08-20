import { useForm } from "react-hook-form";
import { IoChevronBack } from "react-icons/io5";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "../../../../components";
import { quizValidationSchema } from "../../Course/validations/Validations";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL, refreshAuthLogic } from "../../../../api";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { Quiz } from "../../../../typings";

interface EditQuizNameModalProp {
  handleBack: () => void;
  quiz: Quiz;
}

interface FormValues {
  name: string;
}

const EditQuizNameModal = ({ handleBack, quiz }: EditQuizNameModalProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(quizValidationSchema) });

  const { courseId, quizId } = useParams();
  console.log(quiz);

  const onSubmit = handleSubmit((data) => {
    const { name } = data;
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
    axios
      .put(`${BASE_URL}/courses/${courseId}/quizzes/${quizId}`, {
        name
      })
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        alert("Successfully edited quiz!");
        window.location.reload();
        handleBack();
      })
      .catch((err) => console.log(err));
  });

  return (
    <Modal>
      {/* Header */}
      <p className="flex items-center mb-4 font-bold text-xl gap-4">
        <IoChevronBack
          onClick={() => {
            handleBack();
          }}
          size={28}
          className="bg-orange-light rounded-lg border border-black cursor-pointer"
        />
        Editing {quiz.name}
      </p>
      {/* Form */}
      <form onSubmit={onSubmit}>
        {/* Input */}
        <div className="mb-4">
          <label>Name</label>
          <input
            type="text"
            defaultValue={quiz.name}
            placeholder="Integrals Drilling"
            className="border border-black px-3 py-2 rounded-lg w-full"
            {...register("name")}
          />
          <p>{errors?.name?.message}</p>
        </div>
        {/* Buttons */}
        <div className="flex flex-1 flex-col gap-2 mt-4">
          <input
            type="submit"
            className="bg-blue text-white px-5 py-2 border border-black rounded-lg hover:bg-blue-dark hover:cursor-pointer"
            value="Save"
          />
          <button
            onClick={() => handleBack()}
            className="px-5 py-2 border border-black rounded-lg hover:bg-slate-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditQuizNameModal;
