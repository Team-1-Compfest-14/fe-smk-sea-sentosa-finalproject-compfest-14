import { useForm } from "react-hook-form";
import { IoChevronBack } from "react-icons/io5";
import { yupResolver } from "@hookform/resolvers/yup";
import { lectureValidationSchema } from "../validations/Validations";

type Lecture = {
  id: number;
  title: string;
  link: string;
  index: number;
};

interface AddLectureModalProp {
  lectures: Lecture[];
  // eslint-disable-next-line no-unused-vars
  setLectures: (params: Lecture[]) => void;
  handleBack: () => void;
}

interface FormValues {
  title: string;
  link: string;
}

const AddLectureModal = ({ handleBack, lectures, setLectures }: AddLectureModalProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(lectureValidationSchema) });

  const formDetails = [
    {
      displayName: "Title",
      inputName: "title",
      type: "text",
      placeholder: "History of Indonesia",
      error: errors?.title?.message
    },
    {
      displayName: "Redirect Link (include http:// or https://)",
      inputName: "link",
      type: "url",
      placeholder: "This can be either a PDF or YouTube link",
      error: errors?.link?.message
    }
  ];

  const onSubmit = handleSubmit((data) => {
    const items = Array.from(lectures);
    items.push({ ...data, index: lectures.length, id: 1010 });
    setLectures(items);
    handleBack();
  });

  return (
    <div className="backdrop-brightness-50 backdrop-blur-sm w-screen h-screen fixed flex justify-center items-center top-0 left-0">
      <div className="fixed bg-white p-10 rounded-xl container max-w-lg border border-black">
        <p className="flex items-center mb-4 font-bold text-xl gap-4">
          <IoChevronBack
            onClick={() => handleBack()}
            size={28}
            className="bg-orange-light rounded-lg border border-black cursor-pointer"
          />
          Adding a new course
        </p>
        <form onSubmit={onSubmit}>
          {formDetails.map(({ displayName, inputName, type, placeholder, error }, index) => (
            <div className="mb-4" key={index}>
              <label>{displayName}</label>
              <input
                type={type}
                placeholder={placeholder}
                className="border border-black px-3 py-2 rounded-lg w-full"
                {...register(inputName as "title" | "link")}
              />
              <p>{error}</p>
            </div>
          ))}

          <div className="flex flex-1 flex-col gap-2 mt-4">
            <input
              type="submit"
              className="bg-blue text-white px-5 py-2 border border-black rounded-lg"
              value="Add"
            />
            <button
              onClick={() => handleBack()}
              className="px-5 py-2 border border-black rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLectureModal;
