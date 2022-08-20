import axios from "axios";
import { useForm } from "react-hook-form";
import { IoChevronBack } from "react-icons/io5";
import { yupResolver } from "@hookform/resolvers/yup";
import { lectureValidationSchema } from "../validations/Validations";
import { Modal } from "../../../../components";
import { useParams } from "react-router-dom";
import { BASE_URL, refreshAuthLogic } from "../../../../api";
import createAuthRefreshInterceptor from "axios-auth-refresh";

interface AddLectureModalProp {
  handleBack: () => void;
}

interface FormValues {
  name: string;
  lectureLink: string;
}

const AddLectureModal = ({ handleBack }: AddLectureModalProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(lectureValidationSchema) });

  const formDetails = [
    {
      displayName: "Name",
      inputName: "name",
      type: "text",
      placeholder: "History of Indonesia",
      error: errors?.name?.message
    },
    {
      displayName: "Lecture Link (include http:// or https://)",
      inputName: "lectureLink",
      type: "url",
      placeholder: "This can be either a PDF or YouTube link",
      error: errors?.lectureLink?.message
    }
  ];

  const { id: courseId } = useParams();

  const onSubmit = handleSubmit((data) => {
    const { name, lectureLink } = data;
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
    axios
      .post(`${BASE_URL}/courses/${courseId}/lectures`, {
        name,
        lectureLink
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
        alert("Successfully created a new lecture!");
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
          className="bg-orange-light rounded-lg border border-black cursor-pointer hover:bg-orange-dark"
        />
        Adding a new course
      </p>
      {/* Form */}
      <form onSubmit={onSubmit}>
        {/* Input */}
        {formDetails.map(({ displayName, inputName, type, placeholder, error }, index) => (
          <div className="mb-4" key={index}>
            <label>{displayName}</label>
            <input
              type={type}
              placeholder={placeholder}
              className="border border-black px-3 py-2 rounded-lg w-full"
              {...register(inputName as "name" | "lectureLink")}
            />
            <p>{error}</p>
          </div>
        ))}
        {/* Buttons */}
        <div className="flex flex-1 flex-col gap-2 mt-4">
          <input
            type="submit"
            className="bg-blue text-white px-5 py-2 border border-black rounded-lg hover:bg-blue-dark cursor-pointer"
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

export default AddLectureModal;
