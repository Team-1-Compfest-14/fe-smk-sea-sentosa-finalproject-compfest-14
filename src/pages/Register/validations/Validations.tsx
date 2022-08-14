import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  role: Yup.string().required("This is required"),
  name: Yup.string()
    .required("This is required")
    .min(4, "Name must be at least 4 characters")
    .max(64, "Name must not exceed 64 characters"),
  email: Yup.string()
    .required("This is required")
    .email("Email is invalid")
    .min(4, "Email must be at least 4 characters")
    .max(64, "Email must not exceed 64 characters"),
  password: Yup.string()
    .required("This is required")
    .min(4, "Password must be at least 4 characters")
    .max(32, "Password must not exceed 32 characters"),
  confirmPassword: Yup.string()
    .required("This is required")
    .oneOf([Yup.ref("password"), null], "Password does not match")
});
