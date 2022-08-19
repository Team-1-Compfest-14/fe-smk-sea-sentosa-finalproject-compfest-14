import { useForm } from "react-hook-form";
import { IoChevronBack } from "react-icons/io5";
import { yupResolver } from "@hookform/resolvers/yup";
import { lectureValidationSchema } from "../validations/Validations";
import { Modal } from "../../../../components";
import { useContext } from "react";
import { ModuleContext } from "../../../../context";
import { useParams } from "react-router-dom";
import axios from "axios";

interface EditLectureModalProp {
  handleBack: () => void;
}

interface FormValues {
  name: string;
  lectureLink: string;
}

const EditLectureModal = ({ handleBack }: EditLectureModalProp) => {
  const { selectedLecture } = useContext(ModuleContext);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(lectureValidationSchema) });

  const formDetails = [
    {
      displayName: "Name",
      inputName: "name",
      defaultValue: selectedLecture?.name,
      type: "text",
      placeholder: "History of Indonesia",
      error: errors?.name?.message
    },
    {
      displayName: "Redirect Link (include http:// or https://)",
      inputName: "lectureLink",
      defaultValue: selectedLecture?.lecture.lectureLink,
      type: "url",
      placeholder: "This can be either a PDF or YouTube link",
      error: errors?.lectureLink?.message
    }
  ];

  const { id: courseId } = useParams();

  const onSubmit = handleSubmit((data) => {
    const { name, lectureLink } = data;
    const moduleId = selectedLecture?.lecture.moduleId;
    axios
      .put(`http://localhost:5000/courses/${courseId}/modules/${moduleId}/lectures`, {
        name,
        lectureLink
      })
      .then((res) => {
        console.log(res.data);
        alert("Successfully edited lecture!");
        window.location.reload();
        handleBack();
      })
      .catch((err) => console.log(err));
  });

  return (
    <Modal>
      <p className="flex items-center mb-4 font-bold text-xl gap-4">
        <IoChevronBack
          onClick={() => handleBack()}
          size={28}
          className="bg-orange-light rounded-lg border border-black cursor-pointer"
        />
        Editing {selectedLecture?.name}
      </p>
      <form onSubmit={onSubmit}>
        {formDetails.map(
          ({ displayName, inputName, defaultValue, type, placeholder, error }, index) => (
            <div className="mb-4" key={index}>
              <label>{displayName}</label>
              <input
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                className="border border-black px-3 py-2 rounded-lg w-full"
                {...register(inputName as "name" | "lectureLink")}
              />
              <p>{error}</p>
            </div>
          )
        )}

        <div className="flex flex-1 flex-col gap-2 mt-4">
          <input
            type="submit"
            className="bg-blue text-white px-5 py-2 border border-black rounded-lg"
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

export default EditLectureModal;
