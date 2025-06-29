import { BlogInputProp } from "@/types/general.type";
import React, { useState } from "react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";

const BlogInput = ({
  isPassword,
  label,
  name,

  register,
}: BlogInputProp) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="blog__input">
      <input
        defaultValue={""}
        type={isPassword ? (toggle ? "text" : "password") : "text"}
        placeholder={label}
        {...register(name)}
        name={name}
        autoComplete="off"
      />

      {isPassword && (
        <div
          className="blog__input__toggle"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          {!toggle ? <Eye /> : <EyeOff />}
        </div>
      )}
    </div>
  );
};

export default BlogInput;
