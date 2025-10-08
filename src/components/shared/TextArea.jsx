import React from "react";

const TextArea = ({ label = "", name = "", value = "", onChange }) => {
  return (
    <fieldset className="w-full fieldset">
      <legend className="fieldset-legend">{label} :</legend>
      <textarea
        className="textarea h-24"
        name={name}
        value={value}
        onChange={onChange}
      ></textarea>
    </fieldset>
  );
};

export default TextArea;
