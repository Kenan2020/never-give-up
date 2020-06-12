import React from "react";
import "./Input.css";
import PropTypes from "prop-types";

const Input = ({
  placeholder,
  type,
  label,
  inputStyle,
  inputSize,
  className,
  disabled,
  onChange,
  value,
  readOnly,
  required,
  attribute,
  uppercase,
  name,
  id,
}) => {
  let attributes = {
    onChange,
    disabled,
    readOnly,
    required,
    uppercase: uppercase ? uppercase.toString() : null,
    type,
    id,
    name,
    placeholder,
    value,
    className: value
      ? className
        ? className + " focused"
        : " focused"
      : className,
  };

  const setAttributes = () => {
    if (attribute) {
      attributes = { ...attributes, ...attribute };
    }
    return attributes;
  };

  return (
    <div className={`field ${inputSize} ${inputStyle}`}>
      {React.createElement("input", setAttributes())}
      <label htmlFor="name">{label}</label>
    </div>
  );
};

export default Input;
Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  inputStyle: PropTypes.string,
  inputSize: PropTypes.string,
  className: PropTypes.string,
  attribute: PropTypes.object,
};
