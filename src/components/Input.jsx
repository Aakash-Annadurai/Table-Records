import React from "react";

export default function Input({
  label = "Default Label",
  placeholder = "Enter your name",
  name,
  value,
  type,
  error,
  onchange,
}) {
  return (
    <div className="singleInput">
      <label>{label}</label>
      <input
        label={label}
        placeholder={placeholder}
        name={name}
        value={value}
        type={type}
        onChange={onchange}
      ></input>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
