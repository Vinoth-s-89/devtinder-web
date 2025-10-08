import React from "react";

const TextField = ({ label = "", name = "", value = "", onChange }) => {
  return (
    <fieldset className="w-full fieldset">
      <legend className="fieldset-legend tracking-wider">{label} :</legend>
      <input
        type="text"
        className="input"
        name={name}
        value={value}
        onChange={onChange}
      />
    </fieldset>
  );
};

export default TextField;
