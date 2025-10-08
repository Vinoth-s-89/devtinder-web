import React from "react";

const SelectField = ({
  label = "",
  selectLabel = "",
  options = [],
  name = "",
  value = "",
  onChange,
}) => {
  return (
    <fieldset className="w-full fieldset">
      <legend className="fieldset-legend">{label} :</legend>
      <select
        name={name}
        onChange={onChange}
        defaultValue={""}
        className="select"
      >
        <option disabled={true} value="">
          {selectLabel}
        </option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </fieldset>
  );
};

export default SelectField;
