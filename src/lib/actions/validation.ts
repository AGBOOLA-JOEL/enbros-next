import * as yup from "yup";

export const registerschema = yup.object().shape({
  username: yup.string().required(),

  password: yup
    .string()
    .min(8, "password must be at least 8 characters long")
    .matches(/[A-Z]/, "password must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "password must contain at least one special character"
    )
    .matches(/\d/, "password must contain at least one number")
    .required("password is required"),

  confirmPassword: yup
    .string()
    .test("password-match", "your passwords do not match", function (value) {
      const { password } = this.parent; // Get parent values
      return password && value === password;
    })
    .required("confirm your password"),
});

export const loginschema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const createschema = yup.object().shape({
  title: yup.string().required("Post title is a required"), //set
  desc: yup.string().required("Provide a short description"), //set
  details: yup.string().required("Provide a post details"),
  tags: yup
    .array()
    .of(yup.string())
    .min(1, "Please add at least one software")
    .required(),
});
