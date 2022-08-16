import { useForm } from "react-hook-form";
import { IoChevronBack } from "react-icons/io5";
import { yupResolver } from "@hookform/resolvers/yup";
import { quizValidationSchema } from "../validations/Validations";
import { Quiz } from "../../../../typings";
import { Modal } from "../../../../components";

interface AddQuizModalProp {
  quizzes: Quiz[];
  // eslint-disable-next-line no-unused-vars
  setQuizzes: (params: Quiz[]) => void;
  handleBack: () => void;
}

interface FormValues {
  title: string;
  link: string;
}

const AddQuizModal = ({ handleBack, quizzes, setQuizzes }: AddQuizModalProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(quizValidationSchema) });

  const formDetails = [
    {
      displayName: "Title",
      inputName: "title",
      type: "text",
      placeholder: "Integrals Drilling 2",
      error: errors?.title?.message
    }
  ];

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    const items = Array.from(quizzes);
    items.push({
      ...data,
      index: quizzes.length,
      id: 1010,
      questions: [
        {
          id: 0,
          description: "This is where you type your question",
          options: [
            { id: 0, value: "Option A", correctAnswer: false },
            { id: 1, value: "Option B", correctAnswer: false }
          ]
        },
        {
          id: 1,
          description: "This is where you type your question",
          options: [
            { id: 0, value: "Option A", correctAnswer: false },
            { id: 1, value: "Option B", correctAnswer: false }
          ]
        }
      ]
    });
    setQuizzes(items);
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

export default AddQuizModal;
