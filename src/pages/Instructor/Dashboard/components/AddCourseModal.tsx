import { useForm } from "react-hook-form";
import { IoChevronBack } from "react-icons/io5";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseValidationSchema } from "../../Course/validations/Validations";
import { Modal } from "../../../../components";
import axios from "axios";

interface AddCourseModalProp {
  handleBack: () => void;
}

interface FormValues {
  name: string;
  description: string;
}

const AddCourseModal = ({ handleBack }: AddCourseModalProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(courseValidationSchema) });

  const onSubmit = handleSubmit((data) => {
    const { name, description } = data;
    axios
      .post("http://localhost:5000/courses", {
        name,
        description
      })
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        alert("Successfully created a new course!");
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
          onClick={() => handleBack()}
          size={28}
          className="bg-orange-light rounded-lg border border-black cursor-pointer"
        />
        Adding a new course
      </p>
      {/* Form */}
      <form onSubmit={onSubmit}>
        {/* Input */}
        <div className="mb-4">
          <label>Name</label>
          <input
            type="text"
            placeholder="Introduction to Digital Systems"
            className="border border-black px-3 py-2 rounded-lg w-full"
            {...register("name")}
          />
          <p>{errors?.name?.message}</p>
        </div>
        <div>
          <label>Description</label>
          <textarea
            placeholder="Briefly describe your course"
            className="border border-black px-3 py-2 rounded-lg w-full"
            {...register("description")}
          />
          <p>{errors?.description?.message}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-1 flex-col gap-2 mt-4">
          <input
            type="submit"
            className="bg-blue text-white px-5 py-2 border border-black rounded-lg"
            value="Add"
          />
          <button onClick={() => handleBack()} className="px-5 py-2 border border-black rounded-lg">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCourseModal;
