import { useForm } from "react-hook-form";
import { IoChevronBack } from "react-icons/io5";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseValidationSchema } from "../validations/Validations";
import { Modal } from "../../../../components";
import { Course } from "../../../../typings";

interface EditCourseModalProp {
  handleBack: () => void;
  selectedCourse: Course;
}

interface FormValues {
  name: string;
  description: string;
}

const EditCourseModal = ({ handleBack, selectedCourse }: EditCourseModalProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(courseValidationSchema) });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    // const items = Array.from(courses);
    // items.splice(selectedCourse.index, 1, {
    //   ...data,
    //   ...selectedCourse
    // });
    // setCourses(items);
    // handleBack();
  });

  return (
    <Modal>
      <p className="flex items-center mb-4 font-bold text-xl gap-4">
        <IoChevronBack
          onClick={() => handleBack()}
          size={28}
          className="bg-orange-light rounded-lg border border-black cursor-pointer"
        />
        Editing {selectedCourse.name}
      </p>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <label>Title</label>
          <input
            type="text"
            placeholder="Introduction to Programming"
            defaultValue={selectedCourse.name}
            className="border border-black px-3 py-2 rounded-lg w-full"
            {...register("name")}
          />
          <p>{errors?.name?.message}</p>
        </div>
        <div>
          <label>Description</label>
          <textarea
            placeholder="Briefly describe your courses details"
            defaultValue={selectedCourse.description}
            className="border border-black px-3 py-2 rounded-lg w-full"
            rows={10}
            {...register("description")}
          />
          <p>{errors?.description?.message}</p>
        </div>

        <div className="flex flex-1 flex-col gap-2 mt-4">
          <input
            type="submit"
            className="bg-blue text-white px-5 py-2 border border-black rounded-lg"
            value="Save"
          />
          <button onClick={() => handleBack()} className="px-5 py-2 border border-black rounded-lg">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCourseModal;
