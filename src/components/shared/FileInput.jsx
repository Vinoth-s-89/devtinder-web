import React, { useRef } from "react";
import { useEffect } from "react";

const FileInput = ({ label = "", name = "", value = "", onChange }) => {
  const fileInputRef = useRef(null);
  useEffect(() => {
    if ((fileInputRef?.current && !value) || typeof value === "string")
      fileInputRef.current.value = "";
  }, [value]);
  return (
    <fieldset className="w-full fieldset">
      <legend className="fieldset-legend tracking-wider">{label} :</legend>
      <input
        type="file"
        ref={fileInputRef}
        className="input"
        accept="image/*"
        name={name}
        onChange={onChange}
      />
    </fieldset>
  );
};

export default FileInput;
