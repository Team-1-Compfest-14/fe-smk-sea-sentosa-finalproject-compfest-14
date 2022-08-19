/* eslint-disable no-unused-vars */
import { useForm, useFieldArray } from "react-hook-form";
import { IoChevronBack } from "react-icons/io5";
import { yupResolver } from "@hookform/resolvers/yup";
import { questionValidationSchema } from "../../Course/validations/Validations";
import { Option } from "../../../../typings";
import { Modal } from "../../../../components";
import { useContext, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { QuizContext } from "../../../../context";

interface EditQuestionModalProp {
  handleBack: () => void;
}

interface FormValues {
  description: string;
  options: Option[];
}

const EditQuestionModal = ({ handleBack }: EditQuestionModalProp) => {
  const { selectedQuestion, questions } = useContext(QuizContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<FormValues>({ resolver: yupResolver(questionValidationSchema) });

  const { append, remove } = useFieldArray({ name: "options", control });
  const [options, setOptions] = useState<Option[] | null>(selectedQuestion?.questionOptions!);
  const [invalidOptions, setInvalidOptions] = useState(false);

  const numOfCorrectAnswers = (options: Option[]) => {
    const optionsCopy = Array.from(options);
    return optionsCopy.filter((option) => option.isCorrectAnswer === true).length;
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);

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
        Editing Question {questions?.indexOf(selectedQuestion!)! + 1}
      </p>
      {/* Form */}
      <form onSubmit={onSubmit}>
        {/* Input */}
        <div className="flex gap-4">
          {/* Description */}
          <div>
            <label>Description</label>
            <textarea
              defaultValue={selectedQuestion?.question}
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
              <div className="flex flex-col gap-2">
                {options?.map((option, index) => (
                  <div key={index} className="flex items-center justify-between gap-5">
                    <input
                      type="checkbox"
                      value="true"
                      defaultChecked={option.isCorrectAnswer}
                      className="rounded-full checked:bg-green"
                      {...register(`options.${index}.isCorrectAnswer`)}
                    />
                    <div>
                      <label>Option {index + 1}</label>
                      <div className="flex items-center justify-end">
                        <textarea
                          defaultValue={option.option}
                          placeholder="500 cm"
                          className="border border-black px-3 py-2 rounded-lg w-full"
                          {...register(`options.${index}.option`)}
                        />

                        <MdDeleteForever
                          onClick={() => {
                            const optionsCopy = Array.from(options!);
                            optionsCopy.splice(index, 1);
                            remove(index);
                            setOptions(optionsCopy);
                          }}
                          className="text-red-600 cursor-pointer hover:text-red-700"
                          size={40}
                        />
                      </div>
                      <p>{errors?.options?.[index]?.option?.message}</p>
                      <p>{errors?.options?.[index]?.isCorrectAnswer?.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p>{errors?.options?.message}</p>
            </div>
            {/* Add Option Button */}
            <p
              onClick={() => {
                const optionsCopy = Array.from(options!);
                optionsCopy.push({
                  option: "",
                  isCorrectAnswer: false
                });
                append({ option: "", isCorrectAnswer: false });
                setOptions(optionsCopy);
              }}
              className="flex items-center justify-center py-1 border border-black rounded-xl hover:bg-slate-200 cursor-pointer"
            >
              Add Option
            </p>
            {invalidOptions && <p>Question must only have 1 correct answer</p>}
          </div>
        </div>
        {/* Buttons */}
        <div className="flex flex-1 flex-col gap-2 mt-4">
          <input
            type="submit"
            className="bg-blue text-white px-5 py-2 border border-black rounded-lg"
            value="Edit"
          />
          <button onClick={() => handleBack()} className="px-5 py-2 border border-black rounded-lg">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditQuestionModal;
