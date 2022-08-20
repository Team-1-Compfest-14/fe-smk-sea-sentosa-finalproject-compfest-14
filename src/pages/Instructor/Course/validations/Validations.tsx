import * as Yup from "yup";

export const courseValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("This is required")
    .min(4, "Name must be at least 4 characters")
    .max(64, "Name must not exceed 64 characters"),
  description: Yup.string()
    .required("This is required")
    .min(4, "Description must be at least 4 characters")
    .max(255, "Description must not exceed 255 characters")
});

export const lectureValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("This is required")
    .min(4, "Name must be at least 4 characters")
    .max(64, "Name must not exceed 64 characters"),
  lectureLink: Yup.string().url("Link must be a valid URL").required("This is required")
});

export const quizValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("This is required")
    .min(4, "Name must be at least 4 characters")
    .max(64, "Name must not exceed 64 characters")
});

export const questionValidationSchema = Yup.object().shape({
  question: Yup.string()
    .required("This is required")
    .min(4, "Description must be at least 4 characters")
    .max(64, "Description must not exceed 64 characters"),
  options: Yup.array()
    .required("This is required")
    .min(2, "There must be at least 2 options")
    .max(10, "Options must not be more than 10")
    .of(
      Yup.object().shape({
        option: Yup.string()
          .required("Option must not be empty")
          .min(4, "Option must be at least 4 characters")
          .max(64, "Option must not exceed 64 characters"),
        isCorrectAnswer: Yup.boolean().required("Correct answer is required")
      })
    )
});
