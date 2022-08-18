import { useForm } from "react-hook-form";
import { IoChevronBack } from "react-icons/io5";
import { yupResolver } from "@hookform/resolvers/yup";
import { questionValidationSchema } from "../../Course/validations/Validations";
import { Question, Option } from "../../../../typings";
import { Modal } from "../../../../components";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

interface AddQuestionModalProp {
  questions: Question[];
  // eslint-disable-next-line no-unused-vars
  setQuestions: (params: Question[]) => void;
  handleBack: () => void;
}

interface FormValues {
  description: string;
  options: Option[];
}

const AddQuestionModal = ({ handleBack, questions, setQuestions }: AddQuestionModalProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(questionValidationSchema) });

  const [options, setOptions] = useState<Option[]>([]);

  const onSubmit = handleSubmit((data) => {
    const items = Array.from(questions);
    items.push({ ...data, index: questions.length, id: 1010 });
    setQuestions(items);
    handleBack();
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
        Adding a new question
      </p>
      {/* Form */}
      <form onSubmit={onSubmit}>
        {/* Input */}
        <div className="flex gap-4">
          {/* Description */}
          <div>
            <label>Description</label>
            <textarea
              placeholder="A ball moves at a speed of 30 m/s..."
              className="border border-black px-3 py-2 rounded-lg w-full"
              rows={10}
              {...register("description")}
            />
            <p>{errors?.description?.message}</p>
          </div>
          {/* Options */}
          <div className="flex flex-col gap-3">
            <div>
              <label>Options</label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    className="checked:bg-green"
                    name={`question${questions.length}Options`}
                  />
                  <textarea
                    placeholder="500 cm"
                    className="border border-black px-3 py-2 rounded-lg w-full"
                    {...register("options")}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    onClick={() => {}}
                    type="radio"
                    className="checked:bg-green"
                    name={`question${questions.length}Options`}
                  />
                  <textarea
                    placeholder="500 cm"
                    className="border border-black px-3 py-2 rounded-lg w-full"
                    {...register("options")}
                  />
                </div>
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="radio"
                      className="checked:bg-green"
                      name={`question${questions.length}Options`}
                    />
                    <textarea
                      placeholder="500 cm"
                      className="border border-black px-3 py-2 rounded-lg w-full"
                      {...register("options")}
                    />
                    <MdDeleteForever
                      onClick={() => {
                        const optionsCopy = Array.from(options);
                        optionsCopy.splice(index, 1);
                        setOptions(optionsCopy);
                      }}
                      className="text-red-600 cursor-pointer hover:text-red-700"
                      size={40}
                    />
                  </div>
                ))}
              </div>
              <p>{errors?.options?.message}</p>
            </div>
            {/* Add Option Button */}
            <p
              onClick={() => {
                const optionsCopy = Array.from(options);
                optionsCopy.push({ id: options.length, value: "", correctAnswer: false });
                setOptions(optionsCopy);
              }}
              className="flex items-center justify-center py-1 border border-black rounded-xl hover:bg-slate-200 cursor-pointer"
            >
              Add Option
            </p>
          </div>
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

export default AddQuestionModal;
