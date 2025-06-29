import React from "react";

const FormHeader = ({ name }: { name: string }) => {
  return (
    <div className="form_header">
      <p>{name}</p>
    </div>
  );
};

export default FormHeader;
