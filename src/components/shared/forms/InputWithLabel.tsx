import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputWithLabel: React.FC<Props> = ({
  label,
  className = "",
  ...props
}) => {
  return (
    <label
      className={`input__labeled ${className}`}
      data-testid={"input-with-label"}
    >
      <span className={"label"}>{label}:</span>
      <input className={"input"} {...props} />
    </label>
  );
};

export default InputWithLabel;
