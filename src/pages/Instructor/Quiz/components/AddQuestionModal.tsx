import { useForm, useFieldArray } from "react-hook-form";
import { IoChevronBack } from "react-icons/io5";
import { yupResolver } from "@hookform/resolvers/yup";
import { questionValidationSchema } from "../../Course/validations/Validations";
import { Option } from "../../../../typings";
import { Modal } from "../../../../components";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL, refreshAuthLogic } from "../../../../api";
import createAuthRefreshInterceptor from "axios-auth-refresh";

interface AddQuestionModalProp {
  handleBack: () => void;
}

interface FormValues {
  question: string;
  options: Option[];
}

const AddQuestionModal = ({ handleBack }: AddQuestionModalProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<FormValues>({ resolver: yupResolver(questionValidationSchema) });

  const { append, remove } = useFieldArray({ name: "options", control });
  const [options, setOptions] = useState<Option[]>([
    {
      option: "",
      isCorrectAnswer: false,
      mandatory: true
    },
    {
      option: "",
      isCorrectAnswer: false,
      mandatory: true
    }
  ]);
  const [invalidOptions, setInvalidOptions] = useState(false);
  const { courseId, quizId } = useParams();

  const numOfCorrectAnswers = (options: Option[]) => {
    const optionsCopy = Array.from(options);
    return optionsCopy.filter((option) => option.isCorrectAnswer === true).length;
  };

  const onSubmit = handleSubmit((data) => {
    if (numOfCorrectAnswers(data.options) !== 1) {
      setInvalidOptions(true);
      return;
    }
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
    axios
      .post(`${BASE_URL}/courses/${courseId}/quizzes/${quizId}/questions`, {
        question: data.question,
        questionOptions: data.options
      })
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        alert("Successfully made a new question!");
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
              {...register("question")}
            />
            <p>{errors?.question?.message}</p>
          </div>
          {/* Options */}
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex flex-col gap-2">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center justify-between gap-5">
                    <input
                      type="checkbox"
                      value="true"
                      className="rounded-full checked:bg-green"
                      {...register(`options.${index}.isCorrectAnswer`)}
                    />
                    <div>
                      <label>Option {index + 1}</label>
                      <div className="flex items-center justify-end">
                        <textarea
                          placeholder="500 cm"
                          className="border border-black px-3 py-2 rounded-lg w-full"
                          {...register(`options.${index}.option`)}
                        />
                        {!option?.mandatory && (
                          <MdDeleteForever
                            onClick={() => {
                              const optionsCopy = Array.from(options);
                              optionsCopy.splice(index, 1);
                              remove(index);
                              setOptions(optionsCopy);
                            }}
                            className="text-red-600 cursor-pointer hover:text-red-700"
                            size={40}
                          />
                        )}
                      </div>
                      <p>{errors?.options?.[index]?.option?.message}</p>
                      <p>{errors?.options?.[index]?.isCorrectAnswer?.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p>{errors?.question?.message}</p>
            </div>
            {/* Add Option Button */}
            <p
              onClick={() => {
                const optionsCopy = Array.from(options);
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
            {invalidOptions && <p>Question must have 1 and only 1 correct answer</p>}
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
