"use client";

import type { BlogBtnProp } from "@/types/general.type";

const BlogBtn = ({ name, variant, type, onClick }: BlogBtnProp) => {
  return (
    <>
      {type === "submit" ? (
        <button
          className={`blog__btn ${variant}`}
          type={type}
          disabled={variant === "disabled"}
        >
          {name}
        </button>
      ) : (
        <button
          className={`blog__btn ${variant}`}
          type={type}
          disabled={variant === "disabled"}
          onClick={onClick}
        >
          {name}
        </button>
      )}
    </>
  );
};

export default BlogBtn;
