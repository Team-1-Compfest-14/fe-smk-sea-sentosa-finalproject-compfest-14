import { useForm } from "react-hook-form";
import { IoChevronBack } from "react-icons/io5";
import { yupResolver } from "@hookform/resolvers/yup";
import { quizValidationSchema } from "../validations/Validations";
import { Modal } from "../../../../components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ModuleContext } from "../../../../context";
import { useContext } from "react";

interface AddQuizModalProp {
  handleBack: () => void;
}

interface FormValues {
  name: string;
}

const AddQuizModal = ({ handleBack }: AddQuizModalProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(quizValidationSchema) });

  const { id: courseId } = useParams();
  const { selectedQuiz } = useContext(ModuleContext);
  console.log(selectedQuiz);

  const onSubmit = handleSubmit((data) => {
    const { name } = data;
    axios
      .post(`http://localhost:5000/courses/${courseId}/quizzes`, {
        name
      })
      .then((res) => {
        console.log(res.data);
        alert("Successfully added quiz!");
        window.location.reload();
      })
      .catch((err) => console.log(err));
    handleBack();
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
        Adding a new quiz
      </p>
      {/* Form */}
      <form onSubmit={onSubmit}>
        {/* Input */}
        <div className="mb-4">
          <label>Name</label>
          <input
            type="text"
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
            className="bg-blue text-white px-5 py-2 border border-black rounded-lg"
            value="Add"
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

export default AddQuizModal;
