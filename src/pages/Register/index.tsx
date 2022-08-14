import { useForm } from "react-hook-form";
import { useDocumentTitle } from "../../hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validations/Validations";

interface FormValues {
  role: 0 | 1; // student: 0, instructor: 1
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  useDocumentTitle("Register | Pelajarin");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(validationSchema) });

  const onSubmit = handleSubmit((data) => console.log(data));

  const formDetails = [
    {
      displayName: "Name",
      inputName: "name",
      type: "text",
      placeholder: "John Doe",
      error: errors?.name?.message
    },
    {
      displayName: "Email",
      inputName: "email",
      type: "email",
      placeholder: "johndoe@example.com",
      error: errors?.email?.message
    },
    {
      displayName: "Password",
      inputName: "password",
      type: "password",
      placeholder: "Make sure it's a strong one",
      error: errors?.password?.message
    },
    {
      displayName: "Confirm Password",
      inputName: "confirmPassword",
      type: "password",
      placeholder: "Confirm your password",
      error: errors?.confirmPassword?.message
    }
  ];

  // Known issues: some colors don't render out (ex. : red)
  return (
    <div className="px-8 py-16">
      <p className="text-center text-xl font-bold mb-10">
        Register to get the full benefit of Pelajarin.
      </p>
      {/* Form */}
      <div className="p-10 border-2 border-black w-1/3 rounded-xl mx-auto">
        <form onSubmit={onSubmit}>
          {/* Role */}
          <div className="mb-4">
            <label>Role</label>
            <select
              className="py-3 pl-4 border-2 border-black rounded-xl w-full"
              {...register("role")}
            >
              <option value={0}>Student</option>
              <option value={1}>Instructor</option>
            </select>
          </div>
          {/* Other Attributes */}
          {formDetails.map(({ displayName, inputName, type, placeholder, error }, index) => (
            <div className="mb-4" key={index}>
              <label>{displayName}</label>
              <br />
              <input
                type={type}
                placeholder={placeholder}
                className="py-3 pl-4 border-2 border-black rounded-xl w-full"
                {...register(
                  inputName as "name" | "role" | "email" | "password" | "confirmPassword"
                )}
              />
              <p>{error}</p>
            </div>
          ))}
          {/* Submit */}
          <div className="flex justify-end">
            <input
              type="submit"
              className="bg-blue text-white px-4 py-3 border-2 border-black rounded-full cursor-pointer"
              value="Register"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
