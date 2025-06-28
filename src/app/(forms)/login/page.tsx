"use client";
// import { useAuth } from "@/_hooks/useAuth";
import { useGenselectors } from "@/lib/store/general-store";

import { FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useModalStore from "@/lib/store/modal-store";
import { useRouter } from "next/navigation";
import BlogBtn from "@/components/general/blog-btn";
import { LoginData } from "@/types/forms.type";
import { loginschema } from "@/lib/actions/validation";
import BlogInput from "@/components/general/blog-input";

const Login = () => {
  const { openModal, closeModal } = useModalStore();
  const openToast = useGenselectors.use.openToast();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<LoginData>({
    resolver: yupResolver(loginschema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [login, setLogin] = useState<LoginData>({} as LoginData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onError = (errors: FieldErrors<LoginData>) => {
    for (const [fieldName, err] of Object.entries(errors)) {
      if (err?.message) {
        openToast(err.message, 2500);
        break;
      }
    }
  };

  const onSubmit = async (data: LoginData) => {
    openModal("loading");
  };
  return (
    <form
      autoComplete="off"
      action=""
      className="login"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className="form_header">
        <p>sign in </p>
      </div>

      <div className="login_fields">
        {[
          { label: "Username", name: "username", isPassword: false },
          { label: "Password", name: "password", isPassword: true },
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

      <div className="login_button">
        <button type="submit">Submit</button>
      </div>

      <h2 className="login_join">
        Don’t have an account? <Link href="/register"> Click to create.</Link>
      </h2>
    </form>
  );
};
export default Login;
