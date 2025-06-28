"use client";
import { useGenselectors } from "@/lib/store/general-store";
import { FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useModalStore from "@/lib/store/modal-store";
import { useRouter } from "next/navigation";
import BlogBtn from "@/components/general/blog-btn";
import { LoginData, RegisterData } from "@/types/forms.type";
import { registerschema } from "@/lib/actions/validation";
import BlogInput from "@/components/general/blog-input";

const Register = () => {
  const { openModal, closeModal } = useModalStore();
  const openToast = useGenselectors.use.openToast();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<RegisterData>({
    resolver: yupResolver(registerschema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [reg, setReg] = useState<RegisterData>({} as RegisterData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReg({ ...reg, [e.target.name]: e.target.value });
  };

  const onError = (errors: FieldErrors<RegisterData>) => {
    for (const [fieldName, err] of Object.entries(errors)) {
      if (err?.message) {
        openToast(err.message, 2500);
        break;
      }
    }
  };

  const onSubmit = async (data: RegisterData) => {
    openModal("loading");
  };
  return (
    <form
      autoComplete="off"
      action=""
      className="register"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className="form_header">
        <p>sign up</p>
      </div>

      <div className="register_fields">
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
            onChange={handleInputChange}
          />
        ))}
      </div>

      <div className="register_button">
        <button type="submit">Submit</button>
      </div>

      <h2 className="register_login">
        Already have an account? <Link href="/login"> Login.</Link>
      </h2>
    </form>
  );
};
export default Register;
