import * as Yup from "yup";

export const lectureValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("This is required")
    .min(4, "Title must be at least 4 characters")
    .max(64, "Title must not exceed 64 characters"),
  link: Yup.string().url("Link must be a valid URL").required("This is required")
});

export const quizValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("This is required")
    .min(4, "Title must be at least 4 characters")
    .max(64, "Title must not exceed 64 characters")
});
