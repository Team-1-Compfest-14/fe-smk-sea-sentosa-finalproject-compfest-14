import { useDocumentTitle } from "../../hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validations/Validations";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import { LoginContext } from "../../context";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { setUser } = useContext(LoginContext);
  useDocumentTitle("Login | Pelajarin");
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(validationSchema) });

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    const response = await axios.post("http://localhost:8080/auth/login", {
      email: email,
      password: password
    });
    const { status } = response.data;
    const { accessToken } = response.data.data;
    const decoded = jwt_decode(accessToken);
    if (status === "success") {
      const { role }: any = decoded;
      localStorage.setItem("accessToken", accessToken);
      setUser({ accessToken: accessToken });
      if (role === 0) {
        navigate("/student/dashboard");
      } else if (role === 2) {
        navigate("/admin/instructors");
      } else {
        navigate("/dashboard");
      }
    } else {
      console.log("error");
    }
  });

  const formDetails = [
    {
      displayName: "Email",
      inputName: "email",
      type: "email",
      placeholder: "Enter your email",
      error: errors?.email?.message
    },
    {
      displayName: "Password",
      inputName: "password",
      type: "password",
      placeholder: "Enter your password",
      error: errors?.password?.message
    }
  ];

  return (
    <div className="px-8 py-16">
      <p className="text-center text-xl font-bold mb-10">
        Log in and Pelajarin all the things inside :)
      </p>
      {/* Form */}
      <div className="p-10 border-2 border-black w-1/3 rounded-xl mx-auto">
        <form onSubmit={onSubmit}>
          {/* Other Attributes */}
          {formDetails.map(({ displayName, inputName, type, placeholder, error }, index) => (
            <div className="mb-4" key={index}>
              <label>{displayName}</label>
              <br />
              <input
                type={type}
                placeholder={placeholder}
                className="py-3 pl-4 border-2 border-black rounded-xl w-full"
                {...register(inputName as "email" | "password")}
              />
              <p>{error}</p>
            </div>
          ))}
          {/* Log In */}
          <div className="flex justify-end">
            <input
              type="submit"
              className="bg-blue text-white px-4 py-3 border-2 border-black rounded-full cursor-pointer"
              value="Log In"
            />
          </div>
        </form>
      </div>
      <p className="text-center mt-5">
        Want to make a new account?{" "}
        <Link to="/register" className="font-bold text-blue underline">
          Register here.
        </Link>
      </p>
    </div>
  );
};

export default Login;
