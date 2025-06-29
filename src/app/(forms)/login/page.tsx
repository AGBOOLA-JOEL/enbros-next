"use client";
import { useGenselectors } from "@/lib/store/general-store";
import { FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginData } from "@/types/forms.type";
import { loginschema } from "@/lib/actions/validation";
import BlogInput from "@/components/general/blog-input";
import { useAuth } from "@/hooks/useAuth";
import FormBtn from "@/components/forms/form-btn";
import FormHeader from "@/components/forms/form-header";

const Login = () => {
  const openToast = useGenselectors.use.openToast();
  const { loginMutation } = useAuth();
  const { register, handleSubmit, reset } = useForm<LoginData>({
    resolver: yupResolver(loginschema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onError = (errors: FieldErrors<LoginData>) => {
    for (const [fieldName, err] of Object.entries(errors)) {
      if (err?.message) {
        openToast(err.message, 2500);
        break;
      }
    }
  };

  const onSubmit = async (data: LoginData) => {
    console.log("login data", data);
    loginMutation.mutate(data);
  };
  return (
    <form
      autoComplete="off"
      action=""
      className="form_wrapper"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <FormHeader name="Login" />

      <div className="form_fields">
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
          />
        ))}
      </div>

      <FormBtn name="Submit" />

      <h2 className="form_login">
        Don’t have an account? <Link href="/register"> Click to create.</Link>
      </h2>
    </form>
  );
};
export default Login;
