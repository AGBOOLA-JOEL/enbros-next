"use client";
import { useGenselectors } from "@/lib/store/general-store";
import { FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { RegisterData } from "@/types/forms.type";
import { registerschema } from "@/lib/actions/validation";
import BlogInput from "@/components/general/blog-input";
import { useAuth } from "@/hooks/useAuth";
import FormBtn from "@/components/forms/form-btn";
import FormHeader from "@/components/forms/form-header";

const Register = () => {
  const { registerMutation } = useAuth();
  const openToast = useGenselectors.use.openToast();
  const { register, handleSubmit, reset } = useForm<RegisterData>({
    resolver: yupResolver(registerschema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onError = (errors: FieldErrors<RegisterData>) => {
    for (const [fieldName, err] of Object.entries(errors)) {
      if (err?.message) {
        openToast(err.message, 2500);
        break;
      }
    }
  };

  const onSubmit = async (data: RegisterData) => {
    registerMutation.mutate(data);
  };
  return (
    <form
      autoComplete="off"
      action=""
      className="form_wrapper"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <FormHeader name="sign up" />

      <div className="form_fields">
        {[
          { label: "Username", name: "username", isPassword: false },
          { label: "Password", name: "password", isPassword: true },
          {
            label: "Confirm Password",
            name: "confirmPassword",
            isPassword: true,
          },
        ].map(({ label, name, isPassword }) => (
          <BlogInput
            key={name}
            register={register}
            label={label}
            name={name}
            isPassword={isPassword}
          />
        ))}
      </div>

      <FormBtn name="Submit" />

      <h2 className="form_login">
        Already have an account? <Link href="/login"> Login.</Link>
      </h2>
    </form>
  );
};
export default Register;
