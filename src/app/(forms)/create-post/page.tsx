"use client";
import { useGenselectors } from "@/lib/store/general-store";
import { Controller, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CreateData } from "@/types/forms.type";
import { createschema } from "@/lib/actions/validation";
import BlogInput from "@/components/general/blog-input";
import BlogTextarea from "@/components/general/blog-textarea";
import BlogTagpicker from "@/components/general/blog-tagpicker";
import FormBtn from "@/components/forms/form-btn";
import FormHeader from "@/components/forms/form-header";
import { usePost } from "@/hooks/usePost";

const Create = () => {
  const { createpostMutation } = usePost();
  const openToast = useGenselectors.use.openToast();
  const { register, handleSubmit, reset, control } = useForm<CreateData>({
    resolver: yupResolver(createschema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      desc: "",
      content: "",
      tags: ["Full Stack"],
    },
  });

  const onError = (errors: FieldErrors<CreateData>) => {
    for (const [fieldName, err] of Object.entries(errors)) {
      if (err?.message) {
        openToast(err.message, 2500);
        break;
      }
    }
  };

  const onSubmit = async (data: CreateData) => {
    createpostMutation.mutate(data);
  };

  return (
    <form
      autoComplete="off"
      action=""
      className="form_wrapper"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <FormHeader name="create post" />

      <div className="form_fields">
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
          />
        ))}

        <BlogTextarea
          name="content"
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
              tag={(field.value ?? []).filter(
                (v): v is string => typeof v === "string"
              )}
              setTag={field.onChange}
              title="Add tags to indicate category"
            />
          )}
        />
      </div>

      <FormBtn name="Submit" />
    </form>
  );
};
export default Create;
