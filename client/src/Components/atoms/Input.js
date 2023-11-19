import React from "react";

export default function Input({
  placeholder,
  type,
  clicked,
  value,
  classes,
  setvalue,
}) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        onClick={clicked}
        className={classes}
        value={value}
        onChange={(e) => setvalue(e.target.value)}
      />
    </div>
  );
}
