// "use client";
// import { useGenselectors } from "@/lib/store/general-store";
// import { Controller, FieldErrors } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import useModalStore from "@/lib/store/modal-store";
// import { useParams, useRouter } from "next/navigation";
// import { EditData } from "@/types/forms.type";
// import { editschema } from "@/lib/actions/validation";
// import BlogInput from "@/components/general/blog-input";
// import BlogTextarea from "@/components/general/blog-textarea";
// import BlogTagpicker from "@/components/general/blog-tagpicker";
// import { usePost } from "@/hooks/usePost";

// const Edit = () => {
//   const { openModal, closeModal } = useModalStore();
//   const params = useParams();
//   const postId = params?.postId as string;
//   const { singlePost, singlePostLoading, singlePostError } = usePost(postId);
//   const openToast = useGenselectors.use.openToast();

//   const router = useRouter();
//   const { register, handleSubmit, reset, control, watch } = useForm<EditData>({
//     resolver: yupResolver(editschema) as any, // Type assertion to resolve type mismatch
//     mode: "onSubmit",
//     defaultValues: {
//       title: singlePost?.title,
//       desc: singlePost?.desc,
//       content: singlePost?.content,
//       tags: singlePost?.tags,
//     },
//   });

//   const onError = (errors: FieldErrors<EditData>) => {
//     for (const [fieldName, err] of Object.entries(errors)) {
//       if (err?.message) {
//         openToast(err.message, 2500);
//         break;
//       }
//     }
//   };

//   const onSubmit = async (data: EditData) => {
//     openModal("loading");
//     console.log("data", data);
//   };
//   return (
//     <div className="edit_wrapper">
//       <form
//         autoComplete="off"
//         action=""
//         className="edit"
//         onSubmit={handleSubmit(onSubmit, onError)}
//       >
//         <div className="edit_header">
//           <p>EDIT POST</p>
//         </div>

//         <div className="edit_fields">
//           {[
//             { label: "Post Title", name: "title", isPassword: false },
//             { label: "Description", name: "desc", isPassword: false },
//           ].map(({ label, name, isPassword }) => (
//             <div key={name} className="edit_inputs">
//               <h1>{label}</h1>
//               <BlogInput
//                 register={register}
//                 label={label}
//                 name={name}
//                 isPassword={isPassword}
//               />
//             </div>
//           ))}
//           <div className="edit_textarea">
//             <h1>Post Details</h1>
//             <BlogTextarea
//               name="details"
//               label="Post details"
//               register={register}
//               placeholder={
//                 "Write detailed information about your post. Share your insights, experiences, or anything valuable you want readers to learn from this post."
//               }
//             />
//           </div>

//           <div className="edit_tags">
//             <Controller
//               name="tags"
//               control={control}
//               render={({ field }) => (
//                 <BlogTagpicker
//                   // tag={field.value ?? []}
//                   tag={(field.value ?? []).filter(
//                     (v): v is string => typeof v === "string"
//                   )}
//                   setTag={field.onChange}
//                   title="Add tags to indicate category"
//                 />
//               )}
//             />
//           </div>
//         </div>

//         <div className="edit_button">
//           <button type="submit">Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// };
// export default Edit;
"use client";

import { useEffect } from "react";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";

import { useGenselectors } from "@/lib/store/general-store";
import useModalStore from "@/lib/store/modal-store";
import { usePost } from "@/hooks/usePost";

import { EditData } from "@/types/forms.type";
import { editschema } from "@/lib/actions/validation";

import BlogInput from "@/components/general/blog-input";
import BlogTextarea from "@/components/general/blog-textarea";
import BlogTagpicker from "@/components/general/blog-tagpicker";
import { useAuth } from "@/hooks/useAuth";

const Edit = () => {
  const openToast = useGenselectors.use.openToast();
  const params = useParams();
  const postId = params?.postId as string;

  const { singlePost, singlePostLoading, editpostMutation } = usePost(postId);

  const { register, handleSubmit, reset, control } = useForm<EditData>({
    resolver: yupResolver(editschema) as any,
    mode: "onSubmit",
    defaultValues: {
      title: singlePost?.title ?? "",
      desc: singlePost?.desc ?? "",
      content: singlePost?.content ?? "",
      tags: singlePost?.tags ?? [],
    },
  });

  useEffect(() => {
    if (singlePost) {
      reset({
        title: singlePost.title,
        desc: singlePost.desc,
        content: singlePost.content,
        tags: singlePost.tags,
      });
    }
  }, [singlePost, reset]);

  const onError = (errors: FieldErrors<EditData>) => {
    const firstError = Object.values(errors).find((err) => err?.message);
    if (firstError?.message) {
      openToast(firstError.message, 2500);
    }
  };

  const onSubmit = async (data: EditData) => {
    const changedFields = Object.fromEntries(
      [
        ["title", data.title !== singlePost?.title ? data.title : undefined],
        ["desc", data.desc !== singlePost?.desc ? data.desc : undefined],
        [
          "content",
          data.content !== singlePost?.content ? data.content : undefined,
        ],
        [
          "tags",
          JSON.stringify(data.tags ?? []) !==
          JSON.stringify(singlePost?.tags ?? [])
            ? data.tags
            : undefined,
        ],
      ].filter(([_, value]) => value !== undefined)
    );

    if (Object.keys(changedFields).length === 0) {
      openToast("No changes made", 2500);
      return;
    }

    editpostMutation.mutate({ id: postId, postData: changedFields });
  };

  return (
    <div className="edit_wrapper">
      <form
        autoComplete="off"
        className="edit"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="edit_header">
          <p>EDIT POST</p>
        </div>

        <div className="edit_fields">
          {[
            { name: "title", label: "Post Title" },
            { name: "desc", label: "Description" },
          ].map(({ name, label }) => (
            <div key={name} className="edit_inputs">
              <h1>{label}</h1>
              <BlogInput
                register={register}
                name={name}
                label={label}
                isPassword={false}
              />
            </div>
          ))}

          <div className="edit_textarea">
            <h1>Post Details</h1>
            <BlogTextarea
              name="content"
              label="Post details"
              register={register}
              placeholder="Write detailed information about your post. Share your insights, experiences, or anything valuable you want readers to learn from this post."
            />
          </div>

          <div className="edit_tags">
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
        </div>

        <div className="edit_button">
          <button type="submit" disabled={singlePostLoading}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
