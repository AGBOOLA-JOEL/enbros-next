import { BlogTextareaProp } from "@/types/general.type";
import React from "react";

const BlogTextarea = ({
  label,
  name,
  register,
  placeholder,
}: BlogTextareaProp) => {
  return (
    <div className="blog__textarea">
      <label htmlFor="">{label}</label>
      <textarea
        placeholder={placeholder}
        type="text"
        {...register(name)}
        name={name}
      ></textarea>
    </div>
  );
};

export default BlogTextarea;
