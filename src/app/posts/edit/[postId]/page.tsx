"use client";
import { useGenselectors } from "@/lib/store/general-store";
import { Controller, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useModalStore from "@/lib/store/modal-store";
import { useRouter } from "next/navigation";
import { CreateData } from "@/types/forms.type";
import { createschema } from "@/lib/actions/validation";
import BlogInput from "@/components/general/blog-input";
import BlogTextarea from "@/components/general/blog-textarea";
import BlogTagpicker from "@/components/general/blog-tagpicker";

const Edit = () => {
  const { openModal, closeModal } = useModalStore();
  const openToast = useGenselectors.use.openToast();
  const router = useRouter();
  const { register, handleSubmit, reset, control } = useForm<CreateData>({
    resolver: yupResolver(createschema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      desc: "",
      details: "",
      tags: [""],
    },
  });

  const [create, setCreate] = useState<CreateData>({} as CreateData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreate({ ...create, [e.target.name]: e.target.value });
  };

  const onError = (errors: FieldErrors<CreateData>) => {
    for (const [fieldName, err] of Object.entries(errors)) {
      if (err?.message) {
        openToast(err.message, 2500);
        break;
      }
    }
  };

  const onSubmit = async (data: CreateData) => {
    openModal("loading");
    console.log("data", data);
  };
  return (
    <form
      autoComplete="off"
      action=""
      className="create"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className="form_header">
        <p>EDIT POST</p>
      </div>

      <div className="create_fields">
        {[
          { label: "Post Title", name: "title", isPassword: false },
          { label: "Description", name: "desc", isPassword: false },
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

        <BlogTextarea
          name="details"
          label="Post details"
          register={register}
          placeholder={
            "Write detailed information about your post. Share your insights, experiences, or anything valuable you want readers to learn from this post."
          }
        />

        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <BlogTagpicker
              // tag={field.value ?? []}
              tag={(field.value ?? []).filter(
                (v): v is string => typeof v === "string"
              )}
              setTag={field.onChange}
              title="Add tags to indicate category"
            />
          )}
        />
      </div>

      <div className="create_button">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
export default Edit;
