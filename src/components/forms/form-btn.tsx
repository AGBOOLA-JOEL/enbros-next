import React from "react";

const FormBtn = ({ name }: { name: string }) => {
  return (
    <div className="form_button">
      <button type="submit">{name}</button>
    </div>
  );
};

export default FormBtn;
