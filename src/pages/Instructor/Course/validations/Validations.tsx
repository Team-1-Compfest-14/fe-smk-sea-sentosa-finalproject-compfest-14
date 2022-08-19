import * as Yup from "yup";

export const courseValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("This is required")
    .min(4, "Name must be at least 4 characters")
    .max(64, "Name must not exceed 64 characters"),
  description: Yup.string()
    .required("This is required")
    .min(4, "Description must be at least 4 characters")
    .max(128, "Description must not exceed 128 characters")
});

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

export const questionValidationSchema = Yup.object().shape({
  description: Yup.string()
    .required("This is required")
    .min(4, "Description must be at least 4 characters")
    .max(64, "Description must not exceed 64 characters"),
  options: Yup.array()
    .required("This is required")
    .min(2, "There must be at least 2 options")
    .max(10, "Options must not be more than 10")
    .of(
      Yup.object().shape({
        value: Yup.string()
          .required("Value must not be empty")
          .min(4, "Value must be at least 4 characters")
          .max(64, "Value must not exceed 64 characters"),
        correctAnswer: Yup.boolean().required("Correct answer is required")
      })
    )
});
